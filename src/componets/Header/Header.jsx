export default function Header() {
  return (
    <header className="flex flex-col items-center mt-8 mb-8 md:mb-16">
      <img
        src="tech-cat.png"
        alt="Ninja Technics"
        className="object-contain mb-8 w-44 h-44"
      />
      <h1 className="text-xl font-semibold tracking-widest text-center uppercase md:text-4xl text-amber-800 font-title">
        Ninja Technics
      </h1>
      <p className="text-stone-500">
        A community of Technics that claim to be Ninjas.
      </p>
    </header>
  );
}
