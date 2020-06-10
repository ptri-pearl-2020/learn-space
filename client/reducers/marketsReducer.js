/**
 * ************************************
 *
 * @module  marketsReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */

import * as types from "../constants/actionTypes";
const { Map } = require("immutable");

const initialState = Map({
  totalMarkets: 0,
  totalCards: 0,
  marketList: [],
  lastMarketId: 10000,
  newLocation: "",
});

const marketsReducer = (state = initialState, action) => {
  let marketList = []; //undefined
  let totalCards = state.get("totalCards"); //undefined

  switch (action.type) {
    case types.ADD_MARKET:
      // increment lastMarketId and totalMarkets counters

      //let lastMarketId = state.lastMarketId + 1;
      //let totalMarkets = state.totalMarkets + 1;
      // create the new market object from provided data
      const newMarket = {
        // what goes in here?
        marketId: state.get("lastMarketId"),
        location: state.get("newLocation"),
        cards: 0,
      };

      // push the new market onto a copy of the market list
      marketList = state.get("marketList").slice();
      marketList.push(newMarket);

      let newState = state
        .set("lastMarketId", state.get("lastMarketId") + 1) //new object
        .set("totalMarkets", state.get("totalMarkets") + 1) //new object
        .set("marketList", marketList); //new object
      // return updated state
      return newState;
    /*{
        ...state,
        marketList,
        lastMarketId,
        totalMarkets,
        newLocation: '',
      }*/

    case types.SET_NEW_LOCATION:
      marketList = state.get("marketList").slice();
      // return a copy of state changing the newLocation to the action.payload
      // when the type is SET_NEW_LOCATION
      // get the last element of the marketList array and change the location to the action.payload
      marketList[marketList.length - 1]["location"] = action.payload;

      newState = state.set("marketList", marketList);

      return newState;
    /*{
        ...state,
        marketList:marketList,
      }
*/
    case types.ADD_CARD:
      // make a copy of the marketList
      marketList = state.get("marketList").slice();
      // increment state.totalCards
      // loop through all of the markets in state.marketList
      for (let i = 0; i < marketList.length; i++) {
        // if the market.marketId is the same as the action.payload
        if (marketList[i].marketId === action.payload) {
          //increment
          marketList[i].cards += 1;
          totalCards = state.get("totalCards") + 1;
          break;
        }
      }

      newState = state
        .set("marketList", marketList)
        .set("totalCards", totalCards);

      return newState;
    /*{
        ...state,
        marketList,
        totalCards,
      }*/

    case types.DELETE_CARD:
      // make a copy of the marketList
      marketList = state.get("marketList").slice();
      // totalCards = state.totalCards
      // loop through all of the markets in state.marketList
      for (let i = 0; i < marketList.length; i++) {
        // if the market.marketId is the same as the action.payload and the cards is > 0
        if (
          marketList[i].marketId === action.payload &&
          marketList[i].cards > 0
        ) {
          //increment
          marketList[i].cards -= 1;
          // decrement state.totalCards
          totalCards = state.get("totalCards") - 1;
          break;
        }
      }

      newState = state
        .set("marketList", marketList)
        .set("totalCards", totalCards);

      return newState;
    /*{
        ...state,
        marketList,
        totalCards,
      }*/

    default:
      return state;
  }
};

export default marketsReducer;
