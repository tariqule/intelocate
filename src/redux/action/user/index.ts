import {GET_TOKEN, GET_ORG_ID, EXTERNAL_USERS} from './types';
export const token = (responseData: any) => ({
  type: GET_TOKEN,
  payload: responseData,
});

export const userOrgId = (responseData: any) => ({
  type: GET_ORG_ID,
  payload: responseData,
});

export const setExternalUsers = (responseData: any) => ({
  type: EXTERNAL_USERS,
  payload: responseData,
});
