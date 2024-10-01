#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <LiquidCrystal_I2C.h>

#include "DFRobotDFPlayerMini.h"
HardwareSerial mySoftwareSerial(1);
DFRobotDFPlayerMini myDFPlayer;

// set the LCD number of columns and rows
int lcdColumns = 16;
int lcdRows = 2;

// set LCD address, number of columns and rows
// if you don't know your display address, run an I2C scanner sketch
LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);


Servo myservo1;
Servo myservo2;
Servo myservo3;
Servo myservo4;
// Recommended PWM GPIO pins on the ESP32 include 2,4,12-19,21-23,25-27,32-33
int servoPin1 = 18;
int servoPin2 = 4;
int servoPin3 = 19;
int servoPin4 = 15;

int button = 5;
int previousVal = HIGH;  // Initialize previous value to HIGH (assuming button is not pressed at startup)


int snoozeButton = 23;
int snoozePreviousVal = HIGH;  // Initialize previous value to HIGH (assuming button is not pressed at startup)

// const char* ssid = "Salameh";           // Replace with your WiFi SSID
// const char* password = "1271985@MAHA";  // Replace with your WiFi password

const char* ssid = "Airbox-E798";           // Replace with your WiFi SSID
const char* password = "HH65Cm6U";  // Replace with your WiFi password


// const char* ssid = "Umniah-evo-Home-9570";  // Replace with your WiFi SSID
// const char* password = "18R2LHE61B7";       // Replace with your WiFi password

// const char* ssid = "Pixel_7914";           // Replace with your WiFi SSID
// const char* password = "3adastalafon2";  // Replace with your WiFi password

const char* serverName = "http://192.168.1.164:3001/notification";               // Replace with your server address
const char* serverNameDone = "http://192.168.1.164:3001/notification/done";      // Replace with your server address
const char* serverNameSnooze = "http://192.168.1.164:3001/notification/snooze";  // Replace with your server address



const int ledPin = 2;  // Onboard LED on many ESP32 boards

unsigned long previousMillis = 0;
const long interval = 1000;  // Interval to wait between HTTP requests (in milliseconds)



String gTitle = "";
String gTime = "";

struct EventNoti {
  String title;
  String time;
  int occId;
};

EventNoti firstEvent;  // First event


bool Notify = false;
bool lcdUsed = false;




void setup() {

  mySoftwareSerial.begin(9600, SERIAL_8N1, 27, 26);  // speed, type, RX, TX
  Serial.println();
  Serial.println(F("DFRobot DFPlayer Mini Demo"));
  Serial.println(F("Initializing DFPlayer ... (May take 3~5 seconds)"));


  if (!myDFPlayer.begin(mySoftwareSerial)) {  //Use softwareSerial to communicate with mp3.

    Serial.println(myDFPlayer.readType(), HEX);
    Serial.println(F("Unable to begin:"));
    Serial.println(F("1.Please recheck the connection!"));
    Serial.println(F("2.Please insert the SD card!"));
    while (true)
      ;
  }

  Serial.println(F("DFPlayer Mini online."));
  myDFPlayer.volume(30);  //Set volume value (0~30).
  myDFPlayer.EQ(DFPLAYER_EQ_NORMAL);
  myDFPlayer.outputDevice(DFPLAYER_DEVICE_SD);


  pinMode(button, INPUT_PULLUP);
  pinMode(snoozeButton, INPUT_PULLUP);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Initializing...");
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);

  myservo1.setPeriodHertz(50);
  myservo2.setPeriodHertz(50);
  myservo3.setPeriodHertz(50);
  myservo4.setPeriodHertz(50);

  myservo1.attach(servoPin1, 500, 2500);
  myservo2.attach(servoPin2, 500, 2500);
  myservo3.attach(servoPin3, 500, 2500);
  myservo4.attach(servoPin4, 500, 2500);

  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}
