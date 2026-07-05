/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Eye,
  Search,
  ArrowLeft,
  Share2,
  BookOpen,
  ChevronRight,
  AlertCircle,
  X
} from "lucide-react";
import { useData } from "../context/DataContext";

export default function NewsView({ selectedNews, setSelectedNews }) {
  const { newsData, dbSettings, isLoading, t, currentLang } = useData();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [localNewsList, setLocalNewsList] = useState(newsData);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    setLocalNewsList(newsData);
  }, [newsData]);

  useEffect(() => {
    setVisibleCount(3);
  }, [activeCategoryFilter, searchQuery, sortBy]);

  // Helper mappings for English content
  const getNewsTranslated = (news) => {
    if (!news) return { title: "", excerpt: "", content: "" };
    if (currentLang === "th") return { title: news.title, excerpt: news.excerpt, content: news.content };
    
    if (news.title.includes("โควตาพิเศษ") || news.title.includes("รับสมัคร")) {
      return {
        title: "Special Academic Quota Registration Open for Term 1/2027",
        excerpt: "Pathumrat Technology College is opening quota seat applications for school graduates to register across our engineering and business tracks.",
        content: "Pathumrat Technology College announces the official commencement of special quota applications for the 1/2027 academic term.\n\nCandidates completing Lower Secondary (M.3) can apply for Vocational Certificates (Voc. Cert.) while Upper Secondary (M.6) and Voc. Cert. graduates are eligible for High Vocational Diplomas (High Voc. Cert.). Eligible students receive significant tuition waivers, free textbooks, and physical education uniforms upon reporting on time.\n\nRequired Application Papers:\n1. 3 Copies of a 1-inch portrait photo.\n2. 2 Copies of educational transcript.\n3. 1 Copy of Student and Parent Home Registration.\n\nHow to Apply:\nSimply click on the 'Apply Online' menu above, fill in your profile, select your desired major, and print your registration ticket."
      };
    }
    if (news.title.includes("เทคโนโลยีการขับเคลื่อน") || news.title.includes("สัมมนา")) {
      return {
        title: "Seminar: Next-Gen Electric Vehicle Drive Technologies & Automation",
        excerpt: "Faculty of Automotive Mechanics hosts a collaborative technical workshop with regional EV industries.",
        content: "The Department of Automotive Mechanics at Pathumrat Technology College hosted an academic seminar on next-generation electric vehicle powertrains, high-voltage battery safety, and electronic diagnostics.\n\nOver 200 automotive students participated in hands-on workshops featuring modern diagnostic scanners and EV test platforms sponsored by cooperative regional auto industries.\n\nOur college director noted, 'Integrating modern electric propulsion and diagnostic labs ensures our students graduate with industry-level competencies.'"
      };
    }
    if (news.title.includes("ต้อนรับผู้ประเมิน") || news.title.includes("ประกันคุณภาพ")) {
      return {
        title: "Successful External Quality Assurance Assessment Visit",
        excerpt: "The academic standards committee praises PTC's laboratory safety and practical curricula.",
        content: "On June 25th, the External Quality Assurance Assessment Committee conducted an official inspection visit of Pathumrat Technology College.\n\nThe committee audited academic documentation, evaluated classroom methodologies, and inspected lab environments across our electronics, automotive, and IT workshops.\n\nFeedback highlights praised PTC's adherence to practical-first training models, high instructor-to-student support ratios, and pristine machinery maintenance, certifying PTC with exemplary standards."
      };
    }
    return { title: news.title, excerpt: news.excerpt, content: news.content };
  };

  const getCategoryLabel = (cat) => {
    if (currentLang === "th") return cat;
    switch (cat) {
      case "ทั้งหมด": return "All News";
      case "ข่าวประชาสัมพันธ์": return "Public Relations";
      case "ข่าววิชาการ": return "Academics";
      case "ข่าวกิจกรรม": return "Activities";
      case "ข่าวจัดซื้อจัดจ้าง": return "Procurements";
      default: return cat;
    }
  };

  const filteredNews = useMemo(() => {
    const list = (localNewsList || []).filter((news) => {
      if (!news) return false;
      const matchesCategory = activeCategoryFilter === "ทั้งหมด" || news.category === activeCategoryFilter;
      const translated = getNewsTranslated(news);
      const titleText = String(translated.title || "").toLowerCase();
      const excerptText = String(translated.excerpt || "").toLowerCase();
      const contentText = String(translated.content || "").toLowerCase();
      const query = String(searchQuery || "").toLowerCase();
      const matchesSearch = titleText.includes(query) || excerptText.includes(query) || contentText.includes(query);
      return matchesCategory && matchesSearch;
    });

    return [...list].sort((a, b) => {
      if (sortBy === "newest") {
        const timeA = new Date(a.date || a.submittedAt || 0).getTime();
        const timeB = new Date(b.date || b.submittedAt || 0).getTime();
        return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
      } else if (sortBy === "oldest") {
        const timeA = new Date(a.date || a.submittedAt || 0).getTime();
        const timeB = new Date(b.date || b.submittedAt || 0).getTime();
        return (isNaN(timeA) ? 0 : timeA) - (isNaN(timeB) ? 0 : timeB);
      } else if (sortBy === "popular") {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });
  }, [activeCategoryFilter, searchQuery, localNewsList, sortBy, currentLang]);

  const calculateReadingTime = (text) => {
    if (!text) return `1 ${t("นาที", "min")}`;
    const totalChars = text.length;
    const isThai = /[\u0E00-\u0E7F]/.test(text);
    const speed = isThai ? 300 : 900;
    const minutes = Math.max(1, Math.ceil(totalChars / speed));
    return `${minutes} ${t("นาทีในการอ่าน", "min read")}`;
  };

  const handleLoadMore = () => {
    setIsFetchingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, filteredNews.length));
      setIsFetchingMore(false);
    }, 600);
  };

  const handleReadNews = (news) => {
    setLocalNewsList(
      (prevList) => prevList.map(
        (item) => item.id === news.id ? { ...item, views: item.views + 1 } : item
      )
    );
    setSelectedNews({ ...news, views: news.views + 1 });
  };

  const handleShare = (news) => {
    const translated = getNewsTranslated(news);
    if (navigator.share) {
      navigator.share({
        title: translated.title,
        text: translated.excerpt,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert(`${t("คัดลอกลิงก์ข่าวสารเรียบร้อย: ", "Copied link to: ")} ${translated.title}`);
    }
  };

  const categories = [
    "ทั้งหมด",
    "ข่าวประชาสัมพันธ์",
    "ข่าววิชาการ",
    "ข่าวกิจกรรม",
    "ข่าวจัดซื้อจัดจ้าง"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans" id="news-view">
      <div className="space-y-8">
        {/* Header description */}
        <div className="text-center max-w-3xl mx-auto space-y-3 flex flex-col items-center">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              {t("ข่าวสารและประกาศสำคัญ", "News & Bulletins")}
            </span>
            {dbSettings?.type === "firestore" ? (
              <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{t("เชื่อมต่อกับ Cloud Firestore (เรียลไทม์)", "Connected to Cloud Firestore (Real-time)")}</span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-1.5 bg-amber-50 text-amber-700 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-100 shadow-sm">
                <span>{t("ข้อมูลจำลองแบบ Local", "Mock Data (Local)")}</span>
              </div>
            )}
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-brand-secondary tracking-tight w-full font-display">
            {t("ศูนย์ข่าวสารและกิจกรรม วิทยาลัยเทคโนโลยีปทุมรัตต์", "Pathumrat Technology College Information & News Center")}
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            {t("เกาะติดข่าวรับสมัครงาน ทุนการศึกษา กิจกรรมเด่นรอบสัปดาห์ และเอกสารประกาศจัดซื้อจัดจ้างได้ตลอด 24 ชั่วโมง", "Stay updated 24/7 with our recruitment notices, scholarship packages, weekly activities, and procurement listings.")}
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col space-y-4">
          {/* Scrollable Categories List */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${activeCategoryFilter === cat ? "bg-brand-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"}`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Search and Sort box row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2.5 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 shrink-0">{t("จัดเรียงตาม:", "Sort by:")}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer font-semibold text-slate-700 shadow-xs"
              >
                <option value="newest">{t("ข่าวล่าสุด (Newest)", "Newest Articles")}</option>
                <option value="oldest">{t("ข่าวเก่าที่สุด (Oldest)", "Oldest Articles")}</option>
                <option value="popular">{t("ยอดเข้าชมสูงสุด (Most Popular)", "Most Popular")}</option>
              </select>
            </div>

            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("พิมพ์ชื่อเรื่องข่าว หรือคีย์เวิร์ดเพื่อค้นหา...", "Type keywords or article title to search...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* News items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="news-grid">
          {filteredNews.slice(0, visibleCount).map((news) => {
            const translated = getNewsTranslated(news);
            return (
              <article
                key={news.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-slate-300 transition-all duration-300 ease-out cursor-pointer flex flex-col h-full group"
                onClick={() => handleReadNews(news)}
              >
                {/* Image wrapper */}
                <div className="relative h-48 bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={news.imageUrl}
                    alt={translated.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">
                      {getCategoryLabel(news.category)}
                    </span>
                  </div>
                </div>

                {/* Core info wrapper */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{news.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t("ชม", "Views:")} {news.views} {t("ครั้ง", "times")}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-slate-500 font-semibold">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{calculateReadingTime(translated.content)}</span>
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                      {translated.title}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                      {translated.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                    <span>{t("อ่านรายละเอียดข่าวเพิ่มเติม", "Read Full Article")}</span>
                    <ChevronRight className="w-4 h-4 ml-0.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty filter results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
            <div>
              <h3 className="text-base font-bold text-slate-700">{t("ไม่พบหัวข้อข่าวสารในหมวดหมู่นี้", "No news items found in this category")}</h3>
              <p className="text-slate-400 text-xs">{t("คุณสามารถพิมพ์คำค้นหาอื่น หรือย้อนกลับไปดูข่าวสาร \"ทั้งหมด\"", "Try adjusting your search criteria or toggling other categories.")}</p>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredNews.length && (
          <div className="flex justify-center mt-12 mb-6" id="load-more-container">
            <button
              onClick={handleLoadMore}
              disabled={isFetchingMore}
              className="inline-flex items-center space-x-2 bg-brand-primary hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer disabled:cursor-not-allowed"
              id="load-more-btn"
            >
              {isFetchingMore ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{t("กำลังโหลด...", "Loading...")}</span>
                </>
              ) : (
                <>
                  <span>{t("โหลดข้อมูลข่าวสารเพิ่มเติม", "Load More News")}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ARTICLE FULL CONTENT MODAL POPUP */}
      <AnimatePresence>
        {selectedNews && (
          <div 
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md" 
            id="news-modal-overlay" 
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200"
              onClick={(e) => e.stopPropagation()}
              id="news-modal-content"
            >
              {/* Header Image */}
              <div className="relative h-64 md:h-80 bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={selectedNews.imageUrl}
                  alt={getNewsTranslated(selectedNews).title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating Close Button */}
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900 text-white p-2.5 rounded-full backdrop-blur-xs transition-colors shadow-lg cursor-pointer focus:outline-none animate-none"
                  title={t("ปิดหน้าต่าง", "Close")}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="bg-brand-primary text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {getCategoryLabel(selectedNews.category)}
                  </span>
                  <h2 className="text-lg md:text-2xl font-extrabold tracking-tight leading-snug drop-shadow-sm line-clamp-2">
                    {getNewsTranslated(selectedNews).title}
                  </h2>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">
                {/* Meta stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 text-xs text-slate-400 font-medium">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{t("เผยแพร่เมื่อ:", "Published:")} {selectedNews.date}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <Eye className="w-4 h-4 text-slate-400" />
                      <span>{t("ผู้เข้าชม:", "Views:")} {selectedNews.views} {t("ครั้ง", "times")}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1.5 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[11px] font-semibold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{calculateReadingTime(getNewsTranslated(selectedNews).content)}</span>
                    </span>
                    <button
                      onClick={() => handleShare(selectedNews)}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-brand-primary transition-colors cursor-pointer"
                      title={t("แชร์ข่าวสาร", "Share link")}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Snippet / Excerpt */}
                <p className="text-slate-800 text-sm font-semibold border-l-4 border-brand-primary pl-4 py-1 bg-blue-50/50 rounded-r-xl">
                  {getNewsTranslated(selectedNews).excerpt}
                </p>

                {/* Body Text */}
                <div className="text-xs md:text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-line font-normal" id="news-body-content">
                  {getNewsTranslated(selectedNews).content}
                </div>

                {/* Official Notice notice card */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-start space-x-3.5">
                  <AlertCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">{t("ประกาศจากศูนย์ข่าวสารวิทยาลัยเทคโนโลยีปทุมรัตต์", "Official Notice from PTC Information Desk")}</p>
                    <p>{t("ข้อมูลข่าวสารฉบับนี้เป็นข้อมูลจริงที่เผยแพร่โดยกองสารสนเทศและประชาสัมพันธ์ หากนักเรียน นักศึกษา หรือผู้ปกครองต้องการติดต่อเพื่อสอบถามข้อมูลทางวิชาการ หรือการแนะแนวเพิ่มเติม สามารถโทรศัพท์เข้ามาที่กองงานประชาสัมพันธ์วิทยาลัยได้ในวันทำการ", "This news release represents verified information published by the Information and Public Relations Division of Pathumrat Technology College. For academic advisement, admissions criteria, or direct inquiries, please call the public relations office during working hours.")}</p>
                  </div>
                </div>
              </div>

              {/* Footer action bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3 shrink-0">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  {t("ปิดหน้าต่าง", "Close")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
