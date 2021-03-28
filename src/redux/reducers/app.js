import { CHANGE_IS_MOBILE_DEVICE, SELECT2_ENABLE, SELECT2_DISABLE } from "../actions/types"

const initialState = {
    isMobileDevice: false,
    select2Activated: false,
}
  
export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_IS_MOBILE_DEVICE:
            return {...state, isMobileDevice: action.payload}
        case SELECT2_ENABLE:
            return {...state, select2Activated: true}
        case SELECT2_DISABLE:
            return {...state, select2Activated: false}
        default:
            return state
    }
}