/**
 * 액션의 타입 정의 Action Type
 */
const SET_TOKEN = "user/SET_TOKEN";

/**
 * 액션 생성자 Action Creators
 */
export const setToken = token => ({ type: SET_TOKEN, token });

/**
 * 초기 상태 정의 Initial State
 */
const initialState = {
  token: null,
};

/**
 * 리듀서 Reducer
 */
export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}
