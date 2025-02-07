import spellProps from './parts/SpellProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function MagicPropertiesProvider(propertiesPanel, translate) {

  this.getGroups = function(element) {
    
    return function(groups) {

      if (is(element, 'bpmn:StartEvent')) {
        groups.push(createMagicGroup(element, translate));
      }

      return groups;
    };
  };
  
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

MagicPropertiesProvider.$inject = [ 'propertiesPanel', 'translate' ];

function createMagicGroup(element, translate) {

  const magicGroup = {
    id: 'magic',
    label: translate('Magic properties'),
    entries: spellProps(element),
    tooltip: translate('Make sure you know what you are doing!')
  };

  return magicGroup;
}