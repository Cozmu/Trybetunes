import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import style from '../styles/favorites.module.scss';
import Carregando from '../components/Carregando';

class Favorites extends React.Component {
  state = {
    storage: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const request = await getFavoriteSongs();
    this.setState({
      storage: request,
      isLoading: false,
    });
  }

  render() {
    const { storage, isLoading } = this.state;
    return (
      <div
        className={ style.favotire_container }
        data-testid="page-favorites"
      >
        <Header />

        {isLoading
          ? (
            <section className={ style.loading_container }>
              <Carregando />
            </section>
          ) : (
            <div className={ style.main_container }>
              <section className={ style.title_main }>
                <h2>FAVORITOS</h2>
              </section>
              <section className={ style.content_main }>
                {
                  storage.map((e, i) => (
                    <MusicCard
                      key={ i }
                      { ...e }
                    />
                  ))
                }
              </section>
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
