
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  index: number;
}

const ProjectCard: React.FC<ProjectProps> = ({ title, description, tags, link, index }) => {
  const delayClass = `animate-delay-${(index + 1) * 100}`; 

  return (
    <div className={`project-card rounded-lg border border-border p-6 bg-card opacity-0 animate-fade-up ${delayClass}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-serif mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowUpRight size={20} />
        </a>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Personal Website",
      description: "A minimalist portfolio website built with React and Tailwind CSS.",
      tags: ["Web Design", "React", "Tailwind"],
      link: "#",
    },
    {
      title: "Digital Garden",
      description: "A collection of thoughts, notes, and essays on design and development.",
      tags: ["Web Design", "Content", "Development"],
      link: "#",
    },
    {
      title: "Design System",
      description: "A comprehensive design system for creating consistent user interfaces.",
      tags: ["UI Design", "System Design", "Components"],
      link: "#",
    },
  ];

  return (
    <section id="work" className="py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-serif mb-8 opacity-0 animate-fade-up">Selected Work</h2>
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
