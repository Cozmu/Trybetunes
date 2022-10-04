import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  state = {
    licenseBtn: true,
    artistName: '',
    loading: false,
    fraseDeBusca: 
    // songs: [],
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
      artistName: '',
      loading: true,
    });
    const request = await searchAlbumsAPI(artistName);
    this.setState({
      loading: false,
      songs: request,
    });
    console.log(request);
  };

  render() {
    const { licenseBtn, artistName, loading, songs } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Carregando />
          : (
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
            </form>)}
      </div>
    );
  }
}

export default Search;
