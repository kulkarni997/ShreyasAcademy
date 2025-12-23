import './AboutAcademy.css';

const AboutAcademy = () => {
  return (
    <section className="about-academy" id="about-academy">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">About Shreyas Academy</h2>
          <p className="section-subtitle">
            Empowering <span className="highlight">NEET aspirants</span> with <span className="highlight">personalized mentorship</span> and <span className="highlight">structured learning</span>
          </p>
        </div>

        <div className="about-content">
          <div className="about-hero reveal-on-scroll">
            <div className="about-hero-text">
              <h3>Welcome to Shreyas Academy</h3>
              <p>At Shreyas Academy, we're dedicated to nurturing the next generation of medical professionals through comprehensive NEET preparation and mentorship.</p>
              <p>Our unique approach combines structured learning with personalized guidance from top NEET rankers, ensuring every student receives the support they need to excel.</p>
              <p>Join us on this journey to achieve your medical career aspirations with confidence and excellence.</p>
            </div>
            <div className="about-hero-image">
              <img src="/about.png" alt="Shreyas Academy - NEET Preparation" />
            </div>
          </div>
          <div className="about-card reveal-on-scroll">
            <div className="about-icon">🎓</div>
            <h3>Live Online Study Sessions</h3>
            <div className="about-description">
              <p>Shreyas Academy offers <span className="highlight">live online study sessions</span> for NEET students. Mentors join on video calls and <span className="highlight">guide students step by step</span> during their study time.</p>
              
              <h4>What these sessions are:</h4>
              <ul>
                <li><span className="highlight">Live online study sessions</span> specially designed for NEET aspirants</li>
                <li>Mentors connect with students on <span className="highlight">video call</span> and stay with them throughout the session</li>
              </ul>

              <h4>How mentors help:</h4>
              <ul>
                <li>Mentors guide students on <span className="highlight">what to study</span>, <span className="highlight">how to plan chapters</span>, and <span className="highlight">how to use their study time</span> effectively</li>
                <li>Students can <span className="highlight">ask doubts</span> during the session and get <span className="highlight">immediate support</span> and clarity</li>
              </ul>

              <h4>Benefits for NEET students:</h4>
              <ul>
                <li>Creates a <span className="highlight">disciplined and focused study environment</span>, just like a physical classroom</li>
                <li>Keeps students <span className="highlight">motivated</span>, reduces <span className="highlight">procrastination</span>, and builds <span className="highlight">daily consistency</span> in preparation</li>
              </ul>
            </div>
          </div>

          <div className="about-card reveal-on-scroll">
            <div className="about-icon">🏆</div>
            <h3>Mentorship by Top Rankers</h3>
            <div className="about-description">
              <p>Shreyas Academy's <span className="highlight">biggest strength</span> is its <span className="highlight">strong mentorship by top exam rankers</span>. Students learn directly from those who have already <span className="highlight">cracked NEET</span> and other tough exams.</p>
              
              <h4>Mentorship by top rankers:</h4>
              <ul>
                <li><span className="highlight">NEET</span>, <span className="highlight">JEE</span>, <span className="highlight">KCET</span>, and even <span className="highlight">UPSC</span> rankers guide students in their preparation</li>
                <li>Students get to learn from <span className="highlight">real toppers</span> who understand the <span className="highlight">exam pattern</span>, <span className="highlight">pressure</span>, and <span className="highlight">challenges</span></li>
              </ul>

              <h4>Learn real exam strategies:</h4>
              <ul>
                <li>Mentors share their own <span className="highlight">study plans</span>, <span className="highlight">revision methods</span>, and <span className="highlight">smart ways to attempt the paper</span></li>
                <li>They clearly explain <span className="highlight">common mistakes</span> students make and how to <span className="highlight">avoid them</span> in the final exam</li>
              </ul>

              <h4>Guidance beyond NEET:</h4>
              <ul>
                <li>Students also get insights into how toppers cleared exams like <span className="highlight">NEET</span>, <span className="highlight">JEE</span>, <span className="highlight">KCET</span>, and <span className="highlight">UPSC</span> with different strategies</li>
                <li>This helps students think <span className="highlight">long-term</span> about their career and future competitive exams</li>
              </ul>

              <h4>Constant support and motivation:</h4>
              <ul>
                <li>Mentors are available to <span className="highlight">guide</span>, <span className="highlight">support</span>, and <span className="highlight">motivate</span> students during their preparation journey</li>
                <li>Their <span className="highlight">regular check-ins</span>, <span className="highlight">feedback</span>, and <span className="highlight">encouragement</span> help students stay <span className="highlight">disciplined</span> and <span className="highlight">confident</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAcademy;
