import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    isLoading: false,
    userApi: [],
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const request = await getUser();
    this.setState({
      isLoading: false,
      userApi: [request],
    });
  }

  render() {
    const { isLoading, userApi } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Carregando />
          : userApi.map((e, i) => (
            <section key={ i }>
              <h4>PERFIL</h4>
              <img
                data-testid="profile-image"
                src={ e.image }
                alt={ e.name }
              />
              <p><b>Nome</b></p>
              <p>{e.name}</p>
              <p><b>E-mail</b></p>
              <p>{e.email}</p>
              <p><b>Descrição</b></p>
              <p>{e.description}</p>
              <NavLink to="/profile/edit">Editar perfil</NavLink>
            </section>
          ))}
      </div>
    );
  }
}

export default Profile;
