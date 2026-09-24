import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getWeddingData, saveWeddingData, checkTemplateExists } from "../services/db";
import { WeddingData } from "../types";
import { Save, Image as ImageIcon, ArrowLeft, Download, Upload, Plus, Trash2, Share2, Wand2, Smartphone, Sparkles, Undo2, Maximize2 } from "lucide-react";

export function AdminPanel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentTemplateId = searchParams.get("template") || "matakichowki_main";
  
  const [data, setData] = useState<WeddingData | null>(null);
  const [saving, setSaving] = useState(false);
  const [templateId, setTemplateId] = useState(currentTemplateId);

  // OG Image Dimension & Format States
  const [ogDimensions, setOgDimensions] = useState<{
    width: number;
    height: number;
    ratioText: string;
    aspectRatio: number;
  } | null>(null);
  const [ogPreviewTab, setOgPreviewTab] = useState<'card' | 'square' | 'original'>('card');
  const [isFormattingOg, setIsFormattingOg] = useState(false);
  const [originalOgUrlBackup, setOriginalOgUrlBackup] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const dbData = await getWeddingData(currentTemplateId);
      setData(dbData);
      setTemplateId(currentTemplateId);
    }
    loadData();
  }, [currentTemplateId]);

  useEffect(() => {
    if (!data?.ogImageUrl) {
      setOgDimensions(null);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const ratio = w / h;
      let ratioText = "";
      if (Math.abs(ratio - 1.905) < 0.15 || Math.abs(ratio - (16/9)) < 0.15) {
        ratioText = "Standard Landscape 1.91:1 / 16:9";
      } else if (Math.abs(ratio - 1) < 0.1) {
        ratioText = "Square 1:1";
      } else if (ratio < 0.65) {
        ratioText = "Vertical Story 9:16";
      } else if (ratio < 0.9) {
        ratioText = "Portrait 4:5 / 3:4";
      } else if (ratio >= 0.9 && ratio < 1.3) {
        ratioText = "Near Square / Traditional";
      } else {
        ratioText = "Wide Landscape";
      }
      setOgDimensions({
        width: w,
        height: h,
        ratioText,
        aspectRatio: ratio,
      });
    };
    img.src = data.ogImageUrl;
  }, [data?.ogImageUrl]);

  const formatToSocialCanvas = async (imageSrc: string) => {
    if (!imageSrc) return;
    setIsFormattingOg(true);
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageSrc;
      });

      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not initialize canvas context");

      // 1. Fill base with deep devotional burgundy
      ctx.fillStyle = "#22040B";
      ctx.fillRect(0, 0, 1200, 630);

      // 2. Ambient softly blurred devotional backdrop using the image
      ctx.save();
      ctx.filter = "blur(26px) brightness(0.4) saturate(1.25)";
      const bgScale = Math.max(1200 / img.naturalWidth, 630 / img.naturalHeight);
      const bgW = img.naturalWidth * bgScale;
      const bgH = img.naturalHeight * bgScale;
      const bgX = (1200 - bgW) / 2;
      const bgY = (630 - bgH) / 2;
      ctx.drawImage(img, bgX, bgY, bgW, bgH);
      ctx.restore();

      // Subtle vignette on left & right sides
      const vignette = ctx.createLinearGradient(0, 0, 1200, 0);
      vignette.addColorStop(0, "rgba(34, 4, 11, 0.85)");
      vignette.addColorStop(0.18, "rgba(34, 4, 11, 0.15)");
      vignette.addColorStop(0.82, "rgba(34, 4, 11, 0.15)");
      vignette.addColorStop(1, "rgba(34, 4, 11, 0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, 1200, 630);

      // 3. Contain the FULL real image without cropping any edges
      const maxW = 1200 - 48;
      const maxH = 630 - 36;
      const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
      const fgW = Math.round(img.naturalWidth * scale);
      const fgH = Math.round(img.naturalHeight * scale);
      const fgX = Math.round((1200 - fgW) / 2);
      const fgY = Math.round((630 - fgH) / 2);

      // Golden shadow & border frame around the real image
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
      ctx.shadowBlur = 28;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 6;

      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 3;
      ctx.strokeRect(fgX - 2, fgY - 2, fgW + 4, fgH + 4);

      // Draw real foreground image intact
      ctx.drawImage(img, fgX, fgY, fgW, fgH);
      ctx.restore();

      const formattedUrl = canvas.toDataURL("image/jpeg", 0.92);
      setOriginalOgUrlBackup(imageSrc);
      handleChange("ogImageUrl", formattedUrl);
    } catch (err) {
      console.error("Canvas formatting failed", err);
      alert("Could not auto-format image automatically. If using an external image URL, try uploading the image file directly!");
    } finally {
      setIsFormattingOg(false);
    }
  };

  if (!data) return <div className="p-8 font-serif text-[#B8141B]">Loading Admin Panel...</div>;

  const handleChange = (path: string, value: any) => {
    setData((prev: any) => {
      const updated = JSON.parse(JSON.stringify(prev || {}));
      const keys = path.split('.');
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSingleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      handleChange(field, base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!templateId.trim()) {
      alert("Please provide a valid template name");
      return;
    }
    setSaving(true);
    try {
      const sanitizedTemplateId = templateId.trim().replace(/\//g, "-");
      
      // If saving to a NEW template name, check if it already exists to prevent overwriting
      if (sanitizedTemplateId !== currentTemplateId) {
        const exists = await checkTemplateExists(sanitizedTemplateId);
        if (exists) {
          alert(`The template name "${sanitizedTemplateId}" already exists. Please choose a different name so you do not overwrite it.`);
          setSaving(false);
          return;
        }
      }

      await saveWeddingData(sanitizedTemplateId, data);
      alert("Mata Ki Chowki settings saved successfully!");
      if (sanitizedTemplateId !== currentTemplateId) {
        navigate(`/admin?template=${encodeURIComponent(sanitizedTemplateId)}`);
      }
    } catch (error: any) {
      console.error(error);
      alert(`Failed to save: ${error.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateRemix = () => {
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    setTemplateId(`matakichowki_remix_${randomNum}`);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `mata_ki_chowki_${templateId}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (importedData && typeof importedData === 'object') {
          setData(importedData);
          alert("Data imported successfully! Make sure to click 'Save Changes' to update Firestore.");
        } else {
          alert("Invalid data format.");
        }
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        alert("Error parsing JSON file. Please ensure it is valid JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-[#FDF0F4] p-4 md:p-8 font-serif text-[#3C1B26]">
      <div className="max-w-4xl mx-auto bg-[#FFFDF7] rounded-2xl shadow-xl p-6 md:p-10 border-2 border-[#D4AF37]/50">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-[#F3C3D2] pb-6 gap-4">
          <div className="flex items-center gap-4">
            <Link 
              to={`/?template=${encodeURIComponent(currentTemplateId)}`} 
              className="flex items-center gap-2 text-[#B8141B] hover:text-[#9E0E15] bg-[#FAF2F5] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/50 transition-colors text-xs uppercase font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> View Site
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#B8141B]">Mata Ki Chowki Admin</h1>
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3 flex-wrap justify-end">
              <label className="flex items-center gap-2 bg-[#FAF2F5] text-[#B8141B] px-4 py-2 rounded-xl border border-[#D4AF37]/50 hover:bg-[#FCE6ED] transition-colors cursor-pointer text-xs uppercase font-bold shadow-sm">
                <Upload className="w-4 h-4 text-[#E65100]" />
                Import JSON
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 bg-[#FAF2F5] text-[#B8141B] px-4 py-2 rounded-xl border border-[#D4AF37]/50 hover:bg-[#FCE6ED] transition-colors text-xs uppercase font-bold shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#E65100]" />
                Export JSON
              </button>
            </div>

            {/* Template Selector & Saver */}
            <div className="flex items-center gap-3 flex-wrap justify-end">
              <div className="flex flex-col items-start gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#7A4B5B]">
                  Firestore Template ID
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={templateId} 
                    onChange={(e) => setTemplateId(e.target.value)}
                    placeholder="e.g. matakichowki_main"
                    className="bg-[#FAF2F5] border border-[#F3C3D2] text-[#3C1B26] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#B8141B] w-52 sm:w-60"
                  />
                  <button 
                    onClick={handleCreateRemix}
                    title="Generate New Remix ID"
                    className="bg-[#FAF2F5] text-[#B8141B] px-3 py-2 rounded-xl border border-[#D4AF37]/50 hover:bg-[#FCE6ED] transition-colors text-[10px] uppercase font-bold"
                  >
                    New Remix
                  </button>
                </div>
              </div>

              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#B8141B] text-[#FFFDF7] px-6 py-2.5 rounded-xl hover:bg-[#9E0E15] transition-colors disabled:opacity-50 shadow-md text-xs uppercase font-bold mt-4 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#FFBF00]" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* SECTION: HERO SECTION IMAGE (HD / 4K) */}
          <section className="bg-[#FAF2F5] p-5 sm:p-6 rounded-2xl border-2 border-[#D4AF37]/60 shadow-sm">
            <h2 className="text-lg font-bold text-[#B8141B] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>🖼️</span> Hero Section Image (HD / 4K)
            </h2>
            <p className="text-xs text-[#7A4B5B] font-serif mb-4">
              Upload your custom high-resolution Mata Ki Chowki image or enter a direct image URL. This image will fill the entire hero screen without any text overlays.
            </p>

            <div className="space-y-4">
              <Input 
                label="Hero Image URL (Direct Link)" 
                value={data.heroImageUrl || ""} 
                onChange={(v) => handleChange("heroImageUrl", v)} 
                placeholder="https://example.com/my-4k-hero-image.jpg"
              />

              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 bg-[#B8141B] text-[#FFFDF7] px-4 py-2.5 rounded-xl hover:bg-[#9E0E15] transition-colors cursor-pointer text-xs uppercase font-bold shadow-sm">
                  <ImageIcon className="w-4 h-4 text-[#FFBF00]" />
                  Upload HD / 4K Image File
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleSingleFileUpload(e, "heroImageUrl")} 
                    className="hidden" 
                  />
                </label>

                {data.heroImageUrl && (
                  <button 
                    type="button"
                    onClick={() => handleChange("heroImageUrl", "")}
                    className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 bg-[#FFFDF7] border border-red-200 px-3 py-2 rounded-xl font-bold cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Image
                  </button>
                )}
              </div>

              {/* Live Preview Box */}
              {data.heroImageUrl ? (
                <div className="mt-3 p-3 bg-[#FFFDF7] rounded-xl border border-[#D4AF37]/40">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A4B5B] block mb-2">
                    Current Hero Image Preview:
                  </span>
                  <div className="relative w-full max-w-xs aspect-[9/16] max-h-72 rounded-lg overflow-hidden border border-[#F3C3D2] shadow-inner bg-black/5">
                    <img 
                      src={data.heroImageUrl} 
                      alt="Hero Preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-[#FFFDF7] rounded-xl border border-dashed border-[#D4AF37]/50 text-xs text-[#7A4B5B] italic">
                  No custom hero image uploaded yet. (A high quality devotional default image is currently displayed on the hero section).
                </div>
              )}
            </div>
          </section>

          {/* SECTION: OPEN GRAPH (OG IMAGE) / SOCIAL SHARE CARD */}
          <section className="bg-[#FAF2F5] p-5 sm:p-6 rounded-2xl border-2 border-[#D4AF37]/60 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h2 className="text-lg font-bold text-[#B8141B] uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#E65100]" />
                Social Share Image (OG Image / WhatsApp Card)
              </h2>
              {ogDimensions && (
                <span className="text-[11px] font-sans font-bold bg-[#FFFDF7] border border-[#D4AF37]/60 text-[#B8141B] px-2.5 py-1 rounded-full shadow-xs">
                  {ogDimensions.ratioText} ({ogDimensions.width} × {ogDimensions.height} px)
                </span>
              )}
            </div>

            <p className="text-xs text-[#7A4B5B] font-serif mb-4">
              When you share this invitation link on <strong>WhatsApp, Facebook, iMessage, Twitter/X, or Instagram</strong>, this preview card appears.
              Social platforms normally display preview cards in <strong>1200 × 630 px (1.91:1 ratio)</strong> or square. 
            </p>

            <div className="space-y-4">
              <Input 
                label="OG Image URL (Direct Link)" 
                value={data.ogImageUrl || ""} 
                onChange={(v) => handleChange("ogImageUrl", v)} 
                placeholder="https://example.com/social-share-image.jpg"
              />

              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 bg-[#B8141B] text-[#FFFDF7] px-4 py-2.5 rounded-xl hover:bg-[#9E0E15] transition-colors cursor-pointer text-xs uppercase font-bold shadow-sm">
                  <ImageIcon className="w-4 h-4 text-[#FFBF00]" />
                  Upload OG Image File
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleSingleFileUpload(e, "ogImageUrl")} 
                    className="hidden" 
                  />
                </label>

                {data.ogImageUrl && (
                  <button 
                    type="button"
                    onClick={() => {
                      handleChange("ogImageUrl", "");
                      setOriginalOgUrlBackup("");
                    }}
                    className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 bg-[#FFFDF7] border border-red-200 px-3 py-2 rounded-xl font-bold cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove OG Image
                  </button>
                )}
              </div>

              {/* Smart Auto-Format Tool for Vertical / Square / Custom Ratio Images */}
              {data.ogImageUrl && (
                <div className="p-4 bg-[#FFFDF7] rounded-xl border border-[#D4AF37]/50 shadow-xs space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#B8141B]">
                        Zero-Crop Social Framing Helper
                      </h4>
                      <p className="text-[11px] text-[#7A4B5B] font-serif mt-0.5 leading-relaxed">
                        If your invitation is a <strong>vertical poster, portrait photo (9:16 or 4:5), or square</strong>, WhatsApp and Facebook would normally chop off the top (Maa's crown) or bottom (dates/venue).
                        Click below to automatically fit 100% of your real image into the standard 1200×630 frame with an elegant devotional blurred backdrop and gold border.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      disabled={isFormattingOg}
                      onClick={() => data.ogImageUrl && formatToSocialCanvas(data.ogImageUrl)}
                      className="flex items-center gap-2 bg-[#800C12] hover:bg-[#68070C] text-[#FFFDF7] px-3.5 py-2 rounded-xl text-xs uppercase font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-[#FFD54F]" />
                      {isFormattingOg ? "Formatting Image..." : "✨ Fit Entire Image on 1200×630 (Zero-Crop Guarantee)"}
                    </button>

                    {originalOgUrlBackup && (
                      <button
                        type="button"
                        onClick={() => {
                          handleChange("ogImageUrl", originalOgUrlBackup);
                          setOriginalOgUrlBackup("");
                        }}
                        className="flex items-center gap-1.5 text-xs text-[#7A4B5B] hover:text-[#B8141B] bg-white border border-[#D4AF37]/50 px-3 py-2 rounded-xl font-bold cursor-pointer transition-colors"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                        Revert to Raw Image
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Multi-Platform Live Preview Switcher */}
              <div className="mt-4 p-4 bg-[#FFFDF7] rounded-xl border border-[#D4AF37]/50 max-w-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A4B5B]">
                    Multi-Platform Share Preview:
                  </span>
                  
                  {/* Platform Switcher Tabs */}
                  <div className="inline-flex rounded-lg p-0.5 bg-[#FAF2F5] border border-[#F3C3D2] text-[11px] font-sans font-bold">
                    <button
                      type="button"
                      onClick={() => setOgPreviewTab('card')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        ogPreviewTab === 'card'
                          ? 'bg-[#B8141B] text-[#FFFDF7] shadow-xs'
                          : 'text-[#7A4B5B] hover:text-[#B8141B]'
                      }`}
                    >
                      WhatsApp / FB (1.91:1)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOgPreviewTab('square')}
                      className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                        ogPreviewTab === 'square'
                          ? 'bg-[#B8141B] text-[#FFFDF7] shadow-xs'
                          : 'text-[#7A4B5B] hover:text-[#B8141B]'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" /> Chat (1:1)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOgPreviewTab('original')}
                      className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                        ogPreviewTab === 'original'
                          ? 'bg-[#B8141B] text-[#FFFDF7] shadow-xs'
                          : 'text-[#7A4B5B] hover:text-[#B8141B]'
                      }`}
                    >
                      <Maximize2 className="w-3 h-3" /> Real Ratio
                    </button>
                  </div>
                </div>
                
                {/* TAB 1: WhatsApp / Facebook Large Link Card */}
                {ogPreviewTab === 'card' && (
                  <div className="rounded-xl overflow-hidden border border-[#F3C3D2] shadow-sm bg-[#FAF2F5]">
                    <div className="w-full aspect-[1.91/1] bg-[#1E0409] relative overflow-hidden flex items-center justify-center">
                      {data.ogImageUrl ? (
                        <>
                          {/* Ambient soft backdrop to fill empty bars */}
                          <img 
                            src={data.ogImageUrl} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40 select-none pointer-events-none" 
                          />
                          {/* Real image in full complete view without cropping */}
                          <img 
                            src={data.ogImageUrl} 
                            alt="OG Preview" 
                            className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md select-none" 
                          />
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1 text-[#7A4B5B] p-4 text-center">
                          <span className="text-2xl">🪔</span>
                          <span className="text-xs font-serif italic">Default Divine Mata Ki Chowki Cover</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 bg-[#FFFDF7] border-t border-[#F3C3D2]">
                      <span className="text-[10px] text-[#7A4B5B] uppercase tracking-wider block font-semibold">
                        WHATSAPP / FACEBOOK PREVIEW
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#B8141B] line-clamp-1 mt-0.5">
                        Mata Ki Chowki Invitation | Karoli Wali Mata
                      </h4>
                      <p className="text-[11px] text-[#3C1B26] line-clamp-2 mt-1 leading-snug">
                        With immense devotion and heartfelt joy, the Goyal Family cordially invites you to Mata Ki Chowki on 24 October 2026 at Krishna Palace, Agra.
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 2: WhatsApp Chat Bubble Square Thumbnail (1:1) */}
                {ogPreviewTab === 'square' && (
                  <div className="p-3 bg-[#FAF2F5] rounded-xl border border-[#F3C3D2] flex items-center gap-3">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-[#1E0409] relative border border-[#D4AF37]/50 flex items-center justify-center shadow-xs">
                      {data.ogImageUrl ? (
                        <>
                          <img 
                            src={data.ogImageUrl} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-40" 
                          />
                          <img 
                            src={data.ogImageUrl} 
                            alt="Square Preview" 
                            className="relative z-10 max-h-full max-w-full object-contain" 
                          />
                        </>
                      ) : (
                        <span className="text-2xl">🪔</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#7A4B5B] uppercase tracking-wider block font-semibold">
                        CHAT BUBBLE PREVIEW
                      </span>
                      <h4 className="font-serif font-bold text-xs text-[#B8141B] line-clamp-1">
                        Mata Ki Chowki Invitation
                      </h4>
                      <p className="text-[10px] text-[#3C1B26] line-clamp-2">
                        Saturday, 24 October 2026 • Krishna Palace, Agra
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 3: Real Image Aspect Ratio (Uncropped Full View) */}
                {ogPreviewTab === 'original' && (
                  <div className="p-3 bg-[#FAF2F5] rounded-xl border border-[#F3C3D2] flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[11px] font-sans font-bold text-[#B8141B] bg-white border border-[#D4AF37]/50 px-2.5 py-0.5 rounded-full">
                        {ogDimensions ? `${ogDimensions.width} × ${ogDimensions.height} px (${ogDimensions.ratioText})` : "Original Ratio"}
                      </span>
                    </div>

                    <div className="max-h-80 max-w-full rounded-lg overflow-hidden border-2 border-[#D4AF37]/60 shadow-md bg-white">
                      {data.ogImageUrl ? (
                        <img 
                          src={data.ogImageUrl} 
                          alt="Real Uncropped Ratio" 
                          className="max-h-80 w-auto object-contain mx-auto" 
                        />
                      ) : (
                        <div className="p-8 text-center text-xs text-[#7A4B5B]">
                          No OG image set yet.
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-[#7A4B5B] italic font-serif mt-2 text-center">
                      Showing original photo uncropped with exact native aspect ratio.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </section>

          {/* SECTION: FAMILY INVITATION */}
          <section className="bg-[#FAF2F5] p-5 sm:p-6 rounded-2xl border border-[#F3C3D2]">
            <h2 className="text-lg font-bold text-[#B8141B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>🪔</span> Section 2: Family Invitation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Elder 1" 
                value={data.familyMembers?.elder1 || ""} 
                onChange={(v) => handleChange("familyMembers.elder1", v)} 
                placeholder="AJIT KUMAR GOYAL"
              />
              <Input 
                label="Elder 2" 
                value={data.familyMembers?.elder2 || ""} 
                onChange={(v) => handleChange("familyMembers.elder2", v)} 
                placeholder="MAMTA AGARWAL"
              />
              <Input 
                label="Elder 3" 
                value={data.familyMembers?.elder3 || ""} 
                onChange={(v) => handleChange("familyMembers.elder3", v)} 
                placeholder="VIJAY RANI"
              />
              <Input 
                label="Family Name" 
                value={data.familyMembers?.familyName || ""} 
                onChange={(v) => handleChange("familyMembers.familyName", v)} 
                placeholder="THE GOYAL FAMILY"
              />
            </div>
          </section>

          {/* SECTION: DEVI SHRINE (SECTION 5) */}
          <section className="bg-[#FAF2F5] p-5 sm:p-6 rounded-2xl border border-[#F3C3D2]">
            <h2 className="text-lg font-bold text-[#B8141B] uppercase tracking-wider mb-1 flex items-center gap-2">
              <span>🔔</span> Section 5: Karoli Wali Mata Shrine
            </h2>
            <p className="text-xs text-[#7A4B5B] font-serif mb-4">
              <strong>Recommended Dimensions:</strong> 4:5 Portrait ratio (e.g., <strong>800 × 1000 px</strong> or <strong>1080 × 1350 px</strong>). The photo sits inside the sacred temple arch.
            </p>
            <div className="space-y-4">
              <Input 
                label="Devi Name" 
                value={data.deviName || "KAROLI WALI MATA"} 
                onChange={(v) => handleChange("deviName", v)} 
              />
              <div className="space-y-2">
                <Input 
                  label="Devi Shrine Image URL" 
                  value={data.deviImageUrl || ""} 
                  onChange={(v) => handleChange("deviImageUrl", v)} 
                  placeholder="https://..."
                />
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 bg-[#FFFDF7] text-[#B8141B] px-4 py-2 rounded-xl border border-[#D4AF37]/50 hover:bg-[#FCE6ED] transition-colors cursor-pointer text-xs uppercase font-bold shadow-sm">
                    <ImageIcon className="w-4 h-4 text-[#E65100]" />
                    Upload Mata Image File
                    <input type="file" accept="image/*" onChange={(e) => handleSingleFileUpload(e, "deviImageUrl")} className="hidden" />
                  </label>
                  {data.deviImageUrl && (
                    <button 
                      type="button"
                      onClick={() => handleChange("deviImageUrl", "")}
                      className="text-xs text-red-600 hover:text-red-800 bg-[#FFFDF7] border border-red-200 px-3 py-1.5 rounded-lg font-semibold"
                    >
                      Clear Image
                    </button>
                  )}
                </div>

                {/* Mata Photo Preview */}
                {data.deviImageUrl && (
                  <div className="mt-3 p-3 bg-[#FFFDF7] rounded-xl border border-[#D4AF37]/40 max-w-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A4B5B] block mb-2">
                      Mata Photo Preview (Arch Frame):
                    </span>
                    <div className="w-36 aspect-[4/5] rounded-t-[30px] rounded-b-lg overflow-hidden border-2 border-[#D4AF37]/60 shadow-sm mx-auto bg-[#FFF5F8]">
                      <img 
                        src={data.deviImageUrl} 
                        alt="Devi Shrine Preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION: EVENT DATE & TIME */}
          <section className="bg-[#FAF2F5] p-5 sm:p-6 rounded-2xl border border-[#F3C3D2]">
            <h2 className="text-lg font-bold text-[#B8141B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>📅</span> Section 1 & 6: Event Date & Countdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Countdown Target (ISO format)" 
                value={data.weddingDate} 
                onChange={(v) => handleChange("weddingDate", v)} 
                type="datetime-local" 
              />
              <Input 
                label="Formatted Date" 
                value={data.weddingDateFormatted} 
                onChange={(v) => handleChange("weddingDateFormatted", v)} 
              />
              <Input 
                label="Formatted Time" 
                value={data.weddingTimeFormatted} 
                onChange={(v) => handleChange("weddingTimeFormatted", v)} 
              />
              <Input 
                label="Day of Week" 
                value={data.weddingDayFormatted} 
                onChange={(v) => handleChange("weddingDayFormatted", v)} 
              />
            </div>
          </section>

          {/* SECTION: VENUE */}
          <section className="bg-[#FAF2F5] p-5 sm:p-6 rounded-2xl border border-[#F3C3D2]">
            <h2 className="text-lg font-bold text-[#B8141B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>📍</span> Section 7: Venue
            </h2>
            <div className="space-y-4">
              <Input 
                label="Venue Name" 
                value={data.venue?.name || ""} 
                onChange={(v) => handleChange("venue.name", v)} 
              />
              <Input 
                label="Address Line 1" 
                value={data.venue?.addressLine1 || ""} 
                onChange={(v) => handleChange("venue.addressLine1", v)} 
              />
              <Input 
                label="Address Line 2 (Landmark)" 
                value={data.venue?.addressLine2 || ""} 
                onChange={(v) => handleChange("venue.addressLine2", v)} 
              />
              <Input 
                label="Google Maps URL" 
                value={data.venue?.mapUrl || ""} 
                onChange={(v) => handleChange("venue.mapUrl", v)} 
              />
            </div>
          </section>

          {/* SECTION: CONTACT */}
          <section className="bg-[#FAF2F5] p-5 sm:p-6 rounded-2xl border border-[#F3C3D2]">
            <h2 className="text-lg font-bold text-[#B8141B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>📞</span> Section 9: Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Contact Person Name" 
                value={data.contactPerson?.name || ""} 
                onChange={(v) => handleChange("contactPerson.name", v)} 
              />
              <Input 
                label="Contact Mobile Number" 
                value={data.contactPerson?.phone || ""} 
                onChange={(v) => handleChange("contactPerson.phone", v)} 
              />
            </div>
          </section>

          {/* SECTION: MEDIA */}
          <section className="bg-[#FAF2F5] p-5 sm:p-6 rounded-2xl border border-[#F3C3D2]">
            <h2 className="text-lg font-bold text-[#B8141B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>🎬</span> Opening & Background Media
            </h2>
            <div className="space-y-4">
              <Input 
                label="Opening Thumbnail URL (Optional popup before entry)" 
                value={data.openingThumbnailUrl || ""} 
                onChange={(v) => handleChange("openingThumbnailUrl", v)} 
                placeholder="https://..."
              />
              <Input 
                label="Opening Video URL (Optional video before entry)" 
                value={data.openingVideoUrl || ""} 
                onChange={(v) => handleChange("openingVideoUrl", v)} 
              />
              <Input 
                label="Hero Video URL (Optional video replacement for hero)" 
                value={data.heroVideoUrl || ""} 
                onChange={(v) => handleChange("heroVideoUrl", v)} 
              />
              <Input 
                label="Devotional Music MP3 URL" 
                value={data.musicUrl || ""} 
                onChange={(v) => handleChange("musicUrl", v)} 
              />
            </div>
          </section>

          {/* SECTION: TEXT & MESSAGES */}
          <section className="bg-[#FAF2F5] p-5 sm:p-6 rounded-2xl border border-[#F3C3D2]">
            <h2 className="text-lg font-bold text-[#B8141B] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>✍️</span> Messages & Blessings
            </h2>
            <div className="space-y-4">
              <TextArea 
                label="Invitation Message" 
                value={data.invitationMessage || ""} 
                onChange={(v) => handleChange("invitationMessage", v)} 
              />
              <TextArea 
                label="Closing Message" 
                value={data.closingMessage || ""} 
                onChange={(v) => handleChange("closingMessage", v)} 
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-wider text-[#B8141B]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#FFFDF7] border border-[#F3C3D2] rounded-xl px-4 py-2.5 text-sm text-[#3C1B26] focus:outline-none focus:border-[#B8141B] focus:ring-1 focus:ring-[#B8141B] transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-wider text-[#B8141B]">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-[#FFFDF7] border border-[#F3C3D2] rounded-xl px-4 py-2.5 text-sm text-[#3C1B26] focus:outline-none focus:border-[#B8141B] focus:ring-1 focus:ring-[#B8141B] transition-colors resize-none"
      />
    </div>
  );
}
