import { Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Your gateway to unforgettable experiences</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Discover </span>
          <span className="gradient-text neon-text">Live Events</span>
          <br />
          <span className="text-foreground">Like Never Before</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          From electrifying concerts to intimate shows, find and book tickets to the events that move you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="btn-neon text-lg px-8 py-6">
            <Zap className="w-5 h-5 mr-2" />
            Explore Events
          </Button>
          <Button 
            variant="outline" 
            className="text-lg px-8 py-6 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            How It Works
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 md:gap-16 mt-16">
          {[
            { value: "500+", label: "Events" },
            { value: "1M+", label: "Tickets Sold" },
            { value: "50K+", label: "Happy Fans" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
