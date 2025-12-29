import './StudentProblems.css';

const StudentProblems = () => {
  const problems = [
     {
    title: 'Lack of Guidance',
    description:
      'Some students do not have proper mentors or a clear strategy for what to study and how to revise. They keep changing books, channels, and coaching, which wastes time and energy.'
  },
  {
    title: 'Concept Clarity',
    description:
      'Students often try to memorize formulas and facts instead of understanding concepts, especially in Physics and Chemistry. This leads to confusion in MCQs and silly mistakes in exams.'
  },
  {
    title: 'Time Management',
    description:
      'Many students struggle to manage time between school, coaching, self-study, and tests. They often start many chapters but cannot finish the syllabus or revision on time. Poor planning for breaks, sleep, and revision reduces productivity.'
  },
  {
    title: 'Family & Peer Pressure',
    description:
      'Expectations from parents, relatives, and friends add extra pressure. Students feel guilty when they get low marks and are scared of being judged.'
  },
  {
      title: 'Mental Health & Burnout',
      description: 'Many aspirants experience anxiety, low confidence, overthinking, and fear of results. Long preparation, low mock test scores, and comparison with others cause burnout and thoughts of quitting.'
    },
     
  ];

  return (
    <section className="student-problems" id="student-problems">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Challenges Faced by NEET Aspirants</h2>
          <p className="section-subtitle">
            Understanding the common struggles helps us provide better support to our students
          </p>
        </div>
        
        <div className="problems-grid">
          {problems.map((problem, index) => (
            <div className="problem-card reveal-on-scroll" key={index}>
              <div className="problem-number">0{index + 1}</div>
              <h3 className="problem-title">{problem.title}</h3>
              <p className="problem-description">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentProblems;
