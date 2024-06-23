import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonSpinner, IonToast } from '@ionic/react';
import Sidebar from './sidebar';
import { useAuth } from './AuthContex';

const CargaTrabajo: React.FC = () => {
  const [resultados, setResultados] = useState<{ [key: string]: { trabajoPendiente: number; trabajoFinalizado: number } }>({});
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { isAuthenticated, username } = useAuth();

  useEffect(() => {
    if (username) {
      obtenerResultados();
    }
  }, [username]);

  const obtenerResultados = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/cargaDeTrabajo', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache', // Desactiva el caché del lado del cliente
          'Pragma': 'no-cache'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setResultados(data);
      } else {
        setToastMessage(`Error al obtener resultados: ${response.statusText}`);
        setShowToast(true);
      }
    } catch (error) {
      setShowToast(true);
    }
    setLoading(false);
  };

  const obtenerNombreCategoria = (categoriaId: string) => {
    switch (parseInt(categoriaId, 10)) {
      case 1:
        return 'Reparación';
      case 2:
        return 'Intervención por Causa Natural';
      default:
        return 'Categoría Desconocida';
    }
  };

  if (!isAuthenticated) {
    return <IonPage><div>Debes iniciar sesión para acceder a esta página.</div></IonPage>;
  }

  return (
    <IonPage>
      <Sidebar />
      <br />
      <br />
      
      <IonContent>
        <IonButton onClick={obtenerResultados}>Refrescar Resultados</IonButton>
        {loading && <IonSpinner name="crescent" />}
        {Object.keys(resultados).map(categoria => (
          <IonCard key={categoria}>
            <IonCardHeader>
              <IonCardTitle>Categoría: {obtenerNombreCategoria(categoria)}</IonCardTitle>
              <IonCardSubtitle>Trabajo Pendiente: {resultados[categoria].trabajoPendiente}h</IonCardSubtitle>
              <IonCardSubtitle>Trabajo Finalizado: {resultados[categoria].trabajoFinalizado}h</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        ))}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default CargaTrabajo;
