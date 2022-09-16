import axios from "axios";
import {
  ADD_PLAYER,
  CLEAR_CURRENT,
  PLAYER_ERROR,
  DELETE_PLAYER,
  GET_PLAYERS,
  SET_CURRENT,
  UPDATE_PLAYER,
} from "./types";

// Get player
export const getPlayers = () => async (dispatch) => {
  if (localStorage.token) {
    var config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
  }

  try {
    const res = await axios.get("/api/players", config);
    dispatch({ type: GET_PLAYERS, payload: res.data });
  } catch (err) {
    dispatch({ type: PLAYER_ERROR, payload: err.response.data });
  }
};

// Add player
export const addPlayer = (player) => async (dispatch) => {
  if (localStorage.token) {
    var config = {
      headers: {
        "x-auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
    };
  }

  try {
    const res = await axios.post("/api/players", player, config);
    dispatch({ type: ADD_PLAYER, payload: res.data });
  } catch (err) {
    dispatch({ type: PLAYER_ERROR, payload: err.response.data });
  }
};

// Delete Player
export const deletePlayer = (id) => async (dispatch) => {
  if (localStorage.token) {
    var config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
  }

  try {
    await axios.delete(`/api/players/${id}`, config);
    dispatch({ type: DELETE_PLAYER, payload: id });
  } catch (err) {
    dispatch({ type: PLAYER_ERROR, payload: err.response.data });
  }
};

// Set Current Player
export const setCurrent = (player) => ({
  type: SET_CURRENT,
  payload: player,
});

// Clear Current Player
export const clearCurrent = () => ({ type: CLEAR_CURRENT });

// Update Player
export const updatePlayer = (player) => async (dispatch) => {
  console.log(player);
  if (localStorage.token) {
    var config = {
      headers: {
        "x-auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
    };
  }

  try {
    const res = await axios.put(`/api/players/${player._id}`, player, config);

    dispatch({ type: UPDATE_PLAYER, payload: res.data });
  } catch (err) {
    dispatch({ type: PLAYER_ERROR, payload: err.response.data });
  }
};
