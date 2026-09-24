import { doc, getDoc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { WeddingData } from "../types";
import { weddingData as defaultData } from "../data";

const DATA_DOC_ID = "matakichowki_main";

const DEFAULT_TEMPLATE_ID = "matakichowki_main";

export async function getWeddingData(templateId: string = DEFAULT_TEMPLATE_ID): Promise<WeddingData> {
  try {
    const safeTemplateId = (templateId || DEFAULT_TEMPLATE_ID).replace(/\//g, "-");
    const docRef = doc(db, "weddingConfig", safeTemplateId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as WeddingData;
      
      // Clean migration: If document has old Ganpati data, override with new Mata Ki Chowki default
      const hasOldGanpatiData = 
        data.heroMessage?.toUpperCase().includes("GANPATI") || 
        data.heroMessage?.toUpperCase().includes("BAPPA") ||
        data.heroMessage?.toUpperCase().includes("DARSHAN HEIGHTS") ||
        data.events?.some(e => e.title?.toUpperCase().includes("AAGMAN") || e.title?.toUpperCase().includes("GANPATI"));

      if (hasOldGanpatiData) {
        await setDoc(docRef, defaultData);
        return defaultData;
      }

      return {
        ...defaultData,
        ...data,
        venue: { ...defaultData.venue, ...(data.venue || {}) },
        familyMembers: { ...defaultData.familyMembers, ...(data.familyMembers || {}) },
        contactPerson: { ...defaultData.contactPerson, ...(data.contactPerson || {}) },
        events: (data.events && data.events.length > 0) ? data.events : defaultData.events,
        timeline: (data.timeline && data.timeline.length > 0) ? data.timeline : defaultData.timeline
      };
    } else {
      // Initialize with default Mata Ki Chowki data
      await setDoc(docRef, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error("Error fetching event data:", error);
    return defaultData; // Fallback
  }
}

export async function checkTemplateExists(templateId: string): Promise<boolean> {
  try {
    const docRef = doc(db, "weddingConfig", templateId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking template existence:", error);
    return false;
  }
}

export async function saveWeddingData(templateId: string, data: WeddingData): Promise<void> {
  // Replace slashes just in case they typed a path-like string
  const safeTemplateId = templateId.replace(/\//g, "-");
  const docRef = doc(db, "weddingConfig", safeTemplateId);
  // Sanitize data to remove any undefined fields that cause Firestore errors
  const cleanData = JSON.parse(JSON.stringify(data));
  await setDoc(docRef, cleanData);
}

export async function submitRSVP(rsvpData: any): Promise<void> {
  const rsvpCollection = collection(db, "rsvps");
  await addDoc(rsvpCollection, {
    ...rsvpData,
    submittedAt: new Date().toISOString()
  });
}

export async function getRSVPs(): Promise<any[]> {
  try {
    const rsvpCollection = collection(db, "rsvps");
    const snapshot = await getDocs(rsvpCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return [];
  }
}
