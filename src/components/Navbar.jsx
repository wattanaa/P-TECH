/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";
import { useData } from "../context/DataContext";
import CollegeLogo from "./CollegeLogo";

export default function Navbar({ activeTab, setActiveTab }) {
  const { collegeInfo, currentLang, changeLanguage, t } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  const menuItems = [
    { id: "home", label: t("หน้าแรก", "Home"), targetTab: "home" },
    { id: "curriculum", label: t("หลักสูตรที่เปิดสอน", "Curriculum"), targetTab: "curriculum" },
    { id: "news", label: t("ข่าวสารและกิจกรรม", "News & Events"), targetTab: "news" },
    { id: "calendar", label: t("ปฏิทินการศึกษา", "Academic Calendar"), targetTab: "calendar" },
    { id: "contact", label: t("ติดต่อเรา", "Contact Us"), targetTab: "contact" }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm" id="main-header">
      {
    /* Top Bar for urgent contacts */
  }
      <div className="bg-brand-secondary text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t("ติดต่อฝ่ายรับสมัคร: ", "Admission Hotline: ")}{collegeInfo.phone}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t("อ.ปทุมรัตต์ จ.ร้อยเอ็ด", "Pathumrat, Roi Et")}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 px-2.5 py-0.5 rounded text-[10px] font-medium tracking-wide animate-pulse">
              {t("เปิดรับสมัครปี 2570", "Admission 2027 Open")}
            </span>
            <span className="text-slate-300">{t("ปวช. - ปวส. เรียนต่อสายอาชีพอนาคตไกล", "Vocational & High-Vocational Degrees")}</span>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {
    /* Logo Brand area */
  }
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick("home")}
            id="brand-logo"
          >
            <CollegeLogo size={48} className="group-hover:scale-105 transition-transform duration-200 shrink-0" />
            <div>
              <h1 className="text-base md:text-lg font-bold tracking-tight text-brand-secondary leading-tight">
                {t(collegeInfo.name, collegeInfo.englishName)}
              </h1>
              <p className="text-[9px] md:text-[10px] font-semibold text-brand-accent tracking-wide uppercase">
                {t("วิทยาลัยเทคโนโลยีปทุมรัตต์", "Pathumrat Technology College (PTC)")}
              </p>
            </div>
          </div>

          {
    /* Desktop Navigation */
  }
          <div className="hidden lg:flex items-center space-x-1" id="desktop-menu">
            {/* Home Link */}
            <button
              onClick={() => handleNavClick("home")}
              className={`relative px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center space-x-1 cursor-pointer ${
                activeTab === "home"
                  ? "text-brand-primary font-extrabold"
                  : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
              }`}
              id="nav-home"
            >
              <span>{t("หน้าแรก", "Home")}</span>
              {activeTab === "home" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* Other menu items (Curriculum, News, Contact) */}
            {menuItems.filter(item => item.id !== "home").map((item) => {
              const isSelected = activeTab === (item.targetTab || item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.targetTab || item.id)}
                  className={`relative px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center space-x-1 ${
                    isSelected
                      ? "text-brand-primary font-extrabold"
                      : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
                  }`}
                  id={`nav-${item.id}`}
                >
                  <span>{item.label}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* About us Dropdown (now placed after other menu items) */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`relative px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center space-x-1 cursor-pointer ${
                  activeTab === "history" || activeTab === "personnel"
                    ? "text-brand-primary font-extrabold"
                    : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
                }`}
                id="nav-about-dropdown"
              >
                <span>{t("เกี่ยวกับเรา", "About Us")}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                {(activeTab === "history" || activeTab === "personnel") && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-1 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        handleNavClick("history");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold flex items-center space-x-2 transition-colors duration-150 border-b border-slate-50 cursor-pointer ${
                        activeTab === "history" ? "text-brand-primary bg-blue-50/50" : "text-slate-700 hover:text-brand-primary hover:bg-slate-50"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{t("ประวัติความเป็นมา", "History")}</span>
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick("personnel");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold flex items-center space-x-2 transition-colors duration-150 cursor-pointer ${
                        activeTab === "personnel" ? "text-brand-primary bg-blue-50/50" : "text-slate-700 hover:text-brand-primary hover:bg-slate-50"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{t("บุคลากรสถานศึกษา", "Our Personnel")}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 ml-4 h-8 select-none">
              <button
                onClick={() => changeLanguage("th")}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all h-full flex items-center cursor-pointer ${
                  currentLang === "th"
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                TH
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all h-full flex items-center cursor-pointer ${
                  currentLang === "en"
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => handleNavClick("admission")}
              className="ml-4 bg-brand-primary hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
              id="cta-admission"
            >
              {t("สมัครเรียนออนไลน์", "Apply Online")}
            </button>
          </div>

          {
    /* Mobile Menu Button */
  }
          {/* Mobile Menu & Switcher Area */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Language Switcher */}
            <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 h-7 select-none">
              <button
                onClick={() => changeLanguage("th")}
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all h-full flex items-center cursor-pointer ${
                  currentLang === "th"
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                TH
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all h-full flex items-center cursor-pointer ${
                  currentLang === "en"
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-brand-primary hover:bg-slate-50 focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {
    /* Mobile Drawer */
  }
      <AnimatePresence>
        {isOpen && <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="lg:hidden border-t border-slate-100 bg-white"
          id="mobile-drawer"
        >
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6 text-xs">
            {/* Home */}
            <button
              onClick={() => handleNavClick("home")}
              className={`w-full text-left flex items-center space-x-2 px-4 py-3 rounded-lg font-bold transition-colors ${
                activeTab === "home"
                  ? "bg-blue-50 text-brand-primary border-l-4 border-brand-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
              }`}
            >
              <span>{t("หน้าแรก", "Home")}</span>
            </button>

            {/* Other Mobile menu items */}
            {menuItems.filter(item => item.id !== "home").map((item) => {
              const isSelected = activeTab === (item.targetTab || item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.targetTab || item.id)}
                  className={`w-full text-left flex items-center space-x-2 px-4 py-3 rounded-lg font-bold transition-colors ${
                    isSelected
                      ? "bg-blue-50 text-brand-primary border-l-4 border-brand-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* About us Accordion (now after other menu items) */}
            <div className="space-y-1">
              <button
                onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                className={`w-full text-left flex justify-between items-center px-4 py-3 rounded-lg font-bold transition-colors cursor-pointer ${
                  activeTab === "history" || activeTab === "personnel"
                    ? "bg-blue-50 text-brand-primary border-l-4 border-brand-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                }`}
              >
                <span>{t("เกี่ยวกับเรา", "About Us")}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileAboutOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isMobileAboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 space-y-1 overflow-hidden"
                  >
                    <button
                      onClick={() => handleNavClick("history")}
                      className={`w-full text-left block px-4 py-2.5 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                        activeTab === "history" ? "text-brand-primary bg-slate-50" : "text-slate-500 hover:text-brand-primary hover:bg-slate-50"
                      }`}
                    >
                      • {t("ประวัติความเป็นมา", "History")}
                    </button>
                    <button
                      onClick={() => handleNavClick("personnel")}
                      className={`w-full text-left block px-4 py-2.5 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                        activeTab === "personnel" ? "text-brand-primary bg-slate-50" : "text-slate-500 hover:text-brand-primary hover:bg-slate-50"
                      }`}
                    >
                      • {t("บุคลากรสถานศึกษา", "Our Personnel")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4 px-4">
              <button
                onClick={() => handleNavClick("admission")}
                className="w-full bg-brand-primary hover:bg-blue-800 text-white text-center py-3 rounded-lg font-bold shadow-md transition-colors cursor-pointer"
              >
                {t("สมัครเรียนออนไลน์ทันที", "Apply Online Now")}
              </button>
            </div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </header>;
}
