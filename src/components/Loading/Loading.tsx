import './loading.css';

function Loading() {
  return (
    <div
      className="flex flex-col h-screen items-center justify-center bg-loading
    bg-no-repeat bg-cover flex-1"
    >
      <div className="loader" />
      <h1 className="font-normal text-login-blue text-5xl">Carregando...</h1>
    </div>
  );
}

export { Loading };
