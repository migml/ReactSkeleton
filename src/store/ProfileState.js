import * as axios from 'axios';

/* ACTION TYPES */
export const REQUEST_USER_PET_LIST = 'REQUEST_USER_PET_LIST';
export const RECEIVE_USER_PET_LIST = 'RECEIVE_USER_PET_LIST';

/* ACTION CREATORS */
export const actionCreators = {
    requestUserPetList: (page = 1, forceRequest = false) => {
        return (dispatch, getState) => {
            if (getState().profile.page !== page || forceRequest) {
                axios.get(`${getState().app.APIHost}/api/users/` + getState().user.id + '/lossalerts')
                    .then(function (response) {
                        dispatch({type: RECEIVE_USER_PET_LIST, page: page, list: response.data.Data});
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
                dispatch({type: REQUEST_USER_PET_LIST, page: page});
            }
        }
    },
    deleteLossAlert: (id = 1) => {
        return (dispatch, getState) => {
            axios.delete(`${getState().app.APIHost}/api/users/` + getState().user.id + '/lossalerts/' + id)
                .then(function (response) {
                    dispatch(actionCreators.requestUserPetList(getState().profile.page, true));
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    }
}

const initialState = {
    list: [],
    loading: false,
    number: 0,
    page: 0
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER_PET_LIST:
            return {
                ...state,
                loading: true,
                page: action.page
            }
        case RECEIVE_USER_PET_LIST:
            if (state.page === action.page) {
                return {
                    ...state,
                    loading: false,
                    list: action.list
                }
            }
            break;
        default:
            return state
    }
}
