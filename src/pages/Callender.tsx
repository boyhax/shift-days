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
          multiple
          maxDate={new DateObject().add(1,'y').format()}
          minDate={new DateObject().subtract(1,'y').format()}
          value={workdays.map((d)=>new DateObject(d))}
          numberOfMonths={2}
          fullYear
          readOnly
        />
          
      </IonContent>
      <IonFab horizontal={"start"} vertical="bottom">
        {isPlatform("mobileweb") && (
          <IonFabButton href={process.env.REACR_APP_ANDROID_LINK}>
            <IonIcon icon={logoAndroid}></IonIcon>
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
