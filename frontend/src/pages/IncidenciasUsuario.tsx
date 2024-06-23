import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonModal, IonInput, IonItem, IonLabel } from '@ionic/react';
import Sidebar from './sidebar';
import { useAuth } from './AuthContex';

const IncidenciasUsuario: React.FC = () => {
  const [incidencias, setIncidencias] = useState<any[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [lugar, setLugar] = useState('');
  const { isAuthenticated, username } = useAuth();

  useEffect(() => {
    if (username) {
      obtenerIncidencias();
    }
  }, [username]);

  const obtenerIncidencias = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/consultarIncidenciasPorUsuario?CT_Usuario=${encodeURIComponent(username)}`);
      if (response.ok) {
        const data = await response.json();
        setIncidencias(data.body);
      } else {
        console.error('Error al obtener incidencias:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener incidencias:', error);
    }
  };
  
  const handleRegistrarUsuario = async () => {
    const datos = {
      CT_Usuario: username,
      CT_Titulo: titulo,
      CT_Descripcion: descripcion,
      CT_Lugar: lugar,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/v1/incidencias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });
  
      if (response.ok) {
        console.log('Incidencia registrada exitosamente');
        // Actualizar localmente el estado de incidencias
        obtenerIncidencias(); // Esto debería actualizar automáticamente el estado después de obtener las nuevas incidencias
        setTitulo('');
        setDescripcion('');
        setLugar('');
      } else {
        const errorData = await response.json();
        console.error('Error al registrar incidencia:', errorData.message || response.statusText);
      }
    } catch (error) {
      console.error('Error al registrar incidencia:', error);
    }
  
    setMostrarModal(false);
  };

  const obtenerEstado = (CT_Id_Estado: number) => {
    switch (CT_Id_Estado) {
      case 1:
        return 'Registrado';
      case 2:
        return 'Asignado';
      case 3:
        return 'En revisión';
      case 4:
        return 'En reparación'
      case 5:
        return 'Pendiente de Compra'
      case 6:
        return 'Terminado'
      case 7:
        return 'Aprobado';
        case 8:
          return 'Rechazado';
          case 9:
            return 'Cerrado';
      default:
        return 'Contratación Externa';
    }
  };

  if (!isAuthenticated) {
    return <IonPage><div>Debes iniciar sesión para acceder a esta página.</div></IonPage>;
  }

  return (
    <IonPage>
      <IonContent>
        <Sidebar />
        <br />
        <br />
        {incidencias.map((incidencia: any) => (
          <IonCard key={incidencia.CN_Id_Incidencia}>
            <IonCardHeader>
              <IonCardTitle>Título: {incidencia.CT_Titulo}</IonCardTitle>
              <IonCardSubtitle>Lugar: {incidencia.CT_Lugar}</IonCardSubtitle>
              <IonCardSubtitle>Descripción: {incidencia.CT_Descripcion}</IonCardSubtitle>
              <IonCardSubtitle>Estado: {obtenerEstado(incidencia.CN_Id_Estado)}</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        ))}
       
        <IonButton onClick={() => setMostrarModal(true)}>Registrar Incidencia</IonButton>
        <IonModal isOpen={mostrarModal}>
          <IonContent>
            <IonItem>
              <IonLabel position="stacked">Título</IonLabel>
              <IonInput value={titulo} onIonChange={(e) => setTitulo(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonInput value={descripcion} onIonChange={(e) => setDescripcion(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Lugar</IonLabel>
              <IonInput value={lugar} onIonChange={(e) => setLugar(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Usuario</IonLabel>
              <IonInput value={username} readonly />
            </IonItem>
            <IonButton onClick={handleRegistrarUsuario}>Aceptar</IonButton>
            <IonButton onClick={() => setMostrarModal(false)}>Cancelar</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default IncidenciasUsuario;
