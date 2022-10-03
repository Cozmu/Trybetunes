import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends React.Component {
  state = {
    loading: true,
    usuario: '',
  };

  async componentDidMount() {
    const data = await getUser();
    this.setState({
      loading: false,
      usuario: data.name,
    });
  }

  render() {
    const { loading, usuario } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Carregando />
          : (
            <div>
              <nav>
                <NavLink data-testid="link-to-search" to="/search">
                  Pesquisa
                </NavLink>
                <NavLink data-testid="link-to-favorites" to="/favorites">
                  Favoritas
                </NavLink>
                <NavLink data-testid="link-to-profile" to="/profile">
                  Perfil
                </NavLink>
              </nav>
              <p data-testid="header-user-name">{ usuario }</p>
            </div>)}
      </header>
    );
  }
}

export default Header;
