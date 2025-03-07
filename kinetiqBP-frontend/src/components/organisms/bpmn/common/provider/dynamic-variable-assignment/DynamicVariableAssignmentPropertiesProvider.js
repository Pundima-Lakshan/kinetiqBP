import dynamicVariableAssignmentProps from './parts/DynamicVariableAssignmentProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function DynamicVariableAssignmentPropertiesProvider(propertiesPanel, translate) {
  this.getGroups = function (element) {
    return function (groups) {
      if (is(element, 'bpmn:UserTask')) {
        groups.push(createDynamicVariableAssignmentGroup(element, translate));
      }

      return groups;
    };
  };

  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

DynamicVariableAssignmentPropertiesProvider.$inject = ['propertiesPanel', 'translate'];

function createDynamicVariableAssignmentGroup(element, translate) {
  const dynamicVariableAssignmentGroup = {
    id: 'dynamicVariableAssignment',
    label: translate('Dynamic variable assignment'),
    entries: dynamicVariableAssignmentProps(element),
    tooltip: translate('Assign dynamic variables for the task'),
  };

  return dynamicVariableAssignmentGroup;
}
