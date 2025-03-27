import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

function Layout() {
  return (
    <div className="flex">
      <Header />
      <main className="flex flex-1 ml-[15.625rem] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export { Layout };
