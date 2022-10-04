import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    album: [],
    // isLoading: true,
    name: '',
    albumName: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    this.setState({
      album: request,
      name: request[0].artistName,
      albumName: request[0].collectionName,
      // isLoading: false,
    });
  }

  render() {
    const { album, name, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{name}</h2>
        <h3 data-testid="album-name">{albumName}</h3>
        {album.filter((e) => e.trackName !== undefined)
          .map((element, i) => (<MusicCard key={ i } { ...element } />))}
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
