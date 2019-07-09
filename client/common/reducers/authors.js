import { createReducer } from 'utils'
import { fromJS } from 'immutable'

import {
  LOAD_ALL_AUTHORS_REQUEST,
  LOAD_AUTHOR_REQUEST,
  EDIT_AUTHOR_REQUEST
} from '../actions/authors'

export const initialState = fromJS({
  authors: {},
  isAuthorsLoaded: false
})

const mergeEntities = (state, { payload }) => {
  return state.withMutations(state =>
    Object.keys(payload.entities).reduce(
      (_state, entity) => _state.mergeIn([entity], payload.entities[entity]),
      state
    )
  )
}

export default createReducer(initialState, {
  [LOAD_ALL_AUTHORS_REQUEST.SUCCESS]: (state, action) => {
    return mergeEntities(state, action).set('isAuthorsLoaded', true)
  },
  [LOAD_AUTHOR_REQUEST.SUCCESS]: mergeEntities,
  [EDIT_AUTHOR_REQUEST.SUCCESS]: mergeEntities
})
