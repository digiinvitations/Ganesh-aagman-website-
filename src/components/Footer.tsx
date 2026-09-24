import React, { useState } from "react";
import { Instagram, Settings, X, KeyRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WeddingData } from "../types";

interface FooterProps {
  data?: WeddingData;
}

export function Footer({ data }: FooterProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'matakichowki_main';
  
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
    <footer className="py-16 bg-[#FFFDF7] border-t border-[#F3C3D2] flex flex-col items-center text-center px-4 relative">
      
      {/* Devotional Salutation */}
      <div className="flex flex-col items-center gap-1 mb-6">
        <span className="text-xl mb-1 text-[#E65100]">🪔</span>
        <h4 className="font-serif text-lg tracking-[0.2em] text-[#B8141B] font-extrabold uppercase">
          ॥ जय माता दी ॥
        </h4>
        <p className="font-serif text-xs uppercase tracking-[0.2em] text-[#7A4B5B] font-bold">
          MATA KI CHOWKI • 24 OCTOBER 2026
        </p>
      </div>

      <div className="flex items-center gap-4 opacity-70 mb-6 w-full justify-center">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
        <span className="text-sm">🌼</span>
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
      </div>

      <div className="flex flex-col items-center gap-2 text-[#7A4B5B] font-serif border-t border-[#F3C3D2]/60 pt-6 w-full max-w-sm">
        <p className="text-[10px] font-bold tracking-wider uppercase flex items-center gap-2">
          Created by digiinvitations_
          <a 
            href="https://www.instagram.com/digiinvitations_?igsi=MWh1ZnZhMm1xNnNkdw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#B8141B] hover:text-[#E65100] transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
        </p>
        <p className="text-[9px] tracking-widest font-semibold opacity-80">
          To Create Yours Contact: - 9456411569
        </p>
      </div>

      <div className="mt-8 flex justify-center w-full">
        <button 
          onClick={handleAdminClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#FAF2F5] text-[#7A4B5B] hover:text-[#B8141B] rounded-full border border-[#D4AF37]/50 shadow-sm transition-colors text-[9px] font-serif uppercase tracking-widest font-bold cursor-pointer"
          title="Admin Panel"
        >
          <Settings className="w-3.5 h-3.5" />
          Admin Access
        </button>
      </div>

      {/* Password Prompt Modal */}
      {showPrompt && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-[#FFFDF7] border-2 border-[#D4AF37]/60 p-7 rounded-3xl shadow-2xl w-full max-w-sm relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowPrompt(false)}
              className="absolute top-4 right-4 text-[#7A4B5B] hover:text-[#B8141B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-[#FAF2F5] border border-[#D4AF37]/50 rounded-full flex items-center justify-center mb-3 shadow-sm">
                <KeyRound className="w-6 h-6 text-[#B8141B]" />
              </div>
              <h3 className="font-serif text-xl text-[#B8141B] font-bold">Admin Access</h3>
              <p className="text-xs text-[#7A4B5B] font-serif mt-1">Please enter the admin password</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoFocus
                  className="w-full bg-[#FAF2F5] border border-[#F3C3D2] rounded-xl px-4 py-3 text-[#3C1B26] placeholder-[#7A4B5B]/50 focus:outline-none focus:border-[#B8141B] focus:ring-1 focus:ring-[#B8141B] font-serif text-center tracking-widest transition-all"
                />
                {error && <p className="text-red-500 text-xs text-center mt-2 font-serif font-bold">{error}</p>}
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#B8141B] hover:bg-[#9E0E15] text-[#FFFDF7] font-bold uppercase tracking-widest py-3 rounded-xl shadow-md transition-all font-serif text-xs cursor-pointer"
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
