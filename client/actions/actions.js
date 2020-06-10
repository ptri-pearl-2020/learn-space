/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from "../constants/actionTypes";

/*
export const ADD_MARKET = 'ADD_MARKET';
export const SET_NEW_LOCATION = 'SET_NEW_LOCATION';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
*/

export const addMarket = () => ({
  type: types.ADD_MARKET,
});

export const addLocation = (location) => ({
  type: types.SET_NEW_LOCATION,
  payload: location,
});

export const addCard = (marketId) => ({
  type: types.ADD_CARD,
  payload: marketId,
});

export const deleteCard = (marketId) => ({
  type: types.DELETE_CARD,
  payload: marketId,
});

// add more action creators
