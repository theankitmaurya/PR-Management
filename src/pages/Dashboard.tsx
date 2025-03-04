import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background via-background/90 to-background/80">
      {/* Hero Section from 1st Dashboard - unchanged */}
      <div className="max-w-7xl mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="relative w-full max-w-4xl">
          <div className="absolute -inset-4 blur-3xl bg-primary/20 rounded-full transform -rotate-6 opacity-30"></div>
          <img
            src="/dashboard.png"
            alt="Modern Banking Card"
            className="relative z-10 mx-auto w-full rounded-xl"
          />
        </div>

        <div className="mt-10 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            A Modern Project Management Platform <br />
            <span className="text-primary">For A Modern World</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            PR Management embraces seamless integration, enabling swift and
            effortless transactions. No more Fumbling with Outdated Project
            Management Software.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/projects")}
              className="group"
            >
              Explore Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/activity")}
            >
              Check your Activity
            </Button>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            {["T", "S", "R"].map((letter, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-sm text-muted-foreground"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium">{letter}</span>
                </div>
                <span>
                  {letter === "T"
                    ? "Trusted"
                    : letter === "S"
                    ? "Secure"
                    : "Reliable"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section from 1st Dashboard - unchanged */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-card rounded-2xl shadow-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            All the Collaborative Project Management Tools You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We make every effort to ensure that you have access to a
            comprehensive suite of tools. Our aim is to provide you with a
            seamless experience that caters to your project needs regardless of
            your location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Simultaneous And Fast Operation"
            icon={
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-purple-100 opacity-70 absolute -left-2"></div>
                <div className="h-16 w-16 rounded-full bg-purple-200 opacity-70 absolute left-2"></div>
                <div className="h-16 w-16 rounded-full bg-purple-300 opacity-70 absolute left-6 z-10"></div>
              </div>
            }
            description="Execute multiple tasks efficiently with high-speed performance, ensuring a smooth workflow."
          />

          <FeatureCard
            title="Can Connect To All Projects"
            icon={
              <div className="relative h-16 w-full flex items-center justify-center">
                <div className="h-1 w-32 bg-gray-200 rounded-full"></div>
                <div className="absolute left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border border-gray-200"></div>
                <div className="absolute left-1/3 -translate-x-1/2 h-4 w-4 rounded-full border border-gray-200"></div>
                <div className="absolute left-2/3 -translate-x-1/2 h-4 w-4 rounded-full bg-primary"></div>
              </div>
            }
            description="Seamlessly integrate and manage all your projects from one centralized platform."
          />

          <FeatureCard
            title="Strong And Advanced Encryption"
            icon={
              <div className="relative h-16 w-full flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-2 border-gray-200"></div>
                <div className="absolute h-8 w-8 rounded-full border-2 border-gray-300"></div>
                <div className="absolute h-4 w-4 rounded-full bg-purple-500"></div>
              </div>
            }
            description="Keep your data safe with industry-leading encryption, ensuring top-level security."
          />

          <FeatureCard
            title="Comprehensive Project Management Services"
            icon={
              <div className="relative h-16 w-full flex items-center justify-center">
                <div className="h-12 w-8 border-2 border-gray-200 rounded-md"></div>
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-1 w-4 bg-gray-200"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-1 w-4 bg-gray-200"></div>
                <div className="absolute -right-2 top-1/2 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
              </div>
            }
            description="Access a full range of project management tools designed for efficiency and collaboration."
          />
        </div>

        <div className="flex justify-center mt-10">
          <Button onClick={() => navigate("/projects")} className="group">
            Explore More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Modified Content from 2nd Dashboard with Dark Mode */}
      <div className="min-h-screen p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Income Tracker Card */}
          <div className="rounded-3xl bg-gray-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-300"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Income Tracker
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gray-600 px-4 py-2 text-gray-300">
                <span className="text-sm">Week</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              Track changes in income over time and access detailed data on each
              project and payments received
            </p>

            <div className="mt-12 flex flex-col items-center">
              <div className="mb-4 rounded-full bg-gray-600 px-4 py-1.5 text-sm text-white">
                $2,567
              </div>

              <div className="relative h-40 w-full">
                <div className="absolute left-[10%] top-[70%] h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="absolute left-[25%] top-[50%] h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="absolute left-[40%] top-[20%] h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="absolute left-[55%] top-[10%] h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="absolute left-[70%] top-[40%] h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="absolute left-[85%] top-[60%] h-2 w-2 rounded-full bg-blue-500"></div>

                <div className="absolute left-[10%] top-[70%] h-[70%] w-[0.5px] bg-gray-600"></div>
                <div className="absolute left-[25%] top-[50%] h-[50%] w-[0.5px] bg-gray-600"></div>
                <div className="absolute left-[40%] top-[20%] h-[80%] w-[0.5px] bg-gray-600"></div>
                <div className="absolute left-[55%] top-[10%] h-[90%] w-[0.5px] bg-gray-600"></div>
                <div className="absolute left-[70%] top-[40%] h-[60%] w-[0.5px] bg-gray-600"></div>
                <div className="absolute left-[85%] top-[60%] h-[40%] w-[0.5px] bg-gray-600"></div>
              </div>

              <div className="mt-4 flex w-full justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm text-gray-300">
                  S
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm text-gray-300">
                  M
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm text-gray-900">
                  T
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm text-gray-300">
                  W
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm text-gray-300">
                  T
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm text-gray-300">
                  F
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm text-gray-300">
                  S
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-4xl font-bold text-white">+20%</h3>
              <p className="text-sm text-gray-400">
                This week's income is higher than last week's
              </p>
            </div>
          </div>

          {/* Recent Projects Card */}
          <div className="rounded-3xl bg-gray-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Your Recent Projects
              </h2>
              <span className="text-sm text-gray-400">See all Project</span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-gray-700 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2v4" />
                        <path d="M12 18v4" />
                        <path d="M4.93 4.93l2.83 2.83" />
                        <path d="M16.24 16.24l2.83 2.83" />
                        <path d="M2 12h4" />
                        <path d="M18 12h4" />
                        <path d="M4.93 19.07l2.83-2.83" />
                        <path d="M16.24 7.76l2.83-2.83" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Web Development Project
                        </h3>
                        <span className="rounded-full bg-gray-600 px-2 py-0.5 text-xs text-white">
                          Paid
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">$10/hour</p>
                      <div className="mt-2 flex gap-2">
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-xs text-gray-300">
                          Remote
                        </span>
                        <span className="rounded-full bg-gray-700 px-3 py-1 text-xs text-gray-300">
                          Part-time
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                </div>

                <p className="mt-4 text-sm text-gray-400">
                  This project involves implementing both frontend and backend
                  functionalities, as well as integrating with third-party APIs.
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Germany</span>
                  <span className="ml-2">2h ago</span>
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Copyright Project
                        </h3>
                        <span className="rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                          Not Paid
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">$10/hour</p>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Web Design Project
                        </h3>
                        <span className="rounded-full bg-gray-600 px-2 py-0.5 text-xs text-white">
                          Paid
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">$10/hour</p>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Let's Connect Card */}
          <div className="rounded-3xl bg-gray-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Let's Connect</h2>
              <span className="text-sm text-gray-400">See all</span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/placeholder.svg?-height=48&width=48"
                    width={48}
                    height={48}
                    alt="Randy Gouse"
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">Randy Gouse</h3>
                      <span className="rounded-full bg-orange-600 px-2 py-0.5 text-xs text-white">
                        Senior
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Cybersecurity specialist
                    </p>
                  </div>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 text-gray-300">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    width={48}
                    height={48}
                    alt="Giana Schleifer"
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">
                        Giana Schleifer
                      </h3>
                      <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                        Middle
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">UX/UI Designer</p>
                  </div>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 text-gray-300">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Unlock Premium Features Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gray-700 p-6 text-white">
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white">
                Unlock Premium Features
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                Get access to exclusive benefits and expand your freelancing
                opportunities
              </p>

              <button className="mt-24 flex w-full items-center justify-between rounded-lg bg-gray-800 px-4 py-3 text-white">
                <span className="font-medium">Upgrade now</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gray-500"></div>
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full border border-gray-500"></div>
            </div>
          </div>

          {/* Proposal Progress Card */}
          <div className="col-span-1 rounded-3xl bg-gray-800 p-6 text-white md:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Proposal Progress
              </h2>
              <div className="flex items-center gap-2 rounded-md border border-gray-600 px-3 py-1.5 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-sm">April 11, 2024</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-400">Proposals sent</p>
                <p className="text-3xl font-bold text-white">64</p>
                <div className="mt-4 flex space-x-1">
                  {Array(15)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-16 w-1 bg-gray-600"></div>
                    ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400">Interviews</p>
                <p className="text-3xl font-bold text-white">12</p>
                <div className="mt-4 flex space-x-1">
                  {Array(15)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-16 w-1 bg-red-600"></div>
                    ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400">Hires</p>
                <p className="text-3xl font-bold text-white">10</p>
                <div className="mt-4 flex space-x-1">
                  {Array(15)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-16 w-1 bg-gray-500"></div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, icon, description }) {
  return (
    <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border hover:shadow-md transition-all hover:-translate-y-1 text-center">
      <div className="mb-4 h-16">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
