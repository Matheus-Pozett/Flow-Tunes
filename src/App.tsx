import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Login, Search } from './pages';
import { AlbumType } from './types';

function App() {
  const [artistName, setArtistName] = useState('');
  const [songList, setSongList] = useState<AlbumType[]>([]);

  return (
    <div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route
          path="/search"
          element={ <Search
            artistName={ artistName }
            songList={ songList }
            setArtistName={ setArtistName }
            setSongList={ setSongList }
          /> }
        />
        {/*
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
        <Route path="/*" element={ <NotFound /> } /> */}
      </Routes>
    </div>
  );
}

export default App;
