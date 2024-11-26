import { createContext, useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwt(localStorage.getItem('authTokens')) : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  // let updateToken = async ()=> {

  //     let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
  //         method:'POST',
  //         headers:{
  //             'Content-Type':'application/json'
  //         },
  //         body:JSON.stringify({'refresh':authTokens?.refresh})
  //     })

  //     let data = await response.json()

  //     if (response.status === 200){
  //         setAuthTokens(data)
  //         setUser(jwt(data.access))
  //         localStorage.setItem('authTokens', JSON.stringify(data))
  //     }else{
  //         logoutUser()
  //     }

  //     if(loading){
  //         setLoading(false)
  //     }
  // }

  const contextData = {
    user,
    authTokens,
    setAuthTokens,
    setUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens && authTokens.access) {
      try {
        const decodedToken = jwt(authTokens.access);
        setUser(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error.message);
        logoutUser(); // Logout the user if the token is invalid
      }
    }
    setLoading(false);
  }, [authTokens, loading]);

  return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};
