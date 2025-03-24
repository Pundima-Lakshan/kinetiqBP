import { html } from 'htm/preact';

import { SelectEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

import { useEffect, useState } from '@bpmn-io/properties-panel/preact/hooks';

import { getFlowableUsers } from '@/services';

export function MailTask(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const [users, setUsers] = useState([]);

  const getValue = () => {
    return element.businessObject.assignee || '';
  };

  const setValue = (value) => {
    const usersMap = new Map(users.map((u) => [u.id, u]));
    const email = usersMap.get(value).email;

    return modeling.updateProperties(element, {
      'flowable:expression': `#{taskNotificationDelegate.sendEmail(execution, '${email}')}`,
    });
  };

  useEffect(() => {
    try {
      getFlowableUsers().then((users) => {
        setUsers(users.data);
      });
    } catch (error) {
      console.error(error);
    }
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
