import { CHANGE_IS_MOBILE_DEVICE } from "../actions/types"

const initialState = {
    isMobileDevice: false,
}
  
export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_IS_MOBILE_DEVICE:
            return {...state, isMobileDevice: action.payload}
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