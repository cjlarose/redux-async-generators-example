import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import calculator from './reducers/calculator';

const store = createStore(calculator);
const rootEl = document.getElementById('root');

function Calculator(props) {
  return (<div>
    Calculator
    <input type="number" value={props.base} onChange={props.onBaseChange} />
    <input type="number" value={props.exponent} onChange={props.onExponentChange} />
    <span className="result">
      {props.result}
    </span>
  </div>);
}

Calculator.propTypes = {
  base: React.PropTypes.number,
  exponent: React.PropTypes.number,
  result: React.PropTypes.number,
  onExponentChange: React.PropTypes.func,
  onBaseChange: React.PropTypes.func,
};

function exponentiate(base, exponent) {
  const calculateAction = {
    type: 'RESULT_CALCULATED',
    value: base ** exponent,
  };
  store.dispatch(calculateAction);
}

function onBaseChange(e) {
  const newBase = parseInt(e.target.value, 10);
  store.dispatch({ type: 'BASE_CHANGED', value: newBase });

  const { exponent } = store.getState();
  exponentiate(newBase, exponent);
}

function onExponentChange(e) {
  const newExponent = parseInt(e.target.value, 10);
  store.dispatch({ type: 'EXPONENT_CHANGED', value: newExponent });

  const { base } = store.getState();
  exponentiate(base, newExponent);
}

function render() {
  const { result, base, exponent } = store.getState();
  ReactDOM.render(
    <Calculator
      base={base}
      exponent={exponent}
      result={result}
      onBaseChange={onBaseChange}
      onExponentChange={onExponentChange}
    />,
    rootEl,
  );
}

render();
store.subscribe(render);
