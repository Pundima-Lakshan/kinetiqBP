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

export interface FlowableUser {
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

export const getFlowableUser = async (userId: string) => {
  return await get<FlowableUser>(`${flowable_rest_url}/identity/users/${userId}`);
};

export type FlowableUserInfoKey = 'emp_no' | 'faculty' | 'dep' | 'invalid';
export interface FlowableUserInfoListItem {
  key: FlowableUserInfoKey;
  url: string;
}

export const getFlowableUserInfoList = async (userId: string) => {
  return await get<Array<FlowableUserInfoListItem>>(`${flowable_rest_url}/identity/users/${userId}/info`);
};

interface FlowableUserInfo {
  key: FlowableUserInfoKey;
  value: string;
}

export const getFlowableUserInfo = async (userId: string, userInfoKey: FlowableUserInfoKey) => {
  return await get<FlowableUserInfo>(`${flowable_rest_url}/identity/users/${userId}/info/${userInfoKey}`);
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

export type FormSchemaType = 'textfield' | 'number' | 'checkbox' | 'textarea' | 'datetime' | 'image' | 'button' | 'select';

export type FormComponent = {
  label: string;
  type: FormSchemaType;
  layout: {
    row: string;
    columns: string | null;
  };
  id: string;
  readonly?: boolean;
  autoInitialize?: {
    predef?: AutoInitializedOptionsPreDef;
    custom?: string;
  };
  key: string;
  [p: string]: unknown;
};

export interface FormSchema {
  components: FormComponent[];
  id: string;
  schemaVersion: number;
  versionTag: string;
  type: 'default';
}

export interface FormDefinition {
  id: number;
  formId: string;
  description: string;
  version: string;
  createdBy: UiServiceUser;
  createdDate: Date;
  modifiedDate: Date;
  formSchema: FormSchema;
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

export type WorkflowDefinition = {
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
  return await get<GenericFlowableListResponse<WorkflowDefinition>>(`${flowable_rest_url}/repository/process-definitions`);
};

export const getWorkflowDefinitionXml = async (processDefinitionId: string) => {
  return await get<string>(`${flowable_rest_url}/repository/process-definitions/${processDefinitionId}/resourcedata`, {
    responseType: 'text',
  });
};

export const postWorkflowDefinition = async (bpmnXml: Blob) => {
  const workflowFormData = new FormData();
  workflowFormData.append('file', bpmnXml);
  return await postFormData<WorkflowDefinition>(`${flowable_rest_url}/repository/deployments`, workflowFormData);
};

interface PostStartWorkflowInstanceArg {
  processDefinitionId: string;
  startUserId: string;
}

export interface ProcessInstanceResponse {
  id: string;
  processDefinitionId: string;
  businessKey: string;
  suspended: boolean;
  ended: boolean;
  startTime: Date;
  startUserId: string;
}

export const postStartWorkflowInstance = async ({ processDefinitionId, startUserId }: PostStartWorkflowInstanceArg) => {
  return await post<ProcessInstanceResponse>(`${ui_service_url}/process-api/runtime/process-instances`, {
    processDefinitionId,
    startUserId,
  });
};

export type AutoInitializedOptionsPreDef =
  | 'initiator-fullname'
  | 'initiator-emp-no'
  | 'initiator-position'
  | 'initiator-faculty'
  | 'initiator-department'
  | 'assignee-fullname'
  | 'assignee-emp-no'
  | 'assignee-faculty'
  | 'assignee-department';

export type ExtensionAttribute = {
  name: string;
  value: string | AutoInitializedOptionsPreDef;
  namespacePrefix: string;
  namespace: string;
};

type ValuedDataObject = unknown;
type EventListener = unknown;
type FlowableListener = unknown;
type Lane = unknown;
type IOSpecification = unknown;
type FlowElementsContainer = unknown;
type ExtensionElement = unknown;

interface FlowElement {
  name: string;
  documentation: string;
  executionListeners: FlowableListener[];
  parentContainer: FlowElementsContainer;
  id: string;
  xmlRowNumber: number;
  xmlColumnNumber: number;
  extensionElements: Record<string, ExtensionElement[]>;
  attributes: Record<string, ExtensionAttribute[]>;
}

interface Process {
  name: string;
  executable: boolean;
  documentation: string;
  ioSpecification: IOSpecification;
  executionListeners: FlowableListener[];
  lanes: Lane[];
  flowElementList: FlowElement[];
  dataObjects: ValuedDataObject[];
  artifactList: Artifact[];
  candidateStarterUsers: string[];
  candidateStarterGroups: string[];
  eventListeners: EventListener[];
  flowElementMap: Record<string, FlowElement>;
  artifactMap: Record<string, Artifact>;
}

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

export type BpmnModel = {
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
  mainProcess: Process;
};

export const getWorkflowDefinitionModel = async (processDefinitionId: string) => {
  return await get<BpmnModel>(`${flowable_rest_url}/repository/process-definitions/${processDefinitionId}/model`);
};

export const removeWorkflowDefinition = async (deploymentId: string) => {
  return await remove<null>(`${flowable_rest_url}/repository/deployments/${deploymentId}`, { queries: [{ cascade: 'true' }], responseType: 'none' });
};

export type RestVariable = {
  name: string;
  type: 'string' | 'number' | 'boolean';
  value: string | number | boolean;
  scope?: string;
};

export interface WorkFlowInstance {
  id: string;
  url: string;
  name: string;
  businessKey: string;
  businessStatus: string;
  suspended: boolean;
  ended: boolean;
  processDefinitionId: string;
  processDefinitionUrl: string;
  processDefinitionName: string;
  processDefinitionDescription: string;
  activityId: string;
  startUserId: string;
  startTime: Date;
  superProcessInstanceId: string;
  variables: RestVariable[];
  callbackId: string;
  callbackType: string;
  referenceId: string;
  referenceType: string;
  propagatedStageInstanceId: string;
  tenantId: string;
}

export const getWorkflowInstances = async () => {
  return await get<GenericFlowableListResponse<WorkFlowInstance>>(`${flowable_rest_url}/runtime/process-instances`, {
    queries: [{ size: '500' }],
  });
};

export type HistoricWorkflowInstance = {
  id: string;
  url: string;
  name: string | null;
  businessKey: string | null;
  businessStatus: string | null;
  processDefinitionId: string;
  processDefinitionUrl: string;
  processDefinitionName: string;
  processDefinitionDescription: string | null;
  startTime: Date;
  endTime: Date | null;
  durationInMillis: number | null;
  startUserId: string;
  startActivityId: string;
  endActivityId: string | null;
  deleteReason: string | null;
  superProcessInstanceId: string | null;
  variables: RestVariable[];
  callbackId: string | null;
  callbackType: string | null;
  referenceId: string | null;
  referenceType: string | null;
  propagatedStageInstanceId: string | null;
  tenantId: string;
};

export const getWorkflowHistoricInstances = async () => {
  return await get<GenericFlowableListResponse<HistoricWorkflowInstance>>(`${flowable_rest_url}/history/historic-process-instances`, {
    queries: [{ size: '500' }, { includeProcessVariables: 'true' }],
  });
};

export const getUiServiceUsers = async () => {
  return await get<Array<UiServiceUser>>(`${ui_service_url}/users`);
};

export const removeProcessInstance = async (processInstanceId: string) => {
  return await remove(`${flowable_rest_url}/runtime/process-instances/${processInstanceId}`, {
    responseType: 'none',
  });
};

export const removeHistoricProcessInstance = async (historicProcessInstanceId: string) => {
  return await remove(`${flowable_rest_url}/history/historic-process-instances/${historicProcessInstanceId}`, {
    responseType: 'none',
  });
};

interface PutProcessInstanceVariablesArg {
  variables: Array<RestVariable>;
  processInstanceId: string;
}

export const putProcessInstanceVariables = async (arg: PutProcessInstanceVariablesArg) => {
  return await put(`${flowable_rest_url}/runtime/process-instances/${arg.processInstanceId}/variables`, arg.variables);
};

interface HistoricVariableProcessInstance {
  id: string;
  processInstanceId: string;
  processInstanceUrl: string;
  taskId: string | null;
  executionId: string;
  variable: RestVariable;
}

export const getHistoricProcessInstanceVariables = async (processInstanceId: string) => {
  return await get<GenericFlowableListResponse<HistoricVariableProcessInstance>>(`${flowable_rest_url}/history/historic-variable-instances`, {
    queries: [{ processInstanceId }],
  });
};

export const getProcessInstanceVariables = async (processInstanceId: string) => {
  return await get<Array<RestVariable>>(`${flowable_rest_url}/runtime/process-instances/${processInstanceId}/variables`);
};

export type ActivityType = 'startEvent' | 'endEvent' | 'userTask';

export interface ActivityInstance {
  id: string;
  activityId: string;
  activityName: string | null;
  activityType: ActivityType;
  processDefinitionId: string;
  processDefinitionUrl: string;
  processInstanceId: string;
  processInstanceUrl: string;
  executionId: string;
  taskId: string;
  calledProcessInstanceId: string | null;
  assignee: string | null;
  startTime: string;
  endTime: string | null;
  durationInMillis: number | null;
  tenantId: string;
}

interface GetHistoricActivityInstanceArg {
  processInstanceId: string;
}

export const getHistoricActivityInstance = async (arg: GetHistoricActivityInstanceArg) => {
  return await get<GenericFlowableListResponse<ActivityInstance>>(`${flowable_rest_url}/history/historic-activity-instances`, {
    queries: [{ processInstanceId: arg.processInstanceId }, { sort: 'endTime' }],
  });
};

type HistoricTaskInstance = {
  id: string;
  processDefinitionId: string;
  processDefinitionUrl: string;
  processInstanceId: string;
  processInstanceUrl: string;
  executionId: string;
  name: string | null;
  description: string | null;
  deleteReason: string | null;
  owner: string | null;
  assignee: string | null;
  startTime: string;
  endTime: string | null;
  durationInMillis: number | null;
  workTimeInMillis: number | null;
  claimTime: string | null;
  taskDefinitionKey: string;
  formKey: string | null;
  priority: number;
  dueDate: string | null;
  parentTaskId: string | null;
  url: string;
  variables: RestVariable[];
  scopeDefinitionId: string | null;
  scopeId: string | null;
  subScopeId: string | null;
  scopeType: string | null;
  propagatedStageInstanceId: string | null;
  tenantId: string;
  category: string | null;
};

export const getHistoricTaskInstance = async (taskId: string) => {
  return await get<GenericFlowableListResponse<HistoricTaskInstance>>(`${flowable_rest_url}/history/historic-task-instances`, {
    queries: [{ taskId }, { includeProcessVariables: 'true' }],
  });
};

interface PostTaskActionArg {
  taskId: string;
  action?: 'complete';
  variables?: RestVariable[];
}

export const postTaskAction = async ({ action = 'complete', taskId, variables }: PostTaskActionArg) => {
  return await post(
    `${flowable_rest_url}/runtime/tasks/${taskId}`,
    {
      action,
      variables,
    },
    {
      responseType: 'none',
    },
  );
};
