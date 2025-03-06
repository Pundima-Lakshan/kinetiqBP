import { html } from 'htm/preact';

import { TextFieldEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import { useRef } from '@bpmn-io/properties-panel/preact/hooks';

export function Condition(props) {
  const { element, id } = props;

  const translate = useService('translate');
  const debounce = useService('debounceInput');
  const moddle = useService('moddle');

  const localSelectValueRef = useRef('');

  const getValue = () => {
    return getValueFromExpression(element.businessObject.conditionExpression?.body ?? '');
  };

  const setValue = (value) => {
    localSelectValueRef.current = value;

    var bo = getBusinessObject(element),
      updates = [],
      conditionExpression = bo.get('conditionExpression');

    if (!conditionExpression) {
      conditionExpression = moddle.create('bpmn:Expression', { body: getExpressionFromValue(value),  });
      conditionExpression['$parent'] = bo
      bo.set('conditionExpression', conditionExpression)
    } else {
      conditionExpression.set('body', getExpressionFromValue(value))
    }

    return updates
  };

  return html`<${TextFieldEntry}
    id=${id}
    element=${element}
    description=${translate('Assign a condition')}
    label=${translate('Condition')}
    getValue=${getValue}
    setValue=${setValue}
    debounce=${debounce}
  />`;
}

const getValueFromExpression = (expression) => {
  if (!expression) return "";
  const match = expression.match(/\$\{(.*?)\}/s);
  return match ? match[1].trim() : expression.trim();
};

const getExpressionFromValue = (value) => {
  return `\$\{${value}}`;
};