void moveTheServo(int num) {
  switch (num) {
    case 1:
      myservo1.write(0);
      delay(500);
      myservo1.write(150);
      delay(500);
      myservo1.write(0);
      break;
    case 2:
      myservo2.write(0);
      delay(500);
      myservo2.write(170);
      delay(500);
      myservo2.write(0);
      break;
    case 3:
      myservo3.write(0);
      delay(500);
      myservo3.write(150);
      delay(500);
      myservo3.write(0);
      break;
    case 4:
      myservo4.write(0);
      delay(500);
      myservo4.write(170);
      delay(500);
      myservo4.write(0);
      break;
  }
}
struct Event {
  int id;
  int eventId;
  String date;
  String time;
  bool done;
  int container;
};

void done() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(serverNameDone);
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      String payload = http.getString();
      Serial.println("HTTP Response code: " + String(httpResponseCode));
      Serial.println("Response payload: " + payload);

      // Allocate memory for the JSON document
      // Adjust the size according to the JSON response
      StaticJsonDocument<2048> doc;  // Increased size to handle larger JSON

      // Deserialize the JSON document
      DeserializationError error = deserializeJson(doc, payload);

      // Test if parsing succeeds
      if (!error && doc.is<JsonArray>()) {
        // Iterate over each object in the array
        for (JsonObject eventObj : doc.as<JsonArray>()) {
          // Retrieve values
          int id = eventObj["id"];
          int eventId = eventObj["eventId"];
          String date = eventObj["date"];
          String time = eventObj["time"];
          bool done = eventObj["done"];
          int container = eventObj["container"];
          Serial.println("Container: " + String(container));
          moveTheServo(container);

          lcd.clear();
          lcd.setCursor(0, 0);
          lcd.print("your pill is out");
          lcd.setCursor(0, 1);
          lcd.print("");
          delay(1000);
          lcdUsed = true;
          // Create an Event object with retrieved values
          Event event = { id, eventId, date, time, done, container };

          // Use the 'event' object as needed
          Serial.println("ID: " + String(event.id));
          Serial.println("Event ID: " + String(event.eventId));
          Serial.println("Date: " + event.date);
          Serial.println("Time: " + event.time);
          Serial.println("Done: " + String(event.done));
          Serial.println("Container: " + String(event.container));
        }
      } else {
        Serial.println("Failed to parse JSON");
      }
    } else {
      Serial.println("Error on HTTP request");
    }

    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
}

void snooze() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Specify the URL for the POST request
    http.begin(serverNameSnooze);

    // Specify the content type and other headers if necessary
    http.addHeader("Content-Type", "application/json");

    // Create the JSON payload
    StaticJsonDocument<200> doc;
    doc["id"] = firstEvent.occId;

    // Serialize JSON document to a string
    String payload;
    serializeJson(doc, payload);

    // Debug: Print the payload to the Serial Monitor
    Serial.print("Payload: ");
    Serial.println(payload);

    // Send the POST request
    int httpResponseCode = http.POST(payload);

    // Check the response code
    if (httpResponseCode > 0) {
      String response = http.getString();  // Get the response payload
      Serial.println(httpResponseCode);    // Print the response code
      Serial.println(response);
      // Print the response
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Snoozed");
      lcd.setCursor(0, 1);
      lcd.print("Successfully");
      delay(1000);
      lcdUsed = true;


    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);

      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Didn't Snoozed");
      lcd.setCursor(0, 1);
      lcd.print("Successfully");
      delay(1000);
    }

    // End the HTTP connection
    http.end();
  }
}
String prevTitle = "";
String prevTime = "";

