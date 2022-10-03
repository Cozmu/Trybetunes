import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    licenseBtn: true,
    artistName: '',
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

  render() {
    const { licenseBtn, artistName } = this.state;
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
            onClick={ () => {} }
            disabled={ licenseBtn }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
