import React from 'react';
import PropTypes from 'prop-types';
// import Carregando from './Carregando';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import style from '../styles/musicCard.module.scss';

class MusicCard extends React.Component {
  state = {
    // isloading: false,
    checked: false,
    favorite: [],
  };

  async componentDidMount() {
    const favoriteRequest = await getFavoriteSongs();
    const { trackId } = this.props;
    const estaLocal = favoriteRequest.find((e) => e.trackId === trackId);
    if (estaLocal) {
      this.setState({
        checked: true,
      });
    }
    this.setState({
      favorite: favoriteRequest,
    });
    this.verifcaLocalStorage();
  }

  verifcaLocalStorage = (param) => {
    const { favorite } = this.state;
    const verifica = favorite.some((element) => element.trackId === param);
    return verifica;
  };

  favoriteSong = async () => {
    const prop = this.props;
    const { favorite } = this.state;
    if (this.verifcaLocalStorage(prop.trackId)) {
      // this.setState({ isloading: true });
      await removeSong(prop);
      const novoFavorito = favorite.filter((e) => e.trackId !== prop.trackId);
      this.setState({
        favorite: novoFavorito,
        // isloading: false,
        checked: false,
      });
    } else {
      // this.setState({ isloading: true });
      await addSong(prop);
      this.setState((prev) => ({
        favorite: [...prev.favorite, prop],
        // isloading: false,
        checked: true,
      }));
    }
  };

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { checked } = this.state;
    return (
      <div className={ style.card }>
        {/* {isloading ? <Carregando /> : ( */}
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
        >
          <input
            data-testid={ `checkbox-music-${trackId}` }
            name="favorita"
            id={ trackId }
            type="checkbox"
            onClick={ this.favoriteSong }
            checked={ checked }
          />
          { checked ? <BsSuitHeartFill /> : <BsSuitHeart /> }
        </label>
        {/* )} */}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
