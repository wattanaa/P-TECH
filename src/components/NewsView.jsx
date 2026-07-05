/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Eye,
  Search,
  ArrowLeft,
  Share2,
  BookOpen,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { useData } from "../context/DataContext";
export default function NewsView({ selectedNews, setSelectedNews }) {
  const { newsData, dbSettings, isLoading } = useData();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [localNewsList, setLocalNewsList] = useState(newsData);
  useEffect(() => {
    setLocalNewsList(newsData);
  }, [newsData]);
  const filteredNews = useMemo(() => {
    const list = (localNewsList || []).filter((news) => {
      if (!news) return false;
      const matchesCategory = activeCategoryFilter === "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" || news.category === activeCategoryFilter;
      const titleText = String(news.title || "").toLowerCase();
      const excerptText = String(news.excerpt || "").toLowerCase();
      const contentText = String(news.content || "").toLowerCase();
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
  }, [activeCategoryFilter, searchQuery, localNewsList, sortBy]);
  const handleReadNews = (news) => {
    setLocalNewsList(
      (prevList) => prevList.map(
        (item) => item.id === news.id ? { ...item, views: item.views + 1 } : item
      )
    );
    setSelectedNews({ ...news, views: news.views + 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleShare = (news) => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.excerpt,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert(`\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22: ${news.title}`);
    }
  };
  const categories = [
    "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
    "\u0E02\u0E48\u0E32\u0E27\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C",
    "\u0E02\u0E48\u0E32\u0E27\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23",
    "\u0E02\u0E48\u0E32\u0E27\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21",
    "\u0E02\u0E48\u0E32\u0E27\u0E08\u0E31\u0E14\u0E0B\u0E37\u0E49\u0E2D\u0E08\u0E31\u0E14\u0E08\u0E49\u0E32\u0E07"
  ];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="news-view">
      <AnimatePresenceAndWrapper>
        {selectedNews ? (
    /* NEWS DETAIL VIEW */
    <motion.div
      key="news-detail"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto space-y-8"
      id="news-detail-container"
    >
            {
      /* Back button */
    }
            <button
      onClick={() => setSelectedNews(null)}
      className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors"
      id="back-to-news-list"
    >
              <ArrowLeft className="w-4 h-4" />
              <span>ย้อนกลับไปรายการข่าว</span>
            </button>

            {
      /* Main content article */
    }
            <article className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm p-6 md:p-10 space-y-8">
              {
      /* Category, Date, View count */
    }
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center space-x-3">
                  <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {selectedNews.category}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>เผยแพร่เมื่อ: {selectedNews.date}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400 text-xs flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>ผู้เข้าชม: {selectedNews.views} ครั้ง</span>
                  </span>
                  <button
      onClick={() => handleShare(selectedNews)}
      className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-brand-primary transition-colors"
      title="แชร์ลิงก์ข่าว"
    >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {
      /* Title */
    }
              <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                {selectedNews.title}
              </h1>

              {
      /* Hero Image */
    }
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 h-[320px] md:h-[420px]">
                <img
      src={selectedNews.imageUrl}
      alt={selectedNews.title}
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
    />
              </div>

              {
      /* Rich contents rendering */
    }
              <div className="text-xs md:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-normal" id="news-body-content">
                {selectedNews.content}
              </div>

              {
      /* Admin comment box sign */
    }
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-start space-x-3.5">
                <AlertCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div className="text-xs text-slate-500 space-y-1">
                  <p className="font-bold text-slate-700">ประกาศจากศูนย์ข่าวสารวิทยาลัยเทคโนโลยีปทุมรัตต์</p>
                  <p>ข้อมูลข่าวสารฉบับนี้เป็นข้อมูลจริงที่เผยแพร่โดยกองสารสนเทศและประชาสัมพันธ์ หากนักเรียน นักศึกษา หรือผู้ปกครองต้องการติดต่อเพื่อสอบถามข้อมูลทางวิชาการ หรือการแนะแนวเพิ่มเติม สามารถโทรศัพท์เข้ามาที่กองงานประชาสัมพันธ์วิทยาลัยได้ในวันทำการ</p>
                </div>
              </div>
            </article>
          </motion.div>
  ) : (
    /* NEWS INDEX GRID */
    <motion.div
      key="news-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
            {
      /* Header description */
    }
            <div className="text-center max-w-3xl mx-auto space-y-3 flex flex-col items-center">
              <div className="flex flex-wrap gap-2 justify-center items-center">
                <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                  ข่าวสารและประกาศสำคัญ
                </span>
                {dbSettings?.type === "firestore" ? (
                  <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-100 shadow-sm animate-pulse-subtle">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>เชื่อมต่อกับ Cloud Firestore (เรียลไทม์)</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center space-x-1.5 bg-amber-50 text-amber-700 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-100 shadow-sm">
                    <span>ข้อมูลจำลองแบบ Local</span>
                  </div>
                )}
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-brand-secondary tracking-tight w-full">
                ศูนย์ข่าวสารและกิจกรรม วิทยาลัยเทคโนโลยีปทุมรัตต์
              </h2>
              <p className="text-slate-500 text-sm">
                เกาะติดข่าวรับสมัครงาน ทุนการศึกษา กิจกรรมเด่นรอบสัปดาห์ และเอกสารประกาศจัดซื้อจัดจ้างได้ตลอด 24 ชั่วโมง
              </p>
            </div>

            {
      /* Filters Row */
    }
            <div className="flex flex-col space-y-4">
              {
      /* Scrollable Categories List */
    }
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
                {categories.map((cat) => <button
      key={cat}
      onClick={() => setActiveCategoryFilter(cat)}
      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${activeCategoryFilter === cat ? "bg-brand-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"}`}
    >
                    {cat}
                  </button>)}
              </div>

              {
      /* Search and Sort box row */
    }
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-2.5 w-full md:w-auto">
                  <span className="text-xs font-bold text-slate-500 shrink-0">จัดเรียงตาม:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer font-semibold text-slate-700 shadow-xs"
                  >
                    <option value="newest">ข่าวล่าสุด (Newest)</option>
                    <option value="oldest">ข่าวเก่าที่สุด (Oldest)</option>
                    <option value="popular">ยอดเข้าชมสูงสุด (Most Popular)</option>
                  </select>
                </div>

                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="พิมพ์ชื่อเรื่องข่าว หรือคีย์เวิร์ดเพื่อค้นหา..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {
      /* News items Grid */
    }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => <article
      key={news.id}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-slate-300 transition-all duration-300 ease-out cursor-pointer flex flex-col h-full group"
      onClick={() => handleReadNews(news)}
    >
                  {
      /* Image wrapper */
    }
                  <div className="relative h-48 bg-slate-100 overflow-hidden shrink-0">
                    <img
      src={news.imageUrl}
      alt={news.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      referrerPolicy="no-referrer"
    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">
                        {news.category}
                      </span>
                    </div>
                  </div>

                  {
      /* Core info wrapper */
    }
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-medium">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{news.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>ชม {news.views} ครั้ง</span>
                        </span>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {news.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                      <span>อ่านรายละเอียดข่าวเพิ่มเติม</span>
                      <ChevronRight className="w-4 h-4 ml-0.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </article>)}
            </div>

            {
      /* Empty filter results */
    }
            {filteredNews.length === 0 && <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-4">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
                <div>
                  <h3 className="text-base font-bold text-slate-700">ไม่พบหัวข้อข่าวสารในหมวดหมู่นี้</h3>
                  <p className="text-slate-400 text-xs">คุณสามารถพิมพ์คำค้นหาอื่น หรือย้อนกลับไปดูข่าวสาร "ทั้งหมด"</p>
                </div>
              </div>}
          </motion.div>
  )}
      </AnimatePresenceAndWrapper>
    </div>;
}
function AnimatePresenceAndWrapper({ children }) {
  return <div className="relative">
      {children}
    </div>;
}
