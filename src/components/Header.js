import React from 'react';
import { NavLink } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import style from '../styles/header.module.scss';
import logo from '../img/logo.png';

class Header extends React.Component {
  state = {
    loading: true,
    userName: '',
    userPicture: '',
  };

  async componentDidMount() {
    const data = await getUser();
    this.setState({
      loading: false,
      userName: data.name,
      userPicture: data.image,
    });
  }

  render() {
    const { loading, userName, userPicture } = this.state;
    return (
      <header
        className={ style.header_container }
        data-testid="header-component"
      >
        {loading ? <Carregando />
          : (
            <>
              <img alt="logo" className={ style.logo } src={ logo } />
              <nav>
                <NavLink data-testid="link-to-search" to="/search">
                  <GrSearch />
                  Pesquisa
                </NavLink>
                <NavLink data-testid="link-to-favorites" to="/favorites">
                  Favoritas
                </NavLink>
                <NavLink data-testid="link-to-profile" to="/profile">
                  Perfil
                </NavLink>
              </nav>
              <section>
                <img src={ userPicture } alt={ userName } />
                <p data-testid="header-user-name">{ userName }</p>
              </section>
            </>)}
      </header>
    );
  }
}

export default Header;
