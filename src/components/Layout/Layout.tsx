import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

function Layout() {
  return (
    <div className="flex">
      <Header />
      <main className="flex flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export { Layout };
