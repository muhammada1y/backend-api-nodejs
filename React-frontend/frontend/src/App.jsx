import {GoogleLogin}  from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
function App() {
   
  
  
   
  return (

    <GoogleLogin
      onSuccess={credentialResponse => { 
        
        try{
          const decoded = jwtDecode(
            credentialResponse.credential
            );
            const data =  console.log(decoded.name,decoded.email)
          return data ;
        }catch(erro){
          console.log(" jwtdecode erro")
        }
       
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}

export default App;
