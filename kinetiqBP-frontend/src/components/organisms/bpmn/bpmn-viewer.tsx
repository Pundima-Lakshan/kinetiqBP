import { useSyncedState } from '@/utils';
import BpmnJS from 'bpmn-js';
import { Canvas } from 'bpmn-js/lib/features/context-pad/ContextPadProvider';
import React, { useEffect, useRef, useState } from 'react';

interface ReactBpmnProps {
  url?: string;
  diagramXml?: string;
  onLoading?: (state: boolean) => void;
  onError?: (error: Error) => void;
  onShown?: (warnings: Array<Error>) => void;
}

export const KBPBpmnViewer: React.FC<ReactBpmnProps> = ({ url, diagramXml, onLoading, onError, onShown }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [bpmnViewer, setBpmnViewer] = useState<BpmnJS | null>(null);
  const { state: localDiagramXML, setState: setLocalDiagramXML } = useSyncedState({ getter: () => diagramXml, deps: [diagramXml] });

  const handleError = (error: Error) => {
    if (onError) {
      onError(error);
    }
  };

  const handleShown = (warnings: Array<Error>) => {
    onShown?.(warnings);
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
      if (importResult.warnings.length > 0) console.warn(importResult.warnings);
    }
  };

  const fetchDiagram = (url: string) => {
    handleLoading(true);
    fetch(url)
      .then((response) => response.text())
      .then((text) => setLocalDiagramXML(text))
      .catch((err) => handleError(err))
      .finally(() => handleLoading(false));
  };

  const handleLoading = (state: boolean) => {
    onLoading?.(state);
  };

  useEffect(() => {
    if (localDiagramXML) {
      displayDiagram(localDiagramXML);
    }
  }, [localDiagramXML]);

  return <div className="react-bpmn-diagram-container" ref={containerRef}></div>;
};
