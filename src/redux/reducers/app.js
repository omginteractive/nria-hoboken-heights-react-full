import { DISABLE_AVAILABILITY_PLAN, ACTIVATE_AVAILABILITY_PLAN, CHANGE_IS_MOBILE_DEVICE, SELECT2_ENABLE, SELECT2_DISABLE, CONTACT_FORM_SUBMITTED, CONTACT_FORM_RESET } from "../actions/types"

const initialState = {
    isMobileDevice: false,
    select2Activated: false,
    formSubmitted: null,
    activeAvailabilityPlan: null
}
  
export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_IS_MOBILE_DEVICE:
            return {...state, isMobileDevice: action.payload}
        case SELECT2_ENABLE:
            return {...state, select2Activated: true}
        case SELECT2_DISABLE:
            return {...state, select2Activated: false}
        case CONTACT_FORM_SUBMITTED:
            return {...state, formSubmitted: true}
        case CONTACT_FORM_RESET:
            return {...state, formSubmitted: null}
        case ACTIVATE_AVAILABILITY_PLAN:
            return {...state, activeAvailabilityPlan: action.payload}
        case DISABLE_AVAILABILITY_PLAN:
            return {...state, activeAvailabilityPlan: null}
        default:
            return state
    }
}