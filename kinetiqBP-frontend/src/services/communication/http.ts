import { getEnvs } from '@/env';
import { get, post, postFormData, put, remove } from './common';

const flowable_rest_url = getEnvs().VITE_FLOWABLE_REST_URL;
const ui_service_url = getEnvs().VITE_UI_SERVICE_URL;

interface GenericFlowableListResponse<T> {
  data: T[];
  total: number;
  start: number;
  sort: string;
  order: string;
  size: number;
}

interface FlowableUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  url: string;
  email: string;
  pictureUrl: string | null;
}

export const getFlowableUsers = async () => {
  return await get<GenericFlowableListResponse<FlowableUser>>(`${flowable_rest_url}/identity/users`);
};

interface FlowableGroup {
  id: string;
  name: string;
  type: string;
  url: string;
}

export const getFlowableGroups = async () => {
  return await get<GenericFlowableListResponse<FlowableGroup>>(`${flowable_rest_url}/identity/groups`);
};

export interface UiServiceUser {
  id: string;
  username: string;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
}

export interface FormDefinition {
  id: number;
  formId: string;
  description: string;
  version: string;
  createdBy: UiServiceUser;
  createdDate: Date;
  modifiedDate: Date;
  formSchema: Record<string, unknown>;
}

export const getFormDefinitions = async () => {
  return await get<Array<FormDefinition>>(`${ui_service_url}/form-definitions`);
};

export const getFormDefinition = async (id: number) => {
  return await get<FormDefinition>(`${ui_service_url}/form-definitions/${id}`);
};

type PostFormDefinitionArg = Omit<FormDefinition, 'id' | 'createdBy'> & {
  createdBy: string;
};

export const postFormDefinition = async (args: PostFormDefinitionArg) => {
  return await post<FormDefinition>(`${ui_service_url}/form-definitions`, args);
};

export const putFormDefinition = async (args: FormDefinition) => {
  return await put<FormDefinition>(`${ui_service_url}/form-definitions/${args.id}`, args);
};

export const removeFormDefinition = async (id: number) => {
  return await remove<null>(`${ui_service_url}/form-definitions/${id}`, { responseType: 'none' });
};

export type WorkFlowDefinition = {
  id: string;
  url: string;
  key: string;
  version: number;
  name: string;
  description: string | null;
  tenantId: string;
  deploymentId: string;
  deploymentUrl: string;
  resource: string;
  diagramResource: string;
  category: string;
  graphicalNotationDefined: boolean;
  suspended: boolean;
  startFormDefined: boolean;
};

export const getWorkflowDefinitions = async () => {
  return await get<GenericFlowableListResponse<WorkFlowDefinition>>(`${flowable_rest_url}/repository/process-definitions`);
};

export const getWorkflowDefinitionResourceData = async (processDefinitionId: string) => {
  return await get<string>(`${flowable_rest_url}/repository/process-definitions/${processDefinitionId}/resourcedata`, {
    responseType: 'text',
  });
};

export const postWorkflowDefinition = async (bpmnXml: Blob) => {
  const workFlowFormData = new FormData();
  workFlowFormData.append('file', bpmnXml);
  return await postFormData<WorkFlowDefinition>(`${flowable_rest_url}/repository/deployments`, workFlowFormData);
};

interface PostStartWorkflowInstanceArg {
  processDefinitionId: string;
  variables: Array<Record<string, unknown>>;
}

export const postStartWorkflowInstance = async ({ processDefinitionId, variables }: PostStartWorkflowInstanceArg) => {
  return await post(`${flowable_rest_url}/runtime/process-instances`, {
    processDefinitionId,
    variables,
  });
};

type ExtensionAttribute = {
  name: string;
  value: string;
  namespacePrefix: string;
  namespace: string;
};

type Process = unknown;

type GraphicInfo = unknown;

type Signal = unknown;

type BpmnDiEdge = unknown;

type MessageFlow = unknown;

type Message = unknown;

type Escalation = unknown;

type ItemDefinition = unknown;

type DataStore = unknown;

type Pool = unknown;

type Import = unknown;

type Interface = unknown;

type Artifact = unknown;

type Resource = unknown;

type BpmnModel = {
  definitionsAttributes: Record<string, ExtensionAttribute[]>;
  processes: Process[];
  locationMap: Record<string, GraphicInfo>;
  labelLocationMap: Record<string, GraphicInfo>;
  flowLocationMap: Record<string, GraphicInfo[]>;
  edgeMap: Record<string, BpmnDiEdge>;
  signals: Signal[];
  messageFlowMap: Record<string, MessageFlow>;
  messageMap: Record<string, Message>;
  variableListenerToActivityMap: Record<string, string[]>;
  errorMap: Record<string, string>;
  escalationMap: Record<string, Escalation>;
  itemDefinitionMap: Record<string, ItemDefinition>;
  dataStoreMap: Record<string, DataStore>;
  pools: Pool[];
  imports: Import[];
  interfaces: Interface[];
  globalArtifacts: Artifact[];
  resources: Resource[];
  namespaceMap: Record<string, string>;
  targetNamespace?: string;
  sourceSystemId?: string;
  userTaskFormTypes?: string[];
  startEventFormTypes?: string[];
  eventSupport?: any;
  exporter?: string;
  exporterVersion?: string;
};

export const getWorkFlowDefinitionModel = async (processDefinitionId: string) => {
  return await get<BpmnModel>(`${flowable_rest_url}/repository/process-definitions/${processDefinitionId}/model`);
};

export const removeWorkFlowDefinition = async (deploymentId: string) => {
  return await remove<null>(`${flowable_rest_url}/repository/deployments/${deploymentId}`, { queries: [{ cascade: 'true' }], responseType: 'none' });
};
