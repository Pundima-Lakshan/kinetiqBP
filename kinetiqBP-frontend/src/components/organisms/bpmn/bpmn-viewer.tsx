import React, { useEffect, useRef, useState } from 'react';
import BpmnJS from 'bpmn-js';
import { Canvas } from 'bpmn-js/lib/features/context-pad/ContextPadProvider';

interface ReactBpmnProps {
  url?: string;
  diagramXml?: string;
  onLoading?: () => void;
  onError?: (error: Error) => void;
  onShown?: (warnings: Array<Error>) => void;
}

export const KBPBpmnViewer: React.FC<ReactBpmnProps> = ({ url, diagramXml, onLoading, onError, onShown }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [bpmnViewer, setBpmnViewer] = useState<BpmnJS | null>(null);
  const [localDiagramXML, setLocalDiagramXML] = useState<string | undefined>(diagramXml);

  const handleError = (error: Error) => {
    if (onError) {
      onError(error);
    }
  };

  const handleShown = (warnings: Array<Error>) => {
    if (onShown) {
      onShown(warnings);
    }
  };
  
  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new BpmnJS({ container: containerRef.current });
    setBpmnViewer(viewer);

    viewer.on('import.done', (event: { error: Error | null; warnings: Array<Error> }) => {
      const { error, warnings } = event;

      if (error) {
        handleError(error);
        return;
      }

      const canvas: Canvas = viewer.get('canvas');
      canvas.zoom('fit-viewport');
      handleShown(warnings);
    });

    return () => viewer.destroy();
  }, []);

  // Load and display diagram when `url` or `diagramXml` changes
  useEffect(() => {
    if (url) {
      fetchDiagram(url);
    } else if (diagramXml) {
      void displayDiagram(diagramXml);
    }
  }, [url, diagramXml, bpmnViewer]);
  
  const displayDiagram = async (xml: string) => {
    if (bpmnViewer) {
      const importResult = await bpmnViewer.importXML(xml);
      console.log(importResult);
    }
  };
  
  const fetchDiagram = (url: string) => {
    handleLoading();
    fetch(url)
      .then((response) => response.text())
      .then((text) => setLocalDiagramXML(text))
      .catch((err) => handleError(err));
  };
  
  const handleLoading = () => {
    if (onLoading) {
      onLoading();
    }
  };
  
  useEffect(() => {
    if (localDiagramXML) {
      displayDiagram(localDiagramXML);
    }
  }, [localDiagramXML]);

  return <div className="react-bpmn-diagram-container" ref={containerRef}></div>;
};
