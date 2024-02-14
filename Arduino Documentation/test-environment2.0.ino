/**
 * This is an example of joining, sending and receiving data via LoRaWAN using a more minimal interface.
 * 
 * The example is configured for OTAA, set your keys into the variables below.
 * 
 * The example will upload a counter value periodically, and will print any downlink messages.
 * 
 * please disable AT_SUPPORT in tools menu
 *
 * David Brodrick.
 */
#include "LoRaWanMinimal_APP.h"
#include "Arduino.h"
#define Sensor GPIO5 // Sensor Input Pin
int sensorval = 0;  // Sensor Value
static uint8_t human_count = 0;
static uint8_t prev_human_count = 0;
static uint8_t send_human_count = 0;
unsigned long previousMillis = 0;
const long interval = 300000;  
const long sleepInterval = 7200000;


/*
 * set LoraWan_RGB to Active,the RGB active in loraWan
 * RGB red means sending;
 * RGB purple means joined done;
 * RGB blue means RxWindow1;
 * RGB yellow means RxWindow2;
 * RGB green means received done;
 */

//Set these OTAA parameters to match your app/node in TTN
// static uint8_t devEui[] = { 0x22, 0x32, 0x33, 0x00, 0x00, 0x88, 0x88, 0x09 }; MAKE SURE YOU MAKE THIS UNIQUE FOR YOUR DEVICE
static uint8_t appEui[] = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };
static uint8_t appKey[] = { 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x66, 0x01 };

uint16_t userChannelsMask[6]={ 0x00FF,0x0000,0x0000,0x0000,0x0000,0x0000 };

///////////////////////////////////////////////////
//Some utilities for going into low power mode
TimerEvent_t sleepTimer;
//Records whether our sleep/low power timer expired
bool sleepTimerExpired;

static void wakeUp()
{
  sleepTimerExpired=true;
}

static void lowPowerSleep(uint32_t sleeptime)
{
  sleepTimerExpired=false;
  TimerInit( &sleepTimer, &wakeUp );
  TimerSetValue( &sleepTimer, sleeptime );
  TimerStart( &sleepTimer );
  //Low power handler also gets interrupted by other timers
  //So wait until our timer had expired
  while (!sleepTimerExpired) lowPowerHandler();
  TimerStop( &sleepTimer );
}

///////////////////////////////////////////////////
void setup() {
	Serial.begin(115200);
  LoRaWAN.begin(LORAWAN_CLASS, ACTIVE_REGION);
  pinMode (Sensor, INPUT);  // Sensor as input
  
  //Enable ADR
  LoRaWAN.setAdaptiveDR(true);

  while (1) {
    Serial.print("Joining... ");
    LoRaWAN.joinOTAA(appEui, appKey, devEui);
    if (!LoRaWAN.isJoined()) {
      Serial.println("JOIN FAILED! Sleeping for 30 seconds");
      lowPowerSleep(30000);
    } else {
      Serial.println("JOINED");
      break;
    }
  }
}

///////////////////////////////////////////////////
void loop()
{
  delay(100);
  unsigned long currentMillis = millis(); 
  sensorval = digitalRead(Sensor);
  if (sensorval == 0) {
    Serial.println("Presence detected");
    human_count++;
    Serial.println(human_count);
  }
  else {
    Serial.println("No presence detected");
    // If no presence is detected for 2 hours, sleep for 30 mins
    if (currentMillis - previousMillis >= sleepInterval) {
      previousMillis = currentMillis;
      lowPowerSleep(1800000);
    }
  }
  // If the count is greater than 250, send the data and reset it to ensure it doesn't spike above 256
  if (human_count >= 250) {
    send_human_count = human_count - prev_human_count; // difference between values to send
    prev_human_count = human_count; // value to be stored for next time
    if (send_human_count < 0) {
      send_human_count = send_human_count * -1;
    }

    Serial.printf("\nSending packet with human count=%d\n", send_human_count);
    if (LoRaWAN.send(1, &send_human_count, 1, true)) {
      Serial.println("Send OK");
      human_count = 0;
    } else {
      Serial.println("Send FAILED");
    }
  }

  // Send data every 5 minutes
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    send_human_count = human_count - prev_human_count; // difference between values to send
    prev_human_count = human_count; // value to be stored for next time
    if (send_human_count < 0) {
      send_human_count = send_human_count * -1;
    }

    Serial.printf("\nSending packet with human count=%d\n", send_human_count);
    if (LoRaWAN.send(1, &send_human_count, 1, true)) {
      Serial.println("Send OK");
    } else {
      Serial.println("Send FAILED");
    }
  }
}

///////////////////////////////////////////////////
//Example of handling downlink data
void downLinkDataHandle(McpsIndication_t *mcpsIndication)
{
  Serial.printf("Received downlink: %s, RXSIZE %d, PORT %d, DATA: ",mcpsIndication->RxSlot?"RXWIN2":"RXWIN1",mcpsIndication->BufferSize,mcpsIndication->Port);
  for(uint8_t i=0;i<mcpsIndication->BufferSize;i++) {
    Serial.printf("%02X",mcpsIndication->Buffer[i]);
  }
  Serial.println();
}