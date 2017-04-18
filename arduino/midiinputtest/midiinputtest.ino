byte incomingByte;
byte note;
byte velocity;
int action=2; //0 =note off ; 1=note on ; 2= nada

void setup() {
  pinMode(10, OUTPUT);
  Serial.begin(31250);
}

void loop () {
 if (Serial.available() > 0) {
   // read the incoming byte:
   incomingByte = Serial.read();

   // wait for as status-byte, channel 1, note on or off
   if (incomingByte== 144){ // note on message starting starting
     action=1;
   }else if (incomingByte== 128){ // note off message starting
     action=0;
   }else if (incomingByte== 208){ // aftertouch message starting
      //not implemented yet
   }else if (incomingByte== 160){ // polypressure message starting
      //not implemented yet
   }else if ( (action==0)&&(note==0) ){ // if we received a "note off", we wait for which note (databyte)
     note=incomingByte;
     playNote(note, 0);
     note=0;
     velocity=0;
     action=2;
   }else if ( (action==1)&&(note==0) ){ // if we received a "note on", we wait for the note (databyte)
     note=incomingByte;
   }else if ( (action==1)&&(note!=0) ){ // ...and then the velocity
     velocity=incomingByte;
     playNote(note, velocity);
     note=0;
     velocity=0;
     action=0;
   }else{
     //nada
   }
 }
}

void playNote(byte note, byte velocity){
  if(note==60) {
    digitalWrite(10, HIGH);
    delay(100);
    digitalWrite(10, LOW);
  }
}

