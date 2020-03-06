import * as axios from 'axios'

/* ACTION TYPES */
export const SAVING_PUBLICATION = 'SAVING_PUBLICATION';
export const SAVED_PUBLICATION = 'SAVED_PUBLICATION';


/* ACTION CREATORS */
export const actionCreators = {
    savePublication: (data) => {
        console.log(data);
        return (dispatch, getState) => {
            let pet = {
                PetName: data.petName,
                Type: data.type,
                Breed: data.breed,
                Color: data.color,
                Description: data.petDescription,
                Character: data.character,
                LicenseNumber: data.licenseNumber,
                Weight: data.weight,
                BirthDate: data.birthDate,
                Size: data.size,
                UserId: getState().user.id
            }
            //SAVE PET DATA
            axios.post(`${getState().app.APIHost}/api/pet`, pet).then(function (response) {
                let lossalert = {
                    PetId: response.data.id,
                    Description: data.lossDescription,
                    Latitude: data.latitude,
                    Longitude: data.longitude,
                    Country: data.country,
                    City: data.city,
                    State: data.state,
                    Zip: data.zip,
                    Road: data.road,
                    UserId: getState().user.id
                };
                //SAVE PET IMAGES
                let dataImg = new FormData();
                dataImg.append('file', data.file);
                axios.put(`${getState().app.APIHost}/api/pet/` + response.data.id + '/images', dataImg).then(function (response) {
                    //SAVE LOSSALERT
                    axios.post(`${getState().app.APIHost}/api/lossalerts`, lossalert)
                        .then(function (response) {
                            dispatch({type: SAVED_PUBLICATION});
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                        .then(function () {
                            // always executed
                        });
                }).catch(function (error) {
                    console.log(error);
                }).then(function () {
                    // always executed
                });

            }).catch(function (error) {
                console.log(error);
            }).then(function () {
                // always executed
            });
            dispatch({type: SAVING_PUBLICATION});
        }
    }
}

const initialState = {
    publishing: false,
    published: false,

}

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SAVING_PUBLICATION:
            return {
                ...state,
                publishing: true,
                published: false
            }
        case SAVED_PUBLICATION:
            return {
                ...state,
                publishing: false,
                published: true
            }
        default:
            return state
    }
}
