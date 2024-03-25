int IN1Pin = 4; // 모터 A
int IN2Pin = 5; // 모터 A
int IN3Pin = 13; // 모터 B
int IN4Pin = 12; // 모터 B
int ENAPin = 3;
int ENBPin = 11;
void setup() {
  pinMode(IN1Pin, OUTPUT);
  pinMode(IN2Pin, OUTPUT);
  pinMode(IN3Pin, OUTPUT);
  pinMode(IN4Pin, OUTPUT);
  analogWrite(ENAPin, 250);
  analogWrite(ENBPin, 250);
}
void loop()
{
  // 전진
  // Motor A 방향 설정
  digitalWrite(IN1Pin, HIGH);
  digitalWrite(IN2Pin, LOW);

  // Motor B 방향 설정
  digitalWrite(IN3Pin, HIGH);
  digitalWrite(IN4Pin, LOW);
  
  delay(1000);
  stop();
  delay(3000);
  
  // 후진
  // Motor A 방향 설정
  digitalWrite(IN1Pin, LOW);
  digitalWrite(IN2Pin, HIGH);

  // Motor B 방향 설정
  digitalWrite(IN3Pin, LOW);
  digitalWrite(IN4Pin, HIGH);

  delay(1000);
  stop();
  delay(3000);
  

  // 좌회전
  // Motor A 방향 설정
  digitalWrite(IN1Pin, HIGH);
  digitalWrite(IN2Pin, LOW);

  // Motor B 방향 설정
  digitalWrite(IN3Pin, LOW);
  digitalWrite(IN4Pin, HIGH);
  
  delay(1000);
  stop();
  delay(3000);
  
  // 우회전
  // Motor A 방향 설정
  digitalWrite(IN1Pin, LOW);
  digitalWrite(IN2Pin, HIGH);

  // Motor B 방향 설정
  digitalWrite(IN3Pin, HIGH);
  digitalWrite(IN4Pin, LOW);

  delay(1000);
  stop();
  delay(3000);
}

 void stop() {
    digitalWrite(IN1Pin, HIGH);
    digitalWrite(IN2Pin, HIGH);
    digitalWrite(IN3Pin, HIGH);
    digitalWrite(IN4Pin, HIGH);
  }