import React, { useState, useEffect } from 'react';
import '../theme/gestionUsuario.css';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonToast, IonButton, IonModal
} from '@ionic/react';
import Sidebar from './sidebar';
import { useAuth } from './AuthContex';

const CrearUsuario: React.FC = () => {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated } = useAuth();
    const [codigoUsuario, setCodigoUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [usuario, setUsuario] = useState('');
    const [numeroTelefonico, setNumeroTelefonico] = useState('');
    const [puesto, setPuesto] = useState('');
    const [departamento, setDepartamento] = useState('');

    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/consultarUsuarios');
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data.body);
            } else {
                throw new Error('Error al obtener la lista de usuarios.');
            }
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
            setToastMessage('Error al obtener la lista de usuarios.');
            setToastColor('danger-toast');
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const getUsuarios = async () => {
          try {
            await fetchUsuarios();
          } catch (error) {
            console.log(error);
          }
        }
        getUsuarios();
      }, []);

    const handleCreateUsuario = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!codigoUsuario || !nombre || !contraseña || !usuario || !numeroTelefonico || !puesto || !departamento) {
            setToastMessage('Por favor, complete todos los campos obligatorios.');
            setToastColor('danger');
            setShowToast(true);
            return;
        }

        const data = {
            CT_Codigo_Usuario: codigoUsuario,
            CT_Nombre: nombre,
            CT_Contraseña: contraseña,
            CT_Usuario: usuario,
            CN_Numero_Telefonico: numeroTelefonico,
            CT_Puesto: puesto,
            CT_Id_Departamento: departamento,
            
            
            
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/registrarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setToastMessage('Usuario creado con éxito!');
                setToastColor('success');
                setShowToast(true);
                setShowModal(false);
                setCodigoUsuario('');
                setNombre('');
                setContraseña('');
                setUsuario('');
                setNumeroTelefonico('');
                setPuesto('');
                setDepartamento('');
                await fetchUsuarios();
            } else {
                const result = await response.json();
                setToastMessage(result.error || 'Error al crear el usuario.');
                setToastColor('danger');
                setShowToast(true);
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            setToastMessage('Error al crear el usuario.');
            setToastColor('danger');
            setShowToast(true);
        }
    };
    if (!isAuthenticated) {
        return <IonPage><div>Debes iniciar sesión para acceder a esta página.</div></IonPage>;
      }
    return (
        <IonPage>
            <IonHeader>
            <Sidebar />
                <IonToolbar>
                    {/* <IonTitle>Lista de Usuarios</IonTitle> */}
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
               
                {loading ? (
                    <IonSpinner />
                ) : (
                    <div className="cards-container">
                        {usuarios.map((usuario) => (
                            <div className="card" key={usuario.CT_Usuario}>
                                <div className="card-header">
                                    <h2>{usuario.CT_Nombre}</h2>
                                </div>
                                <div className="card-content">
                                    <p><strong>Usuario:</strong> {usuario.CT_Usuario}</p>
                                    <p><strong>Teléfono:</strong> {usuario.CN_Numero_Telefonico}</p>
                                    <p><strong>Puesto:</strong> {usuario.CT_Puesto}</p>
                                    <p><strong>Departamento:</strong> {usuario.CT_Id_Departamento}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    color={toastColor}
                    cssClass={'toast'}
                />
                <div className="button-container">
                    <button onClick={() => setShowModal(true)} className="btn-custom">
                        Crear Usuario
                    </button>
                </div>
                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Crear Usuario</h3>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCreateUsuario}>
                                <div>
                                    <label>Código de Usuario</label><br />
                                    <input
                                        type="text"
                                        placeholder='Ingresa el código de usuario'
                                        value={codigoUsuario}
                                        onChange={(e) => setCodigoUsuario(e.target.value)}
                                        className="input-custom"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Nombre</label><br />
                                    <input
                                        type="text"
                                        placeholder='Ingresa el nombre'
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="input-custom"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Contraseña</label><br />
                                    <input
                                        type="password"
                                        placeholder='Ingresa la contraseña'
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                        className="input-custom"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Usuario</label><br />
                                    <input
                                        type="text"
                                        placeholder='Ingresa el usuario'
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        className="input-custom"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Teléfono</label><br />
                                    <input
                                        type="tel"
                                        placeholder='Ingresa el telefono'
                                        value={numeroTelefonico}
                                        onChange={(e) => setNumeroTelefonico(e.target.value)}
                                        className="input-custom"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Puesto</label><br />
                                    <input
                                        type="text"
                                        value={puesto}
                                        onChange={(e) => setPuesto(e.target.value)}
                                        className="input-custom"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Departamento</label><br />
                                    <input
                                        type="number"
                                        placeholder="Ingresa el departamento"
                                        value={departamento}
                                        onChange={(e) => setDepartamento(e.target.value)}
                                        className="input-custom"
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn-custom" type="submit">Crear</button>
                                    <button onClick={() => setShowModal(false)} className="btn-custom-danger">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default CrearUsuario;