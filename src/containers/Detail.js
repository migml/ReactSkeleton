import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as DetailState from '../store/DetailState';
import {connect} from 'react-redux';
import {Form} from '../components/forms/Form';
import {GridLoader} from '../components/animations/GridLoader';
// import MapContainer from '../components/Map';

let props = {
    petData: PropTypes.object,
    detailAdd: PropTypes.func,
    detailRest: PropTypes.func,
    sendEmail: PropTypes.func,
    sendingEmail: PropTypes.bool,
    emailSent: PropTypes.bool,
    logged: PropTypes.bool,
    loading: PropTypes.bool
}

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.handleSendEmail = this.handleSendEmail.bind(this);
    }

    /*componentWillMount() {
        this.props.requestPetDetail(this.props.match.params.id);
    }*/

    /*componentWillReceiveProps(nextProps) {
        this.props.requestPetDetail(nextProps.match.params.id);
    }*/
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.requestPetDetail(this.props.match.params.id);
    }

    handleSendEmail(a) {
        if (this.props.sendingEmail === false && this.props.emailSent === false) {
            this.props.sendEmail(a.values.message);
        }
    }

    render() {
        let petName = (this.props.petData !== null ? this.props.petData.PetName : 'bop!');
        let description = (this.props.petData !== null ? this.props.petData.Description : '');
        if (!this.props.loading && this.props.petData !== null) {
            return <div>
                <div className="container">
                    <h2 className="my-4">Car detail</h2>
                    <div className="row">
                        <div className="col-lg-4">
                            {/*<div className="col-lg-12 mb-3 pl-0 pr-0" style={{ height: '300px' }}>
								<MapContainer />
							</div>*/}
                            <div className="col-lg-12 p-0 mb-3">
                                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                    {/*<ol className="carousel-indicators">
										<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
									</ol>*/}
                                    <div className="carousel-inner">
                                        {(this.props.petData.images || []).map((img, i) =>
                                            <div key={i} className={"carousel-item " + (i === 0 ? 'active' : '')}>
                                                <img className="d-block w-100" src={img} alt="First slide"/>
                                            </div>)}
                                    </div>
                                    {/*<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
										<span className="carousel-control-prev-icon" aria-hidden="true"></span>
										<span className="sr-only">Previous</span>
									</a>
									<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
										<span className="carousel-control-next-icon" aria-hidden="true"></span>
										<span className="sr-only">Next</span>
									</a>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">{petName} <small>{this.props.petData.facturer}</small></h3>
                                    <small>{this.props.petData.lossDate}</small>
                                    <p className="card-text">{description}</p>
                                </div>
                            </div>
                            <div className="card card-outline-secondary my-4">
                                <div className="card-header">Car details</div>
                                <div className="card-body">
                                    <p>Nombre: {this.props.petData.date}</p>
                                    <p>Tipo: {this.props.petData.facturer}</p>
                                    <p>Raza: {this.props.petData.model}</p>
                                </div>
                            </div>
                            {(() => {
                                if (this.props.sendingEmail) {
                                    return <div className="alert alert-info" role="alert">
                                        <strong>Enviando...</strong> Espera por favor.
                                    </div>;
                                }
                            })()}
                            {(() => {
                                if (this.props.emailSent) {
                                    return <div className="alert alert-success" role="alert">
                                        <strong>Enviado!</strong> El propietario ha recibido tu mensaje. Gracias!
                                    </div>;
                                }
                            })()}
                            {(() => {
                                if (this.props.sendingEmail === false && this.props.emailSent === false && this.props.logged === true) {
                                    return <div className="card card-outline-secondary my-4">
                                        <div className="card-header">Contacta con el anunciante.</div>
                                        <div className="card-body">
                                            <Form onSubmit={this.handleSendEmail}>
                                                <div className="form-group col-xs-12">
                                                    <input disabled={this.props.sendingEmail} type="text" name='message'
                                                           className='form-control'
                                                           placeholder='Redacta aquí tu mensaje...'/>
                                                </div>
                                                <input disabled={this.props.sendingEmail} type='submit'
                                                       className='btn btn-info float-right' value='Enviar email'/>
                                            </Form>
                                        </div>
                                    </div>;
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>;
        } else {
            return <div><GridLoader/></div>;
        }
    }
}

Detail.propTypes = props;

export default connect(
    state => ({
        petData: state.detail.petData,
        emailSent: state.detail.emailSent,
        sendingEmail: state.detail.sendingEmail,
        logged: state.user.logged,
        loading: state.detail.loading
    }),
    DetailState.actionCreators)(Detail);

