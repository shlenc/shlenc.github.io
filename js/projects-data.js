// Central project data (edit this to add/modify projects)
export const PROJECTS = [
  {
    id: "rocket-gnc",
    title: "Rocket Guidance, Navigation, & Control",
    subtitle: "Designing avionics and integrating aibrakes into a high-power model rocket for trajectory control",
    year: "2023-2024",
    role: "Avionics & Airbrakes",
    tags: ["GN&C", "Avionics", "Rocket Dynamics", "Flight Controller", "System Identification"],
    heroImage: "assets/images/project1.png",
    gallery: [
      "assets/images/project1.png",
      "assets/images/project2.png",
      "assets/images/project3.png"
    ],
    summary:
      "This project involved designing and integrating avionics with airbrake control as well as launch testing the rocket.",
    problem:
      "The goal of this project was to launch test a high-power model rocket with data logging/processing and post flight analysis. The main constrained metric was the max apogee.",
    solutionBullets: [
      "In order to guide the trajectory of the high-power rocket to reach the target max apogee, airbrakes were implemented into the vehicle.",
      "The airbrake deployment mechanism and on-board instrument housing units were 3D-printed utilizing SolidWorks 3D CAD and Ansys Mechanical.",
      "The airbrake control system from the flight controller was developed with analysis from Ansys Fluent, MATLAB/Simulink, and OpenRocket.",
      "ESP32 firmware was verified and validated through Hardware-In-the-Loop (HITL) tests."
    ],
    resultsBullets: [
      "Bench tests of the isolated avionics and airbrakes passed all functional requirements.",
      "The rocket was successfully launched for 3 flights and the flight data showed reliable trajectory guidance to the target max apogee."
    ],
    tools: ["MATLAB", "Simulink", "C/C++", "Ansys Fluent", "Ansys Mechanical", "SolidWorks 3D CAD", "3D-Printing", "Soldering", "HITL"],
    links: { github: "#", report: "#" }
  },
  {
    id: "sitl-quad-swarm",
    title: "SITL Quadcopter Swarm Simulation",
    subtitle: "Designing a quadcopter swarm simulation environment interfaced with ROS2 and Gazebo to test and develop control algorithms",
    year: "2024-2025",
    role: "Flight Software & Simulation",
    tags: ["SITL", "PID Control", "Python", "C++"],
    heroImage: "assets/images/project2.png",
    gallery: [
      "assets/images/project2.png",
      "assets/images/project3.png",
      "assets/images/project1.png"
    ],
    summary:
      "For realiable testing and developing of flight software, a test environment was built-up to simulate the network of a quadcopter drone swarm.",
    problem:
      "The goal of this project is to test and develop control algorithms for quadcopter swarms. Due to time and resource constraints, testing on real drones is not feasible. Therefore, a simulation environment was created.",
    solutionBullets: [
      "ROS2 was used to interface with Gazebo simulations and the mission interface. It enabled a method to troubleshoot issues with the behavior of the swarm or individual drones.",
      "Gazebo's physics engine provided high-fidelity vehicle and environment dynamics of the swarm."
    ],
    resultsBullets: [
      "The simulation proved effective for testing and developing flight software.",
      "A procedure was written to to efficiently use the test environment.",
      "On-going progress for implementing failure modes into the simulation for fault tolerance."
    ],
    tools: ["C++", "ROS2", "Python", "Gazebo", "Linux", "Git"],
    links: { github: "#", report: "#" }
  },
  {
    id: "custom-pcb",
    title: "Custom Flight Controller PCB",
    subtitle: "Designing and assembling a custom flight controller PCB for multirotor drones",
    year: "2024-2025",
    role: "Flight Controller Hardware",
    tags: ["PCB Design", "PCB Assembly", "Electrical Schematic Design", "Wire Routing"],
    heroImage: "assets/images/project3.png",
    gallery: [
      "assets/images/project3.png",
      "assets/images/project1.png",
      "assets/images/project2.png"
    ],
    summary:
      "In order to learn PCB development, this project focused on designing a custom PCB specifically for multirotor drones.",
    problem:
      "Weight, size, vibration, ESD, cost, and power impacts performance of quadcopter drones, so the design of the PCB intented to optimize for these factors.",
    solutionBullets: [
      "An STM32F7 microcontroller was used for its high-processing speed, large memory, and internal protocols which provides better flight performance.",
      "A single USB connector for power and data was used to allow easier modifiability and debugging."
    ],
    resultsBullets: [
      "The electrical schematic included all necessary microcontroller components, sensors, and power connections, but omitted radio and ESC functions.",
      "A final development board was achieved, so a flight-ready board is still in progress."
    ],
    tools: ["Altium Designer", "STM32", "HITL", "PCBA"],
    links: { github: "#", report: "#" }
  }
];
