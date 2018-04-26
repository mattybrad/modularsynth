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
}

int allKnobs[64];
bool firstRead = true;
String connectionData;

void loop() {
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
              connectionData += String(i*8 + j) + String("-") + String(m*8 + k) + String(",");
            }
          }
        }
        
        if(j==0) {
          for(m=0;m<5;m++) {
            if(firstRead) {
              allKnobs[m*8+k] = analogRead(m);
            } else {
              if(abs(analogRead(m) - allKnobs[m*8+k]) > 5) {
                allKnobs[m*8+k] = analogRead(m);
                if((m*8+k<20||m*8+k>23)&&m*8+k<36) {
                  //Serial.print("KNOB CHANGED: ");
                  //Serial.println(m*8+k);
                }
              }
            }
          }
          firstRead = false;
        }
      }
    }
  }
  Serial.println(connectionData);
  delay(1000);

}
