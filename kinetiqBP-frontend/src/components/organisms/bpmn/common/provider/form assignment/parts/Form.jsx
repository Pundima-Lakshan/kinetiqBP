import { html } from 'htm/preact';

import { SelectEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

import { useEffect, useState } from '@bpmn-io/properties-panel/preact/hooks';

import { getFormDefinitions } from '@/services';

export function Form(props) {
    const { element, id } = props;
  
    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');
  
    const getValue = () => {
      return element.businessObject.assignee || '';
    };
  
    const setValue = (value) => {
      return modeling.updateProperties(element, {
        form: value,
      });
    };
  
    const [forms, setForms] = useState([]);
  
    useEffect(() => {
      try {
        getFormDefinitions().then((forms) => {
          setForms(forms);
        });
      } catch(error)  {
        console.error(error)
      }
    }, [setForms]);
  
    const getOptions = () => {
      return [
        { label: '<none>', value: undefined },
        ...forms.map((form) => ({
          label: form.formId,
          value: form.id,
        })),
      ];
    };
  
    return html` <${SelectEntry}
      id=${id}
      element=${element}
      description=${translate('Assign a form')}
      label=${translate('Form')}
      getValue=${getValue}
      setValue=${setValue}
      getOptions=${getOptions}
      debounce=${debounce}
    />`;
  }