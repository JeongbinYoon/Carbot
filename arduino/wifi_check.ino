#include <SoftwareSerial.h>

SoftwareSerial mySerial(8, 9); // RX, TX
// RX-pin0, TX-pin1에 연결하지 않는 이유
// USB가 연결되어 있는 동안은 아두이노의 TX와 RX는 PC와 연결되어 있어서

void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);//기본 통신 속도가 9600인 제품은 9600으로 수정
}

void loop() {
  if (mySerial.available()) {
    Serial.write(mySerial.read());
  }
  if (Serial.available()) {
    mySerial.write(Serial.read());
  }
}