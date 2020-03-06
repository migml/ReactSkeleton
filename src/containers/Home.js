import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as ListState from '../store/ListState';
import { Form } from '../components/forms/Form';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleSearch(formData) {
        this.props.requestPetList(1, formData.values.search);
        this.props.history.push('/list');
    }

    render() {
        return <div>
            <header className="home-header text-white">
                <div className="container text-center">
                    <h1>Static page</h1>
                    <p className="lead">This is a static page</p>
                </div>
                <div className="row no-gutters justify-content-center">
                    <div className="col-10 col-md-10 col-lg-8">
                        <Form onSubmit={this.handleSearch}>
                            <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                    <i className="fas fa-search h4 text-body"></i>
                                </div>
                                <div className="col">
                                    <input name='search'
                                        className="form-control form-control-lg form-control-borderless" type="text"
                                        placeholder="Nombre, raza, ciudad, color..." />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-lg btn-info" type="submit">Buscar</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </header>
            <section id="about" className="">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h2>Static content</h2>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat, nibh vehicula porttitor auctor, nibh lacus ornare turpis, quis faucibus tellus mauris eget tellus. Morbi a orci sit amet tellus ultricies placerat. Sed id mollis dui. Aenean tempor ultricies consequat. Nulla elementum, elit et tincidunt suscipit, libero sem pulvinar elit, viverra ullamcorper magna magna nec libero. Vivamus efficitur.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="services" className="bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h2>Static content</h2>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat, nibh vehicula porttitor auctor, nibh lacus ornare turpis, quis faucibus tellus mauris eget tellus. Morbi a orci sit amet tellus ultricies placerat. Sed id mollis dui. Aenean tempor ultricies consequat. Nulla elementum, elit et tincidunt suscipit, libero sem pulvinar elit, viverra ullamcorper magna magna nec libero. Vivamus efficitur.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h2>Static content</h2>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat, nibh vehicula porttitor auctor, nibh lacus ornare turpis, quis faucibus tellus mauris eget tellus. Morbi a orci sit amet tellus ultricies placerat. Sed id mollis dui. Aenean tempor ultricies consequat. Nulla elementum, elit et tincidunt suscipit, libero sem pulvinar elit, viverra ullamcorper magna magna nec libero. Vivamus efficitur.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>;
    }
}

Home.propTypes = {
    number: PropTypes.number,
    homeAdd: PropTypes.func,
    homeRest: PropTypes.func,
    requestPetList: PropTypes.func
}

export default connect(
    state => ({
        number: state.home.number
    }),
    ListState.actionCreators
)(Home);
