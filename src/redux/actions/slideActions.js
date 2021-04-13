import { UPDATE_FILM_SLIDE_MOUSE_MOVEMENT, SET_RESIDENCE_PENTHOUSE_PATH, DISPLAY_AVAILABILITY_PLAN_MODAL, HIDE_AVAILABILITY_PLAN_MODAL, SET_ACTIVE_AVAILABILITY_PLAN, CHANGE_SLIDE_IDX, UPDATE_SLIDES, UPDATE_SLIDES_VIEWED, UPDATE_DESKTOP_KEYS, UPDATE_MOBILE_KEYS, UPDATE_TRANSITIONING_STATE, UPDATE_TOUCH_STATE } from "./types";

// export function changeSlideIdx(idx) {
//     return (dispatch) => {
//         dispatch( changeSlideIdxState(idx))
//         dispatch( hideAvailabilityPlanModal())
//     }
// }
export const changeSlideIdx = idx => {
    return {
        type: CHANGE_SLIDE_IDX,
        payload: idx
    }
}

export const updateSlideData = (slideObj) => {
    return {
        type: UPDATE_SLIDES,
        payload: slideObj
    }
}

export const updateDesktopKeys = (keysArray) => {
    return {
        type: UPDATE_DESKTOP_KEYS,
        payload: keysArray
    }
}
export const updateMobileKeys = (keysArray) => {
    return {
        type: UPDATE_MOBILE_KEYS,
        payload: keysArray
    }
}

export const updateSlideTransitioningState = (state) => {
    return {
        type: UPDATE_TRANSITIONING_STATE,
        payload: state
    }
}

export const updateSlideTouchState = (state) => {
    return {
        type: UPDATE_TOUCH_STATE,
        payload: state
    }
}
export const updateSlidesViewed = (state) => {
    return {
        type: UPDATE_SLIDES_VIEWED,
        payload: state
    }
}

export const setActiveAvailabilityPlan = idx => {
    return {
        type: SET_ACTIVE_AVAILABILITY_PLAN,
        payload: idx
    }
}

export const displayAvailabilityPlanModal = () => {
    return {
        type: DISPLAY_AVAILABILITY_PLAN_MODAL,
    }
}

export const hideAvailabilityPlanModal = () => {
    return {
        type: HIDE_AVAILABILITY_PLAN_MODAL,
    }
}

export const setResidencePenthousePath = state => {
    return {
        type: SET_RESIDENCE_PENTHOUSE_PATH,
        payload: state
    }
}

// export const isCurrent = (idx) => {
//     const deviceIdx = findDeviceSlideIdx(idx)
//     // console.log(deviceIdx)
//     return (dispatch, getState) => {
//         const currSlideIdx = getState().slideData.currSlideIdx
//         return deviceIdx === currSlideIdx
//     }
// }
export const findDeviceSlideIdx = (idx) => {
    
    /* 
     * Because the mobile and desktop version have some slides that are unique to each environment,
     * We need a way to find the index of the environment which we are on
     */
    return (dispatch, getState) => {
        const isMobile = getState().appData.isMobileDevice
        if(isMobile) return getState().slideData.mobileKeys[idx]
        return getState().slideData.desktopKeys[idx]
    }
}

export const updateFilmSlideMouseMovement = (state) => {
    return {
        type: UPDATE_FILM_SLIDE_MOUSE_MOVEMENT,
        payload: state
    }
}

export const findAvailabilitySlideIdx = () => {
    return (dispatch, getState) => {
        const isMobile = getState().appData.isMobileDevice
        console.log(isMobile, getState)
        if(isMobile) return 12
        return 11
    }
}
