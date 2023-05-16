import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Album from './pages/Album';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
    };
  }

  handleChangeName = ({ target }) => {
    const { value } = target;
    this.setState((prev) => ({
      ...prev,
      userName: value,
    }));
  };

  checkName = () => {
    const { userName } = this.state;
    const tree = 3;
    return userName.length < tree;
  };

  render() {
    const { userName } = this.state;
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Login
                userName={ userName }
                disabledBut={ this.checkName() }
                onInputChangeName={ this.handleChangeName }
              />
            ) }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
