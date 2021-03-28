import slideData from './slide'
import appData from './app'
import menuData from './menu'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    slideData,
    appData,
    menuData
})

export default allReducers