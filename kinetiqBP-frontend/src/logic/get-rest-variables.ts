import type { KBPFormViewerRefObj } from '@/components/organisms';
import type { FormSchema, RestVariable } from '@/services';
import type { DialogHook } from '@toolpad/core';
import type { MutableRefObject } from 'react';

interface GetFormData {
  kbpFormViewerRef: MutableRefObject<KBPFormViewerRefObj | null>;
  dialogs: DialogHook;
}

export const getFormData = ({ kbpFormViewerRef, dialogs }: GetFormData) => {
  const formSchema = kbpFormViewerRef.current?.getSchema();

  if (!formSchema) return;

  const submitResponse = kbpFormViewerRef.current?.getSubmitResponse();
  if (!submitResponse) return;

  if (Object.keys(submitResponse.errors).length > 0) {
    dialogs.alert('Fill the form correctly');
    return;
  }

  return getRestVariablesFromData(formSchema, submitResponse.data);
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
    }
    if (!restVariable) return;
    restVariables.push(restVariable);
  });

  return restVariables;
};

export const getDataFromRestVariables = (restVariables: RestVariable[]) => {
  return restVariables.reduce((acc: Record<string, unknown>, curr) => {
    switch (curr.type) {
      case 'string': {
        acc[curr.name] = String(curr.value);
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
