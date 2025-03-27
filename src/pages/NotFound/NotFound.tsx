function NotFound() {
  return (
    <div
      className="bg-notfound bg-cover bg-no-repeat flex flex-1 h-screen
      items-center justify-center"
    >
      <p className="text-login-blue text-[7.625rem] mr-10">Ops!</p>
      <p
        className="text-[#00D5E2] text-4xl font-light w-[22.5rem]"
      >
        A página que você está procurando não foi encontrada.
      </p>
    </div>
  );
}

export { NotFound };
