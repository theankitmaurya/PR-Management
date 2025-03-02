import { Priority } from "@/utils/types";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, ArrowDown } from "lucide-react";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
  showLabel?: boolean;
}

export function PriorityBadge({
  priority,
  className,
  showLabel = false,
}: PriorityBadgeProps) {
  const getIcon = () => {
    switch (priority) {
      case Priority.HIGH:
        return <AlertCircle className="h-3.5 w-3.5" />;
      case Priority.MEDIUM:
        return <AlertTriangle className="h-3.5 w-3.5" />;
      case Priority.LOW:
        return <ArrowDown className="h-3.5 w-3.5" />;
    }
  };

  const getColor = () => {
    switch (priority) {
      case Priority.HIGH:
        return "bg-priority-high text-white";
      case Priority.MEDIUM:
        return "bg-priority-medium text-white";
      case Priority.LOW:
        return "bg-priority-low text-white";
    }
  };

  const getLabel = () => {
    switch (priority) {
      case Priority.HIGH:
        return "High";
      case Priority.MEDIUM:
        return "Medium";
      case Priority.LOW:
        return "Low";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-all",
        getColor(),
        className
      )}
    >
      {getIcon()}
      {showLabel && <span className="ml-1">{getLabel()}</span>}
    </span>
  );
}
