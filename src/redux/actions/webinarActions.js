import axios from "axios";

export const FETCH_WEBINARS_REQUEST = "FETCH_WEBINARS_REQUEST";
export const FETCH_WEBINARS_SUCCESS = "FETCH_WEBINARS_SUCCESS";
export const FETCH_WEBINARS_FAILURE = "FETCH_WEBINARS_FAILURE";

export const fetchWebinars =
  (page = 1, limit = 10, category) =>
  async (dispatch) => {
    dispatch({ type: FETCH_WEBINARS_REQUEST });
    try {
      const response = await axios.get("https://digiumkm-backend.vercel.app/webinar/page", {
        params: { page, limit, category },
      });
      dispatch({
        type: FETCH_WEBINARS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_WEBINARS_FAILURE,
        payload: error.message,
      });
    }
  };
