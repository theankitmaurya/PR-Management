import { Priority, Project, Task, TaskStatus } from "./types";

export const mockProjects: Project[] = [
  {
    id: "p1",
    title: "Website Redesign",
    description: "Complete overhaul of the company website with new branding",
    coverImage:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-01"),
    tasks: [
      {
        id: "t1",
        title: "Create wireframes",
        description: "Design wireframes for homepage and product pages",
        status: TaskStatus.COMPLETED,
        priority: Priority.HIGH,
        dueDate: new Date("2023-06-20"),
        createdAt: new Date("2023-05-15"),
        projectId: "p1",
      },
      {
        id: "t2",
        title: "Develop frontend components",
        description: "Build reusable UI components based on design system",
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.MEDIUM,
        dueDate: new Date("2023-07-10"),
        createdAt: new Date("2023-05-25"),
        projectId: "p1",
      },
      {
        id: "t3",
        title: "Implement backend APIs",
        description: "Develop REST APIs for the new website functionality",
        status: TaskStatus.TODO,
        priority: Priority.HIGH,
        dueDate: new Date("2023-07-15"),
        createdAt: new Date("2023-06-01"),
        projectId: "p1",
      },
    ],
  },
  {
    id: "p2",
    title: "Mobile App Development",
    description: "Create a native mobile app for iOS and Android platforms",
    coverImage:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    createdAt: new Date("2023-02-01"),
    updatedAt: new Date("2023-05-30"),
    tasks: [
      {
        id: "t4",
        title: "UI/UX Design",
        description: "Design user interface and experience for the mobile app",
        status: TaskStatus.COMPLETED,
        priority: Priority.HIGH,
        dueDate: new Date("2023-03-15"),
        createdAt: new Date("2023-02-10"),
        projectId: "p2",
      },
      {
        id: "t5",
        title: "Frontend Development",
        description: "Develop frontend using React Native",
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.HIGH,
        dueDate: new Date("2023-07-01"),
        createdAt: new Date("2023-03-20"),
        projectId: "p2",
      },
      {
        id: "t6",
        title: "Backend Integration",
        description: "Integrate frontend with backend services",
        status: TaskStatus.TODO,
        priority: Priority.MEDIUM,
        dueDate: new Date("2023-08-01"),
        createdAt: new Date("2023-04-01"),
        projectId: "p2",
      },
      {
        id: "t7",
        title: "Testing & QA",
        description: "Perform comprehensive testing on both platforms",
        status: TaskStatus.TODO,
        priority: Priority.LOW,
        dueDate: new Date("2023-08-15"),
        createdAt: new Date("2023-04-15"),
        projectId: "p2",
      },
    ],
  },
  {
    id: "p3",
    title: "Content Marketing Campaign",
    description: "Q3 Content marketing campaign focused on product launch",
    coverImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    createdAt: new Date("2023-04-10"),
    updatedAt: new Date("2023-06-05"),
    tasks: [
      {
        id: "t8",
        title: "Content Strategy",
        description: "Develop overall content strategy and timeline",
        status: TaskStatus.COMPLETED,
        priority: Priority.HIGH,
        dueDate: new Date("2023-04-25"),
        createdAt: new Date("2023-04-12"),
        projectId: "p3",
      },
      {
        id: "t9",
        title: "Blog Articles",
        description: "Write and publish 5 blog articles",
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.MEDIUM,
        dueDate: new Date("2023-07-15"),
        createdAt: new Date("2023-05-01"),
        projectId: "p3",
      },
      {
        id: "t10",
        title: "Social Media Plan",
        description: "Create social media content calendar",
        status: TaskStatus.TODO,
        priority: Priority.MEDIUM,
        dueDate: new Date("2023-07-10"),
        createdAt: new Date("2023-05-05"),
        projectId: "p3",
      },
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find((project) => project.id === id);
};

export const getTasksByStatus = (tasks: Task[], status: TaskStatus): Task[] => {
  return tasks.filter((task) => task.status === status);
};
