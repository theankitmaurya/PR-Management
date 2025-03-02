import { useState } from "react";
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
import { Priority, TaskStatus } from "@/utils/types";
import { CalendarIcon, Clock, Plus } from "lucide-react";
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

interface NewTaskModalProps {
  projectId: string;
  onTaskCreate: (task: {
    title: string;
    description: string;
    priority: Priority;
    dueDate?: Date;
    status: TaskStatus;
    projectId: string;
    image?: string;
  }) => void;
}

export function NewTaskModal({ projectId, onTaskCreate }: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [image, setImage] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { toast } = useToast();

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

    onTaskCreate({
      title,
      description,
      priority,
      dueDate,
      status,
      projectId,
      image,
    });

    toast({
      title: "Task created",
      description: `"${title}" has been added to the project`,
    });

    // Reset form and close modal
    setTitle("");
    setDescription("");
    setPriority(Priority.MEDIUM);
    setDueDate(undefined);
    setStatus(TaskStatus.TODO);
    setImage(undefined);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 whitespace-nowrap">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
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
              defaultValue={Priority.MEDIUM}
              value={priority}
              onValueChange={(value) => setPriority(value as Priority)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Priority.LOW} id="priority-low" />
                <Label
                  htmlFor="priority-low"
                  className="text-sm cursor-pointer"
                >
                  Low
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Priority.MEDIUM} id="priority-medium" />
                <Label
                  htmlFor="priority-medium"
                  className="text-sm cursor-pointer"
                >
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={Priority.HIGH} id="priority-high" />
                <Label
                  htmlFor="priority-high"
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
              defaultValue={TaskStatus.TODO}
              value={status}
              onValueChange={(value) => setStatus(value as TaskStatus)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={TaskStatus.TODO} id="status-todo" />
                <Label htmlFor="status-todo" className="text-sm cursor-pointer">
                  To Do
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={TaskStatus.IN_PROGRESS}
                  id="status-progress"
                />
                <Label
                  htmlFor="status-progress"
                  className="text-sm cursor-pointer"
                >
                  In Progress
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={TaskStatus.COMPLETED}
                  id="status-completed"
                />
                <Label
                  htmlFor="status-completed"
                  className="text-sm cursor-pointer"
                >
                  Completed
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Task Image (Optional)</Label>
            <ImageUploader onImageUpload={setImage} />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
