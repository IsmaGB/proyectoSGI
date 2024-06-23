import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import {
  IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonItem, IonLabel, IonList, IonInput
} from '@ionic/react';
import { useAuth } from './AuthContex';

interface Incidencia {
  Id: number;
  CT_Usuario: string;
  CN_Id_Incidencia: string;
}
interface Usuario {
  CT_Usuario: string;
}
interface IncidenciaRegistrada {
  CN_Id_Incidencia: string;
}

const AsignarIncidencia: React.FC = () => {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [incidenciasRegistradas, setIncidenciasRegistradas] = useState<IncidenciaRegistrada[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuarios, setSelectedUsuarios] = useState<string[]>(['']);
  const [selectedIncidencia, setSelectedIncidencia] = useState<string>('');
  const [riesgo, setRiesgo] = useState<number>(0);
  const [prioridad, setPrioridad] = useState<number>(0);
  const [afectacion, setAfectacion] = useState<number>(0);
  const [categoria, setCategoria] = useState<number>(0);
  const [costos, setCostos] = useState<number>(0);
  const [duracion, setDuracion]= useState<number>(0);
  const { isAuthenticated } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchIncidencias();
    fetchUsuarios();
    fetchIncidenciasRegistradas();
  }, []);

  const fetchIncidencias = async () => {
    const response = await fetch('http://localhost:3000/api/v1/consultarIncidenciasAsignadas');
    const data = await response.json();
    setIncidencias(data.body);
  };

  const fetchUsuarios = async () => {
    const response = await fetch('http://localhost:3000/api/v1/consultarUsuariosTecnicos');
    const data = await response.json();
    setUsuarios(data.body);
  };

  const fetchIncidenciasRegistradas = async () => {
    const response = await fetch('http://localhost:3000/api/v1/incidenciasRegistrado');
    const data = await response.json();
    setIncidenciasRegistradas(data);
  };

  const handleAsignarIncidencia = async () => {
    const incidenciaData = {
      CT_Usuario: selectedUsuarios.filter(u => u !== ''),
      CN_Id_Incidencia: selectedIncidencia,
      CN_Id_Riesgo: riesgo,
      CN_Id_Prioridad: prioridad,
      CN_Id_Afectacion: afectacion,
      CN_Id_Categoria: categoria,
      CN_Costos: costos,
      CN_Duracion: duracion
    };

    if (!incidenciaData.CT_Usuario.length || !selectedIncidencia || riesgo <= 0 || prioridad <= 0 || afectacion <= 0 || categoria <= 0 || costos <= 0 || duracion <= 0) {
      setErrorMessage('Si esta seguro, vuelva a presionar el boton de aceptar.');
      return;
    }

    const response = await fetch('http://localhost:3000/api/v1/asignarIncidencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incidenciaData),
    });

    if (response.ok) {
      console.log('Incidencia asignada exitosamente');
      setShowModal(false);
      resetForm();
      fetchIncidenciasRegistradas();
      fetchIncidencias(); // Actualiza la lista de incidencias
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.error || 'Error al asignar la incidencia');
      console.error('Error al asignar la incidencia');
    }
  };

  const resetForm = () => {
    setSelectedUsuarios(['']);
    setSelectedIncidencia('');
    setRiesgo(0);
    setPrioridad(0);
    setAfectacion(0);
    setCategoria(0);
    setCostos(0);
    setDuracion(0);
    setErrorMessage(null);
  };

  const handleUsuarioSeleccionadoChange = (value: string, index: number) => {
    const nuevosUsuarios = [...selectedUsuarios];
    nuevosUsuarios[index] = value;
    setSelectedUsuarios(nuevosUsuarios);
  };

  const agregarOtroUsuario = () => {
    setSelectedUsuarios([...selectedUsuarios, '']);
  };

  if (!isAuthenticated) {
    return <IonPage><div>Debes iniciar sesión para acceder a esta página.</div></IonPage>;
  }

  return (
    <IonPage>
      <IonHeader>
        <Sidebar />
        <IonToolbar>
          {/* <IonTitle>Incidencias Asignadas</IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {incidencias.map((incidencia) => (
            <IonCard key={incidencia.Id}>
              <IonCardContent>
                <h2>Usuario: {incidencia.CT_Usuario}</h2>
                <p>Incidencia: {incidencia.CN_Id_Incidencia}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
        <IonButton expand="full" onClick={() => setShowModal(true)}>
          Asignar Incidencia
        </IonButton>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Asignar Incidencia</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {errorMessage && (
              <IonItem>
                <IonLabel color="danger">{errorMessage}</IonLabel>
              </IonItem>
            )}
            {selectedUsuarios.map((usuario, index) => (
              <IonItem key={index}>
                <IonLabel>Usuario {index + 1}</IonLabel>
                <IonSelect value={usuario} onIonChange={(e) => handleUsuarioSeleccionadoChange(e.detail.value, index)}>
                  {usuarios.map((u) => (
                    <IonSelectOption key={u.CT_Usuario} value={u.CT_Usuario}>
                      {u.CT_Usuario}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            ))}
            <IonButton expand="full" onClick={agregarOtroUsuario}>
              Agregar Otro Usuario
            </IonButton>
            <IonItem>
              <IonLabel>Incidencia</IonLabel>
              <IonSelect value={selectedIncidencia} onIonChange={(e) => setSelectedIncidencia(e.detail.value)}>
                {incidenciasRegistradas.map((incidencia) => (
                  <IonSelectOption key={incidencia.CN_Id_Incidencia} value={incidencia.CN_Id_Incidencia}>
                    {incidencia.CN_Id_Incidencia}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Riesgo</IonLabel>
              <IonSelect value={riesgo} onIonChange={(e) => setRiesgo(e.detail.value)}>
                <IonSelectOption value={1}>Bajo</IonSelectOption>
                <IonSelectOption value={2}>Medio</IonSelectOption>
                <IonSelectOption value={3}>Alto</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Prioridad</IonLabel>
              <IonSelect value={prioridad} onIonChange={(e) => setPrioridad(e.detail.value)}>
                <IonSelectOption value={1}>Bajo</IonSelectOption>
                <IonSelectOption value={2}>Medio</IonSelectOption>
                <IonSelectOption value={3}>Alto</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Afectación</IonLabel>
              <IonSelect value={afectacion} onIonChange={(e) => setAfectacion(e.detail.value)}>
                <IonSelectOption value={1}>Bajo</IonSelectOption>
                <IonSelectOption value={2}>Medio</IonSelectOption>
                <IonSelectOption value={3}>Alto</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Categoría</IonLabel>
              <IonSelect value={categoria} onIonChange={(e) => setCategoria(e.detail.value)}>
                <IonSelectOption value={1}>Reparación</IonSelectOption>
                <IonSelectOption value={2}>Intervención Por Causa Natural</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Costos</IonLabel>
              <IonInput
                type="number"
                value={costos}
                onIonChange={(e) => {
                  const value = e.detail.value as string;
                  setCostos(value ? parseFloat(value) : 0);
                }}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Duración</IonLabel>
              <IonInput
                type="number"
                value={duracion}
                onIonChange={(e) => {
                  const value = e.detail.value as string;
                  setDuracion(value ? parseFloat(value) : 0);
                }}
              ></IonInput>
            </IonItem>
            <IonButton expand="full" onClick={handleAsignarIncidencia}>
              Asignar
            </IonButton>
            <IonButton expand="full" color="danger" onClick={() => setShowModal(false)}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AsignarIncidencia;
