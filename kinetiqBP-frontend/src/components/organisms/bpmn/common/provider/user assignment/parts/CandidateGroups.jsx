
import { html } from 'htm/preact';

import { SelectEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

import { useEffect, useState } from '@bpmn-io/properties-panel/preact/hooks';

import { getFlowableGroups } from '@/services';

export function CandidateGroups(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
  
    const getValue = () => {
      return element.businessObject.candidateGroups || '';
    };
  
    const setValue = (value) => {
      return modeling.updateProperties(element, {
        candidateGroups: value,
      });
    };
  
    const [groups, setGroups] = useState([]);
  
    useEffect(() => {
      getFlowableGroups.then((group) => {
        setGroups(group.data);
      });
    }, [setGroups]);
  
    const getOptions = () => {
      return [
        { label: '<none>', value: undefined },
        ...groups.map((group) => ({
          label: group.name,
          value: group.id,
        })),
      ];
    };
  
    return html` <${SelectEntry}
      id=${id}
      element=${element}
      description=${translate('Assign a candidate group')}
      label=${translate('Group')}
      getValue=${getValue}
      setValue=${setValue}
      getOptions=${getOptions}
      debounce=${debounce}
    />`;
  }