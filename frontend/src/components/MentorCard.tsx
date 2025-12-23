import { useEffect, useRef, useState } from 'react';

type Mentor = {
  name: string;
  rank?: string;
  speciality?: string;
  state?: string;
  college?: string;
  achievements?: string[];
  image: string;
};

type MentorCardProps = {
  mentor: Mentor;
};

const MentorCard = ({ mentor }: MentorCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  // Store the blob path in state so it's only generated once
  const [blobPath] = useState(() => {
    const r = 40; // base radius
    const points = 8; // number of points for the blob
    let path = '';
    
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const radius = r * (0.7 + Math.random() * 0.6); // random radius between 0.7r and 1.3r
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;
      
      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }
    
    return `${path} Z`;
  });

  // Handle scroll animations and initial mount
  useEffect(() => {
    setIsMounted(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { 
        threshold: 0.1,
        // Trigger the transition as soon as a small part of the element is in view
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`mentor-card ${isMounted ? 'visible' : ''}`} 
      ref={cardRef}
      style={{
        opacity: isMounted ? 1 : 0,
        transform: isMounted ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 400ms ease, transform 400ms ease'
      }}
    >
      <div className="mentor-card-inner">
        {/* Left Section - Image with Blob Background */}
        <div className="mentor-image-section">
          <div className="blob-background" ref={blobRef}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path 
                d={blobPath} 
                fill="url(#blob-gradient)" 
                transform="scale(1.2) translate(-10, -10)"
              />
              <defs>
                <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a5b4fc" />
                  <stop offset="50%" stopColor="#c7d2fe" />
                  <stop offset="100%" stopColor="#e0e7ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="mentor-image-container">
            <img 
              src={mentor.image} 
              alt={mentor.name}
              className="mentor-avatar"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/images/placeholder-mentor.png';
              }}
            />
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="mentor-content">
          <div className="mentor-header">
            <h3 className="mentor-name">{mentor.name}</h3>
            {mentor.rank && (
              <span className="experience-badge">
                {mentor.rank}
              </span>
            )}
          </div>
          
          <div className="mentor-meta">
            {mentor.speciality && (
              <p className="mentor-speciality">
                <span className="meta-label">Speciality:</span> {mentor.speciality}
              </p>
            )}
            
            {mentor.state && (
              <p className="mentor-location">
                <span className="meta-label">From:</span> {mentor.state}
              </p>
            )}
            
            {mentor.college && (
              <p className="mentor-college">
                <span className="meta-label">Education:</span> {mentor.college}
              </p>
            )}
          </div>
          
          {mentor.achievements && mentor.achievements.length > 0 && (
            <div className="mentor-achievements">
              <p className="achievements-label">Key Achievements:</p>
              <div className="achievements-list">
                {mentor.achievements.slice(0, 3).map((achievement, idx) => (
                  <div key={idx} className="achievement-item">
                    <span className="achievement-bullet">•</span>
                    <span className="achievement-text">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;