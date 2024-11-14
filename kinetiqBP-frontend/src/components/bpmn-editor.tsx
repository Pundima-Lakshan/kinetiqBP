import { useEffect, useState } from 'react';
import { ReactBpmnEditor } from './react-bpmn-editor.tsx';

export const BpmnViewer = () => {
  const [diagramXML, setDiagramXML] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/diagram.bpmn`)
      .then((response) => response.text())
      .then((data) => setDiagramXML(data))
      .catch((error) => console.error('Error loading BPMN XML:', error));
  }, []);

  return (
    <div>
      <h2>BPMN Editor</h2>
      {diagramXML && <ReactBpmnEditor diagramXml={diagramXML} />}
    </div>
  );
};
