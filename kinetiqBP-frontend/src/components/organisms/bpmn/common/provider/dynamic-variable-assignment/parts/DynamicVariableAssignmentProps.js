import { isSelectEntryEdited } from '@bpmn-io/properties-panel';

import { DynamicVariable } from './DynamicVariable';

export default function (element) {
  return [
    {
      id: 'dynamicVariable',
      element,
      component: DynamicVariable,
      isEdited: isSelectEntryEdited,
    },
  ];
}
