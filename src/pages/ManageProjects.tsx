
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, EditIcon, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import ProjectForm, { ProjectFormValues } from '@/components/ProjectForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { fetchProjects, updateProjects } from '@/services/projectService';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const ManageProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Load projects from API
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const loadedProjects = await fetchProjects();
        setProjects(loadedProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        toast({
          title: "Error loading projects",
          description: "Could not load your projects. Please try again later.",
          variant: "destructive"
        });
        
        // Try to load from localStorage as fallback
        const savedProjects = localStorage.getItem('portfolio-projects');
        if (savedProjects) {
          try {
            setProjects(JSON.parse(savedProjects));
          } catch (error) {
            console.error('Failed to parse saved projects:', error);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProjects();
  }, [navigate, isAuthenticated, toast]);

  const handleAddProject = () => {
    setCurrentProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    
    const updatedProjects = projects.filter(project => project.id !== projectToDelete);
    setProjects(updatedProjects);
    
    // Update API
    const success = await updateProjects(updatedProjects);
    
    toast({
      title: success ? "Project deleted" : "Error deleting project",
      description: success 
        ? "The project has been successfully removed." 
        : "There was an error deleting the project. It may only be removed locally.",
      variant: success ? "default" : "destructive",
    });
    
    setProjectToDelete(null);
  };

  const handleFormSubmit = async (data: ProjectFormValues) => {
    let updatedProjects: Project[];
    
    if (currentProject) {
      // Edit existing project
      updatedProjects = projects.map(p => 
        p.id === currentProject.id ? { ...data, id: currentProject.id } as Project : p
      );
    } else {
      // Add new project - ensure all required fields are present
      const newProject: Project = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        tags: data.tags,
        link: data.link
      };
      updatedProjects = [...projects, newProject];
    }
    
    setProjects(updatedProjects);
    
    // Update API
    const success = await updateProjects(updatedProjects);
    
    toast({
      title: currentProject ? "Project updated" : "Project added",
      description: success 
        ? currentProject 
          ? "Your changes have been saved successfully."
          : "New project has been added to your portfolio."
        : "Changes saved locally but there was an error updating the shared project list.",
      variant: success ? "default" : "destructive",
    });
    
    setIsFormOpen(false);
  };

  return (
    <div className="container-custom py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button onClick={handleAddProject} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">You haven't added any projects yet.</p>
          <Button onClick={handleAddProject} variant="secondary">Add Your First Project</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map(project => (
            <div 
              key={project.id}
              className="border rounded-lg p-4 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-medium">{project.title}</h3>
                  <p className="text-muted-foreground my-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground dark:bg-secondary/20 dark:text-primary rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="text-primary text-sm hover:underline mt-2 inline-block" target="_blank" rel="noopener noreferrer">
                    {project.link}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)}>
                    <EditIcon size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(project.id)}>
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {currentProject 
                ? "Update your project details below."
                : "Fill in the details for your new project."
              }
            </DialogDescription>
          </DialogHeader>
          
          <ProjectForm 
            defaultValues={currentProject || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageProjects;
