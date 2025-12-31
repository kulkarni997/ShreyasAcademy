import { motion } from "framer-motion";

const RefundPolicy = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/95 z-[9999] flex justify-center items-start overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-5xl mx-auto px-6 py-16 text-white"
      >
        <div className="flex justify-between items-center mb-10 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10 border-b border-white/10">
          <h1 className="text-3xl font-bold">Refund Policy</h1>
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">✕ Close</button>
        </div>
        
        <div className="space-y-8 text-gray-300">
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-xl text-yellow-200">
            <p className="font-medium">Important: Please review our policy before enrolling in any mentorship program.</p>
          </div>
          <section>
            <h2 className="text-xl text-white font-semibold mb-3">Enrollment Refunds</h2>
            <p>Refund requests must be submitted within 48 hours of enrollment. A processing fee of 10% will be deducted from the total amount.</p>
          </section>
          <section>
            <h2 className="text-xl text-white font-semibold mb-3">Non-Refundable Items</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fees are non-refundable once the first mentorship session has been attended.</li>
              <li>Fees for printed materials and physical books are non-refundable once dispatched.</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default RefundPolicy;