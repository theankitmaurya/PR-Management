import { supabase } from "@/integrations/supabase/client";
import { Priority, Project, Task, TaskStatus } from "@/utils/types";

// Project services
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  // We need to fetch tasks for each project
  const projectsWithTasks = await Promise.all(
    data.map(async (project) => {
      const tasks = await getTasksByProjectId(project.id);
      return {
        id: project.id,
        title: project.title,
        description: project.description || undefined,
        coverImage: project.cover_image || undefined,
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
        tasks,
      };
    })
  );

  return projectsWithTasks;
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    throw error;
  }

  if (!data) return null;

  // Fetch tasks for this project
  const tasks = await getTasksByProjectId(id);

  return {
    id: data.id,
    title: data.title,
    description: data.description || undefined,
    coverImage: data.cover_image || undefined,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    tasks,
  };
};

export const createProject = async (projectData: {
  title: string;
  description?: string;
  coverImage?: string;
}): Promise<Project> => {
  const { data: user } = await supabase.auth.getUser();

  if (!user.user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: projectData.title,
      description: projectData.description || null,
      cover_image: projectData.coverImage || null,
      created_by: user.user.id,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description || undefined,
    coverImage: data.cover_image || undefined,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    tasks: [],
  };
};

export const updateProject = async (
  id: string,
  projectData: {
    title?: string;
    description?: string;
    coverImage?: string;
  }
): Promise<void> => {
  const { error } = await supabase
    .from("projects")
    .update({
      title: projectData.title,
      description: projectData.description,
      cover_image: projectData.coverImage,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Task services
export const getTasksByProjectId = async (
  projectId: string
): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }

  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description || undefined,
    status: task.status as TaskStatus,
    priority: task.priority as Priority,
    dueDate: task.due_date ? new Date(task.due_date) : undefined,
    createdAt: new Date(task.created_at),
    assignedTo: task.assigned_to || undefined,
    projectId: task.project_id,
    image: task.image || undefined,
  }));
};

export const getTaskById = async (id: string): Promise<Task | null> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching task:", error);
    throw error;
  }

  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description || undefined,
    status: data.status as TaskStatus,
    priority: data.priority as Priority,
    dueDate: data.due_date ? new Date(data.due_date) : undefined,
    createdAt: new Date(data.created_at),
    assignedTo: data.assigned_to || undefined,
    projectId: data.project_id,
    image: data.image || undefined,
  };
};

export const createTask = async (taskData: {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date;
  status: TaskStatus;
  projectId: string;
  image?: string;
}): Promise<Task> => {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: taskData.title,
      description: taskData.description || null,
      priority: taskData.priority,
      due_date: taskData.dueDate?.toISOString() || null,
      status: taskData.status,
      project_id: taskData.projectId,
      image: taskData.image || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description || undefined,
    status: data.status as TaskStatus,
    priority: data.priority as Priority,
    dueDate: data.due_date ? new Date(data.due_date) : undefined,
    createdAt: new Date(data.created_at),
    assignedTo: data.assigned_to || undefined,
    projectId: data.project_id,
    image: data.image || undefined,
  };
};

export const updateTask = async (
  id: string,
  taskData: {
    title?: string;
    description?: string;
    priority?: Priority;
    dueDate?: Date | null;
    status?: TaskStatus;
    assignedTo?: string;
    image?: string;
  }
): Promise<void> => {
  const { error } = await supabase
    .from("tasks")
    .update({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      due_date: taskData.dueDate?.toISOString() || null,
      status: taskData.status,
      assigned_to: taskData.assignedTo,
      image: taskData.image,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (
  id: string,
  status: TaskStatus
): Promise<void> => {
  const { error } = await supabase
    .from("tasks")
    .update({
      status,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

// Profile service
export const getUserProfile = async () => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }

  return data;
};

export const updateUserProfile = async (profileData: {
  fullName?: string;
  avatarUrl?: string;
}) => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: profileData.fullName,
      avatar_url: profileData.avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userData.user.id);

  if (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
