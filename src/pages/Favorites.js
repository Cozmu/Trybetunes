import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import style from '../styles/favorites.module.scss';

class Favorites extends React.Component {
  state = {
    storage: [],
  };

  async componentDidMount() {
    const request = await getFavoriteSongs();
    this.setState({
      storage: request,
    });
  }

  render() {
    const { storage } = this.state;
    return (
      <div
        className={ style.favotire_container }
        data-testid="page-favorites"
      >
        <Header />
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
      </div>
    );
  }
}

export default Favorites;
