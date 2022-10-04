import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { album } = this.props;
    console.log(album);
    return (
      <div>
        {album.filter((e) => e.trackName !== undefined)
          .map((element, i) => (
            <section key={ i }>
              <p>{element.trackName}</p>
              <audio
                data-testid="audio-component"
                src={ element.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
            </section>
          ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.shape().isRequired,
};

export default MusicCard;
