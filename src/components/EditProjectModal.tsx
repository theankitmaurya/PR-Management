import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/utils/types";
import { Edit, Trash, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ImageUploader } from "./ImageUploader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface EditProjectModalProps {
  project: Project;
  onProjectUpdate: (
    id: string,
    project: {
      title?: string;
      description?: string;
      coverImage?: string;
    }
  ) => Promise<void>;
  onProjectDelete: (id: string) => Promise<void>;
}

export function EditProjectModal({
  project,
  onProjectUpdate,
  onProjectDelete,
}: EditProjectModalProps) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description || "");
  const [coverImage, setCoverImage] = useState<string | undefined>(
    project.coverImage
  );
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Update local state if the project prop changes
  useEffect(() => {
    setTitle(project.title);
    setDescription(project.description || "");
    setCoverImage(project.coverImage);
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Project title required",
        description: "Please enter a title for your project",
        variant: "destructive",
      });
      return;
    }

    try {
      await onProjectUpdate(project.id, {
        title,
        description: description || undefined,
        coverImage,
      });

      toast({
        title: "Project updated",
        description: `"${title}" has been updated`,
      });

      setOpen(false);
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error updating project",
        description: "There was a problem updating the project.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await onProjectDelete(project.id);

      setDeleteDialogOpen(false);
      setOpen(false);

      toast({
        title: "Project deleted",
        description: `"${project.title}" has been deleted`,
      });

      // Navigate back to dashboard after deletion
      navigate("/");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error deleting project",
        description: "There was a problem deleting the project.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Project Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-title">Project Title</Label>
              <Input
                id="project-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUploader
                onImageUpload={setCoverImage}
                defaultImage={coverImage}
              />
            </div>

            <DialogFooter className="space-x-2 flex justify-between">
              <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    className="mr-auto"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Project
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the project "{project.title}" and all of its tasks.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
