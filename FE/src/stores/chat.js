const SET_CHAT_ID = "chat/SET_CHAT_ID";
const SET_CHAT_TOGGLE = "chat/SET_CHAT_TOGGLE";

export const setChatId = id => ({ type: SET_CHAT_ID, id });
export const setChatToggle = toggle => ({ type: SET_CHAT_TOGGLE, toggle });

const initialState = {
  id: "",
  toggle: "off",
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case SET_CHAT_ID:
      return {
        ...state,
        id: action.id,
      };
    case SET_CHAT_TOGGLE:
      return {
        ...state,
        toggle: action.toggle,
      };
    default:
      return state;
  }
}
