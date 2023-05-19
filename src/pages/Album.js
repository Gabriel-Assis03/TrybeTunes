import React, { Component } from 'react';
import PropTypes from 'prop-types';

// componentes
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      infosAlbum: '',
      data: '',
      loadingData: false,
      loadingFav: true,
    };
  }

  favorite = (id) => {
    const { data } = this.state;
    this.setState((prev) => ({
      ...prev,
      loadingFav: false,
    }));
    getFavoriteSongs()
      .then((listFav) => {
        const checkFavSong = listFav.some((e) => e.trackId === id);
        console.log(checkFavSong);
        if (!checkFavSong) {
          const music = data.filter((e) => e.trackId === id);
          addSong(music[0])
            .then(() => {
              this.setState((prev) => ({
                ...prev,
                loadingFav: true,
              }));
            });
        } else {
          const music = data.filter((e) => e.trackId === id);
          removeSong(music[0])
            .then(() => {
              this.setState((prev) => ({
                ...prev,
                loadingFav: true,
              }));
            });
        }
      });
  };

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    getMusics(id)
      .then((data) => (
        <div key={ data[0].collectionId }>
          <h3 data-testid="artist-name">{ data[0].artistName }</h3>
          <p data-testid="album-name">{ data[0].collectionName }</p>
        </div>
      ))
      .then((infosAlbum) => {
        this.setState((prev) => ({
          ...prev,
          infosAlbum,
        }));
      });
    getMusics(id)
      .then((data) => {
        this.setState((prev) => ({
          ...prev,
          data,
          loadingData: true,
        }));
      });
    const { infosAlbum, data, loadingData, loadingFav } = this.state;
    return (
      <div data-testid="page-album">
        {
          loadingFav
            ? (
              <>
                <Header />
                { infosAlbum }
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
              </>
            )
            : (<h1>Carregando...</h1>)
        }
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
