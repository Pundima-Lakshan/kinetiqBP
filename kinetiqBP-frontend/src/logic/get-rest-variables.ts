import type { FormSchema, RestVariable } from '@/services';

export const getRestVariables = (formSchema: FormSchema, data: Record<string, unknown>) => {
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
      default: {
      }
    }
    if (!restVariable) return;
    restVariables.push(restVariable);
  });

  return restVariables;
};
