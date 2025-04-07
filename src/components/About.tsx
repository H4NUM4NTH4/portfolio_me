
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-serif mb-4">About</h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-lg mb-4">
              I'm a designer and developer with over 5 years of experience creating digital products.
              My background in both design and engineering allows me to bridge the gap between aesthetics and functionality.
            </p>
            <p className="text-lg mb-4">
              I believe in minimalist design principles that focus on content and usability. My approach emphasizes
              simplicity, clean typography, and thoughtful interactions to create memorable experiences.
            </p>
            <p className="text-lg mb-8">
              Currently, I'm focused on helping companies refine their digital presence through strategic design and development.
            </p>
            
            <h3 className="text-xl font-serif mb-3">Experience</h3>
            <div className="space-y-4 mb-8">
              <div>
                <div className="flex justify-between mb-1">
                  <p className="font-medium">Senior Product Designer</p>
                  <p className="text-muted-foreground">2020 — Present</p>
                </div>
                <p className="text-muted-foreground">Design Studio Inc.</p>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p className="font-medium">UX Engineer</p>
                  <p className="text-muted-foreground">2018 — 2020</p>
                </div>
                <p className="text-muted-foreground">Tech Company LLC</p>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p className="font-medium">Web Developer</p>
                  <p className="text-muted-foreground">2016 — 2018</p>
                </div>
                <p className="text-muted-foreground">Digital Agency Co.</p>
              </div>
            </div>
            
            <h3 className="text-xl font-serif mb-3">Skills</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <ul className="list-disc list-inside">
                <li>UI/UX Design</li>
                <li>Design Systems</li>
                <li>Prototyping</li>
                <li>User Research</li>
              </ul>
              <ul className="list-disc list-inside">
                <li>Frontend Development</li>
                <li>React.js</li>
                <li>Tailwind CSS</li>
                <li>TypeScript</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
