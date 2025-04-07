
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 animate-fade-in">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-6">
          Designer & Developer crafting thoughtful digital experiences
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          I design and build digital products that help businesses and individuals achieve their goals through thoughtful design and technology.
        </p>
      </div>
    </section>
  );
};

export default Hero;
