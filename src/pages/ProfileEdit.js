import PropTypes from 'prop-types';
import React from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';
import style from '../styles/profileEdit.module.scss';

class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    img: '',
    nome: '',
    email: '',
    descricao: '',
    toggle: true,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const request = await getUser();
    this.setState({
      isLoading: false,
      nome: request.name,
      email: request.email,
      img: request.image,
      descricao: request.description,
    }, this.verification);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verification);
  };

  verification = () => {
    const { nome, email, descricao } = this.state;
    const filledFields = !!nome && !!email && !!descricao;
    this.setState({
      toggle: !filledFields,
    });
  };

  salvar = () => {
    const { img, nome, email, descricao } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    updateUser({ image: img, name: nome, description: descricao, email })
      .then(() => history.push('/profile'));
  };

  render() {
    const { isLoading, img, nome, email, descricao, toggle } = this.state;
    return (
      <div
        className={ style.main_container }
        data-testid="page-profile-edit"
      >
        <Header />
        {isLoading ? (
          <section className={ style.loading_container }>
            <Carregando />
          </section>
        ) : (
          <main>
            <section className={ style.img_container }>
              {img ? <img src={ img } alt="" />
                : <IoPersonCircleOutline className={ style.profile_not_found } />}
            </section>
            <form>
              <label htmlFor="input-name">
                Nome:
                <input
                  id="input-name"
                  name="nome"
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                  value={ nome }
                />
              </label>
              <label htmlFor="input-image">
                Foto:
                <input
                  id="input-image"
                  name="img"
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }
                  value={ img }
                />
              </label>

              <label htmlFor="input-email">
                E-mail:
                <input
                  id="input-email"
                  name="email"
                  data-testid="edit-input-email"
                  onChange={ this.handleChange }
                  value={ email }
                />
              </label>
              <label htmlFor="input-description">
                Descrição:
                <textarea
                  id="input-description"
                  name="descricao"
                  data-testid="edit-input-description"
                  onChange={ this.handleChange }
                  value={ descricao }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ toggle }
                onClick={ this.salvar }
              >
                SALVAR
              </button>
            </form>
          </main>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ProfileEdit;
