import { Helmet } from "react-helmet";

const SEO = () => (
  <Helmet>
    {/* Basic Meta */}
    <title>Krutik Naina | Web Developer Portfolio</title>
    <meta name="description" content="Official portfolio of Krutik Naina, web developer with skills in React, HTML, CSS, and JS. Explore projects and contact." />
    <meta name="keywords" content="Krutik Naina, web developer, frontend developer, portfolio, React developer" />
    <meta name="author" content="Krutik Naina" />

    {/* Open Graph / Social Sharing */}
    <meta property="og:title" content="Krutik Naina | Web Developer" />
    <meta property="og:description" content="Explore the portfolio of Krutik Naina. Discover web development projects, skills, and contact information." />
    <meta property="og:url" content="https://krutiknaina.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://krutiknaina.com/images/profile.jpg" />

    {/* JSON-LD Structured Data */}
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Krutik Naina",
          "url": "https://krutiknaina.com/",
          "image": "https://krutiknaina.com/images/profile.jpg",
          "sameAs": [
            "https://github.com/krutiknaina",
            "https://linkedin.com/in/krutik-naina"
          ],
          "jobTitle": "Web Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "Freelance / Personal Projects"
          },
          "description": "Krutik Naina is a creative web developer passionate about frontend technologies and building modern websites.",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://krutiknaina.com/"
          }
        }
      `}
    </script>
  </Helmet>
);

export default SEO;
