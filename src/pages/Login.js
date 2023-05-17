import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  onClick = () => {
    const { userName, login } = this.props;
    const mil = 1000;
    this.setState((prev) => ({
      ...prev,
      loading: true,
    }));
    const c = new Promise((resolve) => {
      createUser({ name: userName });
      setTimeout(() => {
        resolve(login());
      }, mil);
    });
  };

  render() {
    const { userName, disabledBut, onInputChangeName } = this.props;
    const { loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading
            ? <h1>Carregando...</h1>
            : <>
              <label htmlFor="name">
                <input
                  type="text"
                  data-testid="login-name-input"
                  name="name"
                  value={ userName }
                  onChange={ onInputChangeName }
                />
              </label>
              <button
                data-testid="login-submit-button"
                name="entrar"
                title="Entrar"
                disabled={ disabledBut }
                onClick={ this.onClick }
              >
                Entrar
              </button>
            </>
        }

      </div>
    );
  }
}

export default Login;
