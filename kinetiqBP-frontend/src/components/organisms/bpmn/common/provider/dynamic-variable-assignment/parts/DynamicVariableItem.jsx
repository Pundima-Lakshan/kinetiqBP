import { html } from 'htm/preact';

import { CollapsibleEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import ItemProps from './ItemProps';

export function DynamicVariableItem(props) {
  const { element, id: idPrefix, index, item, open, updateItem } = props;

  const translate = useService('translate');

  const id = `${idPrefix}-item-${index}`;

  return html` <${CollapsibleEntry}
    id=${id}
    element=${element}
    entries=${ItemProps({
      item,
      element,
      idPrefix: id,
      updateItem,
    })}
    label=${item.key || translate('<empty>')}
    open=${open}
  />`;
}
