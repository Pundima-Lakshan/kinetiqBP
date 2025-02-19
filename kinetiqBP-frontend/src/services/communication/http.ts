import { getEnvs } from '@/env';
import { get } from './common';

interface GenericFlowableListResponse<T> {
  data: T[];
  total: number;
  start: number;
  sort: string;
  order: string;
  size: number;
}

interface GenericUiServiceListResponse<T> {
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

export const fetchFlowableUsers = async () => {
  return await get<GenericFlowableListResponse<FlowableUser>>(`${getEnvs().VITE_FLOWABLE_REST_URL}/identity/users`);
};

interface FlowableGroup {
  id: string;
  name: string;
  type: string;
  url: string;
}

export const fetchFlowableGroups = async () => {
  return await get<GenericFlowableListResponse<FlowableGroup>>(`${getEnvs().VITE_FLOWABLE_REST_URL}/identity/groups`);
};

interface FlowableForm {
  id: string;
  name: string;
  key: string;
  version: number;
  url: string;
}

export const fetchFormDefinitions = async () => {
  return await get<GenericUiServiceListResponse<any>>(`${getEnvs().VITE_FLOWABLE_REST_URL}/form-repository/form-definitions`);
};
