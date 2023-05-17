import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// componentes
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      inputEBut: true,
      currentArtist: '',
      list: '',
    };
  }

  onClick = () => {
    const { value, reset } = this.props;
    this.setState((prev) => ({
      ...prev,
      inputEBut: false,
      list: '',
    }));
    searchAlbumsAPI(value)
      .then((result) => result.map((e) => {
        const { artworkUrl100, artistId, collectionName, artistName, collectionId } = e;
        return (
          <div key={ artistId } className="albuns">
            <img src={ artworkUrl100 } alt="Foto do album" />
            <h3>{collectionName}</h3>
            <p>{artistName}</p>
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              Album
            </Link>
          </div>
        );
      }))
      .then((list) => {
        this.setState((prev) => ({
          ...prev,
          list,
          loading: false,
          currentArtist: value,
          inputEBut: true,
        }));
        reset();
      });
  };

  render() {
    const { onInputChangeSearch, value, disabledBut } = this.props;
    const { loading, currentArtist, inputEBut, list } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          inputEBut ? (
            <>
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
                onClick={ () => this.onClick() }
                disabled={ disabledBut }
              >
                Pesquisar
              </button>

            </>
          ) : <h2>Carregando...</h2>
        }

        {
          (loading || (
            <>
              <h2>{ `Resultado de álbuns de: ${currentArtist}` }</h2>
              {
                list.length === 0 ? <h2>Nenhum álbum foi encontrado</h2> : list
              }
            </>
          ))
        }
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  disabledBut: PropTypes.bool.isRequired,
  onInputChangeSearch: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Search;
