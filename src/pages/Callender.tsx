import {
  IonButtons, IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform
} from "@ionic/react";
import { logoAndroid, settingsSharp } from "ionicons/icons";
import Calendar from "rc-year-calendar";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { Link } from "react-router-dom";
import { state } from "../state";
import "./Page.css";
// import "rc-year-calendar/dist/rc-year-calendar.css";

const Callender: React.FC = () => {
  const { workdays } = state();

  const onsettings = () => {
    state.setState({ settingOpen: !state.getState().settingOpen });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">{/* <IonMenuButton /> */}</IonButtons>
          <IonTitle>Callender</IonTitle>
        </IonToolbar>
      </IonHeader>

    
      <Calendar
        dataSource={workdays.map((d) => {
          return { startDate: new Date(d), endDate: new Date(d),color:'blue' };
        })}
        
        
      />
      
      <IonFab horizontal={"start"} vertical="bottom">
        {!isPlatform("hybrid") && (
          <Link
            to={{ pathname: process.env.REACT_APP_ANDROID_LINK }}
            target="_blank"
          >
            <IonFabButton>
              <IonIcon icon={logoAndroid}></IonIcon>
            </IonFabButton>
          </Link>
        )}
        <IonFabButton onClick={onsettings}>
          <IonIcon icon={settingsSharp}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Callender;
