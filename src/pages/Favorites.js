import React, { Component } from 'react';

// componentes
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      data: '',
      loadingData: false,
    };
  }

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
              data.map((e, index) => {
                const { trackId, trackName, previewUrl } = e;
                if (index !== 0) {
                  return (<MusicCard
                    key={ trackId }
                    trackId={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    favorite={ this.favorite }
                  />);
                }
                return null;
              })
            )
            : <p>Carregando...</p>}
        </div>
      </div>
    );
  }
}

export default Favorites;
