import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContex'; // Asegúrate de importar el contexto correctamente
import '../pages/styles/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();
  const { setIsAuthenticated, setUsernameB, setRoles } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/ingresarSistema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CT_Usuario: username,
          CT_Contraseña: password
        })
      });

      if (response.ok) {
        // Obtener roles del usuario
        const rolesResponse = await fetch(`http://localhost:3000/api/v1/obtenerRolesPorUsuario?CT_Usuario=${username}`);
        const rolesData = await rolesResponse.json();

        if (rolesData.ok) {
          setIsAuthenticated(true);
          setUsernameB(username);
          setUsername('');
          setPassword('');
          setRoles(rolesData.body); // Aquí se configuran los roles obtenidos
          history.push('/home');
        } else {
          setShowAlert(true);
        }
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setShowAlert(true);
    }
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <label htmlFor="">Usuario</label>
        <IonInput
          value={username}
          onIonChange={(e) => setUsername(e.detail.value!)}
          className="custom-input"
        />
        <label htmlFor="">Contraseña</label>
        <IonInput
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
          className="custom-input"
        />
        <IonButton expand="block" onClick={handleLogin}>Iniciar sesión</IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message="Usuario o contraseña incorrectos."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
