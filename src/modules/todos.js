import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

//#region ############### 액션함수생성 코드 ###############
// export const changeInput = (input) => ({
//   type: CHANGE_INPUT,
//   input,
// });

// let id = 3;
// export const insert = (text) => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false,
//   },
// });
// export const toggle = (id) => ({
//   type: TOGGLE,
//   id,
// });

// export const remove = (id) => ({
//   type: REMOVE,
//   id,
// });
//#endregion

//#region ############# redux-actions 을 이용한 createAction함수를 이용하여 액션함수생성 ###############
export const changeInput = createAction(CHANGE_INPUT, (input) => input);

let id = 3;
export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

export const toggle = createAction(TOGGLE, (id) => id);

export const remove = createAction(REMOVE, (id) => id);
//#endregion

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    { id: 2, text: '리액트와 리덕스 사용하기', done: false },
  ],
};

//#region ############# 기본 reducer 생성 ###############
// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input,
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo),
//       };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo,
//         ),
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }
//#endregion

//#region ############# redux-actions 을 이용한 handleActions함수를 이용하여 리듀서 함수 생성 ###############
// const todos = handleActions(
//   {
//     [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
//     [INSERT]: (state, { payload: todo }) => ({
//       ...state,
//       todos: state.todos.concat(todo),
//     }),
//     [TOGGLE]: (state, { payload: id }) => ({
//       ...state,
//       todos: state.todos.map((todo) =>
//         todo.id === id ? { ...todo, done: !todo.done } : todo,
//       ),
//     }),
//     [REMOVE]: (state, { payload: id }) => ({
//       ...state,
//       todos: state.todos.filter((todo) => todo.id !== id),
//     }),
//   },
//   initialState,
// );
//#endregion

//#region ############# handleActions에 immer를 사용하여 불변성 지키는 작업 ###############
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, (draft) => {
        draft.todos = state.todos.concat(todo);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        draft.todos.map((todo) =>
          todo.id === id ? (todo.done = !todo.done) : todo,
        );
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState,
);
//#endregion

// ################ 예제 코드 #################
// const todos = handleActions(
//   {
//     [CHANGE_INPUT]: (state, { payload: input }) =>
//       produce(state, (draft) => {
//         draft.input = input;
//       }),
//     [INSERT]: (state, { payload: todo }) =>
//       produce(state, (draft) => {
//         draft.todos.push(todo);
//       }),
//     [TOGGLE]: (state, { payload: id }) =>
//       produce(state, (draft) => {
//         const todo = draft.todos.find((todo) => todo.id === id);
//         todo.done = !todo.done;
//       }),
//     [REMOVE]: (state, { payload: id }) =>
//       produce(state, (draft) => {
//         const index = draft.todos.findIndex((todo) => todo.id === id);
//         draft.todos.splice(index, 1);
//       }),
//   },
//   initialState,
// );


export default todos;
