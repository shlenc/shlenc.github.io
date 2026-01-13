// Central project data (edit this to add/modify projects)
export const PROJECTS = [
  {
    id: "rocket-gnc",
    title: "Rocket Guidance, Navigation, & Control",
    subtitle: "Inertial navigation + sensor fusion in a Monte Carlo simulation",
    year: "2023=2024",
    role: "Avionics & Airbrakes",
    tags: ["Navigation", "EKF", "Monte Carlo", "Python"],
    heroImage: "assets/images/project1.png",
    gallery: [
      "assets/images/project1.png",
      "assets/images/project2.png",
      "assets/images/project3.png"
    ],
    summary:
      "A self-contained simulation pipeline that fuses IMU and altimeter data to estimate vehicle state during powered ascent and coast.",
    problem:
      "Raw inertial integration drifts quickly. This project focuses on robust state estimation under sensor noise, bias, and asynchronous measurements.",
    solutionBullets: [
      "Defined a strapdown inertial propagation model with bias states.",
      "Implemented an EKF with discrete-time propagation and measurement updates.",
      "Ran 1,000+ Monte Carlo trials to quantify accuracy and sensitivity."
    ],
    resultsBullets: [
      "Consistent convergence from poor initial conditions.",
      "Position/velocity errors reduced vs. dead-reckoning baseline.",
      "Reusable architecture for future sensor additions (GPS, magnetometer)."
    ],
    tools: ["Python", "NumPy", "Matplotlib", "Unit tests"],
    links: { github: "#", report: "#" }
  },
  {
    id: "quadrotor-lqr",
    title: "LQR Controller for Quadrotor Attitude Stabilization",
    subtitle: "Linearized dynamics + gain scheduling for aggressive maneuvers",
    year: "2025",
    role: "Controls",
    tags: ["Controls", "LQR", "State Space", "C++"],
    heroImage: "assets/images/project2.png",
    gallery: [
      "assets/images/project2.png",
      "assets/images/project3.png",
      "assets/images/project1.png"
    ],
    summary:
      "An LQR-based attitude controller with a lightweight plant model suitable for real-time implementation.",
    problem:
      "Quadrotor attitude dynamics are fast and coupled; robust stabilization is required to reject disturbances and model mismatch.",
    solutionBullets: [
      "Derived linearized attitude dynamics around hover and maneuver points.",
      "Designed LQR gains and validated margins across operating conditions.",
      "Added a simple gain schedule to maintain performance."
    ],
    resultsBullets: [
      "Fast settling with minimal overshoot in simulation.",
      "Improved disturbance rejection vs. PID baseline.",
      "Clean interface for embedded deployment."
    ],
    tools: ["C++", "Eigen (optional)", "Simulation harness"],
    links: { github: "#", report: "#" }
  },
  {
    id: "gnc-guidance-law",
    title: "Terminal Guidance Law for Precision Landing",
    subtitle: "Impact-angle constrained guidance with actuator limits",
    year: "2025",
    role: "Guidance",
    tags: ["Guidance", "Optimal Control", "Landing", "MATLAB"],
    heroImage: "assets/images/project3.png",
    gallery: [
      "assets/images/project3.png",
      "assets/images/project1.png",
      "assets/images/project2.png"
    ],
    summary:
      "A terminal guidance scheme targeting a landing point while shaping approach angle and respecting acceleration limits.",
    problem:
      "Landing requires not just hitting the target, but doing so with safe geometry and within actuator constraints.",
    solutionBullets: [
      "Formulated a guidance objective with terminal constraints.",
      "Implemented a closed-loop law and tested across dispersions.",
      "Assessed constraint handling under saturation."
    ],
    resultsBullets: [
      "Reliable convergence to target across dispersed initial states.",
      "Approach-angle shaping improved landing geometry.",
      "Clear knobs to trade fuel/accel vs. accuracy."
    ],
    tools: ["MATLAB/Octave", "Numerical optimization", "Plots"],
    links: { github: "#", report: "#" }
  }
];
