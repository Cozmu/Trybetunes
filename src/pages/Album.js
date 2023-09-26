import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import style from '../styles/album.module.scss';

class Album extends React.Component {
  state = {
    album: [],
    name: '',
    albumName: '',
    albumCape: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    console.log(request[0]);
    this.setState({
      album: request,
      name: request[0].artistName,
      albumName: request[0].collectionName,
      albumCape: request[0].artworkUrl100,
    });
  }

  render() {
    const { album, name, albumName, albumCape } = this.state;
    return (
      <div
        className={ style.main_container }
        data-testid="page-album"
      >
        <Header />
        <main>
          <section className={ style.presentation_container }>
            <div className={ style.cape_container }>
              <img alt={ albumName } src={ albumCape } />
            </div>
            <div className={ style.album_and_artist }>
              <h2 data-testid="album-name">{albumName}</h2>
              <h3 data-testid="artist-name">{name}</h3>
            </div>
          </section>
          <section className={ style.cards_container }>
            {album.filter((e) => e.trackName !== undefined)
              .map((element, i) => (
                <MusicCard
                // favoriteSongs={} // elevar estado e criar função que manipula ele
                  key={ i }
                  { ...element }
                />))}
          </section>
        </main>
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
