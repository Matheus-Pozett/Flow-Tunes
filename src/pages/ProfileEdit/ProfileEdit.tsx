import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components';
import { getUser, updateUser } from '../../services/userAPI';
import { USER_VALUES, UserType } from '../../types';
import userimg from '../../images/user.webp';

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
    <div className="bg-loading flex flex-col flex-1">
      <form
        onSubmit={ handleClick }
        className="bg-[#EFF3F9] mt-56 flex flex-1 items-center justify-center
        p-8 relative"
      >
        <div
          className=" absolute top-0 left-20 -translate-y-1/2 flex flex-col
        gap-4 items-center"
        >
          <img
            src={ userimg }
            alt="Foto do usuario"
            className="w-60 h-60  border-4 border-white shadow-lg rounded-full"
          />
          <input
            type="text"
            name="image"
            data-testid="edit-input-image"
            placeholder="Insira um link"
            className="w-48 h-[2.313rem] mt-2.5 border border-[#3D495C]
            bg-inherit text-center text-[#444955] placeholder:text-[#444955]
            placeholder:text-sm"
            value={ user.image }
            onChange={ handleChange }
          />
        </div>

        <div className="h-full flex flex-col gap-4 ml-20">
          <div className="flex flex-col">
            <label
              htmlFor="input-name"
              className="text-[#3D495C] font-bold"
            >
              Nome
            </label>
            <p
              className="text-xs text-[#3D495C]"
            >
              Fique à vontade para usar seu nome social
            </p>
            <input
              type="text"
              name="name"
              id="input-name"
              data-testid="edit-input-name"
              placeholder="Digite seu nome"
              className="w-72 h-[2.313rem] mt-2.5 border-b border-[#3D495C] bg-inherit"
              value={ user.name }
              onChange={ handleChange }
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="input-email"
              className="text-[#3D495C] font-bold"
            >
              E-mail
            </label>
            <p
              className="text-xs text-[#3D495C]"
            >
              Escolha um e-mail que consulte diariamente
            </p>
            <input
              type="text"
              name="email"
              id="input-email"
              data-testid="edit-input-email"
              placeholder="Digite seu e-mail"
              className="w-72 h-[2.313rem] mt-2.5 border-b border-[#3D495C]"
              value={ user.email }
              onChange={ handleChange }
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="input-descri"
              className="text-[#3D495C] font-bold"
            >
              Descrição
            </label>
            <textarea
              name="description"
              id="input-descri"
              data-testid="edit-input-description"
              placeholder="Sobre mim"
              className="w-[30.625rem] h-[6.625rem] p-2 mt-2.5 border-b border-[#3D495C]"
              value={ user.description }
              onChange={ handleChange }
            />
          </div>
          <button
            data-testid="edit-button-save"
            className="bg-login-blue w-[9.5rem] h-10 rounded-full text-sm
            text-white uppercase font-bold"
            disabled={ !formIsValid }
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export { ProfileEdit };
