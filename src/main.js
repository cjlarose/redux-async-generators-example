import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import calculator from './reducers/calculator';

const asyncInteratorMiddleware = store => next => (action) => {
  if (typeof action !== 'function') {
    next(action);
    return;
  }

  const iterator = action(store.getState);
  (async function go() {
    for await (const result of iterator) {
      next(result);
    }
  }());
};

const store = createStore(calculator, applyMiddleware(asyncInteratorMiddleware));
const rootEl = document.getElementById('root');

function Calculator(props) {
  return (<div>
    Calculator
    <input type="number" value={props.base} onChange={props.onBaseChange} />
    <input type="number" value={props.exponent} onChange={props.onExponentChange} />
    <span className="result">
      { props.calculating ? 'CALCULATING' : props.result }
    </span>
  </div>);
}

Calculator.propTypes = {
  base: React.PropTypes.number,
  exponent: React.PropTypes.number,
  result: React.PropTypes.number,
  calculating: React.PropTypes.bool,
  onExponentChange: React.PropTypes.func,
  onBaseChange: React.PropTypes.func,
};

function delayPromise(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function exponentiate(base, exponent) {
  await delayPromise(1000);
  return base ** exponent;
}

async function* watchIncrementAsync() {
  while (true) {
    const action = await sagaRunner.getNextAction('INCREMENT_ASYNC');
    dispatch(incrementAsync());
  }
}

function startExponentiation(base, exponent) {
  return async function* (getState) {
    // console.log(getState());
    yield { type: 'CALCULATION_STARTED' };
    const result = await exponentiate(base, exponent);
    yield { type: 'RESULT_CALCULATED', value: result };
  };
}

function onBaseChange(e) {
  const newBase = parseInt(e.target.value, 10);
  store.dispatch({ type: 'BASE_CHANGED', value: newBase });

  const { exponent } = store.getState();
  store.dispatch(startExponentiation(newBase, exponent));
}

function onExponentChange(e) {
  const newExponent = parseInt(e.target.value, 10);
  store.dispatch({ type: 'EXPONENT_CHANGED', value: newExponent });

  const { base } = store.getState();
  store.dispatch(startExponentiation(base, newExponent));
}

function render() {
  ReactDOM.render(
    <Calculator
      {...store.getState()}
      onBaseChange={onBaseChange}
      onExponentChange={onExponentChange}
    />,
    rootEl,
  );
}

render();
store.subscribe(render);
