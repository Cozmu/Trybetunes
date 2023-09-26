import React from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';
import style from '../styles/profile.module.scss';

class Profile extends React.Component {
  state = {
    isLoading: false,
    name: '',
    image: '',
    email: '',
    description: '',
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const request = await getUser();
    console.log(request);
    this.setState({
      isLoading: false,
      name: request.name,
      image: request.image,
      email: request.email,
      description: request.description,
    });
  }

  render() {
    const { isLoading, name, email, image, description } = this.state;
    return (
      <div
        className={ style.main_container }
        data-testid="page-profile"
      >
        <Header />
        {isLoading
          ? (
            <section className={ style.loading_container }>
              <Carregando />
            </section>
          )
          : (
            <main>
              <div className={ style.photo_container }>
                {image ? <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ name }
                /> : <IoPersonCircleOutline className={ style.profile_not_found } />}
              </div>
              <div className={ style.informations_container }>
                <div>
                  <h3>Nome</h3>
                  <p>{name}</p>
                </div>
                <div>
                  {email && <h3>E-mail</h3>}
                  <p>{email}</p>
                </div>
                <div>
                  {description && <h3>Descrição</h3>}
                  <p>{description}</p>
                </div>
                <NavLink
                  className={ style.redirect_button }
                  to="/profile/edit"
                >
                  EDITAR PERFIL
                </NavLink>
              </div>
            </main>
          )}
      </div>
    );
  }
}

export default Profile;
