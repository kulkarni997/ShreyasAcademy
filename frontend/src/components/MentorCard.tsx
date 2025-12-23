import type { Mentor } from '../data/mentors';

type MentorCardProps = {
  mentor: Mentor;
};

const MentorCard = ({ mentor }: MentorCardProps) => {
  return (
    <div className="mentor-card reveal-on-scroll" key={mentor.name}>
      <div className="mentor-image-placeholder">
        <img src={mentor.image} alt={mentor.name} className="mentor-avatar" />
      </div>
      <div className="mentor-content">
        <div className="mentor-rank">{mentor.rank}</div>
        <div className="mentor-info">
          <h3>{mentor.name}</h3>
          <p className="mentor-state">{mentor.state}</p>
          {mentor.college && <p className="mentor-college">{mentor.college}</p>}
          {mentor.achievements && mentor.achievements.length > 0 && (
            <div className="mentor-achievements">
              {mentor.achievements.map((achievement, idx) => (
                <span key={idx} className="achievement-badge">
                  {achievement}
                </span>
              ))}
            </div>
          )}
          <span className="mentor-speciality">{mentor.speciality}</span>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;

