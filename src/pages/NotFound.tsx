import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Squares } from "@/components/ui/squares-background";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
          className="opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center backdrop-blur-sm bg-background/40 p-8 rounded-lg border border-accent/20 max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate("/")} size="lg">
          Go Back Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