void loop() {

  int val = digitalRead(button);
  if (val != previousVal) {  // Check if the current value is different from the previous value
    if (val == 0) {
      Serial.println(val);  // If different, print the current value
      done();
    }
    previousVal = val;  // Update previous value to current value
  }
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;

      http.begin(serverName);
      int httpResponseCode = http.GET();

      if (httpResponseCode > 0) {
        String payload = http.getString();
        JsonDocument doc;
        DeserializationError error = deserializeJson(doc, payload);

        if (error) {
          Serial.print(F("deserializeJson() failed: "));
          Serial.println(error.f_str());
          return;
        }

        if (doc.size() == 0) {
          Serial.println(F("Empty payload received"));
          firstEvent.title = "There nothing";
          firstEvent.time = "today";
          firstEvent.occId = 0;
          return;
        }

        // Retrieve the first event
        JsonObject firstObj = doc[0];
        const char* title = firstObj["title"];
        const char* time = firstObj["time"];
        const int occId = firstObj["occId"];

        Notify = firstObj["notify"];
        // Update the first event

        firstEvent.title = String(title);
        firstEvent.time = String(time);
        firstEvent.occId = occId;
        Serial.print("id: ");
        Serial.print(firstEvent.occId);
        Serial.print("title: ");
        Serial.print(firstEvent.title);
        Serial.print("time: ");
        Serial.print(firstEvent.time);
        Serial.println("");


        // Display the first event
        // Serial.print("First Event: ");
        // Serial.print("Title: ");
        // Serial.print(firstEvent.title);
        // Serial.print(", Time: ");
        // Serial.println(firstEvent.time);
      } else {
        Serial.println("Error on HTTP request");
      }

      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
  }
  if (firstEvent.title != prevTitle || firstEvent.time != prevTime || lcdUsed == true) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(String(firstEvent.title));
    lcd.setCursor(0, 1);
    lcd.print(String(firstEvent.time));

    // Update previous title and time
    prevTitle = firstEvent.title;
    prevTime = firstEvent.time;
    lcdUsed = false;
  }



  if (Notify == true) {
    Serial.println(F("DFPlayer Mini online."));
    myDFPlayer.volume(30);  //Set volume value (0~30).
    myDFPlayer.EQ(DFPLAYER_EQ_NORMAL);
    myDFPlayer.outputDevice(DFPLAYER_DEVICE_SD);

    //----Read imformation----
    Serial.println(F("readState--------------------"));
    Serial.println(myDFPlayer.readState());  //read mp3 state
    Serial.println(F("readVolume--------------------"));
    Serial.println(myDFPlayer.readVolume());  //read current volume
    //Serial.println(F("readEQ--------------------"));
    //Serial.println(myDFPlayer.readEQ()); //read EQ setting
    Serial.println(F("readFileCounts--------------------"));
    Serial.println(myDFPlayer.readFileCounts());  //read all file counts in SD card
    Serial.println(F("readCurrentFileNumber--------------------"));
    Serial.println(myDFPlayer.readCurrentFileNumber());  //read current play file number
    Serial.println(F("readFileCountsInFolder--------------------"));
    Serial.println(myDFPlayer.readFileCountsInFolder(3));  //read fill counts in folder SD:/03
    Serial.println(F("--------------------"));

    Serial.println(F("myDFPlayer.play(1)"));
    myDFPlayer.play(1);  //Play the first mp3

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Alarming!!");
    lcd.setCursor(0, 1);
    lcd.print("");


    digitalWrite(2, 1);
    while (Notify) {

      int Sval = digitalRead(snoozeButton);
      if (Sval != snoozePreviousVal) {  // Check if the current value is different from the previous value
        if (Sval == 0) {
          Serial.println(Sval);  // If different, print the current value
          snooze();
          Notify = false;
        }
        snoozePreviousVal = Sval;  // Update previous value to current value
      }

      int val = digitalRead(button);
      if (val != previousVal) {  // Check if the current value is different from the previous value
        if (val == 0) {
          Serial.println(val);  // If different, print the current value
          done();
          Notify = false;
        }
        previousVal = val;  // Update previous value to current value
      }
    }
  } else {
    digitalWrite(2, 0);
    myDFPlayer.pause();
  }
}
