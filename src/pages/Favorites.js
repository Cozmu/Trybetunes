import React from 'react';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    storage: [],
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const request = await getFavoriteSongs();
    this.setState({
      storage: request,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, storage } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? <Carregando />
          : storage.map((e, i) => (
            <MusicCard
              key={ i }
              { ...e }
            />
          )) }
      </div>
    );
  }
}

export default Favorites;
