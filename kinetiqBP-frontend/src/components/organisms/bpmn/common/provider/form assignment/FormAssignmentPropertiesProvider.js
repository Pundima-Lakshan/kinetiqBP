import formAssignmentProps from './parts/FormAssignmentProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function FormAssignmentPropertiesProvider(propertiesPanel, translate) {
  this.getGroups = function (element) {
    return function (groups) {
      if (is(element, 'bpmn:UserTask') | is(element, 'bpmn:StartEvent')) {
        groups.push(createFormAssignmentGroup(element, translate));
      }

      return groups;
    };
  };

  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

FormAssignmentPropertiesProvider.$inject = ['propertiesPanel', 'translate'];

function createFormAssignmentGroup(element, translate) {
  const formAssignmentGroup = {
    id: 'formAssignment',
    label: translate('Form assignment'),
    entries: formAssignmentProps(element),
    tooltip: translate('Assign form for the user task'),
  };

  return formAssignmentGroup;
}
