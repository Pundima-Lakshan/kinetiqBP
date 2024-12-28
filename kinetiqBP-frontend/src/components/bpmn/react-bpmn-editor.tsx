import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, CamundaPlatformPropertiesProviderModule } from 'bpmn-js-properties-panel';
import camundaModdlePackage from "camunda-bpmn-moddle/resources/camunda";
import TokenSimulationModule from 'bpmn-js-token-simulation';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';
import './style.css';

interface ReactBpmnEditorProps {
  diagramXml: string;
}

export const ReactBpmnEditor = ({ diagramXml }: ReactBpmnEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const propertiesPanelRef = useRef<HTMLDivElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const downloadSvgLinkRef = useRef<HTMLAnchorElement>(null);

  const [bpmnModeler, setBpmnModeler] = useState<BpmnModeler | null>(null);
  const [diagramError, setDiagramError] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current && propertiesPanelRef.current) {
      const modeler = new BpmnModeler({
        container: canvasRef.current,
        propertiesPanel: {
          parent: propertiesPanelRef.current,
        },
        additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, CamundaPlatformPropertiesProviderModule, TokenSimulationModule],
        moddleExtensions: {
          camunda: camundaModdlePackage
        },
      });

      setBpmnModeler(modeler);

      // Open the initial diagram
      const openDiagram = async (xml: string) => {
        try {
          await modeler.importXML(xml);
          containerRef.current?.classList.remove('with-error');
          containerRef.current?.classList.add('with-diagram');
        } catch (err: any) {
          setDiagramError(err.message);
          containerRef.current?.classList.remove('with-diagram');
          containerRef.current?.classList.add('with-error');
          console.error('Error importing BPMN XML:', err);
        }
      };

      openDiagram(diagramXml)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });

      if (containerRef.current) {
        registerFileDrop(containerRef.current, openDiagram);
      }

      return () => modeler.destroy();
    }
  }, []);

  const createNewDiagram = () => {
    if (bpmnModeler) {
      bpmnModeler
        .importXML(diagramXml)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
        let timer: number;
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

      {/* Download Buttons */}
      <ul className="bpmn-editor-buttons">
        <li>download</li>
        <li>
          <a ref={downloadLinkRef} id="js-download-diagram" title="download BPMN diagram">
            BPMN diagram
          </a>
        </li>
        <li>
          <button onClick={downloadLink} id="js-download-svg" title="download as SVG image">
            SVG image
          </button>
        </li>
      </ul>
    </div>
  );
};
