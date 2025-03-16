import userAssignmentProps from './parts/UserAssignmentProps.js';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function UserAssignmentPropertiesProvider(propertiesPanel, translate) {
  this.getGroups = function (element) {
    return function (groups) {
      if (is(element, 'bpmn:UserTask')) {
        groups.push(createUserAssignmentGroup(element, translate));
      }

      return groups;
    };
  };

  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

UserAssignmentPropertiesProvider.$inject = ['propertiesPanel', 'translate'];

function createUserAssignmentGroup(element, translate) {
  const userAssignmentGroup = {
    id: 'userAssignment',
    label: translate('User assignment'),
    entries: userAssignmentProps(element),
    tooltip: translate('Assign users for the user task'),
  };

  return userAssignmentGroup;
}

