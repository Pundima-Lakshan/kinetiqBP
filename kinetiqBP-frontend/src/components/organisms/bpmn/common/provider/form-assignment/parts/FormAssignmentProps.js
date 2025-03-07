import { isSelectEntryEdited } from '@bpmn-io/properties-panel';

import { Form } from './Form';

export default function (element) {
  return [
    {
      id: 'form',
      element,
      component: Form,
      isEdited: isSelectEntryEdited,
    },
  ];
}
