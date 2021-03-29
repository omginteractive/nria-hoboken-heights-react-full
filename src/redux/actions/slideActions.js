import { CHANGE_SLIDE_IDX, UPDATE_SLIDES, UPDATE_SLIDES_VIEWED, UPDATE_DESKTOP_KEYS, UPDATE_MOBILE_KEYS, UPDATE_TRANSITIONING_STATE, UPDATE_TOUCH_STATE } from "./types";

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

// export function findDeviceSlideIdx() {
//     return (dispatch, getState) => {
//       const {items} = getState();
//         console.log(items)
//     //   dispatch(anotherAction(items));
//     }
//   }

  export const findDeviceSlideIdx = (idx) => {
    return (dispatch, getState) => {
        console.log(getState())
        console.log(getState().slideData.desktopKeys)
        const isMobile = getState().appData.isMobileDevice
        console.log(getState().slideData.desktopKeys[idx])
        if(isMobile) return getState().slideData.mobileKeys[idx]
        return getState().slideData.desktopKeys[idx]
        // if (isValid) {
        //     return fetch() //... dispatch on success or failure
        // }
    };
}

// export const findDeviceSlideIdx = (idx) => {
//     /* 
//      * Because the mobile and desktop version have some slides that are unique to each environment,
//      * We need a way to find the index of the environment which we are on
//      */
//     // alert(state.isMobileDevice)
//     console.log(getState())
//     const isMobile = this.props.isMobileDevice
//     if(isMobile) return this.props.mobileKeys[idx]
//     return this.props.desktopKeys[idx]
// }

