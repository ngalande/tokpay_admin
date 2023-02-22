import axios from "axios";
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { keys } from "./variables";

const AuthContext = createContext();
export const LoadingContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("tokens")) {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      return jwt_decode(tokens.token);
    }
    return null;
  });
  const [loading, setLoading] = useState(false)
 
  const navigate = useNavigate();
 
  const login = async (payload) => {
    setLoading(true)
    axios
      .post(keys.API_URL+'/admin/auth', payload)
      .then(response => {
        setLoading(false)
        localStorage.setItem("tokens",  JSON.stringify(response.data));
        setUser(jwt_decode(response.data.token));
        // alert('Looged in')
        navigate("/home");
      }).catch(err =>{
        setLoading(false)
        // let status = err.response.status
        // console.log(err.response.status)
        if(err.response.status == 404){
            alert('Account does not Exist')
        }else if(err.response.status == 400){
            alert('Incorrect password/email')

        }else{
            alert('Internal Error Occurred')
        }
      })

      
    };
    const logout = async () => {
      // invoke the logout API call, for our NestJS API no logout API
   
      localStorage.removeItem("tokens");
      setUser(null);
      navigate("/");
    };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
        <LoadingContext.Provider value={[loading, setLoading]}>
            {children}

        </LoadingContext.Provider>
    </AuthContext.Provider>
  );
};
 
export default AuthContext;