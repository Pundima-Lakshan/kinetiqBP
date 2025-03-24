import { isSelectEntryEdited } from '@bpmn-io/properties-panel';

import { MailTask } from './MailTask.jsx';

export default function (element) {
  return [
    {
      id: 'mailTask',
      element,
      component: MailTask,
      isEdited: isSelectEntryEdited,
    },
  ];
}
