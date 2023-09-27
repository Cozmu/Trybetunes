import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import style from '../styles/search.module.scss';

class Search extends React.Component {
  state = {
    licenseBtn: true,
    artistName: '',
    loading: false,
    songs: [],
    name: '',
    firstRequest: false,
  };

  enableBtn = () => {
    const { artistName } = this.state;
    const two = 2;
    const validation = artistName.length >= two;
    this.setState({ licenseBtn: !validation });
  };

  onInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => this.enableBtn());
  };

  searchArtist = async () => {
    console.log('entrou');
    const { artistName } = this.state;
    this.setState({
      name: artistName,
      loading: true,
      artistName: '',
    });
    const request = await searchAlbumsAPI(artistName);
    console.log(request);
    this.setState({
      loading: false,
      songs: request,
      firstRequest: true,
    }, () => this.enableBtn());
  };

  render() {
    const { licenseBtn, artistName, loading, songs, name, firstRequest } = this.state;
    const checkfirstRequest = firstRequest && (
      <div className={ style.temporary_container }>
        <span>Nenhum álbum foi encontrado</span>
      </div>
    );
    const checkExistence = (songs.length > 0) ? (
      <div className={ style.cards_container }>
        <h2>{`Resultado de álbuns de: ${name}`}</h2>
        <ul
          className={ style.cards }
        >
          {songs.map((element, i) => (
            <li
              key={ i }
            >
              <Link
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >
                <img alt={ element.collectionName } src={ element.artworkUrl100 } />
                <h3>{element.collectionName}</h3>
              </Link>
            </li>))}
        </ul>
      </div>) : checkfirstRequest;

    return (
      <div
        className={ style.main_container }
        data-testid="page-search"
      >
        <Header />
        <main>
          <form className={ style.form_container }>
            <label htmlFor="search-artist">
              <input
                id="search-artist"
                type="text"
                name="artistName"
                placeholder="NOME DO ARTISTA"
                value={ artistName }
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="button"
              onClick={ this.searchArtist }
              disabled={ licenseBtn }
            >
              PESQUISAR
            </button>
          </form>
          { loading
            ? (
              <div className={ style.temporary_container }>
                <Carregando />
              </div>
            ) : checkExistence }
        </main>

      </div>
    );
  }
}

export default Search;
