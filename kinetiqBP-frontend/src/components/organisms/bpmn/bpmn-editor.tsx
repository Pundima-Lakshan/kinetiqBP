import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';
import './style.css';

import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';

import { MagicPropertiesProviderModule } from './common/provider';
import { magicModdleDescriptor } from './common/descriptors';

import { DEFAULT_BPMN_DIAGRAM_XML_PATH } from '@/utils';

interface ReactBpmnEditorProps {
  diagramXml?: string;
  bpmnModelerRef?: React.MutableRefObject<BpmnModeler | null>;
}

export const KBPBpmnEditor = ({ diagramXml, bpmnModelerRef }: ReactBpmnEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const propertiesPanelRef = useRef<HTMLDivElement>(null);

  const [diagramError, setDiagramError] = useState<string | null>(null);
  const [diagram, setDiagram] = useState(diagramXml);

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
      additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, MagicPropertiesProviderModule],
      moddleExtensions: {
        magic: magicModdleDescriptor,
      },
    });

    if (bpmnModelerRef) {
      bpmnModelerRef.current = modeler;
    }

    // Open the initial diagram
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
      {/* Error Message */}
      {diagramError && (
        <div className="message error">
          <p>Oops, we could not display the BPMN 2.0 diagram.</p>
          <div className="details">
            <span>cause of the problem</span>
            <pre>{diagramError}</pre>
          </div>
        </div>
      )}

      {/* BPMN Modeler Canvas */}
      <div ref={canvasRef} className="bpmn-editor-canvas" id="js-canvas"></div>

      {/* BPMN Properties Panel */}
      <div className="bpmn-editor-properties-panel">
        <div ref={propertiesPanelRef} id="js-properties-panel" className=""></div>
      </div>
    </div>
  );
};
