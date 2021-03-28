import { CHANGE_IS_MOBILE_DEVICE } from "../actions/types"

const initialState = {
    isMobileDevice: false,
}
  
export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_IS_MOBILE_DEVICE:
            return {...state, isMobileDevice: action.payload}
        default:
            return state
    }
}