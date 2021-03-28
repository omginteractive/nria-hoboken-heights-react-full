import { CHANGE_IS_MOBILE_DEVICE, SELECT2_ENABLE, SELECT2_DISABLE, CONTACT_FORM_SUBMITTED, CONTACT_FORM_RESET } from "./types";

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