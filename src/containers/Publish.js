import * as React from 'react';
import * as  PropTypes from 'prop-types';
import * as PublishState from '../store/PublishState';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Form } from '../components/forms/Form';
import MapContainer from '../components/Map';

let props = {
    petData: PropTypes.object,
    detailAdd: PropTypes.func,
    detailRest: PropTypes.func,
    logged: PropTypes.bool
}

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this.state = {
            city: ''
            , country: ''
            , road: ''
            , state: ''
            , zip: ''
            , file: null
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleFormSubmit(formData) {
        this.props.savePublication({ ...formData.values, file: this.state.file })
    }

    handleMap(data) {
        console.log(data);
        this.setState({
            country: data.country
            , city: data.city
            , road: data.road
            , state: data.state
            , zip: data.zip
        });
    }

    handleSelectedFile(event) {
        event.preventDefault();
        this.setState({
            ...this.state,
            file: event.target.files[0]
        }, () => {
            console.log(this.state);
        });
    }


    render() {

        return <div>
            <div className="container">
                <h2 className="my-4">Publicar</h2>
                {(() => {
                    if (this.props.logged) {
                        if (!this.props.published) {
                            if (!this.props.publishing) {
                                return <div className="row">
                                    <div className="col-lg-12">
                                        <Form onSubmit={this.handleFormSubmit} formName="pubform">
                                            <div className="form-row">
                                                <div className="col-lg-12"><h4>Datos de la mascota</h4></div>
                                                <div className="form-group col-md-4">
                                                    <label>Nombre</label>
                                                    <input name="petName" type="text" className="form-control"
                                                        placeholder="Nombre de la mascota..." />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>Fecha de Nacimiento</label>
                                                    <input name="birthDate" type="date" className="form-control"
                                                        placeholder="dd-mm-aaaa"
                                                        defaultValue={moment().format('YYYY-MM-DD')}
                                                        max={moment().format('YYYY-MM-DD')} />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>Tipo</label>
                                                    <input name="type" type="text" className="form-control"
                                                        placeholder="Perro, gato, ave..." />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                    <label>Raza</label>
                                                    <input name="breed" type="text" className="form-control"
                                                        placeholder="Raza de la mascota..." />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>Color</label>
                                                    <input name="color" type="text" className="form-control"
                                                        placeholder="Negro, Gris, blanco y marrón..." />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>Carácter</label>
                                                    <input name="character" type="text" className="form-control"
                                                        placeholder="Huidizo, dócil, agresivo..." />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-3">
                                                    <label>Numero de chip</label>
                                                    <input name="licenseNumber" type="text" className="form-control"
                                                        placeholder="Nº de chip o registro legal" />
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label>Peso (Kg)</label>
                                                    <input name="weight" type="number" className="form-control"
                                                        id="inputEmail4" placeholder="Kg" />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label>Tamaño</label>
                                                    <input name="size" type="text" className="form-control"
                                                        placeholder="Pequeño, mediano, grande..." />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label>Descripción de la mascota</label>
                                                    <input name="petDescription" type="text" className="form-control"
                                                        placeholder="Descripción..." />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-lg-12"><h4>Última ubicación</h4></div>
                                                <div className="col-lg-12"><MapContainer onClick={this.handleMap} /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                                </div>
                                            </div>
                                            <input disabled name="latitude" type="hidden" value={this.state.latitude} />
                                            <input disabled name="longitude" type="hidden"
                                                value={this.state.longitude} />
                                            <div className="form-row">
                                                <div className="form-group col-md-2">
                                                    <label>Pais</label>
                                                    <input disabled name="country" type="text" className="form-control"
                                                        placeholder="" value={this.state.country} />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>Comunidad</label>
                                                    <input disabled name="state" type="text" className="form-control"
                                                        placeholder="" value={this.state.state} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Ciudad</label>
                                                    <input disabled name="city" type="text" className="form-control"
                                                        placeholder="" value={this.state.city} />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-2">
                                                    <label>Código Postal</label>
                                                    <input disabled name="zip" type="text" className="form-control"
                                                        placeholder="" value={this.state.zip} />
                                                </div>
                                                <div className="form-group col-md-10">
                                                    <label>Calle</label>
                                                    <input disabled name="road" type="text" className="form-control"
                                                        placeholder="" value={this.state.road} />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                    <label>Fecha de desaparición</label>
                                                    <input name="lossDate" type="date" className="form-control"
                                                        placeholder="dd-mm-aaaa"
                                                        defaultValue={moment().format('YYYY-MM-DD')}
                                                        max={moment().format('YYYY-MM-DD')} />
                                                </div>

                                                <div className="form-group col-md-8">
                                                    <label>Como se perdió</label>
                                                    <input name="lossDescription" type="text" className="form-control"
                                                        placeholder="Descripción..." />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-4">
                                                    <label>Foto:</label>
                                                    <input id="foto" name="foto" type="file"
                                                        onChange={this.handleSelectedFile} className="form-control" />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Guardar</button>
                                        </Form>
                                    </div>
                                    <form name="test" onSubmit={(e) => {
                                        e.preventDefault();
                                        console.log(e.target.foto);
                                    }}>
                                    </form>
                                </div>;
                            } else {
                                return <div className="alert alert-info" role="alert">
                                    <strong>Guardando anuncio...</strong><br /><br />
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated"
                                            role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                            style={{ width: '100%' }}></div>
                                    </div>
                                </div>;
                            }
                        }
                        if (this.props.published) {
                            return <div className="alert alert-success" role="alert">
                                <strong>Publicado!</strong> Gracias por publicar tu anuncio. <NavLink to='/list'>Volver
                                a a lista de anuncios.</NavLink>.
                            </div>;
                        }
                    } else {
                        return <div><br />
                            Inicia sesión para publicar tu anuncio.<br /><br />
                            <NavLink className="btn btn-info btn-md"
                                to='/login'>Login</NavLink>
                        </div>;
                    }
                })()}
            </div>
        </div>;

    }
}

Detail.propTypes = props;

export default connect(
    state => ({
        petData: state.detail.petData,
        logged: state.user.logged,
        publishing: state.publish.publishing,
        published: state.publish.published
    }),
    PublishState.actionCreators)(Detail);

