import { Helmet } from 'react-helmet';

const HeroSection = () => {
  return (
    <div
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden scroll-mt-[120px]"
    >
      <Helmet>
        <title>Krutik Naina | Full-Stack Developer</title>
        <meta name="description" content="Portfolio of Krutik Naina, showcasing front-end development projects and skills." />
        <meta name="keywords" content="Krutik Naina, Front-End Developer, React, Portfolio" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Krutik Naina | Full-Stack Developer" />
        <meta property="og:description" content="Explore the portfolio of Krutik Naina, a passionate front-end developer." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://krutiknaina.com/" />
        <meta property="og:image" content="https://krutiknaina.com/og-image.jpg" />
      </Helmet>

      {/* Floating Tech Icons */}
      <img src="/icons/react.png" alt="React" className="absolute w-10 sm:w-12 animate-float1 top-[10%] left-[5%]" />
      <img src="/icons/node.png" alt="Node" className="absolute w-12 sm:w-14 animate-float2 top-[50%] right-[8%]" />
      <img src="/icons/tailwind.png" alt="Tailwind" className="absolute w-8 sm:w-10 animate-float3 bottom-[30%] left-[15%]" />
      <img src="/icons/git.png" alt="Git" className="absolute w-8 sm:w-10 animate-float2 top-[12%] right-[5%]" />
      <img src="/icons/python.svg" alt="Python" className="absolute w-10 sm:w-12 animate-float1 top-[20%] left-[45%] z-0" />

      {/* Hero Text */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide z-10 leading-tight">
        From Concept to Code:
        <span className="block bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-transparent bg-clip-text mt-2">
          Let’s Build Something Amazing
        </span>
      </h1>

      <p className="mt-6 text-sm sm:text-base md:text-lg text-center text-white max-w-3xl z-10 px-2">
        Hi, I'm Krutik Naina — Web Developer
      </p>

      <div className="flex justify-center mt-6 z-10">
        <a
          href="#projects"
          className="backdrop-blur-md bg-white/5 text-white py-2 px-4 sm:py-3 sm:px-6 mx-2 rounded-md border border-white/10 hover:border-white/30 transition duration-300"
        >
          Show my work →
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
