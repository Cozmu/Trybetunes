import React from 'react';
import PropTypes from 'prop-types';
import Carregando from '../pages/Carregando';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isloading: false,
    checked: false,
  };

  verifica = (mscFavorita) => {
    const { favorite } = this.props;
    return favorite.some((element) => element.trackId === mscFavorita.trackId);
  };

  favoriteSong = async (e) => {
    // console.log(e);
    if (this.verifica(e)) {
      this.setState({ isloading: true });
      await removeSong(e);
      this.setState({
        isloading: false,
        checked: false,
      });
    } else {
      this.setState({
        isloading: true,
      });
      await addSong(e);
      this.setState({
        isloading: false,
        checked: true,
      });
    }
  };

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { isloading, checked } = this.state;
    return (
      <div>
        {isloading ? <Carregando /> : (
          <section>
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
              htmlFor="favorita"
            >
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                name="favorita"
                id="favorita"
                type="checkbox"
                onClick={ () => this.favoriteSong(this.props) }
                defaltChecked={ checked }
              />
            </label>
          </section>
        )}
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
