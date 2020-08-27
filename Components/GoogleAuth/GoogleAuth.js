import React, { useState } from 'react';
import { useEffect } from "react";
import { Button } from "@material-ui/core";

const renderContent = (isSignedIn, children) => {
  if(isSignedIn === true) {
    return children;
  } else if(isSignedIn === false) {
    return (
      <div style={{
        display: 'flex',
        width: '100vw',
        height: '90vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={window.gapi.auth2.getAuthInstance().signIn}>
          Sign in with Google
        </Button>
      </div>
    );
  }
  return null;
}

const GoogleAuth = ({ onInit, children }) => {

  const [ isSignedIn, setIsSignedIn ] = useState(null);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '756303160739-kjqbv69pnvpr2btvphk83b0lk9jpa86t.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        setIsSignedIn(auth2.isSignedIn.get());
        auth2.isSignedIn.listen(setIsSignedIn);

        onInit();
      });
    });
  }, []);

  return renderContent(isSignedIn, children);
};

export default GoogleAuth;