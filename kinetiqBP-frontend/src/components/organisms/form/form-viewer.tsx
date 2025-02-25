import type { FormSchema } from '@/services';
import { useSyncedRef } from '@/utils';
import { Form } from '@bpmn-io/form-js';
import { useEffect, useRef } from 'react';
import { customKBPFormFieldEventNames, type CustomKBPFormEventName } from './extension/custom-events';
import { RangeFieldPropertiesProvider } from './extension/properties-panel';
import { FileEditorField, RangeField } from './extension/render';
export interface KBPFormViewerProps {
  submitHandler: (event: unknown) => void;
  changedHandler?: (event: unknown) => void;
  customEventHandler?: (event: { event: unknown; name: CustomKBPFormEventName }) => void;
  schema: FormSchema;
  data?: Record<string, unknown>;
}

export const KBPFormViewer = ({ changedHandler, submitHandler, schema, data, customEventHandler }: KBPFormViewerProps) => {
  const formRef = useRef<Form | null>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const submitHandlerRef = useSyncedRef({ value: submitHandler });
  const changedHandlerRef = useSyncedRef({ value: changedHandler });

  const programmaticEventRef = useRef(2);

  useEffect(() => {
    const form = new Form({
      container: formContainerRef.current,
      additionalModules: [RangeField, FileEditorField],
      properties: [RangeFieldPropertiesProvider],
    });
    formRef.current = form;

    const initializeForm = async () => {
      const { warnings } = await form.importSchema(schema, data);
      console.warn('Form <warnings>', warnings);

      form.on('submit', (event: unknown) => {
        if (programmaticEventRef.current > 0) {
          programmaticEventRef.current -= 1;
          return;
        }
        submitHandlerRef.current(event);
      });

      form.on('changed', 500, (event: unknown) => {
        if (programmaticEventRef.current > 0) {
          programmaticEventRef.current -= 1;
          return;
        }
        programmaticEventRef.current = 2;
        const submitResult = form.submit();
        changedHandlerRef.current?.({ event, submitResult });
      });

      form.on('fileEditor.open', (event: unknown) => {
        customEventHandler?.({ event, name: customKBPFormFieldEventNames.fileEditorOpen });
      });
    };

    void initializeForm();

    return () => {
      form.destroy();
    };
  }, [changedHandlerRef, data, schema, submitHandlerRef]);

  return <div ref={formContainerRef} style={{ width: '100%', height: '100%' }} />;
};
