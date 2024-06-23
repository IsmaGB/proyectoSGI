import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonLoading
} from '@ionic/react';
import { useAuth } from './AuthContex';
import Sidebar from './sidebar';
import { useHistory, useLocation } from 'react-router-dom';

const TrabajarIncidencia: React.FC = () => {
  const [incidencias, setIncidencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { username } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const cargarIncidencias = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/consultarIncidenciasTecnico?CT_Usuario=${encodeURIComponent(username)}`);
      if (!response.ok) {
        throw new Error('Error al cargar las incidencias');
      }
      const data = await response.json();
      setIncidencias(data);
    } catch (error) {
      console.error('Error al cargar las incidencias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cargar incidencias al montar el componente y al cambiar la ubicación (navegación)
    cargarIncidencias();
  }, [location.pathname]); // Escucha cambios en la ubicación

  const handleTrabajarClick = async (incidenciaId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/trabajar?id=${incidenciaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ CT_Usuario: username })
      });

      if (!response.ok) {
        throw new Error('Error al cambiar el estado de la incidencia');
      }

      const updatedIncidencias = incidencias.map(incidencia => {
        if (incidencia.CN_Id_Incidencia === incidenciaId) {
          return { ...incidencia, CN_Id_Estado: 4 };
        }
        return incidencia;
      });

      setIncidencias(updatedIncidencias);
    } catch (error) {
      console.error('Error al cambiar el estado de la incidencia:', error);
    }
  };

  return (
    <IonPage>
      <Sidebar />
      <br />
      <br />
      
      <IonContent>
        <IonLoading isOpen={loading} message="Cargando incidencias..." />

        <IonList>
          {incidencias.map(incidencia => (
            <IonItem key={incidencia.CN_Id_Incidencia}>
              <IonLabel>
                <h2>{incidencia.CT_Titulo}</h2>
                <p>{incidencia.CT_Descripcion}</p>
              </IonLabel>
              <IonButton
                onClick={() => handleTrabajarClick(incidencia.CN_Id_Incidencia)}
                disabled={incidencia.CN_Id_Estado >= 4}
              >
                Trabajar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TrabajarIncidencia;
