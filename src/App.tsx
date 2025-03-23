import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Album, Login, Search } from './pages';
import { AlbumType } from './types';
import { Layout } from './components';

function App() {
  const [artistName, setArtistName] = useState('');
  const [albumList, setAlbumList] = useState<AlbumType[]>([]);

  return (
    <div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <Layout /> }>
          <Route
            path="/search"
            element={ <Search
              artistName={ artistName }
              albumList={ albumList }
              setArtistName={ setArtistName }
              setAlbumList={ setAlbumList }
            /> }
          />
          <Route path="/album/:id" element={ <Album /> } />
        </Route>
        {/*
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
        <Route path="/*" element={ <NotFound /> } /> */}
      </Routes>
    </div>
  );
}

export default App;
