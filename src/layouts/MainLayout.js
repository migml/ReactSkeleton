import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import * as UserState from '../store/UserState';
import { connect } from 'react-redux';
import { FaChevronLeft, FaBars } from 'react-icons/fa';
import { withRouter } from 'react-router-dom'

class MainLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = { collapsed: true };
    }

    render() {
        return <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light " id="mainNav">
                <div className="container">
                    <button onClick={this.props.history.goBack} className={"navbar-toggler" + (this.state.collapsed ? " collapsed " : "") + " no-border"} type="button" >
                        <FaChevronLeft />
                    </button>
                    <Link className="navbar-brand js-scroll-trigger header-gradient" to="/">React Skeleton</Link>
                    <button onClick={() => { this.setState({ collapsed: !this.state.collapsed }); }} className={"no-border navbar-toggler" + (this.state.collapsed ? " collapsed" : "") + " no-border"} type="button" aria-controls="navbarResponsive" aria-expanded={!this.state.collapsed} aria-label="Toggle navigation">
                        <FaBars />
                    </button>
                    <div className={"collapse navbar-collapse " + (this.state.collapsed ? '' : 'show')} id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item" data-target="#navbarResponsive" >
                                <Link className="nav-link js-scroll-trigger" to="/" onClick={() => { this.setState({ collapsed: true }); }}>Home</Link>
                            </li>
                            <li className="nav-item" data-target="#navbarResponsive">
                                <Link className="nav-link js-scroll-trigger" to="/list" onClick={() => { this.setState({ collapsed: true }); }}>List</Link>
                            </li>
                            <li className="nav-item" data-target="#navbarResponsive">
                                <Link className="nav-link js-scroll-trigger" to="/publish" onClick={() => { this.setState({ collapsed: true }); }}>Create</Link>
                            </li>
                            <li className="nav-item">
                                {(() => {
                                    if (this.props.logged) {
                                        return <Link className="nav-link js-scroll-trigger" to="/profile" onClick={() => { this.setState({ collapsed: true }); }}>{this.props.name}&nbsp;&nbsp;<img alt="profile" src={this.props.avatar} className="rounded-circle" style={{ width: '1.5em' }} /></Link>;
                                    } else {
                                        return <Link className="nav-link js-scroll-trigger" to="/login" onClick={() => { this.setState({ collapsed: true }); }}>Login</Link>;
                                    }
                                })()}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="content text-muted">
                {this.props.children}
            </div>
            <footer className="footer  py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center my-auto">
                            <ul className="list-inline mb-2 small">
                                <li className="list-inline-item">
                                    <HashLink to='/about'>About</HashLink>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-12 text-center my-auto">
                            <span className="text-muted small mb-4 mb-lg-0">&copy; Miguel Martín 2020.</span>
                        </div>
                    </div>
                </div>
            </footer>
            {this.cookieConsent()}
        </div>;
    }
    cookieConsent() {
        if (!this.props.cookies) {
            return <div className="text-center fixed-bottom bg-dark text-light pt-3 pb-3" role="alert">
                <div className="cookiealert-container">
                    <b>Do you like cookies?</b> &#x1F36A; We use here cookies to give you a better user experience. <HashLink to='/about#cookies'>More info.</HashLink>&nbsp;&nbsp;
                    <span onClick={this.props.acceptCookies} type="button" className="btn btn-primary btn-sm acceptcookies" aria-label="Close">It's ok.</span>
                </div>
            </div>;
        }
    }
}

MainLayout.propTypes = {
    logged: PropTypes.bool,
    name: PropTypes.string,
    avatar: PropTypes.string,
    cookies: PropTypes.bool,
    acceptCookies: PropTypes.func,
    router: PropTypes.object
}

export default withRouter(connect(
    state => ({
        logged: state.user.logged,
        name: state.user.name,
        avatar: state.user.avatar,
        cookies: state.user.cookies
    }),
    UserState.actionCreators
)(MainLayout));