import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

function Layout() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Header />
      <main className="hidden lg:flex lg:flex-1 lg:ml-[15.625rem] lg:min-h-screen">
        <Outlet />
      </main>
      <main className="lg:hidden flex flex-col min-h-screen pt-20 pb-16">
        <Outlet />
      </main>
    </div>
  );
}

export { Layout };
