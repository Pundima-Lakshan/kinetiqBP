import { isSelectEntryEdited } from '@bpmn-io/properties-panel';

import { Assignee } from './Form';

export default function (element) {
  return [
    {
      id: 'form',
      element,
      component: Assignee,
      isEdited: isSelectEntryEdited,
    },
  ];
}
