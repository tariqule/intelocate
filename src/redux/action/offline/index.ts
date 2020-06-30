// import {Queue} from './../../../offline-queue/queue';
import {
  queueStorage,
  retrieveQueueStorage,
} from './../../../services/local-storage/index';
import Axios from 'axios';
import {
  checkInternetConnection,
  offlineActionCreators,
} from 'react-native-offline';

export const CREATE_ACTION = 'CREATE_ACTION';
export const CREATE_ACTION_OFFLINE_QUEUE = 'CREATE_ACTION_OFFLINE_QUEUE';
export const CLEAR_OFFLINE_QUEUE = 'CLEAR_OFFLINE_QUEUE';
export const ACTION_SUBMIT_RESPONSE = 'ACTION_SUBMIT_RESPONSE';
export const OFFLINE_ACTION_LIST = 'OFFLINE_ACTION_LIST';
export const OFFLINE_CATEGORY_LIST = 'OFFLINE_CATEGORY_LIST';
export const OFFLINE_SUB_CATEGORY_LIST = 'OFFLINE_SUB_CATEGORY_LIST';

export const OFFLINE_ORGANIZATION_LIST = 'OFFLINE_ORGANIZATION_LIST';
export const OFFLINE_ORGANIZATION_LOCATION = 'OFFLINE_ORGANIZATION_LOCATION';
export const OFFLINE_EXTERNAL_USER_LOCATION = 'OFFLINE_EXTERNAL_USER_LOCATION';
export const OFFLINE_ORGANIZATION = 'OFFLINE_ORGANIZATION';

type ActionToBeQueued = {
  type: string;
  payload?: any;
  meta: {
    retry?: boolean; // By passing true, your action will be enqueued on offline mode
    dismiss?: Array<string>; // Array of actions which, once dispatched, will trigger a dismissal from the queue
  };
};

export const clear_queue = () => ({
  type: CLEAR_OFFLINE_QUEUE,
});
export const report_issue = (issueResponse: any) => ({
  type: CREATE_ACTION_OFFLINE_QUEUE,
  payload: issueResponse,
  meta: {
    retry: true,
  },
});
export const issue_submit_response = (responseData: any) => ({
  type: ACTION_SUBMIT_RESPONSE,
  payload: responseData,
});

export const offline_action_list = (actionData: any) => ({
  type: OFFLINE_ACTION_LIST,
  payload: actionData,
});
export const offline_category_list = (actionData: any) => ({
  type: OFFLINE_CATEGORY_LIST,
  payload: actionData,
});

export const offline_sub_category_list = (actionData: any) => ({
  type: OFFLINE_SUB_CATEGORY_LIST,
  payload: actionData,
});
export const offline_organization_list = (actionData: any) => ({
  type: OFFLINE_ORGANIZATION_LIST,
  payload: actionData,
});
export const offline_organizaton_location_list = (actionData: any) => ({
  type: OFFLINE_ORGANIZATION_LOCATION,
  payload: actionData,
});
export const offline_external_user_list = (actionData: any) => ({
  type: OFFLINE_EXTERNAL_USER_LOCATION,
  payload: actionData,
});
export const offline_organizations = (actionData: any) => ({
  type: OFFLINE_ORGANIZATION,
  payload: actionData,
});

export const report_issue_fn = (useOrganizationID: string, params?: any) => {
  function thunk(dispatch, getState) {
    console.log(
      JSON.stringify(params) +
        '===> sending report [redux] [offline] sending...',
    );
    const {connectionChange} = offlineActionCreators;

    //   dispatch(otpAction.loading());

    checkInternetConnection(
      'https://spinmetry.intelocate.com/',
      20000,
      true,
    ).then((isConnected) => {
      console.log(isConnected + '[redux] [thunk]');
      dispatch(connectionChange(isConnected));
      isConnected
        ? Axios.post(
            `https://mobile.intelocate.com/api/tasks/${useOrganizationID}`,
            params,
          )
            .then((res) => {
              console.log(
                JSON.stringify(res) +
                  ' ===> response received [redux] [offline] submitted.',
              );

              dispatch(clear_queue());
              dispatch(issue_submit_response(res.data));
              queueStorage({});
            })
            .catch((err) => {
              queueStorage({});
              dispatch(clear_queue());
              console.log(err + ' [ERROR in offline action] [REDUX]');
              // dispatch(otpAction.otpRequestFailure());
            })
        : retrieveQueueStorage()
            .then((queuedTask) => {
              // let allUserInfo = {
              //   tasks: [...queuedTask.tasks, ...params.tasks],
              // };
              // let allUserInfo = {...queuedTask, ...params};
              let allUserInfo =
                queuedTask.tasks !== undefined
                  ? queuedTask.tasks.push(params.tasks)
                  : params;

              queuedTask.tasks !== undefined
                ? console.warn(
                    JSON.stringify(queuedTask) +
                      'all offline data [Redux] [offline]',
                  )
                : console.warn(
                    JSON.stringify(allUserInfo) +
                      'all offline data [Redux] [offline]',
                  );

              if (queuedTask.tasks !== undefined) {
                queueStorage(queuedTask);
                dispatch(report_issue(queuedTask));
              } else {
                queueStorage(allUserInfo);
                dispatch(report_issue(allUserInfo));
              }
              // queueStorage(allUserInfo);
              // dispatch(report_issue(allUserInfo));
            })
            .catch((err) => {
              console.warn(err);
            });
    });
  }
  thunk.interceptInOffline = true;

  // Add these
  thunk.meta = {
    retry: true,
    name: 'report_issue_fn', // This should be the name of your function
    args: [useOrganizationID, params], // These are the arguments for the function. Add more as needed.
  };
  return thunk;
};
