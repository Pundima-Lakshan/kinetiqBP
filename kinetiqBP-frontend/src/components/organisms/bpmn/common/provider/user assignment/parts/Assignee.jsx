
import { html } from 'htm/preact';

import { SelectEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

import { useEffect, useState } from '@bpmn-io/properties-panel/preact/hooks';

import { fetchFlowableUsers } from '@/services';

export function Assignee(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
  
    const getValue = () => {
      return element.businessObject.assignee || '';
    };
  
    const setValue = (value) => {
      return modeling.updateProperties(element, {
        assignee: value,
      });
    };
  
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchFlowableUsers().then((users) => {
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
      description=${translate('Assign a user')}
      label=${translate('User')}
      getValue=${getValue}
      setValue=${setValue}
      getOptions=${getOptions}
      debounce=${debounce}
    />`;
  }