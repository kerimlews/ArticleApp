import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import entities from './entities'
import authors from './authors'

export const makeRootReducer = () => {
  return combineReducers({
    entities,
    authors,

    // 3rd party
    form,
    routing
  })
}

export default makeRootReducer
