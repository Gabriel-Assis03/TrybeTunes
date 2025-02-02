import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  render() {
    const { checked } = this.state;
    const { trackId, trackName, previewUrl, favorite, favoritsList } = this.props;
    console.log(favoritsList);
    const checkFavSong = favoritsList.some((e) => e.trackId === trackId);
    this.setState((prev) => ({
      ...prev,
      checked: checkFavSong,
    }));
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            onClick={ () => favorite(trackId) }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  favoritsList: PropTypes.string.isRequired,
  favorite: PropTypes.func.isRequired,
};

export default MusicCard;
