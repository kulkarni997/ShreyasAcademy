export interface Mentor {
  rank: string;
  name: string;
  state: string;
  speciality?: string;
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
    achievements: ['Karnataka NEET Rank 1', 'JEE 99.47', 'UPSC NDA Cleared','KCET Rank 8'],
    college: 'MBBS at AIIMS Delhi',
    image: '/images/mentors/chaitanya.png',
  },
  {
    rank: 'AIR 80',
    name: 'Diganth',
    state: 'Karnataka',
    achievements: ['Karnataka NEET Rank 6', 'JEE 99.32', 'KCET Rank 4'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/diganth(2).png',
  },
  {
    rank: 'AIR 159',
    name: 'Saish Pandit',
    state: 'Karnataka',
    achievements: ['Karnataka NEET Rank 10', 'JEE 99.76', 'IISER AIR 66','Mathematics Olympiad International Rank 48','Science Olympiad International Rank 29', 'NDA Cleared', 'KCET Rank 2'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/saish.png',
  },
  {
    rank: 'AIR 214',
    name: 'Shreyas M',
    state: 'Karnataka',
    achievements: ['Karnataka NEET Rank 14', 'JEE 98.66'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/shreyas.png',
  },
  {
    rank: 'AIR 256',
    name: 'Harish Raj D V',
    state: 'Karnataka',
    achievements: ['Karnataka NEET Rank 17', 'JEE 99.10', 'KCET Top Rank'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/harishraj.png',
  },
  {
    rank: 'AIR 549',
    name: 'Charan',
    state: 'Karnataka',
    achievements: ['Karnataka Rank 47', 'KCET Rank 51', 'JEE Mains 98.8'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/charan.png',
  },
  {
    rank: 'AIR 553',
    name: 'Siddharth',
    state: 'Karnataka',
    achievements: ['Karnataka NEET Rank 47', 'KCET Rank 9'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/siddharth.png',
  },
  {
    rank: 'AIR 562',
    name: 'Sai Charan',
    state: 'Andhra Pradesh',
    achievements: ['Andhra Pradesh Rank 31', 'JEE 99.27'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/sai-charan.png',
  },
  {
    rank: 'AIR 768',
    name: 'Viswajitt R P',
    state: 'Tamil Nadu',
    achievements: ['Tamil Nadu Rank 36', 'JEE 99', 'JEE Physics 100% (twice)'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/viswajit.png',
  },
   {
    rank: 'AIR 985',
    name: 'Srujan D',
    state: 'Karnataka',
    achievements: ['Karnataka NEET Rank 71', 'JEE 99'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/one.png',
  },
  {
    rank: 'AIR 2213',
    name: 'Shadjay',
    state: 'Karnataka',
    achievements: ['Karnataka NEET Rank 160', 'JEE 97.2'],
    college: 'MBBS at BMC',
    image: '/images/mentors/shadjay.png',
  },
  {
    rank: 'AIR 2591',
    name: 'Balaji Tejas',
    state: 'Karnataka',
    achievements: ['Karnataka NEET Rank 185', 'JEE 98', 'IISER AIR 521'],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/balaji-tejas.png',
  },
  
  {
    rank: 'AIR 2877',
    name: 'Preetam S Kori',
    state: 'Karnataka',
    achievements: ['Karnataka NEET Rank 194', 'JEE 97.16'],
    college: 'MBBS at BMC',
    image: '/images/mentors/preetam.png',
  },
  {
    rank: 'AIR 3359',
    name: 'Nuthan',
    state: 'Karnataka',
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 228', 'JEE 96'],
    college: 'MBBS at BMC',
    image: '/images/mentors/nutan.png',
  },
  {
    rank: 'AIR 47803',
    name: 'Venkanagouda V Patil',
    state: 'Karnataka',
    speciality: 'Mentor',
    achievements: ['Karnataka NEET Rank 2462', 'JEE 98.06'],
    college: 'MBBS at BRIMS',
    image: '/images/mentors/venkanagowda.png',
  },
   {
    rank: 'AIR 29',
    name: 'Srujan Sakpal',
    state: 'Karnataka',
    achievements: [],
    college: 'MBBS at JIPMER Pondicherry',
    image: '/images/mentors/srujan.png',
  },
  {
    rank: '',
    name: 'Kishor V',
    state: 'Karnataka',
    speciality: 'Motivational Coach',
    achievements: [],
    college: '',
    image: '/images/mentors/kishor.png',
  },
  {
    rank: '',
    name: 'Sai Laxminarayan',
    state: 'Karnataka',
    speciality: 'Mentor',
    achievements: [],
    college: '',
    image: '/images/mentors/sri-laxmi.png',
  },
  {
    rank: '',
    name: 'Samruddh',
    state: 'Karnataka',
    speciality: 'Mentor',
    achievements: [],
    college: '',
    image: '/images/mentors/two.png',
  },

];


