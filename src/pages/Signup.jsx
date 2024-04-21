import axios from 'axios';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { API } from '../constants/api';

const Signup = () => {
  const navigate = useNavigate();
  const { setState } = useAuth();
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
            className='bg-blue-700 text-white p-2 px-4 rounded-md'
          >
            Signup with Linkedin
          </button>

          <p className='my-4'>-------------OR-------------</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
