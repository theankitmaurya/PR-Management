import { useState, useCallback } from "react";
import { Task, TaskStatus } from "../utils/types";
import { toast } from "@/components/ui/use-toast";

export function useDragAndDrop(initialTasks: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const moveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });

      // Show toast notification
      const taskName = prevTasks.find((t) => t.id === taskId)?.title;
      toast({
        title: "Task Updated",
        description: `"${taskName}" moved to ${newStatus
          .replace("_", " ")
          .toLowerCase()}`,
        duration: 2000,
      });

      return updatedTasks;
    });
  }, []);

  const onDragEnd = useCallback(
    (result: any) => {
      const { destination, source, draggableId } = result;

      // If there's no destination or the item was dropped back in the same place
      if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      ) {
        return;
      }

      // Get the new status from the droppable ID
      const newStatus = destination.droppableId as TaskStatus;

      // Move the task to the new status
      moveTask(draggableId, newStatus);
    },
    [moveTask]
  );

  return {
    tasks,
    setTasks,
    moveTask,
    onDragEnd,
  };
}
