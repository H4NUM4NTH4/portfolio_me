
import { Project } from '@/pages/ManageProjects';

// API endpoint for the mockable.io service
const API_URL = 'https://demo2698219.mockable.io/projects';

// Fetch all projects from the mock API
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Return default projects as fallback
    const defaultProjects = [
      {
        id: "1",
        title: "Portfolio Website",
        description: "A clean, modern portfolio website with dark mode support and animations.",
        tags: ["React", "TailwindCSS", "TypeScript"],
        link: "#",
      },
      {
        id: "2",
        title: "E-commerce Dashboard",
        description: "Admin dashboard for managing products, orders, and customer data.",
        tags: ["React", "shadcn/ui", "Recharts"],
        link: "#",
      },
      {
        id: "3",
        title: "Mobile Banking App",
        description: "User-friendly mobile banking application with robust security features.",
        tags: ["React Native", "TypeScript", "API"],
        link: "#",
      },
    ];
    return defaultProjects;
  }
};

// Update Projects component to fetch from the mock API
export const updateProjects = async (projects: Project[]): Promise<boolean> => {
  try {
    // In a real application, this would be a POST/PUT request to update the projects
    console.log('Projects would be updated on the server:', projects);
    
    // Since we're using a mock API that doesn't actually store updates,
    // we'll store in localStorage as a backup
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
    return true;
  } catch (error) {
    console.error('Error updating projects:', error);
    return false;
  }
};
