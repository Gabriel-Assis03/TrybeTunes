import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: '',
    };
    getUser().then((user) => {
      this.setState((prev) => ({
        ...prev,
        userInfo: user,
      }));
    });
  }

  render() {
    const { userInfo } = this.state;
    return (
      <header data-testid="header-component">
        {
          userInfo === '' ? <h1>Carregando...</h1>
            : <h1 data-testid="header-user-name">{ userInfo.name}</h1>
        }
      </header>
    );
  }
}
export default Header;
