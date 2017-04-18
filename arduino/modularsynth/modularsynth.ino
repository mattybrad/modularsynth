byte incomingByte;
byte note;
byte velocity;
int action=2; //0 =note off ; 1=note on ; 2= nada

// pins for selecting mux channel for reading
const int READ_SELECT_1 = 2;
const int READ_SELECT_2 = 3;
const int READ_SELECT_3 = 4;

// pins for reading from multiplexers
const int READ_MUX_1 = 5;
const int READ_MUX_2 = 6; // actually there's only 1 at the moment

// pins for selecting demux channel for writing
const int WRITE_SELECT_1 = 7;
const int WRITE_SELECT_2 = 8;
const int WRITE_SELECT_3 = 9;

// pins for selecting which demux to write to
const int DEMUX_SELECT_1 = 10;
const int DEMUX_SELECT_2 = 11;
const int DEMUX_SELECT_3 = 12;


void setup() {
  // put your setup code here, to run once:
  pinMode(READ_SELECT_1,OUTPUT);
  pinMode(READ_SELECT_2,OUTPUT);
  pinMode(READ_SELECT_3,OUTPUT);
  pinMode(READ_MUX_1,INPUT);
  pinMode(READ_MUX_2,INPUT);
  pinMode(WRITE_SELECT_1,OUTPUT);
  pinMode(WRITE_SELECT_2,OUTPUT);
  pinMode(WRITE_SELECT_3,OUTPUT);
  Serial.begin(9600);
  Serial1.begin(31250);
}

void loop() {
  // put your main code here, to run repeatedly:
  int i,j;
  for(i=0;i<8;i++) {
    digitalWrite(WRITE_SELECT_1,bitRead(i,0));
    digitalWrite(WRITE_SELECT_2,bitRead(i,1));
    digitalWrite(WRITE_SELECT_3,bitRead(i,2));
    for(j=0;j<8;j++) {
      if(i<j) {
        digitalWrite(READ_SELECT_1,bitRead(j,0));
        digitalWrite(READ_SELECT_2,bitRead(j,1));
        digitalWrite(READ_SELECT_3,bitRead(j,2));
        if(digitalRead(READ_MUX_1)==HIGH) {
          Serial.print(i);
          Serial.print("-");
          Serial.print(j);
          Serial.print("\n");
        }
      }
    }
  }
  //Serial.println("DONE");
  if (Serial1.available() > 0) {
   // read the incoming byte:
   incomingByte = Serial1.read();

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
  //delay(100);
}

void playNote(byte note, byte velocity){
  Serial.println("PLAYED NOTE");
  Serial.println(note);
}
