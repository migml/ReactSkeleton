/* ACTION TYPES */
export const APP_HOST_CHANGE = 'APP_HOST_CHANGE';

/* ACTION CREATORS */
export const actionCreators = {}

const initialState = {
    // APIHost: 'https://the-api-host.com'
    // APIHost: 'https://the-api-host.com'
    // TEST
    APIHost:'https://localhost:5001'
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_HOST_CHANGE:
            return {
                APIHost: action.APIHost
            }
        default:
            return state
    }
}
