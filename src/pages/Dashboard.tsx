import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background via-background/90 to-background/80">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto pt-8 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Image taking full width */}
        <div className="relative w-full max-w-4xl">
          <div className="absolute -inset-4 blur-3xl bg-primary/20 rounded-full transform -rotate-6 opacity-30"></div>
          <img
            src="/dashboard.png"
            alt="Modern Banking Card"
            className="relative z-10 mx-auto w-full"
          />
        </div>

        {/* Text Below the Image */}
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

          {/* Trusted, Secure, Reliable */}
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

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-card rounded-2xl shadow-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            We Provide You With All Collaborative Project Management Tools
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
            title="Can Be Connect To All Projects"
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
