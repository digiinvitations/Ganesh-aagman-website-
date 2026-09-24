import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Send } from "lucide-react";
import { submitRSVP, getRSVPs } from "../services/db";

export function RSVP() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loadingRsvps, setLoadingRsvps] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleViewerAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "2580") {
      setIsAuthenticated(true);
      setErrorMsg("");
      setLoadingRsvps(true);
      const data = await getRSVPs();
      setRsvps(data);
      setLoadingRsvps(false);
    } else {
      setErrorMsg("Incorrect password");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const formData = new FormData(e.currentTarget);
    const rsvpData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      attending: formData.get("attending"),
      message: formData.get("message")
    };

    try {
      await submitRSVP(rsvpData);
      setStatus("success");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setStatus("idle");
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#FDF0F4] flex flex-col items-center relative overflow-hidden border-t border-[#F3C3D2]/50">
      
      {/* Background Soft Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(230,81,0,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md flex flex-col items-center relative z-10"
      >
        <span className="text-xl mb-1 text-[#E65100]">🪔</span>

        <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.16em] text-[#B8141B] font-extrabold text-center drop-shadow-sm mb-2">
          YOUR PRESENCE MATTERS
        </h2>
        
        {/* Divider with Marigold */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-sm">🌼</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {status === "success" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-8 text-center bg-[#FFFDF7] rounded-3xl border-2 border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(212,175,55,0.15)] mt-4"
          >
            <span className="text-4xl mb-3 block">🙏</span>
            <h3 className="font-serif text-2xl font-bold text-[#B8141B] mb-2 tracking-wide">
              ॥ जय माता दी ॥
            </h3>
            <p className="font-serif text-sm text-[#3C1B26] font-semibold leading-relaxed">
              Thank you for sharing your blessings! We eagerly look forward to welcoming you at Mata Ki Chowki.
            </p>
          </motion.div>
        ) : (
          <div className="w-full bg-[#FFFDF7] rounded-3xl p-7 sm:p-9 border-2 border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(212,175,55,0.12)] mt-4 relative">
            
            {/* Inner hairline border */}
            <div className="absolute inset-2.5 rounded-2xl border border-[#B8141B]/15 pointer-events-none" />

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 text-left relative z-10">
              
              {/* Name Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-xs font-serif font-bold uppercase tracking-wider text-[#B8141B] pl-1">
                  Your Name *
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required 
                  placeholder="Your full name"
                  className="w-full bg-[#FAF2F5] border border-[#F3C3D2] rounded-xl px-4 py-3 text-sm text-[#3C1B26] placeholder-[#7A4B5B]/50 focus:outline-none focus:border-[#B8141B] focus:ring-1 focus:ring-[#B8141B] transition-colors"
                  disabled={status === "submitting"}
                />
              </div>

              {/* Mobile Number Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-xs font-serif font-bold uppercase tracking-wider text-[#B8141B] pl-1">
                  Mobile Number *
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  required 
                  placeholder="10-digit mobile number"
                  className="w-full bg-[#FAF2F5] border border-[#F3C3D2] rounded-xl px-4 py-3 text-sm text-[#3C1B26] placeholder-[#7A4B5B]/50 focus:outline-none focus:border-[#B8141B] focus:ring-1 focus:ring-[#B8141B] transition-colors"
                  disabled={status === "submitting"}
                />
              </div>

              {/* Attendance Dropdown */}
              <div className="flex flex-col gap-1">
                <label htmlFor="attending" className="text-xs font-serif font-bold uppercase tracking-wider text-[#B8141B] pl-1">
                  Will you be joining us? *
                </label>
                <div className="relative">
                  <select 
                    id="attending" 
                    name="attending"
                    required 
                    defaultValue=""
                    className="w-full bg-[#FAF2F5] border border-[#F3C3D2] rounded-xl px-4 py-3 text-sm text-[#3C1B26] appearance-none focus:outline-none focus:border-[#B8141B] focus:ring-1 focus:ring-[#B8141B] transition-colors cursor-pointer"
                    disabled={status === "submitting"}
                  >
                    <option value="" disabled hidden>Select your response...</option>
                    <option value="yes">Yes, I'll be there 🙏</option>
                    <option value="maybe">Will try my best</option>
                    <option value="no">Unable to attend</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#B8141B]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Field: Your Blessings */}
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-xs font-serif font-bold uppercase tracking-wider text-[#B8141B] pl-1">
                  Your Blessings
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={3}
                  placeholder="Write your blessings..."
                  className="w-full bg-[#FAF2F5] border border-[#F3C3D2] rounded-xl px-4 py-3 text-sm text-[#3C1B26] placeholder-[#7A4B5B]/50 focus:outline-none focus:border-[#B8141B] focus:ring-1 focus:ring-[#B8141B] transition-colors resize-none"
                  disabled={status === "submitting"}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="mt-2 w-full bg-[#B8141B] hover:bg-[#9E0E15] text-[#FFFDF7] py-3.5 rounded-xl font-serif text-sm tracking-[0.18em] uppercase font-bold shadow-md transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {status === "submitting" ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#FFBF00]" />
                    SEND BLESSINGS
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>

      {/* RSVP Viewer Section */}
      <div className="w-full max-w-md mt-10 flex flex-col items-center pt-4">
        <button 
          onClick={() => setIsViewerOpen(!isViewerOpen)}
          className="text-[11px] uppercase tracking-[0.2em] font-serif font-bold text-[#7A4B5B] hover:text-[#B8141B] flex items-center gap-2 transition-colors cursor-pointer"
        >
          {isViewerOpen ? "Close Guest List" : "See Guest Responses"}
        </button>

        {isViewerOpen && (
          <div className="w-full mt-4 bg-[#FFFDF7] p-6 rounded-2xl border-2 border-[#D4AF37]/50 shadow-md">
            {!isAuthenticated ? (
              <form onSubmit={handleViewerAccess} className="flex flex-col gap-3">
                <p className="text-xs font-serif font-bold uppercase tracking-wider text-[#B8141B] text-center">
                  Enter Password to View Responses
                </p>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#FAF2F5] border border-[#F3C3D2] rounded-xl px-4 py-2.5 text-sm text-center font-serif text-[#3C1B26] focus:outline-none focus:border-[#B8141B]"
                />
                {errorMsg && <p className="text-red-500 text-xs text-center">{errorMsg}</p>}
                <button type="submit" className="w-full bg-[#B8141B] text-[#FFFDF7] py-2 rounded-xl font-serif text-xs uppercase tracking-widest font-bold hover:bg-[#9E0E15] transition-colors">
                  Access
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#F3C3D2]">
                  <h3 className="font-serif font-bold text-sm text-[#B8141B] uppercase tracking-wider">Guest Responses</h3>
                  <span className="text-xs font-bold bg-[#FAF2F5] text-[#B8141B] px-2.5 py-1 rounded-full border border-[#D4AF37]/40">
                    Total: {rsvps.length}
                  </span>
                </div>
                
                {loadingRsvps ? (
                  <p className="text-center text-xs text-[#7A4B5B] py-4">Loading responses...</p>
                ) : rsvps.length === 0 ? (
                  <p className="text-center text-xs text-[#7A4B5B] py-4">No blessings received yet.</p>
                ) : (
                  rsvps.map((rsvp, idx) => (
                    <div key={idx} className="bg-[#FAF2F5] p-3 rounded-xl border border-[#F3C3D2] text-left">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-serif font-bold text-sm text-[#B8141B]">{rsvp.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rsvp.attending === 'yes' ? 'bg-green-100 text-green-800' : rsvp.attending === 'maybe' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                          {rsvp.attending === 'yes' ? "Attending" : rsvp.attending === 'maybe' ? "Tentative" : "Declined"}
                        </span>
                      </div>
                      {rsvp.phone && <p className="text-xs text-[#7A4B5B] mb-1 font-mono">{rsvp.phone}</p>}
                      {rsvp.message && (
                        <p className="text-xs text-[#3C1B26] italic border-l-2 border-[#D4AF37] pl-2 mt-1">
                          "{rsvp.message}"
                        </p>
                      )}
                      {rsvp.submittedAt && (
                        <p className="text-[9px] text-[#7A4B5B]/60 mt-1.5 text-right">
                          {new Date(rsvp.submittedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
