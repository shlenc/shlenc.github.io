---
layout: post
title: Custom Flight Controller PCB
description:  Building a quadcopter with swarm capabilities requires custom hardware. In this project, the electrical schematic, component layout, trace routing, and manufacturing plan of the flight controller development PCB was designed and optimized using Altium Designer.
skills: 
- PCB Design
- Signal Conditioning
- Altium Designer
- Electrical Schematic Design
- Trace Routing
- PCB Layout Optimization
main-image: /custom_pcb_main.png
---

## Prototype 1: Developer Board

The first prototype serves only as a development board, so a few functions were simplified for testing purposes. Sensor frames, ESC I/O, and radio signals were replaced by data transfer across the USB-C cable. Combining a 3.3V LDO regulator, 5V step converter, and a voltage detector with the USB-C power supply omitted the need for a battery pack and charger. Some extra features for development include a boot loader, SWD external connecter, and LED status checks. 

## Electrical Schematic

{% include image-gallery.html images="mcu.png" height="1000" %}

{% include image-gallery.html images="mcu_components1.png" height="1000" %}

{% include image-gallery.html images="mcu_components2.png" height="1000" %}

{% include image-gallery.html images="power.png" height="1000" %}

{% include image-gallery.html images="connectors.png" height="1000" %}

{% include image-gallery.html images="sensors.png" height="1000" %}


## PCB Layout

{% include image-gallery.html images="development_pcb.png" height="1000" %}

Alot still needs to be done with this project for it to be able to control a real quadcopter.


### Next Steps

1. Optimize for cost, size, and cross-talk
2. Generate manufacturing requirements & documents (tooling holes, silkscreen, gerber files, CPL files, and BOM)
3. Order and assemble board (solder components  if necessary)
4. Flash firmware, map pins, set-up testing environment
5. Run through Hardware-In-The-Loop simulation tests
6. Extend functionality to an in-flight board
7. Optimize towards the final production board
