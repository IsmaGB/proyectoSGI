import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import Sidebar from './sidebar';
import { useAuth } from './AuthContex';
import miImagen from './styles/imagenes/S.png';
import './styles/home.css';
const Home: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const {isAuthenticated}=useAuth();
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  if (!isAuthenticated) {
    return <IonPage><div>Debes iniciar sesión para acceder a esta página.</div></IonPage>;
  }
  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent>
<Sidebar />
<img src={miImagen} alt="Descripción de la imagen" className="fullscreen-image" />
      </IonContent>
    </IonPage>
  );
};

export default Home;