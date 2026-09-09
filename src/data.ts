import { WeddingData } from "./types";

export const weddingData: WeddingData = {
  groom: {
    name: "Veer",
    parents: "Son of Mr. & Mrs. Khan",
    education: "M.Tech, PhD",
    profession: "Software Engineer",
  },
  bride: {
    name: "Zara",
    parents: "Daughter of Mr. & Mrs. Pathan",
    education: "B.Tech, MBA",
    profession: "Advocate, High Court",
  },
  weddingDate: "2026-09-30T10:00:00", // For countdown logic
  weddingDateFormatted: "September 30, 2026",
  weddingTimeFormatted: "10:00 AM",
  weddingDayFormatted: "Wednesday",
  openingThumbnailUrl: "https://i.ibb.co/QFc6pvCg/file-0000000069488211b334f24889ba09e4.png",
  openingVideoUrl: "https://www.image2url.com/r2/default/videos/1788010850590-27bb3d4c-eb70-4e57-8299-6bca19925158.mp4",
  heroVideoUrl: "https://cdn.pixabay.com/video/2021/08/18/85489-589366115_large.mp4",
  ogImageUrl: "https://i.ibb.co/whJhPT35/file-000000001e048211bb05770afd02bdae.png",
  heroMessage: "We are honored to welcome you to the\nWedding ceremony of",
  invitationMessage: "We are honored to welcome you to the\nWedding ceremony of Veer & Zara as they\nbegin their journey together in faith and\nlove,\nwe thank you for being part of this blessed\noccasion",
  events: [
    {
      id: "ev1",
      title: "AAGMAN",
      subtitle: "",
      hashtag: "",
      date: "14 SEPTEMBER 2026",
      time: "MONDAY",
      location: "Darshan Heights Society",
      description: "Ganpati Bappa's Grand Agman",
      decorativeStyle: "none"
    },
    {
      id: "ev2",
      title: "2ND DAY OF GANPATI",
      subtitle: "",
      hashtag: "",
      date: "15 SEPTEMBER 2026",
      time: "TUESDAY",
      location: "Darshan Heights Society",
      description: "A day of devotion, blessings & togetherness",
      decorativeStyle: "none"
    },
    {
      id: "ev3",
      title: "3RD DAY OF GANPATI",
      subtitle: "",
      hashtag: "",
      date: "16 SEPTEMBER 2026",
      time: "WEDNESDAY",
      location: "Darshan Heights Society",
      description: "Continue the celebrations with Bappa's divine blessings",
      decorativeStyle: "none"
    },
    {
      id: "ev4",
      title: "MYSTERY NIGHT",
      subtitle: "Surprise Celebrity • Magician • Painting Artist",
      hashtag: "",
      date: "17 SEPTEMBER 2026",
      time: "THURSDAY",
      location: "Darshan Heights Society",
      description: "Games — Bachpan Ki Yaadein\nGames for all age groups, followed by snacks",
      decorativeStyle: "none"
    },
    {
      id: "ev5",
      title: "BANJO & RAAS GARBA",
      subtitle: "Followed by snacks",
      hashtag: "",
      date: "18 SEPTEMBER 2026",
      time: "FRIDAY",
      location: "Darshan Heights Society",
      description: "Banjo with Raas Garba",
      decorativeStyle: "none"
    },
    {
      id: "ev6",
      title: "CASINO NIGHT",
      subtitle: "Followed by dinner by society",
      hashtag: "",
      date: "19 SEPTEMBER 2026",
      time: "SATURDAY",
      location: "Darshan Heights Society",
      description: "Casino Night & Satyanarayan Puja",
      decorativeStyle: "none"
    },
    {
      id: "ev7",
      title: "VISARJAN",
      subtitle: "MAHA GANGA AARTI • SFX LIGHTS • VINTAGE CAR",
      hashtag: "",
      date: "20 SEPTEMBER 2026",
      time: "SUNDAY",
      location: "Darshan Heights Society",
      description: "Visarjan — 7:00 PM\nFollowed by dinner",
      decorativeStyle: "none"
    }
  ],
  timeline: [
    {
      id: "tl1",
      title: "AAGMAN",
      date: "14 September 2026",
      day: "Monday",
      time: "",
      location: "DARSHAN HEIGHTS SOCIETY",
      hashtag: "#BappaAagman",
      description: ""
    },
    {
      id: "tl2",
      title: "2ND DAY OF GANPATI",
      date: "15 September 2026",
      day: "Tuesday",
      time: "",
      location: "DARSHAN HEIGHTS SOCIETY",
      hashtag: "#BappaKeDarshan",
      description: ""
    },
    {
      id: "tl3",
      title: "3RD DAY OF GANPATI",
      date: "16 September 2026",
      day: "Wednesday",
      time: "",
      location: "DARSHAN HEIGHTS SOCIETY",
      hashtag: "#BappaBlessings",
      description: ""
    },
    {
      id: "tl4",
      title: "MYSTERY NIGHT",
      date: "17 September 2026",
      day: "Thursday",
      time: "",
      location: "DARSHAN HEIGHTS SOCIETY",
      hashtag: "#BappaKiMasti",
      description: "Surprise Celebrity • Magician • Painting Artist\nGames: “Bachpan Ki Yaadein” for all age groups\nFollowed by Snacks"
    },
    {
      id: "tl5",
      title: "BANJO & RAAS GARBA",
      date: "18 September 2026",
      day: "Friday",
      time: "",
      location: "DARSHAN HEIGHTS SOCIETY",
      hashtag: "#BappaKeSangGarba",
      description: "Followed by Snacks"
    },
    {
      id: "tl6",
      title: "CASINO NIGHT & SATYANARAYAN PUJA",
      date: "19 September 2026",
      day: "Saturday",
      time: "",
      location: "DARSHAN HEIGHTS SOCIETY",
      hashtag: "#BappaKeSangCelebration",
      description: "Followed by Dinner by Society"
    },
    {
      id: "tl7",
      title: "VISARJAN",
      date: "20 September 2026",
      day: "Sunday",
      time: "7:00 PM",
      location: "DARSHAN HEIGHTS SOCIETY",
      hashtag: "#GanpatiBappaMorya",
      description: "Maha Ganga Aarti • SFX Lights • Vintage Car\nFollowed by Dinner"
    }
  ],
  venue: {
    name: "The Taj Mahal Palace",
    addressLine1: "Apollo Bandar, Colaba, Mumbai, Maharashtra",
    addressLine2: "400001",
    mapUrl: "https://maps.app.goo.gl/TajMahalPalace", // Placeholder link
  },
  transportation: "Transportation service will be available\nfrom the designated pickup center to the venue.\nPickup point: Central Station",
  dressCode: "Formal & Elegant",
  gallery: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop"
  ],
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=romantic-piano-112199.mp3", // Placeholder romantic royalty-free music
  closingMessage: "We can't wait to celebrate\nwith you!"
};
