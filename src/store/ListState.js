import * as axios from 'axios';

/* ACTION TYPES */
export const REQUEST_PET_LIST = 'REQUEST_PET_LIST';
export const RECEIVE_PET_LIST = 'RECEIVE_PET_LIST';

/* ACTION CREATORS */

export const actionCreators = {
    requestPetList: (page = 1, search = '', force = false) => {
        return (dispatch, getState) => {
            if (getState().list.page !== page || getState().list.search !== search || force) {
                dispatch(actionCreators.requestPetListSSR(page, search));
                dispatch({type: REQUEST_PET_LIST, page: page, search: search});
            }
        }
    }, requestPetListSSR: (page = 1, search = '') => {
        return (dispatch, getState) => {
            return axios.get(`${getState().app.APIHost}/api/lossalerts?page=${page}` + (search !== '' ? `&search=${search}` : ''))
                .then(function (response) {
                    dispatch({
                        type: RECEIVE_PET_LIST,
                        page: page,
                        search: search,
                        list: response.data.Data,
                        totalPages: response.data.TotalPages
                    });
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
    page: 0,
    search: '',
    totalPages: 0
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PET_LIST:
            return {
                ...state,
                loading: true,
                page: action.page,
                search: action.search
            }
        case RECEIVE_PET_LIST:
            if (state.page === action.page && state.search === action.search) {
                return {
                    ...state,
                    loading: false,
                    list: action.list,
                    totalPages: action.totalPages
                }
            }
            break;
        default:
            return state
    }
}
