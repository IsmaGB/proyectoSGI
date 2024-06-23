import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonRouterLink, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { menu } from 'ionicons/icons';
import { useAuth } from './AuthContex';

const Sidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { roles } = useAuth();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log('Logout');
    // Añadir la lógica de cierre de sesión aquí
  };

  const hasAccess = (requiredRoles: number[]): boolean => {
    return roles.some(role => requiredRoles.includes(role));
  };

  const renderMenuOptions = () => {
    const menuOptions = [
      { role: [2], label: 'Gestión Incidencias', link: '/listarIncidenciaUsuario' },
      { role: [4], label: 'Diagnóstico de Incidencias', link: '/diagnostico-incidencias' },
      { role: [1], label: 'Gestión Usuario', link: '/gestionUsuario' },
      { role: [3], label: 'Asignar Incidencia', link: '/asignarIncidencia' },
      { role: [4], label: 'Incidencias Asignadas', link: '/trabajarIncidencia' },
      { role: [1], label: 'Reportes por Carga de Trabajo', link: '/cargaTrabajo' },
      { role: [5], label: 'Gestionar Incidencias', link: '/incidenciasSupervisor' },
      { role: [1,2,3,4,5], label: 'Cerrar sesión', link: '/login' },
    ];

    return menuOptions
      .filter(option => hasAccess(option.role))
      .map((option, index) => (
        <IonItem key={index} className="sidebar-item" routerLink={option.link} onClick={toggleSidebar}>
          <IonLabel>{option.label}</IonLabel>
        </IonItem>
      ));
  };

  return (
    <>
      <IonIcon icon={menu} onClick={toggleSidebar} className="menu-icon" />
      <div ref={sidebarRef} className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <IonContent>
          <IonList>
            {renderMenuOptions()}
          </IonList>
        </IonContent>
      </div>
    </>
  );
};

export default Sidebar;
