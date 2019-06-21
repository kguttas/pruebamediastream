import { combineReducers } from 'redux';
import parametersReducers from './moviesReducers';

export default combineReducers({
    parameters: parametersReducers,
});

