/* ACTION TYPES */
export const HOME_ADD = 'HOME_ADD';
export const HOME_REST = 'HOME_REST';

/* ACTION CREATORS */
export const actionCreators = {}

const initialState = {
    number: 0
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HOME_ADD:
            return {
                number: state.number + 1
            }
        case HOME_REST:
            return {
                number: state.number - 1
            }
        default:
            return state
    }
}
