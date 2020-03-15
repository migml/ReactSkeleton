import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ListState from '../store/ListState';
import {connect} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {frontloadConnect} from 'react-frontload';
import {Form} from '../components/forms/Form';
import {GridLoader} from '../components/animations/GridLoader';

const frontLoad = async (props) => {
    let page = (props.match.params.page || 1);
    let search = (props.search || '');
    return await props.requestPetListSSR(page, search);
}

let props = {
    page: PropTypes.number,
    totalPages: PropTypes.number,
    search: PropTypes.string,
    list: PropTypes.array,
    listAdd: PropTypes.func,
    listRest: PropTypes.func
}

class List extends React.Component {

    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(formData) {
        let search = formData.values.search;
        this.props.requestPetList(parseInt(this.props.match.params.page || 1), search);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let search = (this.props.search || '');
        this.props.requestPetList(parseInt(this.props.match.params.page || 1), search);
    }
    
    componentDidUpdate(){
        window.scrollTo(0, 0);
        let search = (this.props.search || '');
        this.props.requestPetList(parseInt(this.props.match.params.page || 1), search);
    }

    render() {
        let list = (this.props.list || []);
        return <div>
            <div className="container text-muted">
                <h2 className="my-4">List</h2>
                <div>
                    <Form onSubmit={this.handleFilter}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon2">Search</span>
                            </div>
                            <input type="text" name='search' className="form-control"
                                   placeholder="Name, city, etc..." aria-label="Recipient's username"
                                   aria-describedby="basic-addon2" defaultValue={this.props.search}/>
                            <div className="input-group-append">
                                <button className="btn btn-info" type="submit">Search</button>
                            </div>
                        </div>
                    </Form>
                </div>
                {(() => {
                    if (this.props.loading) {
                        return <GridLoader/>;
                    } else {
                        if (list.length === 0) {
                            return <div className="row">
                                <div className="col-12 text-center">No hay datos para esta búsqueda.<br/><br/><br/>
                                </div>
                            </div>;
                        } else {
                            return list.map((car) => <div key={car.id}>
                                <div className="row">
                                    <div className="col-md-3">
                                        <a href="http://www.google.com">
                                            <img className="img-fluid rounded mb-3 mb-md-0"
                                                 src={car.images === undefined ? "https://via.placeholder.com/500/CCCCCC/FFFFFF/?text=Sin imagen" : car.images[ 0 ]}
                                                 alt=""/>
                                        </a>
                                    </div>
                                    <div className="col-md-9">
                                        <h3>{car.model} <small>{car.facturer}</small></h3>
                                        <small>{car.date} - {car.facturer}</small>
                                        <p>{car.description.substring(0,425)}...</p>
                                        <Link className="btn btn-outline-info float-right"
                                              to={`/detail/${car.id}`}>+ Info</Link>
                                    </div>
                                </div>
                                <hr/>
                            </div>);
                        }
                    }
                })()}
                {}
                <ul className="pagination justify-content-center">
                    {(() => {
                        let page = this.props.page;
                        let pages = [];
                        if (page > 1) {
                            pages.push(<li key={'prev'} className="page-item">

                                <NavLink to={`/list/page/${page - 1}`} className="page-link">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </NavLink>
                            </li>);
                        }
                        for (let i = page - 2; i < page + 3; i++) {
                            if (i > 0 && i <= (this.props.totalPages)) {
                                pages.push(<li key={i} className={'page-item ' + (page === i ? 'disabled' : '')}>
                                    <NavLink to={`/list/page/${i}`} className="page-link">{i}</NavLink>
                                </li>);
                            }
                        }
                        if (page < this.props.totalPages) {
                            pages.push(<li  key={'next'}  className="page-item">
                                <NavLink to={`/list/page/${page - 1}`} className="page-link">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </NavLink>
                            </li>);
                        }
                        return pages;
                    })()}
                </ul>
            </div>
        </div>;
    }
}

List.propTypes = props;

export default connect(
    state => ({
        page: state.list.page,
        list: state.list.list,
        search: state.list.search,
        totalPages: state.list.totalPages,
        loading: state.list.loading
    }),
    ListState.actionCreators
)(frontloadConnect(frontLoad, {
    onMount: true,
    onUpdate: false
})(List));


