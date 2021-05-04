import { CHANGE_IS_MOBILE_DEVICE, ENABLE_GOOGLE_MAPS_LOADED, SELECT2_ENABLE, SELECT2_DISABLE, CONTACT_FORM_SUBMITTED, CONTACT_FORM_RESET } from "./types";

export const changeIsMobileDevice = isMobileDevice => {
    return {
        type: CHANGE_IS_MOBILE_DEVICE,
        payload: isMobileDevice
    }
}

export const googleMapsEnable = () => {
    return {
        type: ENABLE_GOOGLE_MAPS_LOADED,
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