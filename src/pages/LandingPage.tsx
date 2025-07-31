import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Note: This would normally import from AuthContext when implemented
// const { token } = useContext(AuthContext);

export default function LandingPage() {
  // Placeholder for auth context - will be implemented later
  const token = null;
  const navigate = useNavigate();

  // If already logged in, skip landing and go to dashboard
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const features = [
    {
      title: "Project Organization",
      description: "Structure your research projects with clear hierarchies and timelines",
      icon: "📊"
    },
    {
      title: "Task Management", 
      description: "Break down complex research into manageable, trackable tasks",
      icon: "✅"
    },
    {
      title: "Deadline Tracking",
      description: "Never miss important milestones with smart deadline reminders",
      icon: "⏰"
    },
    {
      title: "Team Collaboration",
      description: "Work seamlessly with your research team and supervisors",
      icon: "👥"
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-gradient-subtle text-foreground antialiased">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Title */}
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-pulse-slow">
              LabTasker
            </h1>
            <div className="w-24 h-1 bg-gradient-hero mx-auto mb-8 rounded-full"></div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8 leading-relaxed animate-fade-in-up [animation-delay:0.2s]">
            The comprehensive platform for research project management. 
            Organize experiments, track progress, meet deadlines, and collaborate with your team — all in one intuitive dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up [animation-delay:0.4s]">
            <Link
              to="/register"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold 
                         hover:bg-primary-hover transform hover:scale-105 transition-all duration-300 
                         shadow-lg hover:shadow-xl"
            >
              Start Your Research Journey
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold 
                         hover:bg-secondary-hover transform hover:scale-105 transition-all duration-300 
                         shadow-lg hover:shadow-xl"
            >
              Welcome Back
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto animate-fade-in-up [animation-delay:0.6s]">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border/50 
                           hover:bg-card/90 transition-all duration-300 hover:transform hover:scale-105
                           shadow-lg hover:shadow-xl"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Secondary Info Section */}
      <div className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Built for Modern Research Teams
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Whether you're a graduate student managing thesis research, a postdoc juggling multiple projects, 
            or a PI overseeing lab operations, LabTasker adapts to your workflow.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-semibold mb-2 text-foreground">For Students</h3>
              <p className="text-muted-foreground text-sm">Manage thesis work, track literature reviews, and coordinate with advisors</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="font-semibold mb-2 text-foreground">For Researchers</h3>
              <p className="text-muted-foreground text-sm">Organize experiments, track data collection, and manage publication timelines</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="font-semibold mb-2 text-foreground">For Labs</h3>
              <p className="text-muted-foreground text-sm">Coordinate team projects, allocate resources, and maintain research standards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}