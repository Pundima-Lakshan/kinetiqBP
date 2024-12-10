import { useEffect, useState } from 'react';
import { ReactBpmnEditor } from './react-bpmn-editor.tsx';

export const BpmnEditor = () => {
  const [diagramXML, setDiagramXML] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/bpmnio.bpmn20.xml`)
      .then((response) => response.text())
      .then((data) => setDiagramXML(data))
      .catch((error) => console.error('Error loading BPMN XML:', error));
  }, []);

  return (
    <>
      {diagramXML && <ReactBpmnEditor diagramXml={diagramXML} />}
    </>
  );
};
