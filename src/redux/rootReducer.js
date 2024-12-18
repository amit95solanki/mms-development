import { combineReducers } from 'redux';
import { serventSlice } from '../pages/servent/_redux/slice';
import { passSlice } from '../pages/pass/_redux/slice';
// Add an empty line after import statement
const rootReducer = combineReducers({
  // Combine reducers here
  servent: serventSlice.reducer,
  pass: passSlice.reducer,
});

export default rootReducer;
