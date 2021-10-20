import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';
import useActions from '../lib/useActions';

const TodosContainer = () => {
  //   const input = useSelector((state) => state.todos.input);
  //   const todos = useSelector((state) => state.todos.todos);
  //   const { input, todos } = useSelector(({ todos }) => ({
  //     input: todos.input,
  //     todos: todos.todos,
  //   }));
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const dispatch = useDispatch();

  //#region ############ useDispatch를 이용하여 액션생성함수 dispatch 해주기 ############
  //   const onChangeInput = useCallback(
  //     (input) => dispatch(changeInput(input)),
  //     [dispatch],
  //   );
  //   const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  //   const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  //   const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);
  //   return (
  //     <Todos
  //       input={input}
  //       todos={todos}
  //       onChangeInput={onChangeInput}
  //       onInsert={onInsert}
  //       onToggle={onToggle}
  //       onRemove={onRemove}
  //     />
  //   );
  // };
  //#endregion

  //#region ############ uasActions 유틸 Hook을 만들어서 사용해보기 ############

  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    [],
  );
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};
//#endregion

// export default connect(
//   //비구조화 할당을 통해 todos를 분리하여
//   //state.todos.input 대신 todos.input을 사용
//   ({todos}) => ({
//     input: todos.input,
//     todos: todos.todos,
//   }),
//   {
//     changeInput,
//     insert,
//     toggle,
//     remove,
//   },
// )(TodosContainer);

// !!!!!!중요 connect를 사용할때는 기본적으로 부모 컴포넌트가 리렌더링될 때 해당 컨테이너 컴포넌트의 props가 바뀌지 않는다면 리렌더링이 방지되지만
// useSelector을 사용하면 최적화 작업이 이루어 지지 않으므로 컨테이너에 React.memo를 사용해주어야 한다.
// export default TodosContainer;
export default React.memo(TodosContainer);
