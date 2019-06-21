import { combineReducers } from 'redux';
import parametersReducers from './parametersReducers';

export default combineReducers({
    parameters: parametersReducers,
});

