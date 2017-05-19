// pins for selecting mux channel for reading
const int READ_SELECT_1 = 7;
const int READ_SELECT_2 = 6;
const int READ_SELECT_3 = 5;

// pins for reading from multiplexers
const int READ_MUX_PINS[] = {22, 23, 24, 25, 26, 27, 28, 29};

// pins for selecting demux channel for writing
const int WRITE_SELECT_1 = 10;
const int WRITE_SELECT_2 = 9;
const int WRITE_SELECT_3 = 8;

// pins for selecting which demux to write to
const int DEMUX_SELECT_1 = 4;
const int DEMUX_SELECT_2 = 3;
const int DEMUX_SELECT_3 = 2;


void setup() {
  // put your setup code here, to run once:
  pinMode(READ_SELECT_1,OUTPUT);
  pinMode(READ_SELECT_2,OUTPUT);
  pinMode(READ_SELECT_3,OUTPUT);
  pinMode(WRITE_SELECT_1,OUTPUT);
  pinMode(WRITE_SELECT_2,OUTPUT);
  pinMode(WRITE_SELECT_3,OUTPUT);
  pinMode(DEMUX_SELECT_1,OUTPUT);
  pinMode(DEMUX_SELECT_2,OUTPUT);
  pinMode(DEMUX_SELECT_3,OUTPUT);
  pinMode(13, OUTPUT);
  for(int i=0;i<8;i++) {
    pinMode(READ_MUX_PINS[i], INPUT);
  }
  Serial.begin(250000);
  Serial1.begin(31250);
}

byte midiByte;
byte midiStage;
byte midiCommand;
byte midiChannel;

int bytesRead = 0;
byte serialByte;
byte byte1;
byte byte2;
byte byte3;

bool notes[128];

int currentNote = 0;
bool gate = false;
String connectionData;
String knobData;

void loop() {
  long timeCheck = millis();
  int i,j,k,m;
  connectionData = "C";
  
  // supply 5V to each "write" demultiplexer in turn
  for(i=0;i<8;i++) {
    digitalWrite(DEMUX_SELECT_1,bitRead(i,0));
    digitalWrite(DEMUX_SELECT_2,bitRead(i,1));
    digitalWrite(DEMUX_SELECT_3,bitRead(i,2));
    
    // supply 5V to each pin in turn
    for(j=0;j<8;j++) {
      digitalWrite(WRITE_SELECT_1,bitRead(j,0));
      digitalWrite(WRITE_SELECT_2,bitRead(j,1));
      digitalWrite(WRITE_SELECT_3,bitRead(j,2));
      
      // select "read" multiplexer pins in turn (for all multiplexers simultaneously)
      for(k=0;k<8;k++) {
        digitalWrite(READ_SELECT_1,bitRead(k,0));
        digitalWrite(READ_SELECT_2,bitRead(k,1));
        digitalWrite(READ_SELECT_3,bitRead(k,2));
        
        // read from each multiplexer in turn
        for(m=0;m<8;m++) {
          if(i*8+j<m*8+k) {
            if(digitalRead(READ_MUX_PINS[m])==HIGH) {
              Serial.print(i*8 + j);
              Serial.print("-");
              Serial.print(m*8 + k);
              Serial.print("\n");
              connectionData += String(i*8 + j) + String("-") + String(m*8 + k) + String(",");
            }
          }
        }

        // knob multiplexers are sharing selector pins with connection multiplexers
        // this means this is a good place to read the analogue values
        // currently not doing this every loop because it would be too slow(?)
        if(j==0) {
          for(m=0;m<2;m++) {
            knobData = String("A")+String(m*8+k)+String("-")+String(analogRead(m));
            Serial.println(knobData);
          }
        }
      }
    }
  }
  
  //checkMidi();
  Serial.println(connectionData);
  Serial.println(gate?"G1":"G0");
  Serial.print("N");
  Serial.print(currentNote);
  Serial.print("\n");
  digitalWrite(13, gate);
}

void checkMidi() {
  while(Serial1.available()) {
    serialByte = Serial1.read();
    if(serialByte >= 128) bytesRead = 0;
    if(bytesRead == 0) byte1 = serialByte;
    else if(bytesRead == 1) byte2 = serialByte;
    else if(bytesRead == 2) byte3 = serialByte;
    bytesRead ++;
    if(bytesRead >= 2) {
      // check if message makes sense
      midiChannel = byte1 & B00001111;
      midiCommand = byte1 & B11110000;
      if(midiCommand == 144 && bytesRead == 3) {
        notes[byte2] = true;
        updateCurrentNote();
      }
      if(midiCommand == 128 && bytesRead == 3) {
        notes[byte2] = false;
        updateCurrentNote();
      }
    }
  }
}

void updateCurrentNote() {
  gate = false;
  for(int i = 0; i < 128; i ++) {
    if(notes[i]) {
      currentNote = i;
      gate = true;
    }
  }
}

