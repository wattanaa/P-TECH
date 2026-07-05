/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import CurriculumView from "./components/CurriculumView";
import NewsView from "./components/NewsView";
import AdmissionView from "./components/AdmissionView";
import HistoryView from "./components/HistoryView";
import PersonnelView from "./components/PersonnelView";
import AdminView from "./components/AdminView";
import ContactView from "./components/ContactView";
import AcademicCalendar from "./components/AcademicCalendar";
import { useData } from "./context/DataContext";
import { ArrowUp, X } from "lucide-react";

export default function App() {
  const { collegeInfo, t } = useData() || {};
  const [activeTab, setActiveTab] = useState("home");
  const [selectedNews, setSelectedNews] = useState(null);
  const [aboutSection, setAboutSection] = useState("");
  const [preSelectedMajor, setPreSelectedMajor] = useState("");
  const [preSelectedLevel, setPreSelectedLevel] = useState("");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll height to show Back to Top button when scrolling past threshold
  useEffect(() => {
    const handleScroll = () => {
      // 300px corresponds to scrolling down a short distance on any view
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle global image clicks for Lightbox effect
  useEffect(() => {
    const handleImageClick = (e) => {
      const target = e.target;
      if (target.tagName === "IMG") {
        // Exclude UI/layout specific image elements from lightbox zoom
        const isNavbar = target.closest("nav") || target.closest("#navbar");
        const isFooterLogo = target.closest("footer") && (target.src.includes("logo") || target.classList.contains("h-8") || target.classList.contains("h-10"));
        const isNoLightbox = target.classList.contains("no-lightbox") || target.closest(".no-lightbox");
        const isTiny = target.naturalWidth < 60 || target.naturalHeight < 60 || target.clientWidth < 60 || target.clientHeight < 60;
        
        // Exclude list card thumbnail clicks where the card click is the primary navigation
        const isInsideClickableCard = target.closest(".cursor-pointer:not(img)") || target.closest("a") || target.closest("button");
        
        // Exclude admin preview form fields
        const isAdminFormPreview = target.closest("form") && target.closest(".bg-slate-50") && target.closest(".border");
        
        if (isNavbar || isFooterLogo || isNoLightbox || isTiny || (isInsideClickableCard && !target.classList.contains("force-lightbox")) || isAdminFormPreview) {
          return;
        }

        setLightboxImage({
          src: target.src,
          alt: target.alt || "รูปภาพขยาย"
        });
      }
    };

    document.addEventListener("click", handleImageClick);
    return () => document.removeEventListener("click", handleImageClick);
  }, []);

  // Close lightbox with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };
    if (lightboxImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  // Listen to cross-component tab change requests
  useEffect(() => {
    const handleTabChange = (e) => {
      if (e.detail) {
        setActiveTab(e.detail);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("changeTab", handleTabChange);
    return () => window.removeEventListener("changeTab", handleTabChange);
  }, []);

  // Dynamic SEO Optimizer
  useEffect(() => {
    let title = collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์";
    let desc = collegeInfo?.vision || "ระบบสารสนเทศและการรับสมัครออนไลน์ วิทยาลัยเทคโนโลยีปทุมรัตต์ จังหวัดร้อยเอ็ด";
    let keywords = "วิทยาลัยเทคโนโลยีปทุมรัตต์, สมัครเรียน, ปวช, ปวส, เทคโนโลยี";
    let image = collegeInfo?.logoUrl || "/logo.png";

    // Load custom SEO defaults if they exist
    if (collegeInfo?.seoTitle) title = collegeInfo.seoTitle;
    if (collegeInfo?.seoDescription) desc = collegeInfo.seoDescription;
    if (collegeInfo?.seoKeywords) keywords = collegeInfo.seoKeywords;
    if (collegeInfo?.seoOgImage) image = collegeInfo.seoOgImage;

    // View-specific SEO overrides
    if (activeTab === "home") {
      title = collegeInfo?.seoTitle || `${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"} | ${collegeInfo?.philosophy || "ทักษะเยี่ยม เปี่ยมคุณธรรม"}`;
    } else if (activeTab === "curriculum") {
      title = `หลักสูตรที่เปิดสอน | ${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}`;
      desc = `ทำความรู้จักกับสาขาวิชาหลักสูตรเด่น ได้แก่ ช่างยนต์, ช่างไฟฟ้ากำลัง, เทคโนโลยีสารสนเทศ และการบัญชี ของวิทยาลัยเทคโนโลยีปทุมรัตต์`;
    } else if (activeTab === "news") {
      if (selectedNews) {
        title = `${selectedNews.title} | ข่าวสารและกิจกรรม | ${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}`;
        desc = selectedNews.excerpt || selectedNews.content?.slice(0, 150) + "..." || desc;
        image = selectedNews.imageUrl || image;
      } else {
        title = `ข่าวสารและกิจกรรมประกาศ | ${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}`;
        desc = `ศูนย์ข้อมูลข่าวสาร กิจกรรมเพื่อนักเรียน และประกาศทางการของวิทยาลัยเทคโนโลยีปทุมรัตต์`;
      }
    } else if (activeTab === "calendar") {
      title = `ปฏิทินการศึกษาและกิจกรรม | ${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}`;
      desc = `ติดตามกำหนดการเรียนการสอน กำหนดการรับสมัคร และกิจกรรมสร้างสรรค์ตลอดปีการศึกษา ของวิทยาลัยเทคโนโลยีปทุมรัตต์`;
    } else if (activeTab === "admission") {
      title = `ระบบผู้สมัครเรียนออนไลน์ | ${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}`;
      desc = `ระบบรับสมัครเรียนออนไลน์สำหรับนักเรียนใหม่ ประจำปีการศึกษาปัจจุบัน สะดวกรวดเร็วและปลอดภัย`;
    } else if (activeTab === "history") {
      title = `ประวัติความเป็นมาและวิสัยทัศน์ | ${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}`;
      desc = `ปรัชญา ค่านิยม และประวัติความเป็นมาอย่างยาวนานของวิทยาลัยเทคโนโลยีปทุมรัตต์`;
    } else if (activeTab === "personnel") {
      title = `บุคลากรสถานศึกษาและคณะผู้บริหาร | ${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}`;
      desc = `ทำเนียบคณะผู้บริหาร คณาจารย์ผู้สอน และเจ้าหน้าที่สายสนับสนุนของวิทยาลัยเทคโนโลยีปทุมรัตต์`;
    } else if (activeTab === "contact") {
      title = `ติดต่อเราและฝ่ายงาน | ${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}`;
      desc = `ช่องทางการติดต่อวิทยาลัยเทคโนโลยีปทุมรัตต์ เช่น เบอร์โทรศัพท์ อีเมล แฟนเพจ และแผนที่นำทาง`;
    } else if (activeTab === "admin") {
      title = `ระบบบริหารงานหลังบ้าน Portal (CMS) | ${collegeInfo?.name || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}`;
      desc = `พอร์ทัลความปลอดภัยของเจ้าหน้าที่บริหารสำหรับเข้าควบคุมและอัพเดทข้อมูลสารสนเทศวิทยาลัย`;
    }

    // Set Document Title
    document.title = title;

    // Helper to inject/update meta tags in document head
    const setMetaTag = (name, val, isProperty = false) => {
      if (!val) return;
      const attr = isProperty ? "property" : "name";
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", val);
    };

    setMetaTag("description", desc);
    setMetaTag("keywords", keywords);
    setMetaTag("robots", "index, follow");

    // Open Graph
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", desc, true);
    setMetaTag("og:image", image, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:url", window.location.href, true);

    // Twitter Cards
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", desc);
    setMetaTag("twitter:image", image);
  }, [activeTab, selectedNews, collegeInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return <HomeView
          setActiveTab={setActiveTab}
          setSelectedNews={setSelectedNews}
        />;
      case "curriculum":
        return <CurriculumView
          setActiveTab={setActiveTab}
          setPreSelectedMajor={setPreSelectedMajor}
          setPreSelectedLevel={setPreSelectedLevel}
        />;
      case "news":
        return <NewsView
          selectedNews={selectedNews}
          setSelectedNews={setSelectedNews}
        />;
      case "calendar":
        return <AcademicCalendar />;
      case "admission":
        return <AdmissionView
          preSelectedMajor={preSelectedMajor}
          preSelectedLevel={preSelectedLevel}
          setPreSelectedMajor={setPreSelectedMajor}
          setPreSelectedLevel={setPreSelectedLevel}
        />;
      case "history":
        return <HistoryView />;
      case "personnel":
        return <PersonnelView />;
      case "contact":
        return <ContactView />;
      case "admin":
        return <AdminView />;
      default:
        return <HomeView setActiveTab={setActiveTab} setSelectedNews={setSelectedNews} />;
    }
  };
  return <div className="min-h-screen flex flex-col bg-slate-50/50" id="app-root">
      {
    /* Dynamic top navigation */
  }
      <Navbar
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    setAboutSection={setAboutSection}
  />

      {
    /* Main page stage */
  }
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {
    /* Structured footer with links */
  }
      <Footer setActiveTab={setActiveTab} />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-[9990] bg-brand-primary hover:bg-brand-accent text-white p-3.5 rounded-full shadow-lg hover:shadow-xl border border-blue-400/20 flex items-center justify-center transition-all focus:outline-none cursor-pointer"
            title={t ? t("เลื่อนขึ้นบนสุด", "Back to top") : "เลื่อนขึ้นบนสุด"}
            id="back-to-top-btn"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 cursor-zoom-out"
            id="lightbox-overlay"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-white/10 hover:bg-white/20 hover:scale-105 p-3 rounded-full transition-all duration-150 backdrop-blur-md flex items-center justify-center border border-white/15 cursor-pointer z-50"
              title="ปิด"
              id="lightbox-close-btn"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Expanded Image Container */}
            <div className="relative max-w-[95vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                initial={{ scale: 0.95, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 10, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 320 }}
                className="max-w-full max-h-[75vh] md:max-h-[80vh] rounded-2xl object-contain shadow-2xl border border-white/10 select-none cursor-default"
                referrerPolicy="no-referrer"
                id="lightbox-img"
              />
              
              {/* Floating Caption */}
              {lightboxImage.alt && (
                <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs md:text-sm font-bold py-2.5 px-5 rounded-2xl border border-white/10 shadow-lg text-center backdrop-blur-md max-w-[85vw] whitespace-nowrap overflow-hidden text-ellipsis transition-all">
                  {lightboxImage.alt}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>;
}
