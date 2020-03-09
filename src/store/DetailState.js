import * as axios from 'axios';

/* ACTION TYPES */
export const REQUEST_PET_DETAIL = 'REQUEST_PET_DETAIL';
export const RECEIVE_PET_DETAIL = 'RECEIVE_PET_DETAIL';
export const SENDING_PET_EMAIL = 'SENDING_PET_EMAIL';
export const SENT_PET_EMAIL = 'SENT_PET_EMAIL';

/* ACTION CREATORS */
export const actionCreators = {
	requestPetDetail: (petId) => {
		return (dispatch, getState) => {
			if (getState().detail.petId !== petId) {
				axios.get(`${getState().app.APIHost}/cars/${petId}`)
					.then(function (response) {
						dispatch({ type: RECEIVE_PET_DETAIL, petId: petId, petData: response.data });
					})
					.catch(function (error) {
						console.log(error);
					})
					.then(function () {
						// always executed
					});
				dispatch({ type: REQUEST_PET_DETAIL, petId: petId });
			}
		}
	},
	sendEmail: (message) => {
		return (dispatch, getState) => {
			let emailBody = `Este es el mensaje: ${message} [Puedes contestar este correo para contactar con el informador.]`;
			let body = {
				"Sender": getState().user.name,
				"SenderEmail": getState().user.email,
				"Receiver": getState().detail.petData.User.Name,
				"ReceiverEmail": getState().detail.petData.User.Email,
				"Subject": `Nueva información sobre ${getState().detail.petData.Pet.PetName}`,
				"Body": emailBody

			};
			axios.post(`${getState().app.APIHost}/api/emails`, body)
				.then(function (response) {
					dispatch({ type: SENT_PET_EMAIL });
				})
				.catch(function (error) {
					console.log(error);
				})
				.then(function () {
					// always executed
				});
			dispatch({ type: SENDING_PET_EMAIL });
		}
	}
}

const initialState = {
	petId: 0,
	petData: null,
	sendingEmail: false,
	emailSent: false,
	loading: false
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_PET_DETAIL:
			return {
				...state,
				loading:true,
				petData: null,
				petId: action.petId
			}
		case RECEIVE_PET_DETAIL:
			if (state.petId === action.petId) {
				return {
					...state,
					loading:false,
					petData: action.petData
				}
			}
			break;
		case SENDING_PET_EMAIL:
			return {
				...state,
				sendingEmail: true,
				emailSent: false
			}
		case SENT_PET_EMAIL:
			return {
				...state,
				sendingEmail: false,
				emailSent: true
			}
		default:
			return state
	}
}
