import './loading.css';

function Loading() {
  return (
    <div
      className="flex flex-col h-screen items-center justify-center bg-loading
                    bg-no-repeat bg-cover flex-1 p-4"
    >

      <div className="loader mb-6 sm:mb-10" />

      <h1
        className="font-normal text-login-blue text-2xl sm:text-5xl text-center
                     leading-tight"
      >
        Carregando...
      </h1>
    </div>
  );
}

export { Loading };
