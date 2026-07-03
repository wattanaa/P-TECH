/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  BookOpen,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Sparkles,
  X,
  Settings,
  Zap,
  Cpu,
  TrendingUp
} from "lucide-react";
import { useData } from "../context/DataContext";
export default function CurriculumView({
  setActiveTab,
  setPreSelectedMajor,
  setPreSelectedLevel
}) {
  const { majors } = useData();
  const [selectedLevelFilter, setSelectedLevelFilter] = useState("\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDetailsMajor, setActiveDetailsMajor] = useState(null);
  const filteredMajors = useMemo(() => {
    return majors.filter((major) => {
      const matchesLevel = selectedLevelFilter === "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" || major.level === selectedLevelFilter;
      const matchesSearch = major.name.toLowerCase().includes(searchQuery.toLowerCase()) || major.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || major.description.toLowerCase().includes(searchQuery.toLowerCase()) || major.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) || major.careerPaths.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesLevel && matchesSearch;
    });
  }, [selectedLevelFilter, searchQuery]);
  const handleApplyClick = (major) => {
    setPreSelectedLevel(major.level);
    setPreSelectedMajor(major.name);
    setActiveDetailsMajor(null);
    setActiveTab("admission");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const getMajorIcon = (iconName) => {
    switch (iconName) {
      case "Wrench":
        return <Settings className="w-8 h-8 text-blue-600" />;
      case "Zap":
        return <Zap className="w-8 h-8 text-cyan-500" />;
      case "Laptop":
      case "Cpu":
        return <Cpu className="w-8 h-8 text-indigo-500" />;
      case "FileText":
      case "TrendingUp":
        return <TrendingUp className="w-8 h-8 text-emerald-500" />;
      default:
        return <GraduationCap className="w-8 h-8 text-slate-500" />;
    }
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id="curriculum-view">
      {
    /* Header section */
  }
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
          หลักสูตรการศึกษา
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-brand-secondary tracking-tight">
          เปิดประตูสู่ความสำเร็จด้านอาชีพ
        </h2>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
          วิทยาลัยเปิดการเรียนการสอนในระดับประกาศนียบัตรวิชาชีพ (ปวช.) และประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.) เพียบพร้อมด้วยอาจารย์ผู้เชี่ยวชาญ และเครื่องมือทดลองปฏิบัติงานจริง
        </p>
      </div>

      {
    /* Level Filters & Search Row */
  }
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 gap-4 shadow-sm" id="filters-row">
        {
    /* Toggle buttons */
  }
        <div className="flex space-x-1.5 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          {["\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", "\u0E1B\u0E27\u0E0A.", "\u0E1B\u0E27\u0E2A."].map((level) => <button
    key={level}
    onClick={() => setSelectedLevelFilter(level)}
    className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${selectedLevelFilter === level ? "bg-white text-brand-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
  >
              {level === "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" ? "\u0E2B\u0E25\u0E31\u0E01\u0E2A\u0E39\u0E15\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : `\u0E23\u0E30\u0E14\u0E31\u0E1A ${level}`}
            </button>)}
        </div>

        {
    /* Search input box */
  }
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
    type="text"
    placeholder="ค้นหาสาขา, ทักษะ หรืออาชีพ..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
  />
        </div>
      </div>

      {
    /* Majors grid list */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredMajors.map((major) => <motion.div
    key={major.id}
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
  >
              <div className="space-y-4">
                {
    /* Header card info */
  }
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    {getMajorIcon(major.icon)}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${major.level === "\u0E1B\u0E27\u0E0A." ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-purple-50 text-purple-700 border border-purple-100"}`}>
                    {major.level} (เรียน {major.duration})
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                    {major.name}
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
                    {major.englishName}
                  </p>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                  {major.description}
                </p>

                {
    /* Features peek */
  }
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">จุดเด่นของสาขาวิชา:</span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {major.features.slice(0, 2).map((feature, i) => <li key={i} className="flex items-center space-x-1.5 line-clamp-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                </div>
              </div>

              {
    /* Read more button */
  }
              <div className="mt-8 pt-4 border-t border-slate-200 flex space-x-3">
                <button
    onClick={() => setActiveDetailsMajor(major)}
    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-full text-xs font-bold transition-all text-center"
  >
                  ข้อมูลรายวิชา & อาชีพ
                </button>
                <button
    onClick={() => handleApplyClick(major)}
    className="bg-brand-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center shadow-md shadow-blue-500/10"
  >
                  สมัครเรียน
                </button>
              </div>
            </motion.div>)}
        </AnimatePresence>
      </div>

      {
    /* Empty results container */
  }
      {filteredMajors.length === 0 && <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-slate-700">ไม่พบหลักสูตรที่คุณค้นหา</h3>
            <p className="text-slate-400 text-xs">ลองใช้คำสำคัญอื่น เช่น ช่างยนต์, ไฟฟ้า, บัญชี หรือ IT</p>
          </div>
        </div>}

      {
    /* Detailed Modal Overlay */
  }
      <AnimatePresence>
        {activeDetailsMajor && <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    onClick={() => setActiveDetailsMajor(null)}
  >
            <motion.div
    initial={{ scale: 0.95, y: 15, opacity: 0 }}
    animate={{ scale: 1, y: 0, opacity: 1 }}
    exit={{ scale: 0.95, y: 15, opacity: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
    onClick={(e) => e.stopPropagation()}
  >
              {
    /* Header inside modal */
  }
              <div className="bg-brand-primary p-6 text-white relative">
                <button
    onClick={() => setActiveDetailsMajor(null)}
    className="absolute top-4 right-4 p-1.5 rounded-full bg-black/15 hover:bg-black/25 text-white transition-colors"
  >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2">
                  <span className="bg-cyan-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">
                    ระดับ {activeDetailsMajor.level}
                  </span>
                  <span className="text-slate-200 text-xs">ระยะเวลาเรียน {activeDetailsMajor.duration}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white mt-2">
                  {activeDetailsMajor.name}
                </h3>
                <p className="text-slate-200 text-xs mt-0.5 uppercase tracking-wide">
                  {activeDetailsMajor.englishName}
                </p>
              </div>

              {
    /* Body inside modal */
  }
              <div className="p-6 md:p-8 space-y-6 text-slate-700">
                {
    /* Description */
  }
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wide flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                    <span>คำอธิบายรายวิชา (Overview)</span>
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    {activeDetailsMajor.description}
                  </p>
                </div>

                {
    /* Features Checklist */
  }
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wide flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>ทักษะหลักที่จะได้รับการฝึกฝน (Core Competencies)</span>
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                    {activeDetailsMajor.features.map((feature, i) => <li key={i} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600 leading-snug">{feature}</span>
                      </li>)}
                  </ul>
                </div>

                {
    /* Careers list */
  }
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wide flex items-center space-x-1.5">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>เส้นทางอาชีพและรายได้ (Career Path)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {activeDetailsMajor.careerPaths.map((career, i) => <span
    key={i}
    className="bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1.5 rounded-full font-medium"
  >
                        {career}
                      </span>)}
                  </div>
                </div>
              </div>

              {
    /* Footer CTA inside modal */
  }
              <div className="p-6 border-t border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-500 text-center md:text-left">
                  * กำลังเปิดรับสมัครรอบโควตาและสอบตรงเพื่อรับสิทธิพิเศษมากมาย
                </p>
                <div className="flex space-x-3 w-full md:w-auto">
                  <button
    onClick={() => setActiveDetailsMajor(null)}
    className="flex-1 md:flex-none border border-slate-200 text-slate-600 px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-slate-50 transition-colors"
  >
                    ปิดหน้าต่าง
                  </button>
                  <button
    onClick={() => handleApplyClick(activeDetailsMajor)}
    className="flex-1 md:flex-none bg-brand-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md shadow-blue-500/10 transition-all flex items-center justify-center space-x-1.5"
  >
                    <span>สมัครสาขาวิชานี้ทันที</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}
