import React, { Component } from 'react';

// componentes
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      data: '',
      loadingData: false,
    };
  }

  removeFav = (id) => {
    const { data } = this.state;
    const music = data.filter((e) => e.trackId === id);
    removeSong(music[0])
      .then(() => {
        this.setState((prev) => ({
          ...prev,
          loadingFav: true,
        }));
      });
  };

  render() {
    const { data, loadingData } = this.state;
    getFavoriteSongs()
      .then((listFav) => {
        this.setState((prev) => ({
          ...prev,
          data: listFav,
          loadingData: true,
        }));
      });
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {loadingData
            ? (
              data.map((e) => {
                const { trackId, trackName, previewUrl } = e;
                return (<MusicCard
                  key={ trackId }
                  trackId={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  favorite={ this.removeFav }
                />);
              })
            )
            : <p>Carregando...</p>}
        </div>
      </div>
    );
  }
}

export default Favorites;
