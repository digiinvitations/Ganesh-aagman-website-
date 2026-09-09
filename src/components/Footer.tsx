import React, { useState } from "react";
import { Instagram, Settings, X, KeyRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WeddingData } from "../types";

interface FooterProps {
  data: WeddingData;
}

export function Footer({ data }: FooterProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'main';
  
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminClick = () => {
    setShowPrompt(true);
    setPassword("");
    setError("");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "6396") {
      setShowPrompt(false);
      navigate(`/admin?template=${encodeURIComponent(templateId)}`);
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <footer className="py-16 bg-[#2A040F] border-t border-[#D4AF37]/30 flex flex-col items-center text-center px-4 relative">
      
      <div className="flex flex-col items-center gap-1 mb-8">
        <p className="font-serif text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold opacity-90">
          PROUDLY PRESENTED BY
        </p>
        <h4 className="font-serif text-lg tracking-widest text-[#FDFBF7] font-bold mt-2">
          DARSHAN HIGHTS YUVA SANGH
        </h4>
        <span className="font-serif text-[#D4AF37] text-sm italic my-1">&amp;</span>
        <h4 className="font-serif text-lg tracking-widest text-[#FDFBF7] font-bold">
          SHRI HARSSHAD MAHENDRA JAAIN
        </h4>
      </div>

      <div className="flex items-center gap-4 opacity-70 mb-8 w-full justify-center">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
        <span className="text-[#D4AF37] text-sm">🏮</span>
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
      </div>
      
      <div className="flex flex-col items-center gap-1 mb-10">
        <p className="font-serif text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold opacity-90">
          ALL EVENTS BY
        </p>
        <h4 className="font-serif text-base tracking-widest text-[#FDFBF7] font-bold mt-2">
          KIRTI JAIN
        </h4>
        <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] font-bold mt-1">
          EVENTS ADDICT
        </h4>
      </div>

      <div className="flex flex-col items-center gap-3 mt-4 text-[#FDFBF7]/80 font-serif border-t border-[#D4AF37]/20 pt-8 w-full max-w-sm">
        <p className="text-[10px] font-bold tracking-wider uppercase flex items-center gap-2">
          Created by digiinvitations_
          <a 
            href="https://www.instagram.com/digiinvitations_?igsi=MWh1ZnZhMm1xNnNkdw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:text-[#FFBF00] transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
        </p>
        <p className="text-[9px] tracking-widest font-semibold opacity-70">
          To Create Yours Contact: - 9456411569
        </p>
      </div>

      <div className="mt-12 flex justify-center w-full">
        <button 
          onClick={handleAdminClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-[#FDFBF7] rounded-full border border-[#D4AF37]/40 shadow-lg hover:bg-[#A91F3D] transition-colors text-[9px] font-serif uppercase tracking-widest"
          title="Admin Panel"
        >
          <Settings className="w-3.5 h-3.5" />
          Admin Access
        </button>
      </div>

      {/* Custom Password Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
          <div className="bg-[#3B0918] border border-[#D4AF37]/40 p-6 rounded-2xl shadow-2xl w-full max-w-sm relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowPrompt(false)}
              className="absolute top-4 right-4 text-[#FDFBF7]/60 hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-[#8B0000] rounded-full flex items-center justify-center mb-3 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                <KeyRound className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-xl text-[#D4AF37] font-bold">Admin Access</h3>
              <p className="text-sm text-[#FDFBF7]/70 font-serif mt-1">Please enter the password</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoFocus
                  className="w-full bg-[#2A040F] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#FDFBF7] placeholder-[#FDFBF7]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] font-serif text-center tracking-widest transition-all"
                />
                {error && <p className="text-red-400 text-xs text-center mt-2 font-serif">{error}</p>}
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#8B0000] to-[#3B0918] hover:from-[#A91F3D] hover:to-[#8B0000] text-[#D4AF37] border border-[#D4AF37]/50 font-bold uppercase tracking-widest py-3 rounded-lg shadow-md transition-all font-serif text-sm"
              >
                Access Panel
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
