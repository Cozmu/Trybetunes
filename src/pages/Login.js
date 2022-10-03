import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  state = {
    license: true,
    usuario: '',
    loading: false,
  };

  enableBtn = () => {
    const { usuario } = this.state;
    const three = 3;
    const validation = usuario.length >= three;
    this.setState({ license: !validation });
  };

  onInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => this.enableBtn());
  };

  submite = async () => {
    const { history } = this.props;
    const { usuario } = this.state;
    this.setState({ loading: true });
    await createUser({ name: usuario });
    history.push('/search');
  };

  render() {
    const { license, usuario, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Carregando />
          : (
            <form>
              <label htmlFor="name-input">
                <input
                  id="name-input"
                  name="usuario"
                  data-testid="login-name-input"
                  onChange={ this.onInputChange }
                  value={ usuario }
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ license }
                onClick={ this.submite }
              >
                Entrar
              </button>
            </form>)}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
