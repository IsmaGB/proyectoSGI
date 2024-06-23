import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonToast,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonInput
} from '@ionic/react';
import Sidebar from './sidebar';
import { useAuth } from './AuthContex';
import { useHistory } from 'react-router-dom';

const DiagnosticoIncidencia: React.FC = () => {
  const [diagnostico, setDiagnostico] = useState('');
  const [idIncidencia, setIdIncidencia] = useState<string>('');
  const [requiereCompra, setRequiereCompra] = useState('');
  const [tiempoEstimado, setTiempoEstimado] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [incidencias, setIncidencias] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { isAuthenticated, username } = useAuth();
  const history = useHistory();

  useEffect(() => {
    fetchIncidencias(); // Cargar incidencias al montar el componente
  }, [history.location.pathname]); // Ejecutar cada vez que cambia la ruta

  const fetchIncidencias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/incidenciasCuatro');
      if (!response.ok) {
        throw new Error('Error al cargar las incidencias');
      }
      const data = await response.json();
      setIncidencias(data);
    } catch (error) {
      console.error('Error fetching incidencias:', error);
    }
  };

  const handleRefreshClick = async () => {
    try {
      await fetchIncidencias(); // Llama a la función para actualizar las incidencias
      setToastMessage('Lista de incidencias actualizada.');
    } catch (error) {
      console.error('Error al actualizar la lista de incidencias:', error);
      setToastMessage('Error al actualizar la lista de incidencias.');
    } finally {
      setShowToast(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/diagnosticoIncidencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CT_Diagnostico: diagnostico,
          CN_Id_Incidencia: idIncidencia,
          CT_Requiere_Compra: requiereCompra,
          CT_Tiempo_Estimado: tiempoEstimado,
          CT_Observaciones: observaciones,
          CT_Usuario: username,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el diagnóstico');
      }

      setToastMessage('Diagnóstico creado exitosamente.');
      setDiagnostico('');
      setIdIncidencia('');
      setRequiereCompra('');
      setTiempoEstimado('');
      setObservaciones('');

      // Actualizar la lista de incidencias después de crear el diagnóstico
      await fetchIncidencias();
    } catch (error) {
      console.error('Error al crear el diagnóstico:', error);
      setToastMessage('Error al crear el diagnóstico.');
    } finally {
      setShowToast(true);
    }
  };

  if (!isAuthenticated) {
    return <IonPage><div>Debes iniciar sesión para acceder a esta página.</div></IonPage>;
  }

  return (
    <IonPage>
      <Sidebar />
      <IonHeader>
        <IonToolbar>
          {/* <IonTitle>Crear Diagnóstico de Incidencia</IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <IonLabel style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>ID de Incidencia *</IonLabel>
              <IonSelect
                value={idIncidencia}
                placeholder="Selecciona una incidencia"
                onIonChange={(e) => setIdIncidencia(e.detail.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <IonSelectOption value="">Selecciona una incidencia</IonSelectOption>
                {incidencias.map((incidencia) => (
                  <IonSelectOption key={incidencia.CN_Id_Incidencia} value={incidencia.CN_Id_Incidencia}>
                    {incidencia.CN_Id_Incidencia}
                  </IonSelectOption>
                ))}
              </IonSelect>
              {!idIncidencia && (
                <IonLabel color="danger" style={{ fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  Debes seleccionar una incidencia.
                </IonLabel>
              )}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <IonLabel style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Diagnóstico *</IonLabel>
              <IonTextarea
                placeholder="Ingresa el Diagnóstico"
                value={diagnostico}
                onIonChange={(e) => setDiagnostico(e.detail.value!)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '120px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <IonLabel style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Requiere Compra (si/no) *</IonLabel>
              <IonInput
                type="text"
                placeholder="Ingresa si o no"
                value={requiereCompra}
                onIonChange={(e) => setRequiereCompra(e.detail.value!)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <IonLabel style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Tiempo Estimado (Horas) *</IonLabel>
              <IonInput
                type="text"
                placeholder="Ingresa el Tiempo Estimado"
                value={tiempoEstimado}
                onIonChange={(e) => setTiempoEstimado(e.detail.value!)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <IonLabel style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Observaciones *</IonLabel>
              <IonTextarea
                placeholder="Ingresa las Observaciones"
                value={observaciones}
                onIonChange={(e) => setObservaciones(e.detail.value!)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '120px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <IonLabel style={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Identificador Usuario</IonLabel>
              <IonInput
                type="text"
                value={username}
                readonly
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#3880ff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Crear Diagnóstico</button>
          </form>
          <button type="button" style={{ backgroundColor: '#3880ff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '16px' }} onClick={handleRefreshClick}>
            Actualizar Lista de Incidencias
          </button>
        </div>
        <IonToast isOpen={showToast} message={toastMessage} duration={3000} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default DiagnosticoIncidencia;
