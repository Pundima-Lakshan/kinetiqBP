import type { ExtensionAttribute, FormSchema, FormSchemaType } from '@/services';
import Ids from 'ids';

export const createDynamicForm = (dynamicVariables: ExtensionAttribute[]) => {
  const ids = new Ids();
  const fieldTypeMapping = dynamicFormEntries.reduce((acc: Record<string, string>, curr) => {
    acc[curr.value] = curr.value;
    return acc;
  }, {});
  const components: FormSchema['components'] = [];
  dynamicVariables.forEach((dv) => {
    const fields = JSON.parse(dv.value) as { key: string | number; name: string; type: string }[];
    fields.forEach(({ key, name, type }) => {
      components.push({
        id: `${key}_${ids.next()}`,
        key: name,
        label: name.replace(/^\w/, (c) => c.toUpperCase()),
        type: (fieldTypeMapping[type] as FormSchema['components'][number]['type']) ?? 'textfield',
        layout: {
          row: `Row_${ids.next()}`,
          columns: null,
        },
      });
    });
  });
  const schema: FormSchema = {
    components: components,
    id: `dynamic_form_${ids.next()}}`,
    schemaVersion: 18,
    versionTag: '1',
    type: 'default',
  };
  return schema;
};

export const dynamicFormEntries: Array<{ label: string; value: FormSchemaType }> = [
  {
    label: 'Text',
    value: 'textfield',
  },
  {
    label: 'Number',
    value: 'number',
  },
  {
    label: 'True or False',
    value: 'checkbox',
  },
  {
    label: 'Text area',
    value: 'textarea',
  },
  {
    label: 'Date Time',
    value: 'datetime',
  },
  {
    label: 'Image',
    value: 'image',
  },
];
