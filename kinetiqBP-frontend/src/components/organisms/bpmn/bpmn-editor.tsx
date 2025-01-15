import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';
import './style.css';

import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, CamundaPlatformPropertiesProviderModule } from 'bpmn-js-properties-panel';
import camundaModdlePackage from 'camunda-bpmn-moddle/resources/camunda';
import TokenSimulationModule from 'bpmn-js-token-simulation';
import { DEFAULT_BPMN_DIAGRAM_XML_PATH } from '@/utils';

interface ReactBpmnEditorProps {
  diagramXml?: string;
  bpmnModelerRef?: React.MutableRefObject<BpmnModeler | null>;
}

export const KBPBpmnEditor = ({ diagramXml, bpmnModelerRef }: ReactBpmnEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const propertiesPanelRef = useRef<HTMLDivElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const downloadSvgLinkRef = useRef<HTMLAnchorElement>(null);

  const [diagramError, setDiagramError] = useState<string | null>(null);
  const [diagram, setDiagram] = useState(diagramXml);
  const [bpmnModeler, setBpmnModeler] = useState<BpmnModeler | null>(null);

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
      additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, CamundaPlatformPropertiesProviderModule, TokenSimulationModule],
      moddleExtensions: {
        camunda: camundaModdlePackage,
      },
    });

    setBpmnModeler(modeler);
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

  const setEncoded = (linkRef: React.RefObject<HTMLAnchorElement>, name: string, data: string | null) => {
    if (data) {
      const encodedData = encodeURIComponent(data);
      linkRef.current?.classList.add('active');
      linkRef.current?.setAttribute('href', `data:application/bpmn20-xml;charset=UTF-8,${encodedData}`);
      linkRef.current?.setAttribute('download', name);
    } else {
      linkRef.current?.classList.remove('active');
    }
  };

  const exportArtifacts = async () => {
    if (bpmnModeler) {
      try {
        const { svg } = await bpmnModeler.saveSVG();
        setEncoded(downloadSvgLinkRef, 'diagram.svg', svg);
      } catch (err) {
        console.error('Error exporting SVG:', err);
        setEncoded(downloadSvgLinkRef, 'diagram.svg', null);
      }

      try {
        const { xml = null } = await bpmnModeler.saveXML({ format: true });
        setEncoded(downloadLinkRef, 'bpmnio.bpmn20.xml', xml);
      } catch (err) {
        console.error('Error exporting XML:', err);
        setEncoded(downloadLinkRef, 'diagram.bpmn20.xml', null);
      }
    }
  };

  const downloadLink = async () => {
    if (bpmnModeler) {
      const { xml = null } = await bpmnModeler.saveXML({ format: true });
      if (xml) {
        const blob = new Blob([xml], { type: 'application/bpmn20-xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'diagram.bpmn20.xml';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }
    }
  };

  useEffect(() => {
    if (bpmnModeler) {
      const debounce = (fn: () => void, timeout: number) => {
        let timer: NodeJS.Timeout;
        return () => {
          clearTimeout(timer);
          timer = setTimeout(fn, timeout);
        };
      };

      const debouncedExport = debounce(exportArtifacts, 500);
      bpmnModeler.on('commandStack.changed', debouncedExport);
    }
  }, [bpmnModeler]);

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
