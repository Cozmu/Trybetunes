import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    album: [],
    name: '',
    albumName: '',
    favorite: [],
  };

  async componentDidMount() {
    const favoriteRequest = await getFavoriteSongs();
    // console.log(favoriteRequest);
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    this.setState({
      album: request,
      favorite: favoriteRequest,
      name: request[0].artistName,
      albumName: request[0].collectionName,
    });
  }

  render() {
    const { album, name, albumName, favorite } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{name}</h2>
        <h3 data-testid="album-name">{albumName}</h3>
        {album.filter((e) => e.trackName !== undefined)
          .map((element, i) => (<MusicCard
            key={ i }
            { ...element }
            favorite={ favorite }
          />))}
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
