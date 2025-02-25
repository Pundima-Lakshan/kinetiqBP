import '@bpmn-io/properties-panel/assets/properties-panel.css';
import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import './style.css';

import lintModule from 'bpmn-js-bpmnlint';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import React, { useEffect, useRef, useState } from 'react';

import { formAssignmentModdleDescriptor, userAssignmentModdleDescriptor } from './common/descriptors';
import { FormAssignmentPropertiesProviderModule, UserAssignmentPropertiesProviderModule } from './common/provider';

import { DEFAULT_BPMN_DIAGRAM_XML_PATH, useSyncedState } from '@/utils';
import type { KBPCustomEditorEvent } from './common/constants';

import { bundle as bpmnlintConfig } from './common/linting';

type OnEventHandler = (name: KBPCustomEditorEvent, event: unknown) => void;

interface ReactBpmnEditorProps {
  diagramXml?: string;
  bpmnModelerRef?: React.MutableRefObject<BpmnModeler | null>;
  onEventHandler?: OnEventHandler;
}

export const KBPBpmnEditor = ({ diagramXml, bpmnModelerRef, onEventHandler }: ReactBpmnEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const propertiesPanelRef = useRef<HTMLDivElement>(null);

  const [diagramError, setDiagramError] = useState<string | null>(null);
  const { state: diagram, setState: setDiagram } = useSyncedState({ getter: () => diagramXml, deps: [diagramXml] });

  useEffect(() => {
    if (diagram) {
      return;
    }
    fetch(DEFAULT_BPMN_DIAGRAM_XML_PATH)
      .then((response) => response.text())
      .then((data) => setDiagram(data))
      .catch((error) => console.error('Error loading default BPMN XML:', error));
  }, [diagram]);

  useEffect(() => {
    if (!canvasRef.current || !propertiesPanelRef.current) {
      return;
    }

    const modeler = new BpmnModeler({
      container: canvasRef.current,
      propertiesPanel: {
        parent: propertiesPanelRef.current,
      },
      additionalModules: [
        lintModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        UserAssignmentPropertiesProviderModule,
        FormAssignmentPropertiesProviderModule,
      ],
      moddleExtensions: {
        userAssignment: userAssignmentModdleDescriptor,
        formAssignment: formAssignmentModdleDescriptor,
      },
      linting: {
        bpmnlint: bpmnlintConfig,
      },
    });

    modeler.on('fileViewer.open', (event: unknown) => {
      onEventHandler?.('fileViewer.open', event);
    });

    if (bpmnModelerRef) {
      bpmnModelerRef.current = modeler;
    }

    const openDiagram = async (xml: string) => {
      try {
        const res = await modeler.importXML(xml);
        if (res.warnings && res.warnings.length > 0) {
          console.warn('Warnings while importing BPMN XML:', res.warnings);
        }
        containerRef.current?.classList.remove('with-error');
        containerRef.current?.classList.add('with-diagram');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setDiagramError(err.message);
        } else {
          setDiagramError('Unknown error');
        }
        containerRef.current?.classList.remove('with-diagram');
        containerRef.current?.classList.add('with-error');
        console.error('Error importing BPMN XML:', err);
      }
    };

    if (diagram) {
      void openDiagram(diagram);
    }

    if (containerRef.current) {
      registerFileDrop(containerRef.current, openDiagram);
    }

    return () => modeler.destroy();
  }, [bpmnModelerRef, diagram]);

  const registerFileDrop = (container: HTMLDivElement, callback: (xml: string) => void) => {
    const handleFileSelect = (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => callback(event.target?.result as string);
        reader.readAsText(file);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    };

    container.addEventListener('dragover', handleDragOver, false);
    container.addEventListener('drop', handleFileSelect, false);

    return () => {
      container.removeEventListener('dragover', handleDragOver);
      container.removeEventListener('drop', handleFileSelect);
    };
  };

  return (
    <div ref={containerRef} className="bpmn-editor-content" id="js-drop-zone">
      {diagramError && (
        <div className="message error">
          <p>Oops, we could not display the BPMN 2.0 diagram.</p>
          <div className="details">
            <span>cause of the problem</span>
            <pre>{diagramError}</pre>
          </div>
        </div>
      )}

      <div ref={canvasRef} className="bpmn-editor-canvas" id="js-canvas"></div>

      <div className="bpmn-editor-properties-panel">
        <div ref={propertiesPanelRef} id="js-properties-panel" className=""></div>
      </div>
    </div>
  );
};
