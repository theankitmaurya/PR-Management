import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { StatusColumn } from "./StatusColumn";
import { TaskStatus, Project, Task } from "@/utils/types";

interface TaskBoardProps {
  project: Project;
  onTaskStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  onTaskUpdate?: (id: string, updatedTask: Partial<Task>) => void;
  onTaskDelete?: (id: string) => void;
}

export function TaskBoard({
  project,
  onTaskStatusChange,
  onTaskUpdate,
  onTaskDelete,
}: TaskBoardProps) {
  const todoTasks = project.tasks.filter(
    (task) => task.status === TaskStatus.TODO
  );
  const inProgressTasks = project.tasks.filter(
    (task) => task.status === TaskStatus.IN_PROGRESS
  );
  const completedTasks = project.tasks.filter(
    (task) => task.status === TaskStatus.COMPLETED
  );

  const handleDragEnd = (result: DropResult) => {
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

    // Call the callback to update the task status
    if (onTaskStatusChange) {
      onTaskStatusChange(draggableId, newStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 overflow-x-auto pb-6 animate-fade-in">
        <StatusColumn
          status={TaskStatus.TODO}
          tasks={todoTasks}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />
        <StatusColumn
          status={TaskStatus.IN_PROGRESS}
          tasks={inProgressTasks}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />
        <StatusColumn
          status={TaskStatus.COMPLETED}
          tasks={completedTasks}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />
      </div>
    </DragDropContext>
  );
}
