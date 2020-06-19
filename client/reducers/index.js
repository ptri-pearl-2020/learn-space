/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';

import auth from './authReducer';
import quest from './questionReducer';

export default combineReducers({
  auth,
  quest
});
