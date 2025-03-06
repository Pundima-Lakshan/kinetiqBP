import { isSelectEntryEdited } from '@bpmn-io/properties-panel';

import { Condition } from './Condition';

export default function (element) {
  return [
    {
      id: 'condition',
      element,
      component: Condition,
      isEdited: isSelectEntryEdited,
    },
  ];
}
