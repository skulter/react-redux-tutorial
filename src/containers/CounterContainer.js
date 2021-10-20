import React from 'react';
import Counter from '../components/Counter';
// import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';
// import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

//#region ################ 일반적인 connect 사용 ###################
// const CounterContainer = ({ number, increase, decrease }) => {
//   return (
//     <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//   );
// };
//#endregion

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  // useDispatch를 사용하여 액션 디스패치하기
  const dispatch = useDispatch();
  return <Counter number={number} onIncrease={()=>dispatch(increase())} onDecrease={()=> dispatch(decrease())} />;
};

//#region ############# 1. mapStateToProps, mapDispatchToProps 를 사용한 방법 #############

// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });

// const mapDispatchToProps = (dispatch) => ({
//   // 임시 함수
//   increase: () => {
//     dispatch(increase())
//   },
//   decrease: () => {
//     dispatch(decrease())
//   },

// });

// export default connect(mapStateToProps,mapDispatchToProps)(CounterContainer)
//#endregion

//#region ############# 2.익명함수 형태로 선언하여 사용한 방법 #############
// export default connect(
//   state=>({number: state.counter.number}),
//   dispatch =>({
//     increase: () => dispatch(increase()),
//     decrease: () => dispatch(decrease())
//   }),
// )(CounterContainer)
//#endregion

//#region ############# 3.redux에서 제공하는 bindActionCreators 유틸 함수를 사용한 방법 #############
// export default connect(
//   (state) => ({
//     number: state.counter.number,
//   }),
//   (dispatch) =>
//     bindActionCreators(
//       {
//         increase,
//         decrease,
//       },
//       dispatch,
//     ),
// )(CounterContainer);
//#endregion

//#region ############# 4. mapDispatchToProps에 해당하는 파라미터 함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 넣어주는 방법 #############
// export default connect(
//   (state) => ({
//     number: state.counter.number,
//   }),
//   {
//     increase,
//     decrease,
//   },
// )(CounterContainer);
// 위와 같이 두 번째 파라미터를 아예 객체 형태로 넣어주면 connect 함수가 내부적으로 bindActionCreators 작업을 도와준다.
//#endregion

export default CounterContainer;
