import { CHANGE_SLIDE_IDX, UPDATE_SLIDES, UPDATE_DESKTOP_KEYS, UPDATE_MOBILE_KEYS, UPDATE_TRANSITIONING_STATE, UPDATE_TOUCH_STATE } from "./types";

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

// export const toggleTodo = id => ({
//   type: TOGGLE_TODO,
//   payload: { id }
// });

// export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });


// import { CHANGE_SLIDE_IDX } from "./types"


// // const initialState = {
// //     currIdx: 0
// //   }
  
// //   export default function(state = initialState, action) {
// //     switch (action.type) {
// //       default:
// //         return state
// //     }
// //   }



// export const addSong = song => {
//   return {
//     type: ADD_SONG,
//     payload: song,
//   }
// }