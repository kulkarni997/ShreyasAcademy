export interface Mentor {
  rank: string;
  name: string;
  state: string;
  speciality: string;
  achievements?: string[];
  college?: string;
  image: string;
}

// All image paths are served from the public folder: /images/mentors/...
export const mentors: Mentor[] = [
  {
    rank: 'AIR 17',
    name: 'Nikhil Sonnad',
    state: 'Karnataka',
    speciality: 'Core Mentor',
    achievements: ['Karnataka NEET Rank 1', 'JEE 99.47', 'NDA Cleared'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/chaitanya.png.png',
  },
  {
    rank: 'AIR 80',
    name: 'Diganth',
    state: 'Karnataka',
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 6', 'JEE 99.32', 'KCET Rank 4'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/diganth.png.png',
  },
  {
    rank: 'AIR 159',
    name: 'Saish Pandit',
    state: 'Karnataka',
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 10', 'JEE 99.76', 'IISER AIR 66', 'NDA Cleared', 'KCET Rank 2'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/saish-pandit.png.png',
  },
  {
    rank: 'AIR 214',
    name: 'Shreyas M',
    state: 'Karnataka',
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 14', 'JEE 98.66'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/shreyas-m .png.png',
  },
  {
    rank: 'AIR 256',
    name: 'Harish Raj D V',
    state: 'Karnataka',
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 17', 'JEE 99.10', 'KCET Top Rank'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/Harishraj-d.png.PNG',
  },
  {
    rank: 'AIR 553',
    name: 'Siddharth',
    state: 'Karnataka',
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 47', 'KCET Rank 9'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/siddarth.png.png',
  },
  {
    rank: 'AIR 562',
    name: 'Sai Charan',
    state: 'Andhra Pradesh',
    speciality: 'Senior Mentor',
    achievements: ['Andhra Pradesh Rank 31', 'JEE 99.27'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/sai-charan.png.png',
  },
  {
    rank: 'AIR 768',
    name: 'Viswajitt R P',
    state: 'Tamil Nadu',
    speciality: 'Senior Mentor',
    achievements: ['Tamil Nadu Rank 36', 'JEE 99', 'JEE Physics 100% (twice)'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/viswajit.png.png',
  },
  {
    rank: 'AIR 985',
    name: 'Srujan D',
    state: 'Karnataka',
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 71', 'JEE 98.52'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/srujan-sakpal.PNG',
  },
  {
    rank: 'AIR 2591',
    name: 'Balaji Tejas',
    state: 'Karnataka',
    speciality: 'Senior Mentor',
    achievements: ['Karnataka NEET Rank 185', 'JEE 98', 'IISER AIR 521'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/balaji-tejas.png.png',
  },
  {
    rank: 'AIR 2213',
    name: 'Shadjay',
    state: 'Karnataka',
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 160', 'JEE 97.2'],
    college: 'MBBS at BMC',
    image: '/images/mentors/shahad-jay.png.png',
  },
  {
    rank: 'AIR 2877',
    name: 'Preetam S Kori',
    state: 'Karnataka',
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 194', 'JEE 97.16'],
    college: 'MBBS at BMC',
    image: '/images/mentors/samrudh.png.PNG',
  },
  {
    rank: 'AIR 3359',
    name: 'Nuthan',
    state: 'Karnataka',
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 228', 'JEE 96'],
    college: 'MBBS at BMC',
    image: '/images/mentors/nuthan.png.jpeg',
  },
  {
    rank: 'AIR 47803',
    name: 'Venkanagouda V Patil',
    state: 'Karnataka',
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 2462', 'JEE 98.06'],
    college: 'MBBS at BRIMS',
    image: '/images/mentors/venkanagowda.png.jpeg',
  },
  {
    rank: 'AIIMS Delhi',
    name: 'Unnamed Mentor',
    state: 'Karnataka',
    speciality: 'Senior Mentor',
    achievements: ['NDA Cleared', 'KCET Rank 8'],
    college: 'MBBS at AIIMS Delhi',
    image: '/images/mentors/Vasanth-uday.png.PNG',
  },
  {
    rank: 'Mentor',
    name: 'Kishor V',
    state: 'Karnataka',
    speciality: 'Performance Coach',
    achievements: ['Motivational Speaker', 'NEET Mentor & Student Performance Coach'],
    college: '',
    image: '/images/mentors/lakshya-pujar.png.png',
  },
];


