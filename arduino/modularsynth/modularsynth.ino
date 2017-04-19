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
  pinMode(13, OUTPUT);
  Serial.begin(9600);
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

void loop() {
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
  Serial.println(gate?"G1":"G0");
  Serial.print("N");
  Serial.print(currentNote);
  Serial.print("\n");
  Serial.println("DONE");
  digitalWrite(13, gate);
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

