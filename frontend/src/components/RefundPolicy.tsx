import { motion } from "framer-motion";

const RefundPolicy = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="legal-overlay">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="legal-container"
      >
        <div className="legal-header">
          <h2>Refund Policy</h2>
          <button onClick={onClose} className="legal-close-btn">✕ Close</button>
        </div>
        <div className="legal-content">
          <h3>General Policy</h3>
          <p>We aim to provide the highest quality NEET mentorship. Please review our refund criteria below.</p>

          <h3>Non-Refundable</h3>
          <ul>
            <li>Once a mentorship session has been attended, the fee becomes non-refundable.</li>
            <li>Physical books or digital topper-notes are non-refundable once dispatched or accessed.</li>
          </ul>

        </div>
      </motion.div>
    </div>
  );
};

export default RefundPolicy;