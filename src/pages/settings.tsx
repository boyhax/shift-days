import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {  Calendar, DateObject } from "react-multi-date-picker";
import { state } from "../state";
import "./Page.css";


const Settings: React.FC = () => {
  const { settingOpen, offdayscount, workdayscount, shiftstart } = state();

  const onClose = () => {
    state.setState({ settingOpen: !settingOpen });
  };
  const generate = () => {
    const days = generateWorkdays(shiftstart, workdayscount, offdayscount);
    state.setState({ workdays: days });
    console.log("days :>> ", days);
  };
  const onConfirm = () => {
    generate();
    onClose();
  };
  return (
    <IonModal showBackdrop={true} isOpen={settingOpen} trigger="open-modal">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={onConfirm}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonListHeader> days configration</IonListHeader>
        <IonList>
          <IonItem>
            <IonLabel>Work days</IonLabel>
            <IonInput
            
              value={workdayscount}
              onIonChange={(e) =>
                state.setState({ workdayscount: e.detail.value as any })
              }
              type={"number"}
              inputMode="numeric"
              min={1}
            />
          </IonItem>
          <IonItem>
            <IonLabel>off days</IonLabel>
            <IonInput
            
              value={offdayscount}
              onIonChange={(e) =>
                state.setState({ offdayscount: e.detail.value as any })
              }
              type={"number"}
              inputMode="numeric"
              min={1}
            />
          </IonItem>
        </IonList>
        <IonListHeader> pick first day of next shift</IonListHeader>
        
        <Calendar
          className={"w-full"}
          onChange={(v) => state.setState({ shiftstart: v.toString() })}
        ></Calendar>
      </IonContent>
      <div className={"flex items-center justify-center text-center align-middle w-full"}>
      <IonLabel className={'left-10'}>
        by <span className={"text-xl text-blue-500"}>Boyhax</span>
      </IonLabel>
      </div>
      
    </IonModal>
  );
};

export default Settings;

function generateWorkdays(
  firstDate: string,
  workdays: number,
  offDays: number
): string[] {
  const resultDates: string[] = [];
  let currentDate: DateObject = new DateObject(firstDate);
  let repeat = 100;
  console.log("repeat", repeat);
  times(repeat)(() => {
    times(workdays)(() => {
      resultDates.push(currentDate.format());
      currentDate.add(1, "d");
    });
    currentDate.add(offDays, "d");
  });
  //again for last year
  currentDate = new DateObject(firstDate).subtract(offDays, "d");
  times(repeat)(() => {
    console.log("repeat", repeat);

    times(workdays)(() => {
      resultDates.push(currentDate.format());
      currentDate.subtract(1, "d");
    });
    currentDate.subtract(offDays, "d");
  });

  return resultDates;
}
const times = (x: any) => (f: any) => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};
