import type { KBPFormViewerRefObj } from '@/components/organisms';
import type { FormSchema, RestVariable, TemplateData } from '@/services';
import { extractPdfTemplateFilename } from '@/utils';
import type { DialogHook } from '@toolpad/core';
import type { MutableRefObject } from 'react';

interface GetFormDataCommon {
  kbpFormViewerRef: MutableRefObject<KBPFormViewerRefObj | null>;
  dialogs: DialogHook;
  isFiles?: boolean;
  filePostfix?: string;
}

export function getFormData({ kbpFormViewerRef, dialogs }: Omit<GetFormDataCommon, 'isFiles'>): RestVariable[] | undefined; // If isFiles is undefined, return RestVariablesType[] or undefined

export function getFormData({ kbpFormViewerRef, dialogs, isFiles, filePostfix }: GetFormDataCommon): { file: File; formKey: string }[] | undefined; // If isFiles is true, return FileType[] or undefined

export function getFormData({ kbpFormViewerRef, dialogs, isFiles, filePostfix }: GetFormDataCommon) {
  const formSchema = kbpFormViewerRef.current?.getSchema();

  if (!formSchema) return;

  const submitResponse = kbpFormViewerRef.current?.getSubmitResponse();
  if (!submitResponse) return;

  if (Object.keys(submitResponse.errors).length > 0) {
    dialogs.alert('Fill the form correctly');
    return;
  }

  if (isFiles) {
    return getFilesdFromData(formSchema, submitResponse.data, filePostfix);
  } else {
    return getRestVariablesFromData(formSchema, submitResponse.data);
  }
}

export const getFilesdFromData = (formSchema: FormSchema, data: Record<string, unknown>, filePostfix: string | undefined) => {
  const componentsMap = new Map(formSchema.components.map((component) => [component.key, component]));
  const filesData: { file: File; formKey: string }[] = [];

  Object.keys(data).forEach((dataKey) => {
    const correspondingComponent = componentsMap.get(dataKey);
    const dataValue = data[dataKey];
    let fileData: File | null = null;

    switch (correspondingComponent?.type) {
      case 'pdf-template': {
        const data = JSON.parse(dataValue as string) as TemplateData;
        fileData = new File([dataValue as string], `${data.fileName}__${filePostfix}_${dataKey}`, {
          type: 'application/json',
        });
        break;
      }
    }
    if (!fileData) return;
    filesData.push({
      formKey: dataKey,
      file: fileData,
    });
  });

  return filesData;
};

export const getRestVariablesFromData = (formSchema: FormSchema, data: Record<string, unknown>) => {
  const componentsMap = new Map(formSchema.components.map((component) => [component.key, component]));
  const restVariables: RestVariable[] = [];

  Object.keys(data).forEach((dataKey) => {
    const correspondingComponent = componentsMap.get(dataKey);
    const dataValue = data[dataKey];
    let restVariable: RestVariable | null = null;

    switch (correspondingComponent?.type) {
      case 'textfield': {
        restVariable = {
          name: dataKey,
          type: 'string',
          value: dataValue as string,
        };
        break;
      }
      case 'checkbox': {
        restVariable = {
          name: dataKey,
          type: 'boolean',
          value: dataValue as boolean,
        };
        break;
      }
      case 'number': {
        restVariable = {
          name: dataKey,
          type: 'number',
          value: dataValue as number,
        };
        break;
      }
      case 'textarea': {
        restVariable = {
          name: dataKey,
          type: 'string',
          value: dataValue as string,
        };
        break;
      }
      case 'datetime': {
        restVariable = {
          name: dataKey,
          type: 'string',
          value: dataValue as string,
        };
        break;
      }
      case 'pdf-template': {
        restVariable = {
          name: dataKey,
          type: 'string',
          value: '',
        };
        break;
      }
    }
    if (!restVariable) return;
    restVariables.push(restVariable);
  });

  return restVariables;
};

export const getDataFromRestVariables = (restVariables: RestVariable[], formSchema: FormSchema | undefined) => {
  const pdfTemplateComponentsMap = new Map(
    formSchema?.components
      .map((c) => {
        if (c.type === 'pdf-template') {
          return c;
        }
      })
      .filter((c) => c != null)
      .map((c) => [c.key, c]),
  );

  return restVariables.reduce((acc: Record<string, unknown>, curr) => {
    switch (curr.type) {
      case 'string': {
        acc[curr.name] = pdfTemplateComponentsMap.get(curr.name) ? extractPdfTemplateFilename(String(curr.value)) : String(curr.value);
        break;
      }
      case 'number': {
        acc[curr.name] = Number(curr.value);
        break;
      }
      case 'boolean': {
        acc[curr.name] = Boolean(curr.value);
        break;
      }
      default: {
        acc[curr.name] = curr.value;
      }
    }
    return acc;
  }, {});
};
