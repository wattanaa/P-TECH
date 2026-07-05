import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "../context/DataContext";
import { 
  Calendar, 
  MapPin, 
  Search, 
  Clock, 
  AlertCircle, 
  Compass, 
  Sparkles 
} from "lucide-react";

export default function AcademicCalendar() {
  const { academicCalendar = [] } = useData();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "กำหนดการทั้งหมด", count: academicCalendar.length, color: "bg-slate-100 text-slate-800" },
    { 
      id: "deadline", 
      label: "รับสมัคร & กำหนดการสำคัญ", 
      count: academicCalendar.filter(e => e.category === "deadline").length,
      color: "bg-rose-50 text-rose-700 border border-rose-100" 
    },
    { 
      id: "academic", 
      label: "กำหนดการเรียนการสอน", 
      count: academicCalendar.filter(e => e.category === "academic").length,
      color: "bg-blue-50 text-blue-700 border border-blue-100" 
    },
    { 
      id: "activity", 
      label: "กิจกรรมวิทยาลัย", 
      count: academicCalendar.filter(e => e.category === "activity").length,
      color: "bg-emerald-50 text-emerald-700 border border-emerald-100" 
    }
  ];

  // Filter & Search events
  const filteredEvents = academicCalendar.filter(event => {
    const matchesFilter = activeFilter === "all" || event.category === activeFilter;
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getCategoryMeta = (cat) => {
    switch (cat) {
      case "deadline":
        return { label: "รับสมัคร/กำหนดเวลา", color: "bg-rose-500 text-white", text: "text-rose-600", dot: "bg-rose-500" };
      case "academic":
        return { label: "กำหนดการเรียนการสอน", color: "bg-blue-500 text-white", text: "text-blue-600", dot: "bg-blue-500" };
      case "activity":
        return { label: "กิจกรรมและพิธีการ", color: "bg-emerald-500 text-white", text: "text-emerald-600", dot: "bg-emerald-500" };
      default:
        return { label: "ทั่วไป", color: "bg-slate-500 text-white", text: "text-slate-600", dot: "bg-slate-500" };
    }
  };

  // Extract day and month for the visual date badge
  const parseDateDisplay = (dateStr) => {
    // We can extract a nice day representation. If it's a range like "1 ก.ค. - 31 ส.ค. 2569"
    // we show "ก.ค." or "1 ก.ค."
    const parts = dateStr.split(" ");
    if (parts.length >= 2) {
      const day = parts[0];
      const month = parts[1];
      return { day, month };
    }
    return { day: "•", month: dateStr };
  };

  return (
    <section id="academic-calendar-section" className="py-20 bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-blue-50 text-brand-primary px-3 py-1.5 rounded-full text-xs font-bold mb-4"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>ปฏิทินวิชาการ & กิจกรรมสำคัญ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            ปฏิทินการศึกษาและกิจกรรม <span className="text-brand-primary">PTC</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-500 text-sm md:text-base"
          >
            ติดตามกำหนดการรับสมัครนักศึกษาใหม่ วันเปิดเทอม วันสอบ และกิจกรรมสร้างสรรค์ตลอดปีการศึกษา
          </motion.p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center space-x-2 ${
                    activeFilter === cat.id
                      ? "bg-brand-primary text-white shadow-lg shadow-blue-100 scale-[1.02]"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                    activeFilter === cat.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="ค้นหากำหนดการ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* Calendar Events List */}
        <div className="relative">
          {filteredEvents.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200"
            >
              <div className="inline-flex p-4 rounded-full bg-slate-100 text-slate-400 mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-700">ไม่พบกิจกรรมการศึกษาที่ค้นหา</h3>
              <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
                ลองปรับตัวกรองหรือลองค้นหาด้วยคำสำคัญอื่นๆ เพื่อตรวจสอบวันและกำหนดการของวิทยาลัยอีกครั้ง
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event, index) => {
                  const meta = getCategoryMeta(event.category);
                  const dateDisplay = parseDateDisplay(event.date);
                  
                  return (
                    <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`relative flex gap-4 md:gap-5 p-5 bg-white border rounded-3xl shadow-xs transition-all duration-300 hover:shadow-md hover:border-blue-100 ${
                        event.isUrgent 
                          ? "border-rose-100 bg-rose-50/10 hover:border-rose-200" 
                          : "border-slate-100"
                      }`}
                    >
                      {/* Left Side: Dynamic Elegant Date Badge */}
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl shrink-0 font-bold bg-slate-50 border border-slate-100 shadow-xs">
                        <span className={`text-base md:text-lg leading-none tracking-tight font-extrabold ${event.isUrgent ? "text-rose-600" : "text-brand-primary"}`}>
                          {dateDisplay.day}
                        </span>
                        <span className="text-[10px] md:text-xs text-slate-500 font-bold mt-1 max-w-full truncate px-1">
                          {dateDisplay.month}
                        </span>
                      </div>

                      {/* Right Side: Information Block */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          {/* Top Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              event.category === "deadline" ? "bg-rose-50 text-rose-600" :
                              event.category === "academic" ? "bg-blue-50 text-blue-600" :
                              "bg-emerald-50 text-emerald-600"
                            }`}>
                              {meta.label}
                            </span>
                            
                            {event.isUrgent && (
                              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] bg-amber-50 text-amber-700 font-bold border border-amber-100 animate-pulse">
                                <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                                <span>ด่วนมาก</span>
                              </span>
                            )}
                          </div>

                          {/* Event Title */}
                          <h3 className="text-sm md:text-base font-extrabold text-slate-900 leading-snug tracking-tight mb-1.5 hover:text-brand-primary transition-colors duration-200">
                            {event.title}
                          </h3>

                          {/* Event Description */}
                          {event.description && (
                            <p className="text-slate-500 text-xs md:text-sm font-medium line-clamp-2 mb-3 leading-relaxed">
                              {event.description}
                            </p>
                          )}
                        </div>

                        {/* Location Details and Status */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-50 pt-2.5 mt-auto">
                          <div className="flex items-center text-slate-400 space-x-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[180px]">
                              {event.location || "วิทยาลัยเทคโนโลยีปทุมรัตต์"}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{event.date}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
