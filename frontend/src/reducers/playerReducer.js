import {
  ADD_PLAYER,
  CLEAR_CURRENT,
  PLAYER_ERROR,
  DELETE_PLAYER,
  GET_PLAYERS,
  SET_CURRENT,
  UPDATE_PLAYER,
} from "../actions/types";

const initialState = {
  players: [],
  current: null,
};

const playerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLAYERS:
      return {
        ...state,
        players: payload,
        loading: false,
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, payload],
        loading: false,
      };

    case UPDATE_PLAYER:
      return {
        ...state,
        players: state.players.map((player) =>
          player._id === payload._id ? payload : player
        ),
        loading: false,
      };

    case DELETE_PLAYER:
      return {
        ...state,
        players: state.players.filter((player) => player._id !== payload),
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case PLAYER_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
