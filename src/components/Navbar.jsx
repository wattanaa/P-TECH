/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";
import { useData } from "../context/DataContext";
import CollegeLogo from "./CollegeLogo";
export default function Navbar({ activeTab, setActiveTab, setAboutSection }) {
  const { collegeInfo, navbarMenus } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  const menuItems = navbarMenus && navbarMenus.length > 0 ? navbarMenus : [
    { id: "home", label: "หน้าแรก", targetTab: "home" },
    { id: "curriculum", label: "หลักสูตรที่เปิดสอน", targetTab: "curriculum" },
    { id: "news", label: "ข่าวสารและกิจกรรม", targetTab: "news" },
    { id: "contact", label: "ติดต่อเรา", targetTab: "contact" }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
    setIsDropdownOpen(false);
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
              <span>ติดต่อฝ่ายรับสมัคร: {collegeInfo.phone}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>อ.ปทุมรัตต์ จ.ร้อยเอ็ด</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 px-2.5 py-0.5 rounded text-[10px] font-medium tracking-wide animate-pulse">
              เปิดรับสมัครปี 2570
            </span>
            <span className="text-slate-300">ปวช. - ปวส. เรียนต่อสายอาชีพอนาคตไกล</span>
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
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-brand-secondary leading-tight">
                {collegeInfo.name}
              </h1>
              <p className="text-[10px] md:text-xs font-semibold text-brand-accent tracking-wide uppercase">
                {collegeInfo.englishName}
              </p>
            </div>
          </div>

          {
    /* Desktop Navigation */
  }
          <div className="hidden lg:flex items-center space-x-1" id="desktop-menu">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.targetTab || item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === (item.targetTab || item.id)
                    ? "text-brand-primary font-bold"
                    : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {activeTab === (item.targetTab || item.id) && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {
    /* เกี่ยวกับเรา Dropdown with mouse enter/leave hover action */
  }
            <div
    className="relative"
    onMouseEnter={() => setIsDropdownOpen(true)}
    onMouseLeave={() => setIsDropdownOpen(false)}
  >
              <button
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${activeTab === "about" ? "text-brand-primary font-bold" : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"}`}
    id="nav-about-dropdown-trigger"
  >
                <span>เกี่ยวกับเรา</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                {activeTab === "about" && <motion.div
    layoutId="activeTabIndicator"
    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-primary rounded-full"
    transition={{ type: "spring", stiffness: 380, damping: 30 }}
  />}
              </button>

              <AnimatePresence>
                {isDropdownOpen && <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    transition={{ duration: 0.15 }}
    className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 overflow-hidden"
    id="nav-about-dropdown-menu"
  >
                    {[
    { label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E2A\u0E16\u0E32\u0E19\u0E28\u0E36\u0E01\u0E29\u0E32", sectionId: "section-administration" },
    { label: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E21\u0E32", sectionId: "section-college-history" }
  ].map((subItem, index) => <button
    key={index}
    onClick={() => {
      if (setAboutSection) {
        setAboutSection(subItem.sectionId);
      }
      handleNavClick("about");
      setIsDropdownOpen(false);
    }}
    className="w-full text-left px-5 py-3 text-xs text-slate-700 hover:text-brand-primary hover:bg-slate-50 flex items-center space-x-2.5 transition-all duration-150 font-semibold border-b border-slate-50 last:border-b-0"
  >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                        <span>{subItem.label}</span>
                      </button>)}
                  </motion.div>}
              </AnimatePresence>
            </div>



            <button
    onClick={() => handleNavClick("admission")}
    className="ml-4 bg-brand-primary hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200"
    id="cta-admission"
  >
              สมัครเรียนออนไลน์
            </button>
          </div>

          {
    /* Mobile Menu Button */
  }
          <div className="lg:hidden">
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
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.targetTab || item.id)}
                  className={`w-full text-left block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeTab === (item.targetTab || item.id)
                      ? "bg-blue-50 text-brand-primary font-bold border-l-4 border-brand-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {
    /* Mobile เกี่ยวกับเรา Dropdown Accordion */
  }
              <div className="space-y-1">
                <button
    onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
    className={`w-full text-left flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${activeTab === "about" ? "bg-blue-50 text-brand-primary font-bold border-l-4 border-brand-primary" : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"}`}
  >
                  <span>เกี่ยวกับเรา</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileAboutOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isMobileAboutOpen && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="pl-6 space-y-1 overflow-hidden"
  >
                      {[
    { label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E2A\u0E16\u0E32\u0E19\u0E28\u0E36\u0E01\u0E29\u0E32", sectionId: "section-administration" },
    { label: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E21\u0E32", sectionId: "section-college-history" }
  ].map((subItem, index) => <button
    key={index}
    onClick={() => {
      if (setAboutSection) {
        setAboutSection(subItem.sectionId);
      }
      handleNavClick("about");
    }}
    className="w-full text-left block px-4 py-2.5 text-sm text-slate-500 hover:text-brand-primary hover:bg-slate-50 rounded-lg font-medium transition-all duration-150"
  >
                          • {subItem.label}
                        </button>)}
                    </motion.div>}
                </AnimatePresence>
              </div>



              <div className="pt-4 px-4">
                <button
    onClick={() => handleNavClick("admission")}
    className="w-full bg-brand-primary hover:bg-blue-800 text-white text-center py-3 rounded-lg font-bold shadow-md transition-colors"
  >
                  สมัครเรียนออนไลน์ทันที
                </button>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}
