import { CHANGE_IS_MOBILE_DEVICE, ENABLE_GOOGLE_MAPS_LOADED, SELECT2_ENABLE, SELECT2_DISABLE, CONTACT_FORM_SUBMITTED, CONTACT_FORM_RESET } from "../actions/types"

const initialState = {
    isMobileDevice: false,
    select2Activated: false,
    formSubmitted: null,
    googleMapsLoaded: false
}
  
export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_IS_MOBILE_DEVICE:
            return {...state, isMobileDevice: action.payload}
        case ENABLE_GOOGLE_MAPS_LOADED:
            return {...state, googleMapsLoaded: true}
        case SELECT2_ENABLE:
            return {...state, select2Activated: true}
        case SELECT2_DISABLE:
            return {...state, select2Activated: false}
        case CONTACT_FORM_SUBMITTED:
            return {...state, formSubmitted: true}
        case CONTACT_FORM_RESET:
            return {...state, formSubmitted: null}
        default:
            return state
    }
}