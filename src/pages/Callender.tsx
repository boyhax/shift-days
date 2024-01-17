import {
  IonButtons,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { logoAndroid, settingsSharp } from "ionicons/icons";
import { Calendar, DateObject } from "react-multi-date-picker";
import { state } from "../state";
import "./Page.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { Link } from "react-router-dom";

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

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ايام الشفت</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Calendar
          value={workdays.map((d) => new Date(d))}
          multiple
          fullYear={isPlatform("desktop")}
          className={" scale-50"}
          readOnly
        />
      </IonContent>
      <IonFab horizontal={"start"} vertical="bottom">
        {isPlatform("mobileweb") && (
          <IonFabButton>
            <Link
              to={{ pathname: process.env.REACT_APP_ANDROID_LINK }}
              target="_blank"
            >
              <IonIcon icon={logoAndroid}></IonIcon>
            </Link>
          </IonFabButton>
        )}
        <IonFabButton onClick={onsettings}>
          <IonIcon icon={settingsSharp}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Callender;
