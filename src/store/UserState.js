import * as axios from 'axios';

/* ACTION TYPES */
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const REQUEST_LP = 'REQUEST_LP';
export const RECEIVE_LP = 'RECEIVE_LP';
export const USER_COOKIE_CONSENT = 'USER_COOKIE_CONSENT';

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[ i ];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* ACTION CREATORS */
export const actionCreators = {
    loginWithGoogle: (data) => {
        return (dispatch, getState) => {
            axios.post(`${getState().app.APIHost}/api/users`, {
                name: data.profileObj.givenName,
                surname: data.profileObj.familyName,
                fullname: data.profileObj.name,
                email: data.profileObj.email,
                platform: 'Google',
                platformId: data.googleId,
                avatar: data.profileObj.imageUrl,
                sendemails: 0,
                termsacceptation: 1,
                LegalPolicy: getState().user.legalPolicyId
            }).then(function (response) {
                setCookie('ProfileCookie', data.profileObj.givenName + '::' + response.data.RelatedData + '::' + response.data.Id + '::' + data.profileObj.email + '::' + data.profileObj.imageUrl, 60);
                setCookie('ProfileCookie_', 'huha', 60);
                setCookie('AppCC', 'CC_OK', 180);
                dispatch({
                    type: USER_LOGIN,
                    avatar: data.profileObj.imageUrl,
                    name: data.profileObj.givenName,
                    email: data.profileObj.email,
                    wsToken: response.data.RelatedData,
                    id: response.data.Id
                });
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
    loadCookies: (data) => {
        return (dispatch, getState) => {
            let a = getCookie('ProfileCookie');
            if (a !== '') {
                let aArray = a.split('::');
                dispatch({
                    type: USER_LOGIN,
                    avatar: aArray[ 4 ],
                    name: aArray[ 0 ],
                    email: aArray[ 3 ],
                    wsToken: aArray[ 1 ],
                    id: aArray[ 2 ]
                });
            }
            let b = getCookie('AppCC');
            if (b !== '') {
                dispatch({type: USER_COOKIE_CONSENT});
            }
        }
    },
    logout: () => {
        setCookie('CookieProfile', '', 0);
        setCookie('CookieProfile_', '', 0);
        return {type: USER_LOGOUT}
    }
    , requestLegalPolicy: () => {
        return (dispatch, getState) => {
            return axios.get(`${getState().app.APIHost}/api/legalpolicies/last`)
                .then(function (response) {
                    dispatch({
                        type: RECEIVE_LP,
                        legalPolicyContent: response.data.LegalPolicyContent,
                        legalPolicyId: response.data.LegalPolicyId
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
    , acceptCookies: () => {
        setCookie('AppCC', 'CC_OK', 180);
        return {type: USER_COOKIE_CONSENT}
    }
}

const initialState = {
    cookies: false,
    logged: false,
    name: '',
    wsToken: '',
    id: '',
    email: '',
    avatar: '',
    legalPolicyId: 0,
    legalPolicyContent: ''
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_COOKIE_CONSENT:
            return {
                ...state,
                cookies: true
            }
        case REQUEST_LP:
            return {
                ...state,
            }
        case RECEIVE_LP:
            return {
                ...state,
                legalPolicyId: action.legalPolicyId,
                legalPolicyContent: action.legalPolicyContent
            }
        case USER_LOGIN:
            return {
                ...state,
                logged: true,
                cookies: true,
                avatar: action.avatar,
                name: action.name,
                email: action.email,
                wsToken: action.wsToken,
                id: action.id
            }
        case USER_LOGOUT:
            return {
                ...state,
                logged: false,
                name: '',
                email: '',
                avatar: '',
                wsToken: '',
                id: ''
            }
        default:
            return state
    }
}
