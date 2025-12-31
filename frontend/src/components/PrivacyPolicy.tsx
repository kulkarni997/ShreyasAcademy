import { motion } from "framer-motion";

const PrivacyPolicy = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="legal-overlay">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="legal-container"
      >
        <div className="legal-header">
          <h2>Privacy Policy</h2>
          <button onClick={onClose} className="legal-close-btn">✕ Close</button>
        </div>
        <div className="legal-content">
          <p>Shreyas Academy (“we”, “our”, “us”) is committed to protecting the privacy and personal data of all students and users.</p>
          
          <h3>Information We Collect</h3>
          <ul>
            <li>Name, email, and phone number</li>
            <li>Encrypted passwords</li>
            <li>Academic preferences and goals</li>
            <li>Device info, IP address, and browser data</li>
          </ul>

          <h3>How We Use Your Data</h3>
          <p>We use your information to facilitate mentorship, process secure payments, and send important academic updates.</p>

          <h3>Data Security</h3>
          <p>We implement JWT authentication and secure servers to ensure your data remains protected at all times.</p>

          <h3>Contact Us</h3>
          <p>For privacy concerns: <strong>support@shreyasacademy.in</strong></p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;