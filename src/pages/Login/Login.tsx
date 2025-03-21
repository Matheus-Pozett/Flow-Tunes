import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import { Loading } from '../../components';

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
    <div>
      <img src="/src/images/logo.svg" alt="logo da aplicação" />
      <form onSubmit={ handleSubmitForm }>
        <input
          type="text"
          data-testid="login-name-input"
          placeholder="Qual é o seu nome?"
          value={ inputValue }
          onChange={ handleChangeLogin }
        />
        <button
          disabled={ inputValue.length < 3 }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export { Login };
