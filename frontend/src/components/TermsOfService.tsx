import { motion } from "framer-motion";

const TermsOfService = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="legal-overlay">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="legal-container"
      >
        <div className="legal-header">
          <h2>Terms of Service</h2>
          <button onClick={onClose} className="legal-close-btn">✕ Close</button>
        </div>
        <div className="legal-content">
          <h3>1. Acceptance of Terms</h3>
          <p>By using Shreyas Academy, you agree to comply with these terms. If you do not agree, please do not use our services.</p>

          <h3>2. Mentorship Rules</h3>
          <p>Our mentorship is for personal use only. Recording sessions or sharing topper-exclusive study materials with non-enrolled students is strictly prohibited.</p>

          <h3>3. Account Integrity</h3>
          <p>You are responsible for maintaining the confidentiality of your account login details.</p>

          <h3>4. Intellectual Property</h3>
          <p>All books, strategy guides, and videos are the exclusive property of Shreyas Academy and are protected by copyright laws.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;