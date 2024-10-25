import axios from "axios";

export function fetching() {
  return {
    type: "FETCH",
  };
}

export function success(data) {
  return {
    type: "SUCCESS",
    payload: data,
  };
}

export function addComment(id, comment, token) {
  return async function (dispatch) {
    dispatch(fetching());
    try {
      await axios.post(
        `https://digiumkm-backend.vercel.app/${id}/comments`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getWebinarById(id));
      // Jika berhasil menambahkan komentar, tidak perlu merubah state karena pengambilan data tidak berubah
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };
}

export function getWebinarById(id) {
  return async function (dispatch) {
    dispatch(fetching());
    try {
      const { data } = await axios(`https://digiumkm-backend.vercel.app/webinar/${id}`);
      dispatch(success(data));
    } catch (error) {
      console.error("Failed to fetch webinar by ID:", error);
    }
  };
}

export function addRating(id, rating, token) {
  return async function (dispatch) {
    dispatch(fetching());
    try {
      await axios.post(
        `https://digiumkm-backend.vercel.app/${id}/ratings`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getWebinarById(id));
    } catch (error) {
      console.error("Failed to add rating:", error);
    }
  };
}
