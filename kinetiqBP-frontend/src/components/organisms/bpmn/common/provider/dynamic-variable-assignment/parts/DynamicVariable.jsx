import { html } from 'htm/preact';

import { ListEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

import { useEffect, useState } from '@bpmn-io/properties-panel/preact/hooks';

import { DynamicVariableItem } from './DynamicVariableItem';

export function DynamicVariable(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');

  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(getParsedItems(element.businessObject.dynamicVariable));
  }, [element]);

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        key: prev.length + 1,
      },
    ]);
  }

  function removeItem(item) {
    const updatedItems = items.filter((d) => {
      return d.key != item.key;
    });
    setItems(updatedItems);
    modeling.updateProperties(element, {
      dynamicVariable: stringifyItems(updatedItems),
    });
  }

  function updateItem(update) {
    const { key, value, property } = update;
    const updateItemIndex = items.findIndex((d) => d.key === key);
    if (updateItemIndex === -1) {
      console.error(`Item of key ${key} is not found`);
      return;
    }
    items[updateItemIndex][property] = value;
    setItems(items);
    modeling.updateProperties(element, {
      dynamicVariable: stringifyItems(items),
    });
  }

  return html`<${ListEntry}
    id=${id}
    element=${element}
    description=${translate('Assign a condition')}
    label=${translate('Add dynamic variable')}
    onAdd=${addItem}
    onRemove=${removeItem}
    items=${items}
    component=${DynamicVariableItem}
    updateItem=${updateItem}
  />`;
}

const getParsedItems = (string_value) => {
  if (string_value == null) return [];
  return JSON.parse(string_value);
};

const stringifyItems = (items) => {
  return JSON.stringify(
    items.filter((item) => {
      return item.name != null && item.type != null;
    }),
  );
};
