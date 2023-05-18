import React, { Component } from 'react';
import PropTypes from 'prop-types';

// componentes
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      infosAlbum: '',
      data: '',
      loadingData: true,
    };
  }

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    // getMusics(id).then((e) => console.log(e));
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
          loadingData: false,
        }));
      });
    const { infosAlbum, data, loadingData } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { infosAlbum }
        {loadingData || <MusicCard data={ data } />}
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
