import { createAction, handleActions } from 'redux-actions';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

//redux-actions 라이브러리를 사용하여 더욱 쉽게 액션생성함수를 작성할 수 있다.
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
  number: 0,
};

// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         ...state,
//         number: state.number + 1,
//       };
//     case DECREASE:
//       return {
//         ...state,
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// }

const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);
export default counter;
