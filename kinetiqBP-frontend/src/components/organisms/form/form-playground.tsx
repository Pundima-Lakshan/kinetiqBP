import React, { useEffect, useRef, useState } from 'react';
import { FormPlayground } from '@bpmn-io/form-js';

interface PlaygroundProps {
  initialSchema?: any;
  initialData?: any;
}

const schema = {
  type: 'default',
  components: [
    {
      key: 'creditor',
      label: 'Creditor',
      type: 'textfield',
      validate: {
        required: true,
      },
    },
  ],
};

const data = {
  creditor: 'John Doe Company',
};

const KBPFormPlayground: React.FC<PlaygroundProps> = ({ initialSchema = schema, initialData = data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playgroundInstance, setPlaygroundInstance] = useState<FormPlayground | null>(null);
  const [currentSchema, setCurrentSchema] = useState<any>(initialSchema);
  const [currentData, setCurrentData] = useState<any>(initialData);

  useEffect(() => {
    if (containerRef.current) {
      const playground = new FormPlayground({
        container: containerRef.current,
        schema: currentSchema,
        data: currentData,
      });
      setPlaygroundInstance(playground);

      return () => {
        playground.destroy(); // Clean up the playground instance on unmount
      };
    }
  }, [currentSchema, currentData]);

  return <div id="container" ref={containerRef} style={{ width: '100%', height: '100%', textAlign: 'start' }} />;
};

export default KBPFormPlayground;
