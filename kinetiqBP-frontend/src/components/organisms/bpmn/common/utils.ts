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
