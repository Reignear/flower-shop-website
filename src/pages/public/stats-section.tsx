export default function Stats() {
  const stats = [
    {
      number: "3000+",
      label: "Packages Sold",
    },
    {
      number: "5000+",
      label: "Bouquet Sold",
    },
    {
      number: "7000+",
      label: "Happy Clients",
    },
    {
      number: "25+",
      label: "Years of Experience",
    },
  ];

  return (
    <section className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <p className="text-2xl md:text-3xl font-bold mb-2">
                {stat.number}
              </p>
              <p className="text-sm md:text-base opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
