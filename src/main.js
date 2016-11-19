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

function onInputChange(key, e) {
  const action = {
    type: `${key}_CHANGED`,
    value: parseInt(e.target.value, 10),
  };
  store.dispatch(action);
}

const onBaseChange = onInputChange.bind(null, 'BASE');
const onExponentChange = onInputChange.bind(null, 'EXPONENT');

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
