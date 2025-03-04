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
import { Priority, Task, TaskStatus } from "@/utils/types";
import { CalendarIcon, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
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

interface EditTaskModalProps {
  task: Task;
  onTaskUpdate: (
    id: string,
    task: {
      title?: string;
      description?: string;
      priority?: Priority;
      dueDate?: Date | null;
      status?: TaskStatus;
      image?: string;
    }
  ) => void;
  onTaskDelete: (id: string) => void;
}

export function EditTaskModal({
  task,
  onTaskUpdate,
  onTaskDelete,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [dueDate, setDueDate] = useState<Date | undefined>(task.dueDate);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [image, setImage] = useState<string | undefined>(task.image);
  const [open, setOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Update local state if the task prop changes
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setStatus(task.status);
    setImage(task.image);
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Task title required",
        description: "Please enter a title for your task",
        variant: "destructive",
      });
      return;
    }

    onTaskUpdate(task.id, {
      title,
      description: description || undefined,
      priority,
      dueDate,
      status,
      image,
    });

    toast({
      title: "Task updated",
      description: `"${title}" has been updated`,
    });

    setOpen(false);
  };

  const handleDelete = () => {
    if (onTaskDelete) {
      onTaskDelete(task.id);
      setDeleteDialogOpen(false);
      setOpen(false);

      toast({
        title: "Task deleted",
        description: `"${task.title}" has been deleted`,
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-priority">Priority</Label>
              <RadioGroup
                className="flex space-x-4"
                value={priority}
                onValueChange={(value) => setPriority(value as Priority)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Priority.LOW} id="edit-priority-low" />
                  <Label
                    htmlFor="edit-priority-low"
                    className="text-sm cursor-pointer"
                  >
                    Low
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={Priority.MEDIUM}
                    id="edit-priority-medium"
                  />
                  <Label
                    htmlFor="edit-priority-medium"
                    className="text-sm cursor-pointer"
                  >
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={Priority.HIGH}
                    id="edit-priority-high"
                  />
                  <Label
                    htmlFor="edit-priority-high"
                    className="text-sm cursor-pointer"
                  >
                    High
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                    onClick={() => setCalendarOpen(true)}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                      setCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-status">Status</Label>
              <RadioGroup
                className="flex space-x-4"
                value={status}
                onValueChange={(value) => setStatus(value as TaskStatus)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={TaskStatus.TODO}
                    id="edit-status-todo"
                  />
                  <Label
                    htmlFor="edit-status-todo"
                    className="text-sm cursor-pointer"
                  >
                    To Do
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={TaskStatus.IN_PROGRESS}
                    id="edit-status-progress"
                  />
                  <Label
                    htmlFor="edit-status-progress"
                    className="text-sm cursor-pointer"
                  >
                    In Progress
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={TaskStatus.COMPLETED}
                    id="edit-status-completed"
                  />
                  <Label
                    htmlFor="edit-status-completed"
                    className="text-sm cursor-pointer"
                  >
                    Completed
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Task Image (Optional)</Label>
              <ImageUploader onImageUpload={setImage} defaultImage={image} />
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
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the task "{task.title}" and all of its data.
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
