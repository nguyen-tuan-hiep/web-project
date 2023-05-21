import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import Co2Icon from '@mui/icons-material/Co2';
import HelpIcon from '@mui/icons-material/Help';

export const thingsToKnow = [
  {
    title: 'House rules',
    content: [
      { name: 'Check-in: After 3:00 PM', icon: <AccessTimeFilledIcon /> },
      {
        name: 'Checkout: 11:00 AM',
        icon: <AccessTimeFilledIcon />,
      },
      { name: 'No smoking', icon: <SmokeFreeIcon /> },
      { name: 'No parties or events', icon: <CelebrationIcon /> },
    ],
  },
  {
    title: 'Health & safety',
    content: [
      {
        name: "Airbnb's COVID-19 safety practices apply",
        icon: <CoronavirusIcon />,
      },
      {
        name: 'Carbon monoxide alarm not reported',
        icon: <Co2Icon />,
      },
      { name: 'Smoke alarm not reported', icon: <HelpIcon /> },
    ],
  },
  {
    title: 'Cancellation policy',
    content: [
      { name: 'Free cancellation before checkin 2 days.' },
      {
        name: 'Review the Hosts full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.',
      },
    ],
  },
];

export const footer = [
  {
    title: 'Support',
    content: [
      'Help Center',
      'AirCover',
      'Safety information',
      'Supporting people with disabilities',
      'Cancellation options',
      'Report a neighborhood concern',
    ],
  },
  {
    title: 'Community',
    content: [
      'Airbnb.org: disaster relief housing',
      'Support Afghan refugees',
      'Combating discrimination',
    ],
  },
  {
    title: 'Hosting',
    content: [
      'Try hosting',
      'AirCover for Hosts',
      'Explore hosting resources',
      'Visit our community forum',
      'How to host responsibly',
    ],
  },
  {
    title: 'Airbnb',
    content: [
      'Newsroom',
      'Learn about new features',
      'Letter from our founders',
      'Careers',
      'Investors',
      'Gift cards',
    ],
  },
];
