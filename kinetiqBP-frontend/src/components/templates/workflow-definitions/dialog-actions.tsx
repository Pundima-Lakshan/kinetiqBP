import { CommonAction } from '@/components/atoms';
import { FileInputFormControl } from '@/components/molecules';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { MutableRefObject, type ChangeEvent } from 'react';

interface CommonActionsProps {
  bpmnModelerRef: MutableRefObject<BpmnModeler | null>;
}

export const useDownloadActions = ({ bpmnModelerRef }: CommonActionsProps) => {
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
    <CommonAction key={'xml-download'} handleAction={handleXmlDownload} label={'Download XML'} />,
    <CommonAction key={'svg-download'} handleAction={handleSvgDownload} label={'Download SVG'} />,
  ];

  return {
    getDownloadActions,
  };
};

export const useUploadActions = ({ bpmnModelerRef }: CommonActionsProps) => {
  const handleXmlUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
      const xmlFile = e.target.files[0];
      xmlFile.text().then((xmlText) => {
        void bpmnModelerRef.current?.importXML(xmlText);
      });
    }
  };

  const getUploadActions = () => [<FileInputFormControl handleChange={handleXmlUpload} label="Upload XML" accept=".xml" />];

  return {
    getUploadActions,
  };
};
