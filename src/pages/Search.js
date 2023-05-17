import React, { Component } from 'react';

// componentes
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { onInputChangeSearch, value, disabledBut } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Pesquisar"
            value={ value }
            onChange={ onInputChangeSearch }
          />
        </form>
        <button
          data-testid="search-artist-button"
          // onClick={}
          disabled={ disabledBut }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
