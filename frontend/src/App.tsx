import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import IncidenciasUsuario from './pages/IncidenciasUsuario';
import DiagnosticoIncidencias from './pages/diagnosticoIncidencia'
import CrearUsuario from './pages/crearUsuario';
import Sidebar from './pages/sidebar';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '../src/theme/variables.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';
import AsignarIncidencia from './pages/asignarIncidencia';
import TrabajarIncidencia from './pages/trabajarIncidencia';
import CargaTrabajo from './pages/reportesCargaDeTrabajo';
import IncidenciasSupervisor from './pages/incidenciasSupervisor';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/listarIncidenciaUsuario">
          <IncidenciasUsuario />
        </Route>
        <Route exact path="/diagnostico-incidencias">
          <DiagnosticoIncidencias />
        </Route>
        <Route exact path="/gestionUsuario">
          <CrearUsuario />
        </Route>
        <Route exact path="/asignarIncidencia">
          <AsignarIncidencia />
        </Route>
        <Route exact path="/trabajarIncidencia">
          <TrabajarIncidencia />
        </Route>
        <Route exact path="/cargaTrabajo">
          <CargaTrabajo/>
        </Route>
        <Route exact path="/incidenciasSupervisor">
          <IncidenciasSupervisor/>
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
