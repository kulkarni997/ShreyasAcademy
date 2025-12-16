// use the global URL type (or string) instead of importing Url from the Node 'url' module

export interface NavLink {
  id: string;
  label: string;
}

export interface Mentor {
  rank: string;
  name: string;
  state: string;
  speciality: string;
  achievements?: string[];
  college?: string;
  imageUrl?: string | URL;
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

export const mentors: Mentor[] = [
  { 
    rank: 'AIR 17', 
    name: 'Nikhil Sonnad', 
    state: 'Karnataka', 
    speciality: 'Core Mentor',
    achievements: ['Karnataka NEET Rank 1', 'JEE 99.47', 'NDA Cleared'],
    college: 'MBBS at JIPMER Pondicherry',
    imageUrl:''
  },
  { 
    rank: 'AIR 80', 
    name: 'Diganth', 
    state: 'Karnataka', 
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 6', 'JEE 99.32', 'KCET Rank 4'],
    college: 'MBBS at JIPMER Pondicherry'
  },
  { 
    rank: 'AIR 159', 
    name: 'Saish Pandit', 
    state: 'Karnataka', 
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 10', 'JEE 99.76', 'IISER AIR 66', 'NDA Cleared', 'KCET Rank 2'],
    college: 'MBBS at JIPMER Pondicherry'
  },
  { 
    rank: 'AIR 214', 
    name: 'Shreyas M', 
    state: 'Karnataka', 
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 14', 'JEE 98.66'],
    college: 'MBBS at JIPMER Pondicherry'
  },
  { 
    rank: 'AIR 256', 
    name: 'Harish Raj D V', 
    state: 'Karnataka', 
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 17', 'JEE 99.10', 'KCET Top Rank'],
    college: 'MBBS at JIPMER Pondicherry'
  },
  { 
    rank: 'AIR 553', 
    name: 'Siddharth', 
    state: 'Karnataka', 
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 47', 'KCET Rank 9'],
    college: 'MBBS at JIPMER Pondicherry'
  },
  { 
    rank: 'AIR 562', 
    name: 'Sai Charan', 
    state: 'Andhra Pradesh', 
    speciality: 'Senior Mentor',
    achievements: ['Andhra Pradesh Rank 31', 'JEE 99.27'],
    college: 'MBBS at JIPMER Pondicherry',
    imageUrl: '/images/mentors/Charan.png'
  },
  { 
    rank: 'AIR 768', 
    name: 'Viswajitt R P', 
    state: 'Tamil Nadu', 
    speciality: 'Senior Mentor',
    achievements: ['Tamil Nadu Rank 36', 'JEE 99', 'JEE Physics 100% (twice)'],
    college: 'MBBS at JIPMER Pondicherry'
  },
  { 
    rank: 'AIR 985', 
    name: 'Srujan D', 
    state: 'Karnataka', 
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 71', 'JEE 98.52'],
    college: 'MBBS at JIPMER Pondicherry'
  },
  { 
    rank: 'AIR 2591', 
    name: 'Balaji Tejas', 
    state: 'Karnataka', 
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 185', 'JEE 98', 'IISER AIR 521'],
    college: 'MBBS at JIPMER Pondicherry'
  },
  { 
    rank: 'AIR 2213', 
    name: 'Shadjay', 
    state: 'Karnataka', 
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 160', 'JEE 97.2'],
    college: 'MBBS at BMC'
  },
  { 
    rank: 'AIR 2877', 
    name: 'Preetam S Kori', 
    state: 'Karnataka', 
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 194', 'JEE 97.16'],
    college: 'MBBS at BMC'
  },
  { 
    rank: 'AIR 3359', 
    name: 'Nuthan', 
    state: 'Karnataka', 
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 228', 'JEE 96'],
    college: 'MBBS at BMC'
  },
  { 
    rank: 'AIR 47803', 
    name: 'Venkanagouda V Patil', 
    state: 'Karnataka', 
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 2462', 'JEE 98.06'],
    college: 'MBBS at BRIMS'
  },
  { 
    rank: 'AIIMS Delhi', 
    name: 'Unnamed Mentor', 
    state: 'Karnataka', 
    speciality: 'Senior Mentor',
    achievements: ['NDA Cleared', 'KCET Rank 8'],
    college: 'MBBS at AIIMS Delhi'
  },
  { 
    rank: 'Mentor', 
    name: 'Kishor V', 
    state: 'Karnataka', 
    speciality: 'Performance Coach',
    achievements: ['Motivational Speaker', 'NEET Mentor & Student Performance Coach'],
    college: ''
  },
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
    name: '16 Month Elite',
    price: '₹34,999',
    originalPrice: '₹53,999',
    duration: 'Complete NEET journey • Most recommended',
    badge: 'Few Slots Left',
    featured: true,
    features: [
      'Everything in 6 Month plan',
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
      "We offer a 7-day money-back guarantee. If you're not satisfied within the first week, we'll provide a full refund, no questions asked. After 7 days, refunds are processed on a case-by-case basis.",
  },
];

export const contactDetails: ContactDetail[] = [
  { icon: '📧', label: 'Email', value: 'support@shreyasacademy.com' },
  { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
];

export const supportHours = 'Mon-Sat: 9AM - 8PM IST';

