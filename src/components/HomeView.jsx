/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  Award,
  Settings,
  Zap,
  Cpu,
  TrendingUp,
  Calendar,
  Eye,
  ShieldCheck,
  Flame,
  ChevronRight,
  Database,
  DownloadCloud,
  HeartHandshake
} from "lucide-react";
import { useData } from "../context/DataContext";
export default function HomeView({ setActiveTab, setSelectedNews }) {
  const { collegeInfo, majors, newsData } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: "\u0E22\u0E34\u0E19\u0E14\u0E35\u0E15\u0E49\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E2A\u0E39\u0E48 \u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E1B\u0E17\u0E38\u0E21\u0E23\u0E31\u0E15\u0E15\u0E4C",
      subtitle: "\u0E01\u0E49\u0E32\u0E27\u0E2A\u0E39\u0E48\u0E2D\u0E19\u0E32\u0E04\u0E15\u0E17\u0E35\u0E48\u0E21\u0E31\u0E48\u0E19\u0E04\u0E07\u0E14\u0E49\u0E27\u0E22\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32\u0E2A\u0E32\u0E22\u0E2D\u0E32\u0E0A\u0E35\u0E1E",
      description: "\u0E40\u0E19\u0E49\u0E19\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49\u0E20\u0E32\u0E04\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34 \u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E17\u0E31\u0E19\u0E2A\u0E21\u0E31\u0E22\u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E2A\u0E32\u0E01\u0E25 \u0E08\u0E1A\u0E21\u0E32\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E31\u0E01\u0E29\u0E30\u0E17\u0E35\u0E48\u0E15\u0E25\u0E32\u0E14\u0E41\u0E23\u0E07\u0E07\u0E32\u0E19\u0E22\u0E38\u0E04\u0E43\u0E2B\u0E21\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23",
      cta: "\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C",
      ctaTab: "admission",
      bgImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop",
      badge: "\u0E40\u0E1B\u0E34\u0E14\u0E23\u0E31\u0E1A\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E1B\u0E35\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32 2570 \u0E41\u0E25\u0E49\u0E27!"
    },
    {
      title: "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E41\u0E25\u0E30\u0E19\u0E31\u0E01\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E21\u0E37\u0E2D\u0E2D\u0E32\u0E0A\u0E35\u0E1E",
      subtitle: "\u0E27\u0E34\u0E28\u0E27\u0E01\u0E23\u0E23\u0E21\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35 \u0E41\u0E25\u0E30 \u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25",
      description: "\u0E0A\u0E48\u0E32\u0E07\u0E22\u0E19\u0E15\u0E4C \u0E0A\u0E48\u0E32\u0E07\u0E44\u0E1F\u0E1F\u0E49\u0E32 \u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28 \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E0D\u0E0A\u0E35 \u0E1E\u0E31\u0E12\u0E19\u0E32\u0E15\u0E19\u0E40\u0E2D\u0E07\u0E14\u0E49\u0E27\u0E22\u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E23\u0E21 IoT, \u0E22\u0E32\u0E19\u0E22\u0E19\u0E15\u0E4C\u0E44\u0E1F\u0E1F\u0E49\u0E32 EV \u0E41\u0E25\u0E30 AI",
      cta: "\u0E14\u0E39\u0E2B\u0E25\u0E31\u0E01\u0E2A\u0E39\u0E15\u0E23\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E34\u0E14\u0E2A\u0E2D\u0E19",
      ctaTab: "curriculum",
      bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&auto=format&fit=crop",
      badge: "\u0E40\u0E19\u0E49\u0E19\u0E17\u0E31\u0E01\u0E29\u0E30\u0E41\u0E2B\u0E48\u0E07\u0E2D\u0E19\u0E32\u0E04\u0E15"
    }
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6e3);
    return () => clearInterval(timer);
  }, [heroSlides.length]);
  const statCards = [
    { value: `${(/* @__PURE__ */ new Date()).getFullYear() + 543 - parseInt(collegeInfo.foundedYear)} \u0E1B\u0E35`, label: "\u0E41\u0E2B\u0E48\u0E07\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E15\u0E31\u0E49\u0E07\u0E41\u0E25\u0E30\u0E14\u0E39\u0E41\u0E25\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19", description: "\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E31\u0E48\u0E19\u0E04\u0E07\u0E40\u0E04\u0E35\u0E22\u0E07\u0E04\u0E39\u0E48\u0E17\u0E49\u0E2D\u0E07\u0E16\u0E34\u0E48\u0E19", icon: Award, color: "text-cyan-500" },
    { value: "95%+", label: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E44\u0E14\u0E49\u0E07\u0E32\u0E19\u0E17\u0E33\u0E2B\u0E25\u0E31\u0E07\u0E08\u0E1A\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32", description: "\u0E20\u0E32\u0E22\u0E43\u0E19 6 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08\u0E2B\u0E25\u0E31\u0E01\u0E2A\u0E39\u0E15\u0E23", icon: ShieldCheck, color: "text-emerald-500" },
    { value: "4 \u0E2A\u0E32\u0E02\u0E32", label: "\u0E1B\u0E27\u0E0A. \u0E41\u0E25\u0E30 \u0E1B\u0E27\u0E2A. \u0E22\u0E2D\u0E14\u0E19\u0E34\u0E22\u0E21", description: "\u0E2B\u0E25\u0E31\u0E01\u0E2A\u0E39\u0E15\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E2D\u0E19\u0E32\u0E04\u0E15", icon: BookOpen, color: "text-blue-500" },
    { value: "1,200+", label: "\u0E28\u0E34\u0E29\u0E22\u0E4C\u0E40\u0E01\u0E48\u0E32\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08", description: "\u0E40\u0E04\u0E23\u0E37\u0E2D\u0E02\u0E48\u0E32\u0E22\u0E04\u0E27\u0E32\u0E21\u0E23\u0E48\u0E27\u0E21\u0E21\u0E37\u0E2D\u0E2D\u0E38\u0E15\u0E2A\u0E32\u0E2B\u0E01\u0E23\u0E23\u0E21", icon: Users, color: "text-purple-500" }
  ];
  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setActiveTab("news");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const getMajorIcon = (iconName) => {
    switch (iconName) {
      case "Wrench":
        return <Settings className="w-6 h-6 text-blue-600" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-cyan-500" />;
      case "Laptop":
      case "Cpu":
        return <Cpu className="w-6 h-6 text-indigo-500" />;
      case "FileText":
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-emerald-500" />;
      default:
        return <GraduationCap className="w-6 h-6 text-slate-500" />;
    }
  };
  return <div className="space-y-16 pb-16" id="home-view">
      {
    /* News Ticker */
  }
      <div className="bg-slate-950 border-b border-blue-500/10 py-2.5 px-4 overflow-hidden" id="news-ticker">
        <div className="max-w-7xl mx-auto flex items-center space-x-3 text-xs md:text-sm">
          <div className="flex items-center space-x-1 bg-cyan-600 text-white font-bold py-1 px-3 rounded-md shrink-0 uppercase tracking-wide">
            <Flame className="w-3.5 h-3.5 animate-bounce" />
            <span>ข่าวเด่น</span>
          </div>
          <div className="w-full overflow-hidden relative">
            <div className="animate-[marquee_25s_linear_infinite] whitespace-nowrap text-blue-100 hover:pause-animation flex items-center space-x-8">
              {newsData.map((news) => <span
    key={news.id}
    className="cursor-pointer hover:text-white hover:underline inline-flex items-center space-x-2"
    onClick={() => handleNewsClick(news)}
  >
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{news.title}</span>
                </span>)}
            </div>
          </div>
        </div>
      </div>

      {
    /* Hero Slider */
  }
      <section className="relative h-[480px] md:h-[540px] overflow-hidden bg-slate-950" id="hero-slider">
        <AnimatePresence mode="wait">
          <motion.div
    key={currentSlide}
    initial={{ opacity: 0, scale: 1.02 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.8 }}
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95) 30%, rgba(15, 23, 42, 0.6) 70%, rgba(15, 23, 42, 0.4) 100%), url(${heroSlides[currentSlide].bgImage})`
    }}
  >
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl text-left space-y-6">
                <motion.span
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="inline-flex items-center bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide"
  >
                  {heroSlides[currentSlide].badge}
                </motion.span>
                
                <div className="space-y-2">
                  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="text-white text-xl md:text-2xl font-bold tracking-tight text-blue-400"
  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.h2>
                  <motion.h1
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="text-white text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>
                </div>

                <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="text-slate-300 text-sm md:text-base leading-relaxed"
  >
                  {heroSlides[currentSlide].description}
                </motion.p>

                <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="pt-4 flex flex-wrap gap-4"
  >
                  <button
    onClick={() => {
      setActiveTab(heroSlides[currentSlide].ctaTab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="bg-brand-primary hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-blue-600/20 flex items-center space-x-2 transition-all duration-150 transform hover:-translate-y-0.5"
  >
                    <span>{heroSlides[currentSlide].cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
    onClick={() => {
      setActiveTab("curriculum");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full flex items-center space-x-2 transition-all duration-150"
  >
                    <span>ข้อมูลหลักสูตรเรียน</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {
    /* Slide Indicator circles */
  }
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroSlides.map((_, idx) => <button
    key={idx}
    onClick={() => setCurrentSlide(idx)}
    className={`w-3 h-3 rounded-full transition-colors duration-150 ${currentSlide === idx ? "bg-brand-primary" : "bg-white/40"}`}
    aria-label={`Go to slide ${idx + 1}`}
  />)}
        </div>
      </section>

      {
    /* Philosophy & Vision Bento Grid */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            ปรัชญาและวิสัยทัศน์วิทยาลัย
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-secondary tracking-tight">
            มุ่งสร้างกำลังคนระดับอาชีพ เพื่อยกระดับสังคมและพัฒนาชาติ
          </h2>
          <p className="text-slate-500 text-sm">
            วิทยาลัยเทคโนโลยีปทุมรัตต์ เป็นศูนย์กลางการศึกษาทางวิชาชีพที่พร้อมเคียงข้างนักศึกษาในเขตอำเภอปทุมรัตต์ จังหวัดร้อยเอ็ด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {
    /* Box 1: Philosophy */
  }
          <div className="bg-gradient-to-br from-brand-primary to-blue-900 text-white p-8 rounded-2xl shadow-lg border border-blue-900/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center text-cyan-300 mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-cyan-300">ปรัชญา (Philosophy)</h3>
              <p className="text-blue-100 font-medium text-lg leading-relaxed font-display">
                "{collegeInfo.philosophy}"
              </p>
            </div>
            <div className="text-xs text-blue-200/80 mt-6 border-t border-white/10 pt-4">
              * เป็นหัวใจหลักในการหล่อหลอมศิษย์ทุกคนของวิทยาลัยฯ
            </div>
          </div>

          {
    /* Box 2: Vision */
  }
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-brand-primary mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-secondary">วิสัยทัศน์ (Vision)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {collegeInfo.vision}
              </p>
            </div>
            <div className="text-xs text-slate-400 mt-6 border-t border-slate-200 pt-4">
              * มุ่งสู่ความเป็นสากลและตรงใจผู้ว่าจ้างงาน
            </div>
          </div>

          {
    /* Box 3: Identity & Uniqueness */
  }
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-brand-secondary">เอกลักษณ์ & อัตลักษณ์</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-bold text-slate-500 text-xs block uppercase">เอกลักษณ์วิทยาลัย:</span>
                  <p className="text-slate-700 font-semibold">{collegeInfo.identity}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 text-xs block uppercase">อัตลักษณ์ผู้เรียน:</span>
                  <p className="text-slate-700 font-semibold">{collegeInfo.uniqueness}</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 mt-6 border-t border-slate-200 pt-4">
              * พลังสร้างบุคลิกภาพที่ดีของนักเรียนเทคโนโลยีปทุมรัตต์
            </div>
          </div>
        </div>
      </section>

      {
    /* Stats Counter Section */
  }
      <section className="bg-slate-50 border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statCards.map((stat, idx) => <div key={idx} className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className={`p-2.5 bg-white rounded-xl shadow-sm ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </h3>
                <div>
                  <p className="text-sm font-bold text-slate-700">{stat.label}</p>
                  <p className="text-xs text-slate-400">{stat.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {
    /* Director's Welcome & Message Section */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-10">
          {
    /* Director Photo with prestigious golden-blue frame */
  }
          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-2xl transform rotate-3 scale-105 opacity-10" />
              <div className="relative border-4 border-slate-100 rounded-2xl overflow-hidden shadow-md w-64 h-80">
                <img
    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop"
    alt="ดร. สมเกียรติ ปทุมสวัสดิ์"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
              </div>
              {
    /* Badge */
  }
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                ผู้อำนวยการวิทยาลัย
              </div>
            </div>
            <div className="text-center pt-2">
              <h4 className="font-extrabold text-slate-900 font-display text-base">ดร. สมเกียรติ ปทุมสวัสดิ์</h4>
              <p className="text-xs text-slate-500">Ph.D. in Vocational Education Management</p>
            </div>
          </div>

          {
    /* Director Text */
  }
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                สาส์นจากผู้อำนวยการ
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-secondary tracking-tight">
                ยินดีต้อนรับสู่ รั้วเทคโนโลยีปทุมรัตต์ (PTC)
              </h2>
            </div>
            <div className="relative">
              <span className="absolute -top-4 -left-3 text-7xl text-slate-100 font-serif select-none pointer-events-none">“</span>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed relative z-10 pl-2">
                วิทยาลัยเทคโนโลยีปทุมรัตต์ มุ่งมั่นยกระดับคุณภาพการศึกษาทางวิชาชีพให้มีคุณภาพได้มาตรฐานสากล
                เราพร้อมนำเทคโนโลยีและนวัตกรรมใหม่ๆ เช่น ยานยนต์ไฟฟ้า (EV), ปัญญาประดิษฐ์ (AI), และ Smart Factory มาผสานเข้าสู่การเรียนการสอนจริง
                เพื่อให้มั่นใจว่าศิษย์ปทุมรัตต์ทุกคนเมื่อสำเร็จการศึกษาออกไป จะมีความรู้ความสามารถ ทักษะทางปฏิบัติการที่เป็นเลิศ
                เปี่ยมล้นไปด้วยคุณธรรม จริยธรรม มีวินัย และพร้อมเป็นกำลังสำคัญของท้องถิ่นและตลาดแรงงานยุคดิจิทัลได้อย่างเต็มภาคภูมิ 
                รับประกับความพึงพอใจด้วยการจัดการฝึกงานระบบทวิภาคีและโอกาสทำงานมั่นคง 100% ร่วมกับสถานประกอบการแบรนด์ชั้นนำระดับประเทศ
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <p className="text-xs text-slate-400">วิสัยทัศน์ผู้บริหาร:</p>
                <p className="text-brand-primary font-bold text-xs italic">"เรียนจริง ปฏิบัติจริง มีงานทำมั่นคง 100%"</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">ลงชื่อ</p>
                <p className="font-bold text-slate-800 text-sm italic font-display mt-1">ดร. สมเกียรติ ปทุมสวัสดิ์</p>
                <p className="text-[10px] text-slate-500">ผู้อำนวยการวิทยาลัยเทคโนโลยีปทุมรัตต์</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
    /* PTC Digital Services Gateway & Quick Links */
  }
      <section className="bg-slate-900 text-white py-14 border-y border-slate-800 relative overflow-hidden" id="digital-portal-gateway">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(29,78,216,0.15),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-brand-accent font-extrabold text-xs uppercase tracking-widest bg-amber-500/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full">
              ระบบบริการสารสนเทศออนไลน์
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white font-display">
              PTC Digital Gateway & Portal
            </h2>
            <p className="text-slate-400 text-xs md:text-sm">
              เข้าถึงช่องทางบริการดิจิทัล ระบบงานนักศึกษา ระบบช่วยสอน และข้อมูลการเรียนการสอนได้อย่างรวดเร็วตลอด 24 ชั่วโมง
            </p>
          </div>

          {
    /* Quick links portal grid - 6 items */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
    {
      title: "\u0E23\u0E30\u0E1A\u0E1A\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19 & \u0E1C\u0E25\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19 (Student Portal)",
      desc: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E32\u0E22\u0E27\u0E34\u0E0A\u0E32 \u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E1A \u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E21\u0E35\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E2A\u0E2D\u0E1A \u0E41\u0E25\u0E30\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E41\u0E1C\u0E19\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19\u0E2A\u0E30\u0E2A\u0E21",
      badge: "\u0E23\u0E30\u0E1A\u0E1A\u0E07\u0E32\u0E19\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23",
      color: "from-blue-600 to-blue-800",
      icon: "Database",
      action: () => alert("\u0E23\u0E30\u0E1A\u0E1A\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E32\u0E23\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E01\u0E25\u0E32\u0E07 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E1C\u0E48\u0E32\u0E19\u0E23\u0E2B\u0E31\u0E2A\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27")
    },
    {
      title: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E42\u0E04\u0E27\u0E15\u0E32 & \u0E17\u0E38\u0E19\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32 (LMS Track)",
      desc: "\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32\u0E0A\u0E31\u0E49\u0E19\u0E1B\u0E35 1-3 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E30\u0E41\u0E19\u0E19\u0E2A\u0E30\u0E2A\u0E21\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E1E\u0E24\u0E15\u0E34 \u0E41\u0E25\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E23\u0E31\u0E1A\u0E17\u0E38\u0E19\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E15\u0E48\u0E32\u0E07\u0E46",
      badge: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E34\u0E08\u0E01\u0E32\u0E23\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19",
      color: "from-amber-500 to-amber-600",
      icon: "Award",
      action: () => alert("\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E38\u0E19\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E20\u0E32\u0E04\u0E40\u0E23\u0E35\u0E22\u0E19 1/2570 \u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")
    },
    {
      title: "\u0E23\u0E30\u0E1A\u0E1A\u0E23\u0E31\u0E1A\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C (Online Enrollment)",
      desc: "\u0E01\u0E23\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E1A\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C \u0E2A\u0E30\u0E14\u0E27\u0E01\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27 \u0E08\u0E2D\u0E07\u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32\u0E43\u0E19 3 \u0E02\u0E31\u0E49\u0E19\u0E15\u0E2D\u0E19",
      badge: "\u0E40\u0E1B\u0E34\u0E14\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27",
      color: "from-emerald-500 to-emerald-700",
      icon: "GraduationCap",
      action: () => {
        setActiveTab("admission");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    {
      title: "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19 & \u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23",
      desc: "\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14\u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19\u0E28\u0E36\u0E01\u0E29\u0E32\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35 \u0E27\u0E31\u0E19\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19 \u0E27\u0E31\u0E19\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E1B\u0E25\u0E32\u0E22\u0E20\u0E32\u0E04 \u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E2A\u0E33\u0E04\u0E31\u0E0D",
      badge: "\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
      color: "from-purple-600 to-indigo-800",
      icon: "Calendar",
      action: () => alert("\u0E44\u0E1F\u0E25\u0E4C\u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32\u0E09\u0E1A\u0E31\u0E1A\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E1B\u0E35 2570 \u0E16\u0E39\u0E01\u0E42\u0E2B\u0E25\u0E14\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27")
    },
    {
      title: "\u0E04\u0E25\u0E31\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E41\u0E25\u0E30\u0E15\u0E33\u0E23\u0E32\u0E40\u0E23\u0E35\u0E22\u0E19 (E-Learning Hub)",
      desc: "\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E2A\u0E44\u0E25\u0E14\u0E4C\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E2D\u0E19\u0E02\u0E2D\u0E07\u0E2D\u0E32\u0E08\u0E32\u0E23\u0E22\u0E4C \u0E04\u0E39\u0E48\u0E21\u0E37\u0E2D\u0E0B\u0E48\u0E2D\u0E21\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E1A\u0E1A\u0E1D\u0E36\u0E01\u0E2B\u0E31\u0E14 \u0E41\u0E25\u0E30\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E04\u0E27\u0E32\u0E21\u0E23\u0E39\u0E49\u0E20\u0E32\u0E22\u0E19\u0E2D\u0E01",
      badge: "\u0E04\u0E25\u0E31\u0E07\u0E04\u0E27\u0E32\u0E21\u0E23\u0E39\u0E49\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25",
      color: "from-cyan-600 to-cyan-800",
      icon: "DownloadCloud",
      action: () => alert("\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A PTC Cloud Drive \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E2D\u0E19")
    },
    {
      title: "\u0E23\u0E30\u0E1A\u0E1A\u0E14\u0E39\u0E41\u0E25\u0E0A\u0E48\u0E27\u0E22\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25 (Student Care)",
      desc: "\u0E0A\u0E48\u0E2D\u0E07\u0E17\u0E32\u0E07\u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32\u0E04\u0E23\u0E39\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32\u0E42\u0E14\u0E22\u0E15\u0E23\u0E07 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E40\u0E2B\u0E15\u0E38\u0E02\u0E31\u0E14\u0E02\u0E49\u0E2D\u0E07 \u0E04\u0E48\u0E32\u0E19\u0E34\u0E22\u0E21\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E1E\u0E24\u0E15\u0E34 \u0E41\u0E25\u0E30\u0E41\u0E1A\u0E1A\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E08\u0E34\u0E15",
      badge: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E34\u0E01\u0E32\u0E23\u0E1C\u0E39\u0E49\u0E40\u0E23\u0E35\u0E22\u0E19",
      color: "from-rose-500 to-rose-700",
      icon: "HeartHandshake",
      action: () => alert("\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 Student Care \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E19\u0E30\u0E41\u0E19\u0E27\u0E41\u0E25\u0E30\u0E23\u0E31\u0E1A\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E23\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E15\u0E25\u0E2D\u0E14 24 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07")
    }
  ].map((portal, idx) => <div
    key={idx}
    className="bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 shadow-lg"
  >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {portal.badge}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-primary to-blue-800 flex items-center justify-center text-white">
                      {portal.icon === "Database" ? <Database className="w-5 h-5 text-amber-300" /> : portal.icon === "Award" ? <Award className="w-5 h-5 text-amber-300" /> : portal.icon === "GraduationCap" ? <GraduationCap className="w-5 h-5 text-amber-300" /> : portal.icon === "Calendar" ? <Calendar className="w-5 h-5 text-amber-300" /> : portal.icon === "DownloadCloud" ? <DownloadCloud className="w-5 h-5 text-amber-300" /> : <HeartHandshake className="w-5 h-5 text-amber-300" />}
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-brand-accent transition-colors leading-tight">
                    {portal.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {portal.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-900">
                  <button
    onClick={portal.action}
    className="w-full bg-slate-900 hover:bg-brand-primary border border-slate-800 hover:border-brand-primary text-slate-300 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center space-x-1.5"
  >
                    <span>เปิดใช้งานระบบ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {
    /* Highlight Majors Quick Access */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              สายอาชีพที่ตอบโจทย์อนาคต
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-secondary tracking-tight">
              หลักสูตรปรีชาพากเพียร ปวช. และ ปวส.
            </h2>
            <p className="text-slate-500 text-sm max-w-xl">
              เลือกแผนกที่ตรงกับพรสวรรค์และความชอบของตนเอง เพื่อพัฒนาให้กลายเป็นทักษะระดับมืออาชีพที่สามารถทำเงินและมีงานทำอย่างแน่นอน
            </p>
          </div>
          <button
    onClick={() => {
      setActiveTab("curriculum");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="group inline-flex items-center space-x-1.5 text-sm font-bold text-brand-primary hover:text-blue-800 transition-colors"
  >
            <span>ดูหลักสูตรทั้งหมด</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {
    /* Majors grid - display 4 main types */
  }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {majors.slice(0, 4).map((major) => <div
    key={major.id}
    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
  >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  {getMajorIcon(major.icon)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-brand-primary/10 text-brand-primary font-bold text-[10px] px-2 py-0.5 rounded-full">
                      {major.level}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{major.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-secondary mt-1 group-hover:text-brand-primary transition-colors">
                    {major.name}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">{major.englishName}</p>
                </div>
                <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                  {major.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <button
    onClick={() => {
      setActiveTab("curriculum");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="w-full text-center text-xs font-bold text-slate-600 group-hover:text-brand-primary transition-colors"
  >
                  ดูรายละเอียดรายวิชา
                </button>
              </div>
            </div>)}
        </div>
      </section>

      {
    /* Latest News & Announcements Highlights */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              ข่าวสารรอบรั้ววิทยาลัย
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-secondary tracking-tight">
              ข่าวสารและกิจกรรมล่าสุด
            </h2>
            <p className="text-slate-500 text-sm max-w-xl">
              ติดตามประกาศสำคัญ ข่าวกิจกรรมความสำเร็จของวิทยาลัย และความเคลื่อนไหวต่างๆ ของครูและนักเรียนได้ที่นี่
            </p>
          </div>
          <button
    onClick={() => {
      setActiveTab("news");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="group inline-flex items-center space-x-1.5 text-sm font-bold text-brand-primary hover:text-blue-800 transition-colors"
  >
            <span>ข่าววิทยาลัยทั้งหมด</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {
    /* 3 latest news posts */
  }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsData.slice(0, 3).map((news) => <article
    key={news.id}
    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full group"
    onClick={() => handleNewsClick(news)}
  >
              {
    /* Image box */
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
    /* Content box */
  }
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{news.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{news.views} ครั้ง</span>
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center text-xs font-bold text-brand-primary group-hover:text-cyan-600 transition-colors">
                  <span>อ่านต่อรายละเอียด</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>)}
        </div>
      </section>

      {
    /* MoU Industry Partnerships Showcase */
  }
      <section className="bg-slate-50 border-y border-slate-200 py-12" id="industry-partnerships">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              โอกาสทำงาน 100% กับพันธมิตรของเรา
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-brand-secondary tracking-tight">
              ภาคีเครือข่ายความร่วมมือทางวิชาการและอุตสาหกรรม (MOU)
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed">
              วิทยาลัยร่วมมือกับสถานประกอบการและแบรนด์อุตสาหกรรมชั้นนำในระดับประเทศ เพื่อสนับสนุนการฝึกงานระบบทวิภาคี รับประกันความพร้อมและมีอาชีพรองรับทันทีหลังจบการศึกษา
            </p>
          </div>

          {
    /* Partners Grid */
  }
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
            {[
    { name: "CP ALL Public Co., Ltd.", icon: "Building", color: "text-emerald-600", desc: "\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E04\u0E49\u0E32\u0E1B\u0E25\u0E35\u0E01\u0E2A\u0E21\u0E31\u0E22\u0E43\u0E2B\u0E21\u0E48" },
    { name: "TOYOTA Motors", icon: "Settings", color: "text-red-600", desc: "\u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E23\u0E21\u0E22\u0E32\u0E19\u0E22\u0E19\u0E15\u0E4C EV" },
    { name: "Siam Cement Group (SCG)", icon: "Award", color: "text-orange-600", desc: "\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E23\u0E30\u0E1A\u0E1A\u0E40\u0E21\u0E04\u0E04\u0E32\u0E17\u0E23\u0E2D\u0E19\u0E34\u0E01\u0E2A\u0E4C" },
    { name: "Western Digital", icon: "Cpu", color: "text-blue-600", desc: "\u0E2E\u0E32\u0E23\u0E4C\u0E14\u0E41\u0E27\u0E23\u0E4C & \u0E44\u0E2D\u0E17\u0E35\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C" },
    { name: "True Corporation", icon: "Zap", color: "text-rose-600", desc: "\u0E42\u0E04\u0E23\u0E07\u0E02\u0E48\u0E32\u0E22\u0E40\u0E19\u0E47\u0E15\u0E40\u0E27\u0E34\u0E23\u0E4C\u0E01\u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E47\u0E27\u0E2A\u0E39\u0E07" },
    { name: "Minor International", icon: "TrendingUp", color: "text-amber-600", desc: "\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E32\u0E01\u0E25" }
  ].map((partner, index) => <div
    key={index}
    className="bg-white border border-slate-200 rounded-xl p-4 text-center space-y-2 hover:shadow-md transition-all duration-200 group h-32 flex flex-col justify-center items-center"
  >
                <div className={`p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors ${partner.color}`}>
                  {partner.icon === "Building" ? <Users className="w-5 h-5" /> : partner.icon === "Settings" ? <Settings className="w-5 h-5" /> : partner.icon === "Award" ? <Award className="w-5 h-5" /> : partner.icon === "Cpu" ? <Cpu className="w-5 h-5" /> : partner.icon === "Zap" ? <Zap className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 tracking-tight leading-snug">{partner.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{partner.desc}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {
    /* Online Registration CTA Section */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-secondary to-blue-950 text-white p-8 md:p-12 shadow-xl border border-blue-900/40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_40%)] pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-bold text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full">
              แนะแนวศึกษาต่อสายอาชีพ
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight font-display text-white">
              เปิดรับสมัครนักเรียน นักศึกษาใหม่แล้ววันนี้! สมัครด่วนเพื่อรับโควตาสิทธิพิเศษ
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              ผู้ที่สำเร็จการศึกษาชั้น ม.3 และ ม.6 ที่ต้องการเพิ่มศักยภาพทักษะวิชาชีพในสาขาช่างยนต์ ไฟฟ้า เทคโนโลยีสารสนเทศ หรือการบัญชี สามารถยื่นสมัครผ่านระบบออนไลน์เพื่อจองสิทธิ์ห้องปฏิบัติการพร้อมทุนการศึกษาเบื้องต้นได้ทันที
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
    onClick={() => {
      setActiveTab("admission");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="bg-brand-primary hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-150 transform hover:-translate-y-0.5"
  >
                ยื่นใบสมัครออนไลน์
              </button>
              <button
    onClick={() => {
      setActiveTab("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-4 rounded-full transition-all duration-150"
  >
                คำถามพบบ่อย & ติดต่อวิทยาลัย
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>;
}
