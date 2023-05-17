import React, { Component } from 'react';

// componentes
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input data-testid="search-artist-input" type="text" placeholder="Pesquisar" />
        </form>
      </div>
    );
  }
}

export default Search;
