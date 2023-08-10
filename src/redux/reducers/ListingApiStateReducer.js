import apiAction from '../../api/apiAction';
import { AboutAPI, ContactAPI, GetAnnouncementAPI, GetBooksAPI, GetCategoriesAPI, GetEventsAPI, GetHomeBannerAPI, GetNotificationsAPI, GetOurSpeakerAPI, GetOurStaffAPI, GetPostByCategoryIdAPI, GetPostsAPI, GetQuestionsAPI, GetRequestedPrayerAPI, GetSermonsAPI, GetUpcomingEventsAPI, RequestPrayerAPI, SendAskAQuestionAPI, } from '../../api/routes';
import { ABOUT_API_SUCCESS, CONTACT_API_ERROR, CONTACT_API_SUCCESS, GET_ANNOUNCEMENT_API_SUCCESS, GET_ASK_A_QUESTION, GET_BOOKS_API_SUCCESS, GET_EVENTS_API_SUCCESS, GET_NOTIFICATIONS_API_SUCCESS, GET_OUR_SPEAKER_API_SUCCESS, GET_OUR_STAFF_API_SUCCESS, GET_POSTS_API_SUCCESS, GET_POST_BY_CATEGORY_ID_SUCCESS, GET_REQUESTED_PRAYER_API_SUCCESS, GET_SERMONS_API_SUCCESS, GET_UPCOMING_EVENTS_API_SUCCESS, HOME_BANNER_API_SUCCESS, LOGOUT_USER, REQUEST_PRAYER_API_SUCCESS, SEND_ASK_A_QUESTION, SET_DRAWER_MENU, SET_ERROR, } from '../actiontypes';

const initialState = {
  getQuestionsResponse: {},
  sendAskAQuestionsResponse: {},
  getPostsListResponse: {},
  getEventsListResponse: {},
  getUpcomingEventsListResponse: {},
  getOurStaffListResponse: {},
  getOurSpeakersListResponse: {},
  getRequestedPrayersListResponse: {},
  getNotificationsListResponse: {},
  getAnnouncementResponse: {},
  getBooksListResponse: {},
  getHomeBannerResponse: {},
  requestPrayerResponse: {},
  contactResponse: {},
  contactErrorResponse: {},
  aboutResponse: {},
  getPostByCategoryIdResponse: {},
  errorResponse: {},
  drawerMenu: []
};

export function GetSermonsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetSermonsAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_SERMONS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetPostsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetPostsAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_POSTS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetAnnouncementList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetAnnouncementAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_ANNOUNCEMENT_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetEventsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetEventsAPI + '?page=' + params.pageno + '&limit=' + params.limit + '&is_upcoming_event=false',
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_EVENTS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetUpcomingEventsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetUpcomingEventsAPI + '?page=' + params.pageno + '&limit=' + params.limit + '&is_upcoming_event=true',
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_UPCOMING_EVENTS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetOurStaffList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetOurStaffAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_OUR_STAFF_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetOurSpeakerList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetOurSpeakerAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_OUR_SPEAKER_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetBooksList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetBooksAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_BOOKS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetRequestedPrayersList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetRequestedPrayerAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_REQUESTED_PRAYER_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetNotificationsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url:
      GetNotificationsAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_NOTIFICATIONS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function RequestPrayerApiCall(params) {
  // console.log('params => ', params);
  return apiAction({
    url: RequestPrayerAPI,
    method: 'POST',
    data: params,
    onSuccess: response => {
      return { type: REQUEST_PRAYER_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function ContactApiCall(params) {
  // console.log('params => ', params);
  return apiAction({
    url: ContactAPI,
    method: 'POST',
    data: params,
    onSuccess: response => {
      return { type: CONTACT_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: CONTACT_API_ERROR, payload: response };
    },
  });
}

export function AboutApiCall() {
  // console.log('params => ', params);
  return apiAction({
    url: AboutAPI,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: ABOUT_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetHomeBanner() {
  // console.log('params => ', params);
  return apiAction({
    url: GetHomeBannerAPI,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: HOME_BANNER_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetQuestions() {
  // console.log('params => ', params);
  return apiAction({
    url: GetQuestionsAPI,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_ASK_A_QUESTION, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetDrawerMenu() {
  return apiAction({
    url: GetCategoriesAPI,
    method: 'GET',
    onSuccess: response => {
      return { type: SET_DRAWER_MENU, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function SendAskAQuestion(params) {
  // console.log('params => ', params);
  return apiAction({
    url: SendAskAQuestionAPI,
    method: 'POST',
    data: params,
    onSuccess: response => {
      return { type: SEND_ASK_A_QUESTION, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}


export function GetPostByCategoryId(params) {
  return apiAction({
    url: GetPostByCategoryIdAPI + '?category_id=' + params.id,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_POST_BY_CATEGORY_ID_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

const ListingApiStateReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ASK_A_QUESTION:
      return Object.assign({}, state, {
        getQuestionsResponse: action.payload,
      });
    case SEND_ASK_A_QUESTION:
      return Object.assign({}, state, {
        sendAskAQuestionsResponse: action.payload,
      });
    case GET_POSTS_API_SUCCESS:
      return Object.assign({}, state, {
        getPostsListResponse: action.payload,
      });
    case GET_NOTIFICATIONS_API_SUCCESS:
      return Object.assign({}, state, {
        getNotificationsListResponse: action.payload,
      });
    case CONTACT_API_SUCCESS:
      return Object.assign({}, state, {
        contactResponse: action.payload,
      });
    case CONTACT_API_ERROR:
      return Object.assign({}, state, {
        contactErrorResponse: action.payload,
      });
    case HOME_BANNER_API_SUCCESS:
      return Object.assign({}, state, {
        getHomeBannerResponse: action.payload,
      });
    case GET_POST_BY_CATEGORY_ID_SUCCESS:
      return Object.assign({}, state, {
        getPostByCategoryIdResponse: action.payload,
      });
    case SET_DRAWER_MENU:
      return Object.assign({}, state, {
        drawerMenu: action.payload,
      });
    case SET_ERROR:
      return Object.assign({}, state, {
        errorResponse: action.payload,
      });
    case LOGOUT_USER:
      return initialState
    default:
      return state;
  }
};

export default ListingApiStateReducer;