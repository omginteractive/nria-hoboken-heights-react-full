import slideData from './slide'
import appData from './app'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    slideData,
    appData
})

export default allReducers