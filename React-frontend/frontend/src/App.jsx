import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import axios from 'axios'; // Fix import statement

function App() {
  const [googleUserData, setGoogleUserData] = useState(null);
   
  handleChange = event => {
    this.setGoogleUserData({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: g
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  return (
    <div>
      <h1>Login using google</h1>
      <GoogleLogin
        onSuccess={credentialResponse => {
          try {
            const decoded = jwtDecode(
              credentialResponse.credential
            );
            setGoogleUserData(decoded.name,decoded.email)
          } catch (error) {
            console.log("jwtdecode error");
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
}

export default App;
