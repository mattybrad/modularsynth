# Modular Synth

Modular synthesizers are really cool but really expensive. This project is a hybrid software/hardware system, where the sound is created digitally by the Web Audio API in Javascript, but routing/patching between modules is done in hardware, by an Arduino-based system. While there are plenty of soft synths which can be controlled by external hardware devices (keyboard/knobs/sliders, etc), the slightly unique part of this project is being able to detect routing between modules.

## Parts List

The hardware part of this project requires the following parts:
* An Arduino Uno or similar
* Several 4051 (or similar) multiplexers
* Several SN74HC165N (or similar) shift registers (parallel in, serial out)
* A bunch of resistors
* A bunch of wires
