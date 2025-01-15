import React, { useEffect, useRef, useState } from 'react';
import BpmnJS from 'bpmn-js';

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

  // Initialize the BPMN viewer on mount
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

      const canvas = viewer.get('canvas') as any;
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

  // Function to display the diagram
  const displayDiagram = async (xml: string) => {
    if (bpmnViewer) {
      const importResult = await bpmnViewer.importXML(xml);
      console.log(importResult);
    }
  };

  // Function to fetch diagram from URL
  const fetchDiagram = (url: string) => {
    handleLoading();
    fetch(url)
      .then((response) => response.text())
      .then((text) => setLocalDiagramXML(text))
      .catch((err) => handleError(err));
  };

  // Callback functions
  const handleLoading = () => {
    if (onLoading) {
      onLoading();
    }
  };

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

  // Re-render diagram when `localDiagramXML` changes
  useEffect(() => {
    if (localDiagramXML) {
      displayDiagram(localDiagramXML);
    }
  }, [localDiagramXML]);

  return <div className="react-bpmn-diagram-container" ref={containerRef}></div>;
};
