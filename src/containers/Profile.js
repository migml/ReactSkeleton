import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {connect} from 'react-redux'
import * as ProfileState from '../store/ProfileState';
import * as UserState from '../store/UserState';
import {Link} from 'react-router-dom';
import {GridLoader} from '../components/animations/GridLoader';

class Profile extends React.Component {
    /*componentWillMount() {
        this.props.requestUserPetList(1);
    }*/

    /*componentWillReceiveProps(nextProps) {
        this.props.requestUserPetList(1);
    }*/

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        let list = this.props.list || [];
        if (this.props.logged) {
            return <div className="h-100">
                <div className="container">
                    <h2 className="my-4">Perfil</h2>
                    <h4 className="my-4">Datos de usuario</h4>
                    <hr/>
                    <div className="row">
                        <div className="col-4 col-md-3">
                            <img src={this.props.avatar} className="img-fluid rounded-circle" alt="avatar"/>
                        </div>
                        <div className="col-8 col-md-4 col-lg-5">
                            <div className="col-12 col-md-2">
                                <h6>Nombre</h6>
                                <p>{this.props.user}</p>
                            </div>
                            <div className="col-12 col-md-3">
                                <h6>Email</h6>
                                <p>{this.props.email}</p>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-4">
                            <span className="btn btn-warning float-right"
                                  onClick={this.props.logout}>Cerrar Session</span>
                            <span className="mr-2 text-danger btn btn-light float-left">Eliminar cuenta</span>
                        </div>
                    </div>
                    <h4 className="my-4">Anuncios</h4>
                    <hr/>
                    <div className="row">
                        <div className="col-lg-12">
                            {(() => {
                                if (this.props.loading) {
                                    return <GridLoader/>
                                } else {
                                    if (list.length === 0) {
                                        return <div className='text-center text-muted'>No tienes anuncios. Publica tus
                                            anuncios <Link to='/publish'>aquí</Link>.</div>
                                    } else {
                                        return list.map((pet) => <div key={pet.LossAlertId}>
                                            <div className="row">
                                                <div className="col-3 col-md-1">
                                                    <a href="http://www.google.com">
                                                        <img className="img-fluid rounded mb-3 mb-md-0"
                                                             src={pet.Pet.Images === undefined ? "https://via.placeholder.com/500/CCCCCC/FFFFFF/?text=Sin imagen" : pet.Pet.Images[ 0 ].Url}
                                                             alt=""/>
                                                    </a>
                                                </div>
                                                <div className="col-9 col-md-7 col-lg-8">
                                                    <h4>{pet.Pet.PetName} <small>{pet.Pet.type} - {pet.LossDate}</small>
                                                    </h4>

                                                </div>
                                                <div className="col-md-4 col-lg-3">
                                                    <span className="mr-2 text-danger btn btn-light float-left"
                                                          onClick={() => this.props.deleteLossAlert(pet.LossAlertId)}>Eliminar</span>
                                                    <Link className="btn btn-primary float-right"
                                                          to={`detail/${pet.LossAlertId}`}>Ver anuncio</Link>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>)
                                    }
                                }
                            })()}

                        </div>
                    </div>
                </div>
            </div>;
        } else {
            return <div className="h-100">
                <div className="container">
                    <h2 className="my-4">Perfil</h2>
                </div>
                <div className='text-center text-muted'>Para consultar tu perfil, debes inciar sessión antes. Inicia
                    sesión <Link to='/login'>aquí</Link> o bien <Link to='/'>vuelve al inicio</Link>.
                </div>
            </div>;
        }
    }
}

Profile.propTypes = {
    list: PropTypes.array,
    user: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    deleteLossAlert: PropTypes.func,
    logout: PropTypes.func,
    logged: PropTypes.bool
}

export default connect(
    state => ({
        list: state.profile.list,
        user: state.user.name,
        email: state.user.email,
        avatar: state.user.avatar,
        logged: state.user.logged
    }),
    {...ProfileState.actionCreators, ...UserState.actionCreators}
)(Profile);
