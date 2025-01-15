import { DownloadAction } from './download-action.tsx';
import { MutableRefObject } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

interface DownloadActionsProps {
  bpmnModelerRef: MutableRefObject<BpmnModeler | null>;
}

export const useDownloadActions = ({ bpmnModelerRef }: DownloadActionsProps) => {
  const handleXmlDownload = () => {
    if (!bpmnModelerRef.current) {
      return;
    }
    bpmnModelerRef.current
      .saveXML({
        format: true,
      })
      .then(({ xml }) => {
        if (!xml) {
          return;
        }
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'diagram.bpmn20.xml';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error exporting XML:', error);
      });
  };

  const handleSvgDownload = () => {
    if (!bpmnModelerRef.current) {
      return;
    }
    bpmnModelerRef.current
      .saveSVG()
      .then(({ svg }) => {
        if (!svg) {
          return;
        }
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'diagram.svg';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error exporting SVG:', error);
      });
  };

  const getDownloadActions = () => [
    <DownloadAction key={'xml-download'} handleDownload={handleXmlDownload} label={'XML'} />,
    <DownloadAction key={'svg-download'} handleDownload={handleSvgDownload} label={'SVG'} />,
  ];

  return {
    getDownloadActions,
  };
};
