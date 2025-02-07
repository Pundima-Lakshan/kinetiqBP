import { isSelectEntryEdited } from '@bpmn-io/properties-panel';

import { Assignee } from './Assignee';
import { CandidateGroups } from './CandidateGroups';
import { CandidateUsers } from './CandidateUsers';

export default function (element) {
  return [
    {
      id: 'assignee',
      element,
      component: Assignee,
      isEdited: isSelectEntryEdited,
    },
    {
      id: 'candidateUsers',
      element,
      component: CandidateUsers,
      isEdited: isSelectEntryEdited,
    },
    {
      id: 'candidateGroups',
      element,
      component: CandidateGroups,
      isEdited: isSelectEntryEdited,
    },
  ];
}
