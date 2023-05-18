import React, { Component } from 'react';

// componentes
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

  }

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const musics = getMusics(id).then((e) => console.log(e));
    console.log(musics);
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
