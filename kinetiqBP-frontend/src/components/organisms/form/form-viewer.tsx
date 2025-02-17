import { useSyncedRef } from '@/utils';
import { Form, Schema } from '@bpmn-io/form-js';
import { useEffect, useRef } from 'react';
import { RangeFieldPropertiesProvider } from './extension/properties-panel';
import { RangeField } from './extension/render';

export interface KBPFormViewerProps {
  submitHandler: (event: unknown) => void;
  changedHandler?: (event: unknown) => void;
  schema: Schema;
  data: Record<string, unknown>;
}

export const KBPFormViewer = ({ changedHandler, submitHandler, schema, data }: KBPFormViewerProps) => {
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const submitHandlerRef = useSyncedRef({ value: submitHandler });
  const changedHandlerRef = useSyncedRef({ value: changedHandler });

  useEffect(() => {
    const form = new Form({
      container: formContainerRef.current,
      additionalModules: [RangeField],
      properties: [RangeFieldPropertiesProvider],
    });

    const initializeForm = async () => {
      const { warnings } = await form.importSchema(schema, data);
      console.warn('Form <warnings>', warnings);

      form.on('submit', (event: unknown) => {
        submitHandlerRef.current(event);
      });

      form.on('changed', 500, (event: unknown) => {
        changedHandlerRef.current?.(event);
      });
    };

    void initializeForm();

    return () => {
      form.destroy();
    };
  }, [changedHandlerRef, data, schema, submitHandlerRef]);

  return <div ref={formContainerRef} style={{ width: '100%', height: '100%' }} />;
};
