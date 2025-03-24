import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components';
import { getUser, updateUser } from '../../services/userAPI';
import { USER_VALUES, UserType } from '../../types';

function ProfileEdit() {
  const [user, setUser] = useState<UserType>(USER_VALUES);
  const [loading, setLoading] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const formValidate = (userdata: UserType) => {
    const nameIsValid = userdata.name.trim() !== '';
    const emailIsValid = userdata.email.trim() !== '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailValidate = emailRegex.test(userdata.email);

    setFormIsValid(nameIsValid && emailIsValid && emailValidate);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const updatedFormValues = {
      ...user,
      [name]: value,
    };
    setUser(updatedFormValues);
    formValidate(updatedFormValues);
  };

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const newDataUser = {
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    };

    await updateUser(newDataUser);
    navigate('/profile');
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <form onSubmit={ handleClick }>
      <div>
        <img src={ user.image } alt="Foto do usuario" />
        <input
          type="text"
          name="image"
          data-testid="edit-input-image"
          value={ user.image }
          onChange={ handleChange }
        />
      </div>

      <div>
        <label htmlFor="input-name">Nome</label>
        <input
          type="text"
          name="name"
          id="input-name"
          data-testid="edit-input-name"
          value={ user.name }
          onChange={ handleChange }
        />
      </div>

      <div>
        <label htmlFor="input-email">E-mail</label>
        <input
          type="text"
          name="email"
          id="input-email"
          data-testid="edit-input-email"
          value={ user.email }
          onChange={ handleChange }
        />
      </div>

      <div>
        <label htmlFor="input-descri">Descrição</label>
        <textarea
          name="description"
          id="input-descri"
          data-testid="edit-input-description"
          value={ user.description }
          onChange={ handleChange }
        />
      </div>
      <button
        data-testid="edit-button-save"
        disabled={ !formIsValid }
      >
        Salvar
      </button>
    </form>
  );
}

export { ProfileEdit };
