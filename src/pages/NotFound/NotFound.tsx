function NotFound() {
  return (
    <div
      className="bg-notfound bg-cover bg-no-repeat flex flex-1 h-screen
                    items-center justify-center p-4"
    >

      <div
        className="flex flex-col sm:flex-row items-center justify-center
                      text-center sm:text-left gap-4 sm:gap-10"
      >

        <p
          className="text-login-blue text-6xl sm:text-[7.625rem] font-bold
                      leading-none"
        >
          Ops!
        </p>

        <p
          className="text-[#00D5E2] text-xl sm:text-4xl font-light
                      max-w-[22.5rem] leading-tight"
        >
          A página que você está procurando não foi encontrada.
        </p>
      </div>
    </div>
  );
}

export { NotFound };
