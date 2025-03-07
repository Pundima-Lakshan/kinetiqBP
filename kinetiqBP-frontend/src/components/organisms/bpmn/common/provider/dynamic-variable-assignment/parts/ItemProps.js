import { TextFieldEntry } from '@bpmn-io/properties-panel';

import { useService } from 'bpmn-js-properties-panel';

export default function ItemProps(props) {
  const { item, element, idPrefix, updateItem } = props;

  const entries = [
    {
      id: idPrefix + '-name',
      component: Name,
      item,
      idPrefix,
      element,
      ...props,
    },
    {
      id: idPrefix + '-type',
      component: Type,
      item,
      idPrefix,
      element,
      ...props,
    },
  ];

  return entries;
}

function Name(props) {
  const { idPrefix, element, item, updateItem } = props;

  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    updateItem({
      key: item.key,
      property: 'name',
      value,
    });
  };

  const getValue = () => {
    return item.name;
  };

  return TextFieldEntry({
    element: item,
    id: idPrefix + '-name',
    label: translate('Name'),
    description: 'Name should be unique to this task. Should be one word without spaces',
    getValue,
    setValue,
    debounce,
  });
}

function Type(props) {
  const { idPrefix, element, item, updateItem } = props;

  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    updateItem({
      key: item.key,
      property: 'type',
      value,
    });
  };

  const getValue = () => {
    return item.type;
  };

  return TextFieldEntry({
    element: item,
    id: idPrefix + '-type',
    label: translate('Type'),
    getValue,
    setValue,
    debounce,
  });
}
