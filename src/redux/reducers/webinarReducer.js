import { FETCH_WEBINARS_REQUEST, FETCH_WEBINARS_SUCCESS, FETCH_WEBINARS_FAILURE } from "../actions/webinarActions";

const initialState = {
  loading: false,
  webinars: [],
  error: "",
  totalPages: 1,
  currentPage: 1,
};

const webinarReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEBINARS_REQUEST:
      return { ...state, loading: true };
    case FETCH_WEBINARS_SUCCESS:
      return {
        loading: false,
        webinars: action.payload.webinars,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        error: "",
      };
    case FETCH_WEBINARS_FAILURE:
      return { loading: false, webinars: [], error: action.payload };
    default:
      return state;
  }
};

export default webinarReducer;
