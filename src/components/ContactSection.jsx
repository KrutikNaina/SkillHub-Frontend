import { useEffect, useState } from "react";

const ContactSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Floating animation class
  const floatingClass = isHovered ? "floating motion-safe" : "";

  return (
    <div className="mt-20 px-4 max-w-5xl mx-auto">
      <h2 id="contact" className="text-3xl sm:text-5xl lg:text-6xl text-center mb-10 scroll-mt-20">
        Contact{" "}
        <span className="bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-transparent bg-clip-text">
          Me
        </span>
      </h2>

      <div className="relative">
        <form
          className={`space-y-6 bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-md shadow-lg transform transition-all duration-500 ease-in-out ${floatingClass}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div>
            <label className="block text-white text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[#00ffff]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[#00ffff]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              required
              className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[#00ffff]"
              placeholder="Type your message..."
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#00ffff] to-[#9900ff] text-white px-6 py-2 rounded hover:opacity-90 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
