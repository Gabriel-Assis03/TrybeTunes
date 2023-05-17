import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
      login: false,
      artistSearch: '',
    };
  }

  handleChangeName = ({ target }) => {
    const { value } = target;
    this.setState((prev) => ({
      ...prev,
      userName: value,
    }));
  };

  loginValidation = () => {
    this.setState((prev) => ({
      ...prev,
      login: true,
    }));
  };

  checkName = () => {
    const { userName } = this.state;
    const tree = 3;
    return userName.length < tree;
  };

  handleChangeSearch = ({ target }) => {
    const { value } = target;
    this.setState((prev) => ({
      ...prev,
      artistSearch: value,
    }));
  };

  resetArtist = () => {
    this.setState((prev) => ({
      ...prev,
      artistSearch: '',
    }));
  };

  checkSearch = () => {
    const { artistSearch } = this.state;
    const two = 2;
    return artistSearch.length < two;
  };

  render() {
    const { userName, login, artistSearch } = this.state;
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          {/* <Route
            exact
            path="/"
            render={ () => (
              <Login
                userName={ userName }
                disabledBut={ this.checkName() }
                onInputChangeName={ this.handleChangeName }
              />
            ) }
          /> */}
          <Route exact path="/">
            { login ? <Redirect to="/search" /> : <Login
              userName={ userName }
              login={ this.loginValidation }
              disabledBut={ this.checkName() }
              onInputChangeName={ this.handleChangeName }
            />}
          </Route>
          <Route exact path="/search">
            <Search
              onInputChangeSearch={ this.handleChangeSearch }
              value={ artistSearch }
              disabledBut={ this.checkSearch() }
              reset={ this.resetArtist }
            />
          </Route>
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
