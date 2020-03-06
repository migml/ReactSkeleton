import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import About from './containers/About';
import Detail from './containers/Detail';
import Home from './containers/Home';
import List from './containers/List';
import Login from './containers/Login';
import MainLayout from './layouts/MainLayout';
import Profile from './containers/Profile';
import Publish from './containers/Publish';

class Routes extends React.Component {

    render() {
        return <Switch>
            <MainLayout>
                <Route exact path="/" component={Home}/>
                <Route exact path="/list" component={List}/>
                <Route exact path="/list/page/:page" component={List}/>
                <Route exact path="/detail/:id" component={Detail}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/publish" component={Publish}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/about" component={About}/>
            </MainLayout>
        </Switch>;
    }

}

export default Routes;
