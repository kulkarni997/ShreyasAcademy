import { motion } from "framer-motion";

const TermsOfService = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/95 z-[9999] flex justify-center items-start overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-5xl mx-auto px-6 py-16 text-white"
      >
        <div className="flex justify-between items-center mb-10 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10 border-b border-white/10">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">✕ Close</button>
        </div>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl text-white font-semibold mb-3">1. Services Provided</h2>
            <p>Shreyas Academy provides NEET mentorship services, including strategy sessions, study plans, and access to curated academic materials.</p>
          </section>
          <section>
            <h2 className="text-xl text-white font-semibold mb-3">2. User Responsibilities</h2>
            <p>Users must provide accurate information during registration. Sharing account credentials or academy-exclusive materials with third parties is strictly prohibited.</p>
          </section>
          <section>
            <h2 className="text-xl text-white font-semibold mb-3">3. Intellectual Property</h2>
            <p>All content provided, including books and topper notes, are the intellectual property of Shreyas Academy and are protected by copyright laws.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;