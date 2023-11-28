# Garden-Project

## Overview

The automated garden is run on a Raspberry Pi 4 with 8GB of RAM. It has multiple soil moisture sensors, and I recently added a temperature/humidity sensor. All the data will be stored on a second Raspberry Pi that I use as an SQL server. The goal of this automated garden is to gain a better understanding of the Raspberry Pi, with the long-term goal of turning it into an automated greenhouse. There are several other things that I would need to make that happen, but these are the early stages of the process. I do plan on adding documentation to this project once I get further along in the process.

## Sensors and Parts

-   Raspberry Pi 4 8GB - Brains
-   Raspberry Pi 3 B+ - SQL Server
-   DHT22 - Temp and humidity
-   Capacitive Soil Moisture Sensor v1.2 - Soil moisture levels
-   ADS1115 - Converts the signal from the soil moisture sensor
-   4 Relay Module - Connects to the water motors

## Notes

I am doing this by SSH'ing into my pi, so all of the new code is being copied over to my computer so I can use git. That is why I haven't updated the package.json file, and things probably wouldn't work if you cloned this and tried running it yourself. Once I get closer to a finished project I will clean this repo up.

## Update

I have spent the last few weeks learning how to use kicad, drawing schematics, and designing a pcb. I want to be able to hook all the wires into a central location. As it is now, I have wires going all over from the pi, to a breadboard, and then to other boards. I _think_ I have something figured out in kicad, and after the holiday season I will send the files to PCBWay and have them printed. Between now and then I will continue learning kicad, and most likely make changes to what I have. Ulitmatly I just hope the boards work when I get them, but this is all a learning process, and that's the best part.
