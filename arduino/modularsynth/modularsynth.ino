void setup() {
  // put your setup code here, to run once:
  pinMode(2,OUTPUT);
  pinMode(3,OUTPUT);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(6,OUTPUT);
  pinMode(7,OUTPUT);
  pinMode(8,OUTPUT);
  pinMode(9,INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int i,j;
  digitalWrite(5,HIGH);
  for(i=0;i<8;i++) {
    digitalWrite(2,bitRead(i,0));
    digitalWrite(3,bitRead(i,1));
    digitalWrite(4,bitRead(i,2));
    for(j=0;j<8;j++) {
      if(i<j) {
        digitalWrite(6,bitRead(j,0));
        digitalWrite(7,bitRead(j,1));
        digitalWrite(8,bitRead(j,2));
        if(digitalRead(9)==HIGH) {
          Serial.print(i);
          Serial.print("-");
          Serial.print(j);
          Serial.print("\n");
        }
      }
    }
  }
  digitalWrite(5,LOW);
  //Serial.print("A0-");
  //Serial.print(analogRead(0));
  //Serial.print("\n");
  Serial.println("DONE");
  delay(100);
}
