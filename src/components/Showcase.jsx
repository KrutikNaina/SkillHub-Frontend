// components/Showcase.jsx
export default function Showcase() {
  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Skill Highlights</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="p-6 border rounded-lg shadow-md hover:scale-105 transition-transform bg-white dark:bg-gray-900"
          >
            <h3 className="text-xl font-bold mb-2">Project Skill #{id}</h3>
            <p>Brief description of the skill, achievement, or milestone.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
