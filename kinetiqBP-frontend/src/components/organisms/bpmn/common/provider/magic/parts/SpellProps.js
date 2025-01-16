import { html } from 'htm/preact';

import { isSelectEntryEdited, SelectEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

// import hooks from the vendored preact package
import { useEffect, useState } from '@bpmn-io/properties-panel/preact/hooks';

export default function (element) {
  return [
    {
      id: 'spell',
      element,
      component: Spell,
      isEdited: isSelectEntryEdited,
    },
  ];
}

function Spell(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.spell || '';
  };

  const setValue = (value) => {
    return modeling.updateProperties(element, {
      spell: value,
    });
  };

  const [spells, setSpells] = useState([]);

  useEffect(() => {
    function fetchSpells() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('fetching spells');
          resolve(['Fireball', 'Magic Missile', 'Lightning Bolt', 'Invisibility']);
        }, 2000);
      }).then((spells) => {
        setSpells(spells);
      });
    }

    void fetchSpells();
  }, [setSpells]);

  const getOptions = () => {
    return [
      { label: '<none>', value: undefined },
      ...spells.map((spell) => ({
        label: spell,
        value: spell,
      })),
    ];
  };

  return html` <${SelectEntry}
    id=${id}
    element=${element}
    description=${translate('Apply a black magic spell')}
    label=${translate('Spell')}
    getValue=${getValue}
    setValue=${setValue}
    getOptions=${getOptions}
    debounce=${debounce}
  />`;
}
