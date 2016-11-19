const initialState = {
  base: 2,
  exponent: 4,
  result: 2 ** 4,
  calculating: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'BASE_CHANGED':
      return Object.assign({}, state, { base: action.value, calculating: true });
    case 'EXPONENT_CHANGED':
      return Object.assign({}, state, { exponent: action.value, calculating: true });
    case 'RESULT_CALCULATED':
      return Object.assign({}, state, { result: action.value, calculating: false });
    default:
      return state;
  }
}
