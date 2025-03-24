import MailTaskProps from './parts/MailTaskProps.js';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function MailTaskPropertiesProvider(propertiesPanel, translate) {
  this.getGroups = function (element) {
    return function (groups) {
      if (is(element, 'bpmn:ServiceTask')) {
        groups.push(createMailTaskGroup(element, translate));
      }

      return groups;
    };
  };

  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

MailTaskPropertiesProvider.$inject = ['propertiesPanel', 'translate'];

function createMailTaskGroup(element, translate) {
  const mailTaskGroup = {
    id: 'mailTask',
    label: translate('Mail Task'),
    entries: MailTaskProps(element),
    tooltip: translate('Assign a User to notify via email'),
  };

  return mailTaskGroup;
}
