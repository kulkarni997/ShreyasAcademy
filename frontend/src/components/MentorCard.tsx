import type { Mentor } from '../data/mentors';

type MentorCardProps = {
  mentor: Mentor;
};

const MentorCard = ({ mentor }: MentorCardProps) => {
  // Extract rank number from the rank string (e.g., "AIR 214" -> "214")
  const rankNumber = mentor.rank ? mentor.rank.split(' ')[1] : '';
  
  return (
    <div className="mentor-card">
      <div className="mentor-card-inner">
        <div className="mentor-image-container">
          <div className="mentor-image-wrapper">
            <img 
              src={mentor.image} 
              alt={mentor.name} 
              className="mentor-avatar" 
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/images/placeholder-mentor.png';
              }}
            />
          </div>
        </div>
        
        <div className="mentor-content">
          <div className="mentor-rank-badge">
            <span>AIR {rankNumber}</span>
          </div>
          
          <div className="mentor-details">
            <h3 className="mentor-name">{mentor.name}</h3>
            <p className="mentor-location">{mentor.state}</p>
            {mentor.college && <p className="mentor-qualification">{mentor.college}</p>}
            
            {mentor.achievements && mentor.achievements.length > 0 && (
              <div className="mentor-achievements">
                {mentor.achievements.map((achievement, idx) => (
                  <div key={idx} className="achievement-badge">
                    {achievement}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;

