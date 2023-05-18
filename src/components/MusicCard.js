import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { data, favorite } = this.props;
    const listMusic = data.map((e) => (
      <div key={ e.trackId }>
        <p>{ e.trackName }</p>
        <audio data-testid="audio-component" src={ e.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${e.trackId}` }>
          Favorita
          <input type="checkbox" onChange={ favorite } />
        </label>
      </div>
    ));
    // listMusic.shift();
    return listMusic;
  }
}

MusicCard.propTypes = {
  data: PropTypes.string.isRequired,
  favorite: PropTypes.func.isRequired,
};

export default MusicCard;
