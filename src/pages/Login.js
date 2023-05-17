import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.setState((prev) => ({
      ...prev,
      loading: true,
    }));
    // const mil = 1000;
    // const c = new Promise((resolve) => {
    //   createUser({ name: userName });
    //   setTimeout(() => {
    //     resolve(login());
    //   }, mil);
    // });
    // console.log(c);
    createUser({ name: userName }).then(() => login());
  };

  render() {
    const { userName, disabledBut, onInputChangeName } = this.props;
    const { loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading ? <h1>Carregando...</h1>
            : (
              <>
                <input
                  type="text"
                  data-testid="login-name-input"
                  name="name"
                  value={ userName }
                  onChange={ onInputChangeName }
                  placeholder="Nome"
                />
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
            )
        }

      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  disabledBut: PropTypes.bool.isRequired,
  onInputChangeName: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Login;
