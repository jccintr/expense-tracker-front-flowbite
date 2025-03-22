
import { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput,Alert, Spinner } from 'flowbite-react';
import AuthContext from '../context/AuthContext';
import api from "../api/api";
import { Card } from "flowbite-react";

const Login = () => {
  const [formData,setFormData] = useState({email:'',password:''});
  const [errorMessage,setErrorMessage] = useState(null);
  const {setToken,setLoggedUser} = useContext(AuthContext);
  const [isLoading,setIsloading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]: e.target.value.trim()});
}


const handleSubmit = async (e) => {

    e.preventDefault();

    setErrorMessage(null);

    if(formData.email.trim().length === 0){
       setErrorMessage("Informe o email por favor.");
        return;
      }
      
      if(formData.password.trim().length === 0){
        setErrorMessage("Informe a senha por favor.");
        return;
      }

     setIsloading(true);
      try {
        var response = await api.login(formData.email, formData.password);
     } catch (error) {
        setIsloading(false);
        setErrorMessage('Serviço indisponível. Tente novamente mais tarde.')
        return;
     }

     if(response.status!==200){
        setIsloading(false);
        setErrorMessage('Email e ou senha inválidos.');
        return;
    }

    const jsonToken = await response.json();
    setToken(jsonToken.token);
    

    try {
        response = await api.validateToken(jsonToken.token);
      } catch (error) {
        setIsloading(false);
        setErrorMessage('Serviço indisponível. Tente novamente mais tarde.')
         return;
      }
     
      if(response.ok){
         let jsonUser = await response.json();
         setLoggedUser(jsonUser);
         navigate('/?page=transactions');
         setIsloading(false);
      
      }
   
}

  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-gray-100">
       <Card className="w-[350px]">
            <img src='logo350.png' alt='logo' className='w-8/12 m-auto' />
            <Label className="w-full text-center text-xl font-semibold" >Expense Tracker</Label>
            <Label className="w-full text-center text-sm text-gray-500">Informe suas credenciais para acessar o sistema</Label>
            <div>
              <Label value='Email' className="font-semibold"/> 
              <TextInput className="mt-1" type='email' placeholder='Digite o seu email' id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value='Senha' className="font-semibold"/>
              <TextInput className="mt-1" type='password' placeholder='Digite a sua senha' id="password" onChange={handleChange}/>
            </div>
            <Button color='dark'  onClick={handleSubmit} disabled={isLoading}>{isLoading ? <Spinner size='sm'/> : 'ENTRAR'}</Button>
            {errorMessage&&<Alert  color='failure'>{errorMessage}</Alert>}
       </Card>
    </div>
  )
}

export default Login