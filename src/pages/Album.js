import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    album: [],
    isLoading: true,
    name: '',
    albumName: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    console.log(request, request.collectionName);
    this.setState({
      album: request,
      name: request[0].artistName,
      albumName: request[0].collectionName,
      isLoading: false,
    });
  }

  render() {
    const { album, isLoading, name, albumName } = this.state;
    const conteudo = (
      <div>
        <h2
          data-testid="artist-name"
        >
          {name}
        </h2>
        <h3
          data-testid="album-name"
        >
          {albumName}
        </h3>
        <MusicCard album={ album } />
      </div>
    );
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Carregando /> : conteudo}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
