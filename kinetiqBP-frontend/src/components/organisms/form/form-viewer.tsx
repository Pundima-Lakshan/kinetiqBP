import type { FormSchema } from '@/services';
import { useSyncedRef } from '@/utils';
import { Form } from '@pundima-lakshan/bpmn-form-extended';
import { forwardRef, useEffect, useImperativeHandle, useRef, type ForwardedRef } from 'react';

export type FormViewerCustomEventNames = 'fileEditor.open' | 'pdfTemplate.edit' | 'pdfTemplate.new';

export interface KBPFormViewerProps {
  submitHandler?: (event: unknown) => void;
  changedHandler?: (event: unknown) => void;
  customEventHandler?: (event: { event: unknown; name: FormViewerCustomEventNames }) => void;
  schema: FormSchema;
  data?: Record<string, unknown>;
  isReadOnly?: boolean;
}

interface FormSubmit {
  data: Record<string, unknown>;
  errors: Record<string, string[]>;
  files: Map<string, File[]>;
}

export interface KBPFormViewerRefObj {
  getSubmitResponse: () => FormSubmit | undefined;
  getSchema: () => FormSchema;
}

export type KBPFormViewerRef = ForwardedRef<KBPFormViewerRefObj | null>;

export const KbpFormViewerRender = (
  { changedHandler, submitHandler, schema, data, customEventHandler, isReadOnly }: KBPFormViewerProps,
  ref: KBPFormViewerRef,
) => {
  const formRef = useRef<typeof Form | null>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const submitHandlerRef = useSyncedRef({ value: submitHandler });
  const changedHandlerRef = useSyncedRef({ value: changedHandler });

  const programmaticEventRef = useRef(2);

  useImperativeHandle(ref, () => {
    const getSubmitResponse = () => {
      programmaticEventRef.current += 2;
      return formRef.current?.submit();
    };
    const getSchema = () => {
      return formRef.current._state.schema;
    };
    return {
      getSubmitResponse,
      getSchema,
    };
  }, []);

  useEffect(() => {
    const form = new Form({
      container: formContainerRef.current,
    }).extendedForm;
    formRef.current = form;

    const initializeForm = async () => {
      if (isReadOnly) {
        schema.components.forEach((component) => {
          component.readonly = true;
        });
        const filteredComponents = schema.components.filter((component) => component.type !== 'button');
        schema.components = filteredComponents;
      }

      const { warnings } = await form.importSchema(schema, data);
      if (warnings.length > 0) console.warn('Form <warnings>', warnings);

      form.on('submit', (event: unknown) => {
        if (programmaticEventRef.current > 0) {
          programmaticEventRef.current -= 1;
          return;
        }
        submitHandlerRef.current?.(event);
      });

      form.on('changed', 500, (event: unknown) => {
        if (programmaticEventRef.current > 0) {
          programmaticEventRef.current -= 1;
          return;
        }
        programmaticEventRef.current += 2;
        const submitResult = form.submit();
        changedHandlerRef.current?.({ event, submitResult });
      });

      form.on('fileEditor.open', (event: unknown) => {
        customEventHandler?.({ event, name: 'fileEditor.open' });
      });

      form.on('pdfTemplate.new', (event: unknown) => {
        customEventHandler?.({ event, name: 'pdfTemplate.new' });
      });

      form.on('pdfTemplate.edit', (event: unknown) => {
        customEventHandler?.({ event, name: 'pdfTemplate.edit' });
      });
    };

    void initializeForm();

    return () => {
      form.destroy();
    };
  }, [changedHandlerRef, data, schema, isReadOnly, submitHandlerRef]);

  return <div ref={formContainerRef} style={{ width: '100%', height: '100%', overflowY: 'auto' }} />;
};

export const KBPFormViewer = forwardRef(KbpFormViewerRender);
