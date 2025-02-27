import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css';

import { useSyncedState } from '@/utils';
import BpmnJS from 'bpmn-js';
import lintModule from 'bpmn-js-bpmnlint';
import { Canvas } from 'bpmn-js/lib/features/context-pad/ContextPadProvider';
import type Modeling from 'bpmn-js/lib/features/modeling/Modeling';
import type { Element } from 'bpmn-js/lib/features/modeling/Modeling';
import React, { useEffect, useRef, useState } from 'react';
import { getColors, type BpmnElementColorState } from './common';
import { bundle as bpmnlintConfig } from './common/linting';

import './style.css';

interface ElementsCollection {
  elements: Element[];
  color?: BpmnElementColorState;
}

interface ReactBpmnProps {
  url?: string;
  diagramXml?: string;
  onLoading?: (state: boolean) => void;
  onError?: (error: Error) => void;
  onShown?: (warnings: Array<Error>) => void;
  elementsToColor?: Array<ElementsCollection>;
}

export const KBPBpmnViewer: React.FC<ReactBpmnProps> = ({ url, diagramXml, onLoading, onError, onShown, elementsToColor }) => {
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

    const viewer = new BpmnJS({
      container: containerRef.current,
      additionalModules: [lintModule],
      linting: {
        bpmnlint: bpmnlintConfig,
      },
    });
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

  const displayDiagram = async (xml: string, elementsToColor: ReactBpmnProps['elementsToColor']) => {
    if (bpmnViewer) {
      const importResult = await bpmnViewer.importXML(xml);
      if (importResult.warnings.length > 0) console.warn(importResult.warnings);

      const modeling: Modeling = bpmnViewer.get('modeling');
      elementsToColor?.forEach((elementCollection) => {
        modeling.setColor(elementCollection.elements, getColors(elementCollection.color));
      });
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
    if (url) {
      fetchDiagram(url);
    } else if (diagramXml) {
      void displayDiagram(diagramXml, elementsToColor);
    }
  }, [url, diagramXml, bpmnViewer, elementsToColor]);

  useEffect(() => {
    if (localDiagramXML) {
      displayDiagram(localDiagramXML, elementsToColor);
    }
  }, [localDiagramXML, elementsToColor]);

  return <div className="bpmn-viewer-container" ref={containerRef}></div>;
};
