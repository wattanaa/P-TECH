/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import CurriculumView from "./components/CurriculumView";
import NewsView from "./components/NewsView";
import AdmissionView from "./components/AdmissionView";
import AboutView from "./components/AboutView";
import AdminView from "./components/AdminView";
import ContactView from "./components/ContactView";
import { NewsItem } from "./types";


export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [aboutSection, setAboutSection] = useState<string>("");
  
  // High-performance inter-tab link triggers (e.g. from majors to admissions)
  const [preSelectedMajor, setPreSelectedMajor] = useState<string>("");
  const [preSelectedLevel, setPreSelectedLevel] = useState<"ปวช." | "ปวส." | "">("");

  // Auto scroll to top when page changes
  useEffect(() => {
    // Only scroll to top if we're not targeting a sub-section in About view
    if (activeTab !== "about" || !aboutSection) {
      window.scrollTo(0, 0);
    }
  }, [activeTab, aboutSection]);

  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            setSelectedNews={setSelectedNews} 
          />
        );
      case "curriculum":
        return (
          <CurriculumView 
            setActiveTab={setActiveTab}
            setPreSelectedMajor={setPreSelectedMajor}
            setPreSelectedLevel={setPreSelectedLevel}
          />
        );
      case "news":
        return (
          <NewsView 
            selectedNews={selectedNews} 
            setSelectedNews={setSelectedNews} 
          />
        );
      case "admission":
        return (
          <AdmissionView 
            preSelectedMajor={preSelectedMajor}
            preSelectedLevel={preSelectedLevel}
            setPreSelectedMajor={setPreSelectedMajor}
            setPreSelectedLevel={setPreSelectedLevel}
          />
        );
      case "about":
        return (
          <AboutView 
            initialSection={aboutSection} 
            setInitialSection={setAboutSection} 
          />
        );
      case "contact":
        return <ContactView />;
      case "admin":
        return <AdminView />;
      default:
        return <HomeView setActiveTab={setActiveTab} setSelectedNews={setSelectedNews} />;
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50" id="app-root">
      {/* Dynamic top navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setAboutSection={setAboutSection} 
      />

      {/* Main page stage */}
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

      {/* Structured footer with links */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
