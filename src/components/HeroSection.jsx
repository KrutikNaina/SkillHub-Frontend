import { Helmet } from 'react-helmet';

const HeroSection = () => {
  return (
    <div
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen py-12 overflow-hidden scroll-mt-[120px]"
    ><Helmet>
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
      <img src="/icons/react.png" alt="React" className="absolute w-12 animate-float1 top-[15%] left-[5%]" />
      <img src="/icons/node.png" alt="Node" className="absolute w-14 animate-float2 top-[55%] right-[10%]" />
      <img src="/icons/tailwind.png" alt="Tailwind" className="absolute w-10 animate-float3 bottom-[35%] left-[18%]" />
      <img src="/icons/git.png" alt="Git" className="absolute w-10 animate-float2 top-[15%] right-[5%]" />
      <img src="/icons/python.svg" alt="Python" className="absolute w-12 animate-float1 top-[15%] left-[45%] z-0" />

      {/* Main Hero Content */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide z-10">
        From Concept to Code:
        <span className="bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-transparent bg-clip-text">
          {" "}Let’s Build Something Amazing
        </span>
      </h1>

      <p className="mt-6 text-sm md:text-lg text-center text-white max-w-4xl z-10">
        Hi, I'm Krutik Naina — Web Developer
      </p>

      <div className="flex justify-center mt-6 z-10">
        <a
          href="#projects"
          className="backdrop-blur-md bg-white/5 text-white py-3 px-4 mx-3 rounded-md border border-white/10 hover:border-white/30 transition duration-300"
        >
          Show my work →
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
