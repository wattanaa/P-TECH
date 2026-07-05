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
import { useData } from "./context/DataContext";

export default function App() {
  const { collegeInfo } = useData() || {};
  const [activeTab, setActiveTab] = useState("home");
  const [selectedNews, setSelectedNews] = useState(null);
  const [aboutSection, setAboutSection] = useState("");
  const [preSelectedMajor, setPreSelectedMajor] = useState("");
  const [preSelectedLevel, setPreSelectedLevel] = useState("");

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
    </div>;
}
