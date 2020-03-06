import * as React from 'react';
import * as  PropTypes from 'prop-types';
import * as UserState from '../store/UserState';
import { connect } from 'react-redux'
import { Form } from '../components/forms/Form';
import { Redirect } from 'react-router-dom';
import About from './About';
//import GoogleLogin from 'react-google-login';
const { GoogleLogin } = typeof window === 'object' ? require('react-google-login') : {};//SSR

//557084652856-ha9b2gltk858eirudg40ert4e2vdcin3.apps.googleusercontent.com
//46v5hbQkHa5gMC8u72MzAGRe

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleLPChange = this.handleLPChange.bind(this);
        this.state = { legalPolicy: false, cookies: false }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillMount() {
        //this.props.requestLegalPolicy();
    }

    render() {
        return <div>
            <div className="container">
                <h2 className="my-4">Iniciar sesión</h2>
                {this.props.logged ? this.renderLogged() : this.renderNoLogged()}
            </div>
        </div>;
    }

    handleLPChange() {
        this.setState({ ...this.state, legalPolicy: !this.state.legalPolicy });
    }

    renderNoLogged() {

        return <div className="row">

            <div className='terms-of-use'>
                <About></About>
            </div>

            <div className="col-lg-12">
                <Form>
                    {/*<textarea className='w-100' disabled rows='6' value={this.props.legalPolicyContent} />
                    <br /><br />*/}
                    <input name='legal' type='checkbox' onClick={this.handleLPChange} id='legal' /><label
                        htmlFor='legal'> &nbsp;He leido y acepto las política de privacidad, la política de cookies, y las condiciones de uso.</label> <br />
                    <br />
                </Form>
            </div>

            <div className="col-lg-12">
                {(() => {
                    if (typeof window === 'object' && this.state.legalPolicy) {
                        return <GoogleLogin
                            clientId="557084652856-018jjdtiejkhmjtr9ch3dnpo0i0sf9hq.apps.googleusercontent.com"
                            buttonText="Login"
                            render={renderProps => (
                                <button type="button" className="btn btn-info btn-md"
                                    onClick={renderProps.onClick}>Iniciar
                                    Sesión con Google Accounts</button>
                            )}
                            onSuccess={this.props.loginWithGoogle}
                            onFailure={this.props.loginError}
                        />
                    } else {
                        return <button type="button" className="btn btn-md btn-info" disabled>Iniciar
                            Sesión con Google Accounts</button>;

                    }
                })()}
            </div>
        </div >;
    }

    renderLogged() {
        return <Redirect to="/" />;
    }
}

Login.propTypes = {
    loginWithGoogle: PropTypes.func,
    acceptCookies: PropTypes.func,
    loginError: PropTypes.func,
    legalPolicyContent: PropTypes.string,
    logged: PropTypes.bool,
    cookies: PropTypes.bool
}

export default connect(
    state => ({
        legalPolicyContent: state.user.legalPolicyContent,
        logged: state.user.logged,
        cookies: state.user.cookies
    }),
    UserState.actionCreators
)(Login);
