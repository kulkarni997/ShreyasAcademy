import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentProblems from './components/StudentProblems';
import AboutAcademy from './components/AboutAcademy';
import {
  contactDetails,
  faqs,
  navLinks,
  pricingPlans,
  supportHours,
} from './data/siteContent';
import { mentors } from './data/mentors';
import type { ContactFormPayload } from './services/contactService';
import { submitContactForm } from './services/contactService';
import academyLogo from './assets/logo.jpg';
import bookShowcase from './assets/book.jpg';
import './App.css';
import MentorCard from './components/MentorCard';

const initialFormState: ContactFormPayload = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarElevated, setNavbarElevated] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<ContactFormPayload>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactForm(formValues);
      alert("Thank you for contacting us! We'll get back to you within 24 hours.");
      setFormValues(initialFormState);
    } catch (error) {
      console.error(error);
      alert('There was an issue sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavbarElevated(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div>
      <nav className={`navbar ${navbarElevated ? 'elevated' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="logo-section">
            <img src={academyLogo} alt="Shreyas Academy Logo" className="logo-image" />
            <span className="logo-text">Shreyas Academy</span>
          </Link>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={(event) => handleNavClick(event, link.id)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-container">
            <div className="hero-content">
              <div className="tagline">Fuel your potential from toppers - for toppers</div>
              <h1 className="hero-title">
                India&apos;s Most Elite NEET Mentorship Program Guided by MBBS Toppers
              </h1>
              <p className="hero-subtitle">
                <strong>Learn directly from</strong> NEET toppers with AIR 17, 80, 159, 214, 256 and many more top ranks
                from prestigious institutions like <strong>AIIMS Delhi</strong>, <strong>JIPMER</strong>, <strong>BMC</strong>.
              </p>
              <div className="hero-features">
                📚 Personal Guidance + Topper Strategy + Daily Study Plan 
              </div>
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-primary">
                  Sign in
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Already enrolled? Log in
                </Link>
              </div>
            </div>
          </div>
        </section>

        <StudentProblems />

        <AboutAcademy />

        <section className="mentor-panel" id="mentor-panel">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Our Elite Mentor Panel</h2>
              <p className="section-subtitle">
                Learn from India&apos;s brightest MBBS students who&apos;ve cracked NEET with exceptional ranks
              </p>
            </div>
            <div className="mentor-grid">
              {mentors.slice(0, 6).map((mentor) => (
                <MentorCard key={mentor.name} mentor={mentor} />
              ))}
            </div>
            {mentors.length > 6 && (
              <div className="mentor-actions">
                <Link className="btn btn-primary" to="/mentors">
                  See All Mentors
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Unlock Exciting Rewards with Every Achievement!</h2>
            </div>
            <div className="about-content">
              <div className="about-text">
                <p className="rewards-intro">
                  At <strong>Shreyas Academy</strong>, your <span className="highlight">dedication</span> and <span className="highlight">hard work</span> are truly valued. Here's how your performance can open doors to <strong>inspiring experiences</strong> and <span className="highlight">amazing prizes</span>:
                </p>
                <div className="rewards-list">
                  <div className="reward-item reveal-on-scroll">
                    <div className="reward-icon">🏆</div>
                    <div className="reward-content">
                      <h3>6-Monthly <span className="highlight">Special Test Achievers</span></h3>
                      <p>
                        Score the <strong>target marks</strong> in our <span className="highlight">exclusive monthly tests</span> for <strong>6 months</strong>, and you'll earn a <span className="highlight">sponsored campus tour</span> of <strong>AIIMS Delhi</strong> or <strong>JIPMER</strong> — a <span className="highlight">once-in-a-lifetime</span> chance to experience India's <strong>top medical colleges</strong> up close.
                      </p>
                    </div>
                  </div>
                  <div className="reward-item reveal-on-scroll">
                    <div className="reward-icon">⭐</div>
                    <div className="reward-content">
                      <h3><span className="highlight">Monthly Test Stars</span></h3>
                      <p>
                        <strong>Consistently perform well</strong> in monthly tests? You'll win <span className="highlight">exciting prizes</span> to keep your <strong>motivation high</strong> all year long.
                      </p>
                    </div>
                  </div>
                  <div className="reward-item reveal-on-scroll">
                    <div className="reward-icon">🎖️</div>
                    <div className="reward-content">
                      <h3>All India Rank Holders</h3>
                      <p>
                        For the champions who secure national ranks and stick with us in their journey, we&apos;re offering grand rewards and recognition packages that celebrate your extraordinary achievement on a national scale.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="rewards-closing">
                  No effort goes unnoticed at Shreyas Academy — every milestone unlocks real opportunities and unforgettable experiences that fuel your dreams and inspire you to reach new heights. Start your journey to greatness today, and discover just how far your hard work can take you!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="books-highlight">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Get access to these expertly curated books included with our mentorship program.
              </h2>
            </div>
            <div className="signup-content">
              <div className="signup-info">
                <p>
                  The featured books – Biology, Chemistry, and Physics – are carefully authored and reviewed by
                  top-performing mentors themselves. Each title embodies:
                </p>
                <ul className="signup-benefits">
                  <li className="benefit-item">
                    <div className="benefit-icon">📘</div>
                    <div>
                      <strong>Comprehensive topics crafted for NEET syllabus mastery</strong>
                    </div>
                  </li>
                  <li className="benefit-item">
                    <div className="benefit-icon">📝</div>
                    <div>
                      <strong>Exam-focused summaries and practice questions</strong>
                    </div>
                  </li>
                  <li className="benefit-item">
                    <div className="benefit-icon">🎯</div>
                    <div>
                      <strong>Insider notes and tips from actual NEET toppers</strong>
                    </div>
                  </li>
                  <li className="benefit-item">
                    <div className="benefit-icon">✅</div>
                    <div>
                      <strong>Peer-reviewed content for conceptual accuracy and clarity</strong>
                    </div>
                  </li>
                </ul>
                <p>
                  Our books go beyond rote learning, combining foundational understanding with strategic techniques to
                  help you maximize scores in every subject.
                </p>
              </div>
              <div
                className="signup-form"
                style={{
                  padding: 0,
                  backgroundImage: `url(${bookShowcase})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '520px',
                  height: '100%',
                  width: '100%',
                  boxShadow: '0 25px 45px rgba(15, 23, 42, 0.35)',
                  border: '4px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '20px',
                  animation: 'jump 3s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="section-container">
            <div className="cta-content reveal-on-scroll">
              <h2 className="cta-title">So What&apos;s Waiting You From Getting Guidance From India&apos;s Best Mentors and Grabbing Seat in Your Dream College.</h2>
              <a href="#enroll" className="btn btn-primary cta-button" onClick={(event) => handleNavClick(event, 'enroll')}>
                Enroll Now
              </a>
            </div>
          </div>
        </section>

        <section className="enroll" id="enroll">
          <div className="section-container">
            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <div
                  className={`pricing-card reveal-on-scroll ${plan.featured ? 'featured' : ''}`}
                  key={plan.name}
                >
                  {plan.badge && <div className="badge">{plan.badge}</div>}
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    {plan.originalPrice && <span className="original-price">{plan.originalPrice}</span>}
                    <span className="current-price">{plan.price}</span>
                  </div>
                  <p className="plan-duration">{plan.duration}</p>
                  <ul className="plan-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span className="check-icon">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary" type="button">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="faqs" id="faqs">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Everything you need to know about Shreyas Academy</p>
            </div>
            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={faq.question}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <span className="faq-icon">{activeFaq === index ? '✕' : '+'}</span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-container">
            <div className="contact-content">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>
                  Have questions? We&apos;re here to help you succeed. Reach out to our support team for any
                  queries about admissions, courses, or mentorship programs.
                </p>
                <div className="contact-details">
                  {contactDetails.map((detail) => (
                    <div className="contact-item" key={detail.label}>
                      <div className="contact-icon">{detail.icon}</div>
                      <div>
                        <strong>{detail.label}</strong>
                        <br />
                        {detail.value}
                      </div>
                    </div>
                  ))}
                  <div className="contact-item">
                    <div className="contact-icon">⏰</div>
                    <div>
                      <strong>Support Hours</strong>
                      <br />
                      {supportHours}
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formValues.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formValues.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formValues.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Shreyas Academy</h3>
            <p>
              India&apos;s premier NEET mentorship platform connecting aspirants with MBBS toppers for personalized
              guidance and proven success strategies.
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#home" onClick={(event) => handleNavClick(event, 'home')}>
              Home
            </a>
            <a href="#mentor-panel" onClick={(event) => handleNavClick(event, 'mentor-panel')}>
              Mentor Panel
            </a>
            <a href="#about" onClick={(event) => handleNavClick(event, 'about')}>
              About Us
            </a>
            <a href="#enroll" onClick={(event) => handleNavClick(event, 'enroll')}>
              Enrollment Plans
            </a>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <a href="#faqs" onClick={(event) => handleNavClick(event, 'faqs')}>
              FAQs
            </a>
            <a href="#contact" onClick={(event) => handleNavClick(event, 'contact')}>
              Contact Support
            </a>
            <Link to="/login">Student Login</Link>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
            <a href="#">Academic Integrity</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Shreyas Academy. All rights reserved. | Empowering NEET Aspirants Nationwide</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

