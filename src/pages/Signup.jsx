import axios from 'axios';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { API } from '../constants/api';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const { setState } = useAuth();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { linkedInLogin } = useLinkedIn({
    clientId: import.meta.env.VITE_CLIENT_ID,
    redirectUri: `${window.location.origin}/linkedin`,
    scope: 'email openid profile',
    closePopupMessage: true,
    onSuccess: async (code) => {
      const { access_token } = await getAccessToken(code);
      const user = await getUser(access_token);
      setState(user);
      navigate('/home');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const getUser = async (access_token) => {
    try {
      const res = await axios.post(`${API}/auth/linkedin/user`, {
        access_token,
      });

      console.log(res);

      if (res.status === 200) return res.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const getAccessToken = async (code) => {
    try {
      const response = await axios.post(`${API}/auth/linkedin/access_token`, {
        code,
      });

      return response.data.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(values);
  };

  return (
    <div className='min-h-screen bg-gray-200 flex justify-center items-center'>
      <div className='bg-white border border-gray-300 rounded-md w-[90%] max-w-[480px]'>
        {/* header */}
        <div className='p-4 border-b'>
          <h1 className='text-xl font-semibold text-center'>
            Hey there, let&apos;s sign up
          </h1>
        </div>
        {/* content */}
        <div className='p-4 flex flex-col justify-center items-center'>
          <button
            onClick={linkedInLogin}
            className='bg-blue-600 text-white p-2 px-4 rounded-md'
          >
            Signup with Linkedin
          </button>

          <p className='my-4 text-gray-500'>-------------OR-------------</p>

          <form
            onSubmit={handleFormSubmit}
            className='w-full block max-w-[360px] mx-auto'
          >
            <div>
              <label
                htmlFor='email'
                className='my-2 block text-lg font-medium text-gray-500'
              >
                Email
              </label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='eg. abc@gmail.com'
                className='block w-full border border-gray-300 rounded-md p-2 my-2'
                value={values.email}
                onChange={(e) =>
                  setValues({
                    ...values,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='my-2 block text-lg font-medium text-gray-500'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='enter password'
                className='block w-full border border-gray-300 rounded-md p-2 my-2'
                value={values.password}
                onChange={(e) =>
                  setValues({
                    ...values,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <button
              disabled={
                values.email.length === 0 && values.password.length === 0
              }
              className='w-full block p-2 mt-6 mb-4 text-lg tracking-wider font-semibold rounded-md text-center disabled:bg-blue-400 bg-blue-600 text-white'
            >
              Signup with email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
