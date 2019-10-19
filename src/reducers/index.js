import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import articleReducer, { moduleName as articleModule } from './article-reducer';


export default () => combineReducers({
  form,
  [articleModule]: articleReducer,
})
