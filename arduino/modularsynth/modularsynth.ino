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
  Serial.println("DONE");
  delay(100);
}
