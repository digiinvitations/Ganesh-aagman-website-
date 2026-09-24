import { WeddingData } from "./types";

export const weddingData: WeddingData = {
  eventName: "MATA KI CHOWKI",
  deviName: "KAROLI WALI MATA",
  deviImageUrl: "", // Can be uploaded via Admin Panel or customized
  familyMembers: {
    elder1: "AJIT KUMAR GOYAL",
    elder2: "MAMTA AGARWAL",
    elder3: "VIJAY RANI",
    familyName: "THE GOYAL FAMILY"
  },
  contactPerson: {
    name: "AJIT KUMAR GOYAL",
    phone: "9412300439"
  },
  // Countdown to 24 October 2026 at 8:00 PM IST
  weddingDate: "2026-10-24T20:00:00",
  weddingDateFormatted: "24 October 2026",
  weddingTimeFormatted: "8:00 PM Onwards",
  weddingDayFormatted: "Saturday",
  
  // Hero and Opening Media (can be uploaded via Admin Panel)
  openingThumbnailUrl: "",
  openingVideoUrl: "",
  heroVideoUrl: "",
  heroImageUrl: "",
  ogImageUrl: "",
  globalLogo: "",
  
  heroMessage: "॥ जय माता दी ॥\nMATA KI CHOWKI\nKAROLI WALI MATA\n24 OCTOBER 2026\nSATURDAY • 8:00 PM ONWARDS",
  
  invitationMessage: "With immense devotion and heartfelt joy, we invite you to join us for an auspicious evening dedicated to Karoli Wali Mata.\n\nCome together with family and loved ones to seek Maa's divine blessings, immerse ourselves in devotion and bhakti, and share an evening filled with faith, peace and togetherness.",
  
  // Single Event Details as required
  events: [
    {
      id: "mkc_main",
      title: "MATA KI CHOWKI",
      subtitle: "AN EVENING OF DIVINE BLESSINGS",
      hashtag: "#JaiMataDi",
      date: "24 OCTOBER 2026",
      time: "8:00 PM ONWARDS",
      location: "KRISHNA PALACE, AGRA",
      description: "Come together for an evening of devotion, bhajan sandhya, divine aarti and blessings of Maa Karoli.",
      decorativeStyle: "none"
    }
  ],
  
  timeline: [
    {
      id: "mkc_tl1",
      title: "MATA KI CHOWKI",
      date: "24 October 2026",
      day: "Saturday",
      time: "8:00 PM Onwards",
      location: "Krishna Palace, Agra",
      hashtag: "#JaiMataDi",
      description: "Devotional Bhajans, Aarti, Divine Blessings & Mahaprasad"
    }
  ],
  
  venue: {
    name: "KRISHNA PALACE",
    addressLine1: "Sikandra Bodla Road, Agra",
    addressLine2: "Near Kargil Petrol Pump",
    landmarks: "Near Kargil Petrol Pump",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Krishna+Palace+Sikandra+Bodla+Road+Agra"
  },
  
  gallery: [],
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939a8c084.mp3?filename=indian-flute-meditation-122557.mp3",
  closingMessage: "Your presence and blessings will make this auspicious evening even more special.\nWe look forward to welcoming you with folded hands and heartfelt devotion."
};
