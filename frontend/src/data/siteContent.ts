// use the global URL type (or string) instead of importing Url from the Node 'url' module

export interface NavLink {
  id: string;
  label: string;
}

export interface StatHighlight {
  value: string;
  label: string;
}

export interface ReferralOffer {
  label: string;
  price: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  duration: string;
  features: string[];
  badge?: string;
  featured?: boolean;
  originalPrice?: string;
  referralOffers?: ReferralOffer[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactDetail {
  icon: string;
  label: string;
  value: string;
}

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'mentor-panel', label: 'Mentors' },
  { id: 'about-academy', label: 'About' },
  { id: 'enroll', label: 'Enroll' },
];

export const stats: StatHighlight[] = [
  { value: '92%', label: 'Success Rate' },
  { value: '50+', label: 'Expert Mentors' },
  { value: '1.5hr', label: 'Daily Classes' },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: '1 Month Intensive',
    price: '₹2,599',
    originalPrice: '₹3,999',
    duration: 'Perfect for quick revision',
    features: [
      'Daily 1.5-hour live classes',
      'Weekly doubt clearing sessions',
      'Study materials & notes',
      'Basic mentor support',
    ],
  },
  {
    name: '6 Month Complete',
    price: '₹13,999',
    originalPrice: '₹23,999',
    duration: 'Monthly Special • Comprehensive preparation',
    badge: 'Special Offer',
    features: [
      'Everything in 1 Month plan',
      'Personal mentor assignment',
      'Monthly mock tests',
      'Performance analytics',
      'Priority doubt resolution',
    ],
  },
  {
    name: 'Full NEET Course - Until you crack NEET',
    price: '₹34,999',
    originalPrice: '₹53,999',
    duration: 'Complete NEET journey • Most recommended',
    badge: 'Few Slots Left',
    featured: true,
    features: [
      'Premium',
      'Full syllabus coverage',
      'Daily mock tests & analysis',
      'Personalized study plan',
      'Monthly progress reviews',
      'Exam day strategy coaching',
      'Lifetime mentor support',
    ],
  },
  {
    name: 'One on One Mentorship',
    price: '₹7,999',
    originalPrice: '₹9,999',
    badge: '5 Slots Left',
    duration: 'Personalised 1-to-1 guidance for guaranteed improvement',
    features: [
      'Daily 1-on-1 live mentorship sessions',
      'Personalised study plan',
      'Exam-oriented strategy & planning',
      'Performance analytics & improvement feedback',
    ],
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'What makes Shreyas Academy different from other coaching institutes?',
    answer:
      "Shreyas Academy is mentored by current MBBS students who are NEET toppers with exceptional AIRs. Unlike traditional coaching, you learn directly from those who've recently cracked the exam, ensuring up-to-date strategies, relatable guidance, and proven success methods.",
  },
  {
    question: 'Are the classes live or recorded?',
    answer:
      "We conduct daily 1.5-hour live interactive classes where you can ask questions in real-time. All sessions are recorded and available for review, ensuring you never miss important content even if you can't attend live.",
  },
  {
    question: 'How does personal mentorship work?',
    answer:
      'In our 6-month and 16-month plans, each student is assigned a dedicated mentor based on their learning style and needs. You will have regular 1-on-1 sessions for strategy planning, performance review, and personalized guidance throughout your NEET journey.',
  },
  {
    question: 'What study materials are provided?',
    answer:
      'All students receive comprehensive digital study materials including topic-wise notes, practice questions, previous year papers, and exclusive topper strategies. Premium plan students also receive printed materials and additional reference books.',
  },
  {
    question: 'Can I switch plans or upgrade later?',
    answer:
      "Yes! You can upgrade your plan at any time. The difference in fees will be adjusted, and you'll immediately get access to all features of your new plan. Contact our support team for seamless plan transitions.",
  },
  {
    question: 'What is your refund policy?',
    answer:
      "All sales are final, and no refunds will be issued under any circumstances. Purchases are non-refundable once completed.",
  },
];

export const contactDetails: ContactDetail[] = [
  { icon: '📧', label: 'Email', value: 'academyshreyas3@gmail.com' },
  { icon: '📞', label: 'Phone', value: '7411060709' },
];

export const supportHours = 'Mon-Sat: 9AM - 11PM IST';

