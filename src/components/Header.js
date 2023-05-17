import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link data-testid="link-to-search" to="/search">Procurar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}
export default Header;
