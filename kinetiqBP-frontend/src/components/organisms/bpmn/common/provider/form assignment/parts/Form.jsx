import { html } from 'htm/preact';

import { SelectEntry, EventContext } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

import { useEffect, useState, useRef } from '@bpmn-io/properties-panel/preact/hooks';

import { getFormDefinitions } from '@/services';

import './styles.css';

export function Form(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');
  const eventBus = useService('eventBus');

  const localSelectValueRef = useRef('');
  const [forms, setForms] = useState([]);

  const getValue = () => {
    return element.businessObject.form || '';
  };

  const setValue = (value) => {
    localSelectValueRef.current = value;
    return modeling.updateProperties(element, {
      form: value,
    });
  };

  useEffect(() => {
    try {
      getFormDefinitions().then((forms) => {
        setForms(forms);
      });
    } catch (error) {
      console.error(error);
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

  const handleViewForm = () => {
    eventBus.fire('fileViewer.open', { formId: localSelectValueRef.current });
  };

  return html`<div>
    <${SelectEntry}
      id=${id}
      element=${element}
      description=${translate('Assign a form')}
      label=${translate('Form')}
      getValue=${getValue}
      setValue=${setValue}
      getOptions=${getOptions}
      debounce=${debounce}
    />
    <p class="custom-form-select-field bio-properties-panel-description" onClick=${handleViewForm}>View selected form</p>
  </div> `;
}
