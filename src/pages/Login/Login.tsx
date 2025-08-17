import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import { Loading } from '../../components';
import logo from '../../images/logo.svg';

function Login() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await createUser({ name: inputValue });
      setInputValue('');
      navigate('/search');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section
      className="bg-login bg-no-repeat bg-cover h-screen flex justify-center
        items-center p-4"
    >
      <div
        className="
        bg-white w-full max-w-lg h-auto rounded-2xl flex flex-col
        items-center p-8 md:w-[46.875rem] md:h-[28.125rem] md:p-0"
      >
        <img
          src={ logo }
          alt="logo da aplicação"
          className="w-[11.688rem] h-auto mt-10 md:mt-28"
        />
        <form
          onSubmit={ handleSubmitForm }
          className="flex flex-col mt-10 md:mt-14 gap-2.5 w-full md:w-auto"
        >
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Qual é o seu nome?"
            value={ inputValue }
            onChange={ handleChangeLogin }
            className="
            w-full md:w-[25rem] h-10 text-center rounded-full border border-login-blue
            text-login-blue placeholder:text-login-blue placeholder:text-sm font-normal"
          />
          <button
            disabled={ inputValue.length < 3 }
            data-testid="login-submit-button"
            className="rounded-full bg-login-blue w-full md:w-[25rem] h-10 uppercase
              text-white
            font-bold text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}

export { Login };
