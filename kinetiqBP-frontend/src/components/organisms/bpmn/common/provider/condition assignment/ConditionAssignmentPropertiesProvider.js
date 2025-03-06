import conditionAssignmentProps from './parts/ConditionAssignmentProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function ConditionAssignmentPropertiesProvider(propertiesPanel, translate) {
  this.getGroups = function (element) {
    return function (groups) {
      if (is(element, 'bpmn:SequenceFlow')) {
        groups.push(createConditionAssignmentGroup(element, translate));
      }

      return groups;
    };
  };

  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

ConditionAssignmentPropertiesProvider.$inject = ['propertiesPanel', 'translate'];

function createConditionAssignmentGroup(element, translate) {
  const formAssignmentGroup = {
    id: 'conditionAssignment',
    label: translate('Condition assignment'),
    entries: conditionAssignmentProps(element),
    tooltip: translate('Assign conditions for the flow'),
  };

  return formAssignmentGroup;
}
