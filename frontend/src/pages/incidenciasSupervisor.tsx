import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonModal, IonTextarea, IonToast } from '@ionic/react';
import Sidebar from './sidebar';

const IncidenciasSupervisor: React.FC = () => {
  const [incidencias, setIncidencias] = useState<any[]>([]);
  const [selectedIncidencia, setSelectedIncidencia] = useState<any>(null);
  const [justificacionCierre, setJustificacionCierre] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  useEffect(() => {
    fetchIncidencias();
  }, []);

  const fetchIncidencias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/incidenciasCompraTerminado');
      const data = await response.json();
      setIncidencias(data);
    } catch (error) {
      console.error('Error fetching incidencias', error);
    }
  };

  const handleUpdateIncidencia = async (id: string, CN_Id_Estado: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/supervisorIncidencia?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ CN_Id_Estado, justificacionCierre }),
      });
      if (response.ok) {
        setShowToast({ show: true, message: 'Incidencia actualizada correctamente' });
        setShowModal(false);
        fetchIncidencias();
        setJustificacionCierre('');
      } else {
        throw new Error('Error updating incidencia');
      }
    } catch (error) {
      console.error('Error updating incidencia', error);
      setShowToast({ show: true, message: 'Error actualizando incidencia' });
    }
  };

  const handleAcceptOrReject = (incidencia: any, CN_Id_Estado: number) => {
    setSelectedIncidencia({ ...incidencia, CN_Id_Estado });
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
      <Sidebar/>
        <IonToolbar>
          <IonTitle>Incidencias Supervisor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {incidencias.map((incidencia) => (
            <IonItem key={incidencia.CN_Id_Incidencia}>
              <IonLabel>
                <p><strong>ID:</strong> {incidencia.CN_Id_Incidencia}</p>
                <p><strong>Estado:</strong> {incidencia.CN_Id_Estado}</p>
                <p><strong>Observaciones:</strong> {incidencia.Diagnosticos && incidencia.Diagnosticos.length > 0 ? incidencia.Diagnosticos[0].CT_Observaciones : 'No hay observaciones'}</p>
              </IonLabel>
              <IonButton onClick={() => handleAcceptOrReject(incidencia, 7)}>Aceptar</IonButton>
              <IonButton onClick={() => handleAcceptOrReject(incidencia, 8)}>Rechazar</IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Justificación de Cierre</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel position="stacked">Justificación</IonLabel>
              <IonTextarea value={justificacionCierre} onIonChange={(e) => setJustificacionCierre(e.detail.value!)}></IonTextarea>
            </IonItem>
            <IonButton expand="full" onClick={() => handleUpdateIncidencia(selectedIncidencia.CN_Id_Incidencia, selectedIncidencia.CN_Id_Estado)}>
              Enviar
            </IonButton>
            <IonButton expand="full" color="medium" onClick={() => setShowModal(false)}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
        <IonToast
          isOpen={showToast.show}
          message={showToast.message}
          duration={2000}
          onDidDismiss={() => setShowToast({ show: false, message: '' })}
        />
      </IonContent>
    </IonPage>
  );
};

export default IncidenciasSupervisor;
