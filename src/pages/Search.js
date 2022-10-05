import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  state = {
    licenseBtn: true,
    artistName: '',
    loading: false,
    songs: [],
    name: '',
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
    const { artistName } = this.state;
    this.setState({
      name: artistName,
      loading: true,
      artistName: '',
    });
    const request = await searchAlbumsAPI(artistName);
    this.setState({
      loading: false,
      songs: request,
    });
  };

  render() {
    const { licenseBtn, artistName, loading, songs, name } = this.state;
    const checkExistence = (songs.length > 0) ? (
      <>
        <h2>{`Resultado de álbuns de: ${name}`}</h2>
        {songs.map((element, i) => (
          <ul
            key={ i }
          >
            <Link
              data-testid={ `link-to-album-${element.collectionId}` }
              to={ `/album/${element.collectionId}` }
            >
              {JSON.stringify(element)}
            </Link>
          </ul>))}
      </>) : <span>Nenhum álbum foi encontrado</span>;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist">
            <input
              id="search-artist"
              type="text"
              name="artistName"
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
            Pesquisar
          </button>
        </form>
        { loading ? <Carregando /> : checkExistence}

      </div>
    );
  }
}

export default Search;
