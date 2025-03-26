import { FormSchema } from '@/services';

export const getAnCardDisplayFormSchema = () =>
  ({
    components: [
      {
        text: '### Card Display Configuration',
        type: 'text',
        id: 'field_intro_card_display',
      },
      {
        label: 'Title',
        key: 'title',
        type: 'textfield',
        id: 'Field_title',
        validate: {
          required: true,
        },
      },
      {
        label: 'Value Type',
        key: 'valueType',
        type: 'textfield',
        id: 'Field_value',
      },
      {
        label: 'Description',
        key: 'description',
        type: 'textfield',
        id: 'Field_description',
      },
    ],
    schemaVersion: 1,
    type: 'default',
    id: 'Form_anCardDisplay',
    versionTag: 'v1',
  }) as FormSchema;
