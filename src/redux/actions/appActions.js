import { DISABLE_AVAILABILITY_PLAN, ACTIVATE_AVAILABILITY_PLAN, CHANGE_IS_MOBILE_DEVICE, SELECT2_ENABLE, SELECT2_DISABLE, CONTACT_FORM_SUBMITTED, CONTACT_FORM_RESET } from "./types";

export const changeIsMobileDevice = isMobileDevice => {
    return {
        type: CHANGE_IS_MOBILE_DEVICE,
        payload: isMobileDevice
    }
}
export const select2Enable = () => {
    return {
        type: SELECT2_ENABLE,
    }
}
export const select2Disable = () => {
    return {
        type: SELECT2_DISABLE,
    }
}

export const contactFormSubmitted = () => {
    return {
        type: CONTACT_FORM_SUBMITTED,
    }
}

export const contactFormReset = () => {
    return {
        type: CONTACT_FORM_RESET,
    }
}
export const activateAvailabilityPlan = idx => {
    return {
        type: ACTIVATE_AVAILABILITY_PLAN,
        payload: idx
    }
}

export const disableAvailabilityPlan = idx => {
    return {
        type: DISABLE_AVAILABILITY_PLAN,
    }
}