// data.js
// Project data for the "Selected Work" portfolio section.
// Swap the `image` field for a real screenshot path/URL when you have one.

const projects = [
  {
    id: "construction-website",
    tag: "FEATURED PROJECT",
    title: "Construction Website",
    description:
      "A premium corporate website built for a construction company, focused on lead generation, modern UI, responsive layouts, and smooth GSAP animations.",
    stack: ["React", "GSAP", "Tailwind CSS", "Responsive"],
    // poster shows instantly; video swaps in ~1s later and autoplays on loop
    image: "/images/construction.png",
    video: "/videos/construction.mp4",
    stat: { value: "78%", label: "Funding the Future" },
    // link: "https://constructionbuildx.netlify.app/",
  },
  {
    id: "restaurant-website",
    tag: "FEATURED PROJECT",
    title: "Restaurant Website",
    description:
      "A modern restaurant website featuring elegant UI, immersive animations, responsive design, and an engaging user experience for food lovers.",
    stack: ["React", "GSAP", "Custom CSS", "Responsive"],
    image: "/images/restaurant.png",
    video: "/videos/restaurant.mp4",
    stat: { value: "Reserve", label: "Your Table" },
    // link: "https://indianrest.netlify.app/",
  },
    {
    id: "clinic-website",
    tag: "FEATURED PROJECT",
    title: "Clinic Website",
    description:
      "A modern clinic website featuring a clean UI, smooth animations, responsive design, and an improved user experience for patients.",
    stack: ["React", "GSAP", "Custom CSS", "Responsive"],
    image: "/images/clinic.png",
    video: "/videos/clinic.mp4",
    stat: { value: "Reserve", label: "Your Appointment" },
  },
];

export default projects;