import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState,useEffect, useRef } from 'react';
import date from "date-and-time"
import './Page.css';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { Preferences } from '@capacitor/preferences';
date.locale("ar-OM")


const Callender: React.FC = () => {
  const [FirstDay,setFirstDay] = useState<any>(date.format(new Date(),"YYYY-MM-DD"))
  const [workDays,setWorkDays] = useState<any>([date.format(new Date(),"YYYY-MM-DD")])
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  
  const newfirstDay=(v:any)=>{
  console.log('v  from date time pikcker :>> ', v);
      var day = date.format(new Date(v),"YYYY-MM-DD")
      console.log('day in new first day :>> ', day);
      setFirstDay(v)
      Preferences.set({
        key:"firstDay",
        value:day
      })
      setWorkDays(getShiftDays(day))


  }
 useEffect(()=>{
    Preferences.get({
      key:"firstDay"
    }).then((value)=>{
      setFirstDay(value.value)
      setWorkDays(getShiftDays(value.value!))
      console.log('value of preference :>> ', value.value);
    })
      
  },[])
  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      // setMessage(`Hello, ${ev.detail.data}!`);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
          </IonButtons>
          <IonTitle>التقويم</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ايام الشفت</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton id="open-modal" expand="block">
         <IonLabel >
         حدد اول يوم في الشفت  
          </IonLabel>        
        </IonButton>
      
        <IonModal 
        showBackdrop={true}
        ref={modal} 
        trigger="open-modal" 
        onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Welcome</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
          <IonDatetime
          value={FirstDay}
            presentation='date'
            size='cover'
            locale='ar-OM'
            onIonChange={(e)=>newfirstDay(e.detail.value)}
        ></IonDatetime>
          </IonContent>
        </IonModal>
        <IonDatetime
        
        presentation='date'
        size='cover'
        locale='ar-OM'
        multiple={true}
        value={workDays}
        max={"2100"}
        min={"2015"}
        ></IonDatetime>
      </IonContent>
    </IonPage>
  );
};

export default Callender;

function getShiftDays(FirstDay:string){
  var days:string[] = []
  var newDay = new Date(FirstDay)
  days.push(date.format(newDay,"YYYY-MM-DD"))

    for(var i=1;i<=24;i++){
      for(var n=0;n<=13;n++){
        var Day = date.addDays(newDay,n)
        // console.log('Day after :>> ', n," :",Day);
        days.push(date.format(Day,"YYYY-MM-DD"))
      }
      // console.log('newDay before :>> ', newDay);
        newDay = date.addDays(newDay,28)
        // console.log('newDay after :>> ', newDay);
    }
    // console.log('days :>> ', days);
  return days
}