import type { Colors } from 'bpmn-js/lib/util/Types';
import BpmnModdle from 'bpmn-moddle';

type BpmnElementType = 'bpmn:StartEvent';

interface Reference {
  element: {
    $type: BpmnElementType;
    id: string;
  };
}

export class BpmnToXml {
  private moddle = new BpmnModdle();

  BpmnToXml() {}

  public getBpmnElementId = async (xmlText: string, type: BpmnElementType) => {
    const bpmnDefinition = await this.moddle.fromXML(xmlText);
    if ('references' in bpmnDefinition && bpmnDefinition.references instanceof Array) {
      for (let i = 0; i < bpmnDefinition.references.length; i++) {
        const reference = bpmnDefinition.references[i] as unknown as Reference;
        if (reference.element.$type === type) {
          return reference.element.id;
        }
      }
    }
  };
}

export type BpmnElementColorState = 'success' | 'error' | 'info' | 'warning';

export const getColors = (colorState?: BpmnElementColorState): Colors => {
  switch (colorState) {
    case 'success':
      return {
        fill: '#a3d9a5',
        stroke: '#28a745',
      };
    case 'error':
      return {
        fill: '#f5b5b5',
        stroke: '#dc3545',
      };
    case 'info':
      return {
        fill: '#b3dcef',
        stroke: '#17a2b8',
      };
    case 'warning':
      return {
        fill: '#f9e3a1',
        stroke: '#ffc107',
      };
    default:
      return {
        fill: '#d6d6d6',
        stroke: '#6c757d',
      };
  }
};
