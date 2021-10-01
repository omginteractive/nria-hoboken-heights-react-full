import { UPDATE_MENU, END_MENU_TRANSITION, TOGGLE_MENU_STATE, TOGGLE_MENU_TRANSITION } from "../actions/types"

const initialState = {
    menuOpen: false,
    menuIsTransitioning: false,
    menuCustomFields: [],
}
  
export default function menuReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU_STATE:
            // const isTransitioning = state.menuOpen ? true : false
            return {...state, menuOpen: !state.menuOpen}
        case TOGGLE_MENU_TRANSITION:
            return {...state, menuIsTransitioning: !state.menuIsTransitioning}
        case END_MENU_TRANSITION:
            return {...state, menuIsTransitioning: false}
        case UPDATE_MENU:
            return {...state, menuCustomFields: action.payload}
        default:
            return state
    }
}