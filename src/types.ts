export interface Person {
  name: string;
  parents: string;
  education: string;
  profession: string;
}

export interface EventDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  // New luxury card fields
  backgroundUrl?: string;
  logoUrl?: string;
  caricatureUrl?: string;
  hashtag?: string;
  subtitle?: string;
  decorativeStyle?: 'haldi' | 'mehndi' | 'sangeet' | 'wedding' | 'none';
  
  // Visibility toggles
  showCaricature?: boolean;
  showLogo?: boolean;
  showHashtag?: boolean;
  showSubtitle?: boolean;
  showTitle?: boolean;
  showDate?: boolean;
  showTime?: boolean;
  showLocation?: boolean;
  showDescription?: boolean;

  // Legacy fields (kept for compatibility)
  icon?: string;
  image?: string;
  videoUrl?: string;
  mapUrl?: string;
  circularImageUrl?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  date: string; // Used for Date
  day?: string; // Used for Day
  time: string;
  location?: string;
  description: string;
  imageUrl?: string;
  logoUrl?: string;
  hashtag?: string;
}

export interface VenueDetails {
  name: string;
  addressLine1: string;
  addressLine2: string;
  mapUrl: string;
  landmarks?: string;
}

export interface WeddingData {
  // Legacy groom/bride fields kept for type compatibility
  groom?: Person;
  bride?: Person;
  
  // Mata Ki Chowki specific event fields
  eventName?: string;
  deviName?: string;
  deviImageUrl?: string;
  familyMembers?: {
    elder1?: string;
    elder2?: string;
    elder3?: string;
    familyName?: string;
  };
  contactPerson?: {
    name: string;
    phone: string;
  };

  weddingDate: string; // ISO format for countdown
  weddingDateFormatted: string;
  weddingTimeFormatted: string;
  weddingDayFormatted: string;
  openingThumbnailUrl?: string;
  openingVideoUrl?: string;
  heroVideoUrl?: string;
  heroImageUrl?: string;
  ogImageUrl?: string;
  globalLogo?: string;
  subhAagmanImageUrl?: string;
  mataKiChowkiImageUrl?: string;
  faithDevotionImageUrl?: string;
  heroMessage: string;
  invitationMessage: string;
  events: EventDetails[];
  timeline: TimelineItem[];
  venue: VenueDetails;
  transportation?: string;
  dressCode?: string;
  gallery: string[];
  musicUrl: string;
  closingMessage: string;
}
