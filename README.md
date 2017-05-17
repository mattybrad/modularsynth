# Modular Synth

Modular synthesizers are really cool but really expensive. This project is an attempt to create a relatively cheap digital synthesizer with the patching flexibility of a "real" modular synth. Patching is detected by an Arduino, which checks which sockets are connected to each other. The Arduino circuit acts as a sort of MIDI controller to a soft synth running on the a computer using the Web Audio API in Javascript.

## Current status

I am working on the hardware and software parts of this project concurrently. The Arduino circuit involves a hilarious amount of wiring, but is working nicely. The Javascript soft synth is working and making some nice noises, but latency, glitches, and the desire to squeeze the whole project into a standalone box are causing me to think seriously about rewriting the synth using the Teensy audio library. Stay tuned.

## Features

The beauty of this project is that it can be customised to have whatever modules you feel like using, but my current setup is:
* An MDF box about 40cm x 30cm x 15cm with controls on the front
* About 50 patch sockets for input, output, CV, modulation, etc.
* About 30 potentiometers to control parameters
* All the basic synth modules (oscillators, filters, envelopes, etc)
* Somewhat unreliable external MIDI input

## Parts List

The hardware part of this project is in flux, but is likely to require the following parts:
* An Arduino Mega 2560 or Teensy (something with a lot of pins, basically)
* Loads of 4051 multiplexers (22 at the last count!)
* About 50 3.5mm mono jack sockets
* About 30 10k potentiometers
* Some resistors
* Literally hundreds of jumper wires of varying sizes

You could definitely scale down the project if needed, and could probably run a smaller setup on an Arduino Uno. I just got a bit overexcited.
