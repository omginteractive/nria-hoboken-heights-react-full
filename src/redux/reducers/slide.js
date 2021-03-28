import { CHANGE_SLIDE_IDX, UPDATE_SLIDES, UPDATE_DESKTOP_KEYS, UPDATE_MOBILE_KEYS, UPDATE_TRANSITIONING_STATE, UPDATE_TOUCH_STATE } from "../actions/types"

const initialState = {
    currSlideIdx: 0,
    slides: null,
    desktopKeys: [],
    mobileKeys: [],
    slideTransitioningState: 0, // 0 for false -1 for up 1 for down
    slideTouchState: 0,//0 for end, 1 for start, 2 for move

}
  
export default function slideReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_SLIDE_IDX:
            return {...state, currSlideIdx: action.payload}
        case UPDATE_SLIDES:
            return {...state, slides: action.payload}
        case UPDATE_DESKTOP_KEYS:
            return {...state, desktopKeys: action.payload}
        case UPDATE_MOBILE_KEYS:
            return {...state, mobileKeys: action.payload}
        case UPDATE_TRANSITIONING_STATE:
            return {...state, slideTransitioningState: action.payload}
        case UPDATE_TOUCH_STATE:
            return {...state, slideTouchState: action.payload}
        default:
            return state
    }
}


//   switch (action.type) {
//     case ADD_TODO: {
//       const { id, content } = action.payload;
//       return {
//         ...state,
//         allIds: [...state.allIds, id],
//         byIds: {
//           ...state.byIds,
//           [id]: {
//             content,
//             completed: false
//           }
//         }
//       };
//     }
//     case TOGGLE_TODO: {
//       const { id } = action.payload;
//       return {
//         ...state,
//         byIds: {
//           ...state.byIds,
//           [id]: {
//             ...state.byIds[id],
//             completed: !state.byIds[id].completed
//           }
//         }
//       };
//     }
//     default:
//       return state;
//   }