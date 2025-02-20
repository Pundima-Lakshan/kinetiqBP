import { getEnvs } from '@/env';
import { get, post, put } from './common';

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
