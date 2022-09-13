import { DARK, LIGHT, TOGGLE } from "../actions/types";

const initialState = {
  isDarkMode: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };

    case DARK:
      return {
        ...state,
        isDarkMode: true,
      };

    case LIGHT:
      return {
        ...state,
        isDarkMode: false,
      };

    default:
      return state;
  }
};
