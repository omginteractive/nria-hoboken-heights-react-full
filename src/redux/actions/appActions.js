import { SET_HEADER_DATA, SET_BROWSER, SET_OPERATING_SYS, CHANGE_IS_MOBILE_DEVICE, ENABLE_GOOGLE_MAPS_LOADED, SELECT2_ENABLE, SELECT2_DISABLE, CONTACT_FORM_SUBMITTED, CONTACT_FORM_RESET } from "./types";

export const setHeader = headerData => {
    return {
        type: SET_HEADER_DATA,
        payload: headerData
    }
}

export const changeIsMobileDevice = isMobileDevice => {
    return {
        type: CHANGE_IS_MOBILE_DEVICE,
        payload: isMobileDevice
    }
}
export const setOperatingSys = operatingSys => {
    return {
        type: SET_OPERATING_SYS,
        payload: operatingSys
    }
}
export const setBrowser = browser => {
    return {
        type: SET_BROWSER,
        payload: browser
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