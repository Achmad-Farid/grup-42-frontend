const initialState = {
  data: null,
  loading: false,
  error: null,
};

function detailReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
}

export default detailReducer;
