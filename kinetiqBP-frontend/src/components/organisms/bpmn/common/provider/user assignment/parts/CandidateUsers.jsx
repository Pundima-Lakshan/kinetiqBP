
import { html } from 'htm/preact';

import { SelectEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

import { useEffect, useState } from '@bpmn-io/properties-panel/preact/hooks';

import { getFlowableUsers } from '@/services';

export function CandidateUsers(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
  
    const getValue = () => {
      return element.businessObject.candidateUsers || '';
    };
  
    const setValue = (value) => {
      return modeling.updateProperties(element, {
        candidateUsers: value,
      });
    };
  
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      getFlowableUsers().then((users) => {
        setUsers(users.data);
      });
    }, [setUsers]);
  
    const getOptions = () => {
      return [
        { label: '<none>', value: undefined },
        ...users.map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.id,
        })),
      ];
    };
  
    return html` <${SelectEntry}
      id=${id}
      element=${element}
      description=${translate('Assign candidate users')}
      label=${translate('Candidate Users')}
      getValue=${getValue}
      setValue=${setValue}
      getOptions=${getOptions}
      debounce=${debounce}
    />`;
  }