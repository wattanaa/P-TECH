/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  useData
} from "../context/DataContext";
import {
  Building2,
  Users,
  Newspaper,
  Settings,
  Trash2,
  Edit,
  Plus,
  CheckCircle,
  Mail,
  Phone,
  Clock,
  Search,
  Printer,
  RefreshCw,
  X,
  ChevronRight,
  ShieldAlert,
  Award,
  Eye,
  GraduationCap
} from "lucide-react";
import CollegeLogo from "./CollegeLogo";
export default function AdminView() {
  const {
    collegeInfo,
    majors,
    newsData,
    enrolledStudents,
    contactMessages,
    updateCollegeInfo,
    addMajor,
    updateMajor,
    deleteMajor,
    addNews,
    updateNews,
    deleteNews,
    updateEnrollmentStatus,
    deleteEnrollment,
    markContactMessageRead,
    deleteContactMessage,
    resetToDefaultData
  } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("ptc_admin_authenticated") === "true";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "admin") {
      sessionStorage.setItem("ptc_admin_authenticated", "true");
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07");
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isEditingCollege, setIsEditingCollege] = useState(false);
  const [tempCollege, setTempCollege] = useState(collegeInfo);
  const [editingMajor, setEditingMajor] = useState(null);
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);
  const [tempMajor, setTempMajor] = useState({
    name: "",
    englishName: "",
    level: "\u0E1B\u0E27\u0E0A.",
    duration: "3 \u0E1B\u0E35",
    description: "",
    features: [""],
    careerPaths: [""],
    icon: "Wrench"
  });
  const [editingNews, setEditingNews] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [tempNews, setTempNews] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "\u0E02\u0E48\u0E32\u0E27\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C",
    imageUrl: ""
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3e3);
  };
  const handleSaveCollege = (e) => {
    e.preventDefault();
    updateCollegeInfo(tempCollege);
    setIsEditingCollege(false);
    triggerToast("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27!");
  };
  const handleSaveMajor = (e) => {
    e.preventDefault();
    if (editingMajor) {
      updateMajor(editingMajor.id, tempMajor);
      triggerToast("\u0E41\u0E01\u0E49\u0E44\u0E02\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!");
    } else {
      addMajor(tempMajor);
      triggerToast("\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32\u0E43\u0E2B\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!");
    }
    setIsMajorModalOpen(false);
    setEditingMajor(null);
  };
  const handleOpenAddMajor = () => {
    setEditingMajor(null);
    setTempMajor({
      name: "",
      englishName: "",
      level: "\u0E1B\u0E27\u0E0A.",
      duration: "3 \u0E1B\u0E35",
      description: "",
      features: [""],
      careerPaths: [""],
      icon: "Wrench"
    });
    setIsMajorModalOpen(true);
  };
  const handleOpenEditMajor = (major) => {
    setEditingMajor(major);
    setTempMajor({
      name: major.name,
      englishName: major.englishName,
      level: major.level,
      duration: major.duration,
      description: major.description,
      features: [...major.features],
      careerPaths: [...major.careerPaths],
      icon: major.icon
    });
    setIsMajorModalOpen(true);
  };
  const handleSaveNews = (e) => {
    e.preventDefault();
    if (!tempNews.imageUrl) {
      tempNews.imageUrl = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop";
    }
    if (editingNews) {
      updateNews(editingNews.id, tempNews);
      triggerToast("\u0E41\u0E01\u0E49\u0E44\u0E02\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!");
    } else {
      addNews(tempNews);
      triggerToast("\u0E40\u0E02\u0E35\u0E22\u0E19\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E43\u0E2B\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!");
    }
    setIsNewsModalOpen(false);
    setEditingNews(null);
  };
  const handleOpenAddNews = () => {
    setEditingNews(null);
    setTempNews({
      title: "",
      excerpt: "",
      content: "",
      category: "\u0E02\u0E48\u0E32\u0E27\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C",
      imageUrl: ""
    });
    setIsNewsModalOpen(true);
  };
  const handleOpenEditNews = (news) => {
    setEditingNews(news);
    setTempNews({
      title: news.title,
      excerpt: news.excerpt,
      content: news.content,
      category: news.category,
      imageUrl: news.imageUrl
    });
    setIsNewsModalOpen(true);
  };
  const pendingAdmissions = enrolledStudents.filter((s) => s.status === "pending").length;
  const approvedAdmissions = enrolledStudents.filter((s) => s.status === "approved").length;
  const unreadMessages = contactMessages.filter((m) => !m.isRead).length;
  if (!isAuthenticated) {
    return <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans" id="admin-login-screen">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
          {
      /* Subtle design accents */
    }
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-primary via-amber-400 to-blue-800" />
          
          <div className="flex flex-col items-center text-center space-y-4">
            {
      /* Handcrafted Official College Seal */
    }
            <CollegeLogo size={110} className="filter drop-shadow-md" />
            
            <div className="space-y-1.5">
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight font-display">
                {collegeInfo.name}
              </h2>
              <p className="text-[10px] font-bold text-brand-primary tracking-wider uppercase">
                {collegeInfo.englishName}
              </p>
              <p className="text-slate-400 text-xs font-semibold pt-1">
                ระบบจัดการเนื้อหาหลักและข้อมูลผู้สมัคร (CMS Portal)
              </p>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-5" id="admin-login-form">
            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold text-slate-500 block">
                รหัสผ่านผู้ดูแลระบบ (Admin Password)
              </label>
              <div className="relative">
                <input
      type={showPassword ? "text" : "password"}
      required
      value={passwordInput}
      onChange={(e) => {
        setPasswordInput(e.target.value);
        if (passwordError) setPasswordError("");
      }}
      placeholder="กรอกรหัสผ่านเพื่อเข้าใช้งาน..."
      className="w-full text-sm pl-4 pr-10 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary focus:outline-none transition-all duration-150 font-medium"
      id="admin-password-input"
      autoFocus
    />
                <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
    >
                  {showPassword ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5 opacity-60" />}
                </button>
              </div>
            </div>

            {passwordError && <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs font-bold"
      id="login-error-message"
    >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </motion.div>}

            <button
      type="submit"
      className="w-full bg-brand-primary hover:bg-blue-800 text-white py-3 px-4 rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
      id="admin-login-submit"
    >
              <span>ยืนยันการเข้าระบบ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              * ข้อมูลภายในระบบนี้ถูกจำกัดสิทธิ์เฉพาะอาจารย์และเจ้าหน้าที่วิทยาลัย PTC เท่านั้น
            </p>
          </div>
        </div>
      </div>;
  }
  return <div className="bg-slate-100 min-h-screen pb-16 pt-6 font-sans">
      {
    /* Toast Alert */
  }
      <AnimatePresence>
        {toastMessage && <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-2xl z-50 flex items-center space-x-2 border border-slate-700"
  >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {
    /* Header Block with System Badges */
  }
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 bg-gradient-to-tr from-brand-primary to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-md">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl md:text-2xl font-extrabold text-brand-secondary font-display tracking-tight">
                  ระบบบริการจัดการฐานข้อมูลหลังบ้าน
                </h1>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-200">
                  PTC Admin Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                ระบบจัดการเนื้อหา (CMS) และประมวลผลข้อมูลผู้สมัครเรียนของ {collegeInfo.name}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <button
    onClick={() => {
      if (confirm("\u0E04\u0E38\u0E13\u0E41\u0E19\u0E48\u0E43\u0E08\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E27\u0E48\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E04\u0E37\u0E19\u0E04\u0E48\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E02\u0E2D\u0E07\u0E23\u0E30\u0E1A\u0E1A\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22? \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E04\u0E38\u0E13\u0E41\u0E01\u0E49\u0E44\u0E02\u0E08\u0E30\u0E2B\u0E32\u0E22\u0E44\u0E1B\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14")) {
        resetToDefaultData();
        setTempCollege(collegeInfo);
        triggerToast("\u0E04\u0E37\u0E19\u0E04\u0E48\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19!");
      }
    }}
    className="flex items-center justify-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer"
  >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>คืนค่าข้อมูลเริ่มต้นของระบบ</span>
            </button>

            <button
    onClick={() => {
      sessionStorage.removeItem("ptc_admin_authenticated");
      setIsAuthenticated(false);
      setPasswordInput("");
      setPasswordError("");
    }}
    className="flex items-center justify-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer"
  >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>

        {
    /* Dashboard Grid */
  }
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold">ใบสมัครค้างตรวจสอบ</p>
              <p className="text-2xl font-extrabold text-amber-500 font-display">{pendingAdmissions} <span className="text-xs font-medium text-slate-400">รายการ</span></p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold">ใบสมัครที่อนุมัติแล้ว</p>
              <p className="text-2xl font-extrabold text-emerald-600 font-display">{approvedAdmissions} <span className="text-xs font-medium text-slate-400">รายการ</span></p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold">จำนวนหลักสูตร/สาขาวิชา</p>
              <p className="text-2xl font-extrabold text-blue-600 font-display">{majors.length} <span className="text-xs font-medium text-slate-400">สาขา</span></p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold">ข้อความค้างอ่าน</p>
              <p className="text-2xl font-extrabold text-rose-500 font-display">{unreadMessages} <span className="text-xs font-medium text-slate-400">ข้อความ</span></p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
              <Mail className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>

        {
    /* Administration Core Navigation Layout */
  }
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {
    /* Left Side Sidebar - Menu Sub-tabs */
  }
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-4 space-y-1.5 shadow-sm">
            <p className="text-slate-400 text-[10px] font-extrabold uppercase px-3 pb-2 border-b border-slate-100 tracking-wider">
              ส่วนงานบริหารระบบ
            </p>
            {[
    { id: "overview", label: "\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01\u0E2A\u0E32\u0E23\u0E2A\u0E19\u0E40\u0E17\u0E28", icon: Building2 },
    { id: "college", label: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22 & \u0E2A\u0E32\u0E2A\u0E4C\u0E19", icon: Settings },
    { id: "majors", label: "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32\u0E2B\u0E25\u0E31\u0E01\u0E2A\u0E39\u0E15\u0E23", icon: Award },
    { id: "news", label: "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21", icon: Newspaper },
    { id: "admissions", label: "\u0E23\u0E30\u0E1A\u0E1A\u0E1C\u0E39\u0E49\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C", icon: Users, count: pendingAdmissions },
    { id: "contacts", label: "\u0E01\u0E25\u0E48\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D", icon: Mail, count: unreadMessages }
  ].map((subTab) => {
    const IconComp = subTab.icon;
    return <button
      key={subTab.id}
      onClick={() => {
        setActiveSubTab(subTab.id);
        setSearchQuery("");
      }}
      className={`w-full text-left flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-150 ${activeSubTab === subTab.id ? "bg-brand-primary text-white shadow-md shadow-blue-500/15" : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"}`}
    >
                  <div className="flex items-center space-x-2.5">
                    <IconComp className="w-4 h-4 shrink-0" />
                    <span>{subTab.label}</span>
                  </div>
                  {subTab.count !== void 0 && subTab.count > 0 && <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeSubTab === subTab.id ? "bg-white text-brand-primary" : "bg-rose-500 text-white"}`}>
                      {subTab.count}
                    </span>}
                </button>;
  })}
          </div>

          {
    /* Right Side Working stage */
  }
          <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm min-h-[500px]">
            {
    /* SUB-TAB 1: Overview and Statistics */
  }
            {activeSubTab === "overview" && <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800 font-display">
                    หน้าแรกสารสนเทศภาพรวมวิทยาลัย
                  </h2>
                  <p className="text-xs text-slate-500">
                    สรุปกิจกรรม ข้อมูลการวิเคราะห์ล่าสุด และข้อคำถามเร่งด่วนจากหน้าบ้าน
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {
    /* Recent registrations box */
  }
                  <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <h3 className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>ใบสมัครล่าสุดเข้ามาใหม่</span>
                      </h3>
                      <button
    onClick={() => setActiveSubTab("admissions")}
    className="text-brand-primary hover:underline text-[10px] font-bold"
  >
                        ดูทั้งหมด
                      </button>
                    </div>

                    <div className="space-y-3">
                      {enrolledStudents.slice(0, 3).map((student) => <div key={student.id} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                          <div>
                            <p className="font-bold text-slate-800">{student.fullName}</p>
                            <p className="text-[10px] text-slate-400">สนใจ: {student.levelInterest} {majors.find((m) => m.id === student.majorInterest)?.name || student.majorInterest}</p>
                          </div>
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${student.status === "approved" ? "bg-emerald-100 text-emerald-800" : student.status === "verified" ? "bg-blue-100 text-blue-800" : student.status === "rejected" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`}>
                            {student.status === "approved" ? "\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34\u0E41\u0E25\u0E49\u0E27" : student.status === "verified" ? "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E41\u0E25\u0E49\u0E27" : student.status === "rejected" ? "\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E44\u0E21\u0E48\u0E1C\u0E48\u0E32\u0E19" : "\u0E23\u0E2D\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A"}
                          </span>
                        </div>)}
                      {enrolledStudents.length === 0 && <p className="text-xs text-slate-400 text-center py-4">ไม่มีประวัติการสมัครในขณะนี้</p>}
                    </div>
                  </div>

                  {
    /* Recent messages box */
  }
                  <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <h3 className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                        <Mail className="w-4 h-4 text-rose-500" />
                        <span>คำถามล่าสุดจากหน้าติดต่อเรา</span>
                      </h3>
                      <button
    onClick={() => setActiveSubTab("contacts")}
    className="text-brand-primary hover:underline text-[10px] font-bold"
  >
                        ดูทั้งหมด
                      </button>
                    </div>

                    <div className="space-y-3">
                      {contactMessages.slice(0, 3).map((msg) => <div
    key={msg.id}
    onClick={() => {
      markContactMessageRead(msg.id);
      setActiveSubTab("contacts");
    }}
    className={`p-2.5 rounded-xl border cursor-pointer transition-all duration-150 flex justify-between items-start text-xs ${msg.isRead ? "bg-slate-50/50 border-slate-100" : "bg-rose-50/40 border-rose-100 font-semibold"}`}
  >
                          <div className="space-y-0.5 max-w-[80%]">
                            <p className="text-slate-800 truncate">{msg.subject}</p>
                            <p className="text-[10px] text-slate-400 truncate">โดย: {msg.name}</p>
                          </div>
                          {!msg.isRead && <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />}
                        </div>)}
                      {contactMessages.length === 0 && <p className="text-xs text-slate-400 text-center py-4">ไม่มีข้อความใหม่</p>}
                    </div>
                  </div>
                </div>

                {
    /* Developer / Admin Instructions card */
  }
                <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 space-y-3 shadow-md">
                  <h3 className="text-sm font-bold flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>คำแนะนำสำหรับเจ้าหน้าที่ดูแลระบบ</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    ระบบหลังบ้านนี้ควบคุมข้อมูลใน <span className="text-amber-300">localStorage</span> ของเบราว์เซอร์คุณโดยตรง 
                    ทุกความเปลี่ยนแปลงจะปรากฏในหน้าหลักของวิทยาลัยทันที ช่วยให้อาจารย์และผู้ประเมินระบบจำลองการทำงานจริง
                    ไม่ว่าจะเป็นการอนุมัติใบสมัครออนไลน์ การเพิ่มสาขาวิชาช่างยนต์/ไฟฟ้า การแก้ชื่อประกาศข่าวจัดซื้อจัดจ้าง ฯลฯ
                  </p>
                  <p className="text-[10px] text-slate-400">
                    *หากต้องการรีเซ็ตข้อมูลทั้งหมดเพื่อเริ่มทำสอบโปรแกรมใหม่ ให้ใช้ปุ่ม "คืนค่าข้อมูลเริ่มต้นของระบบ" ด้านบน
                  </p>
                </div>
              </div>}

            {
    /* SUB-TAB 2: Manage College Info */
  }
            {activeSubTab === "college" && <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800 font-display">
                      จัดการข้อมูลทั่วไปและสาส์นผู้อำนวยการ
                    </h2>
                    <p className="text-xs text-slate-500">
                      ปรับเปลี่ยนที่อยู่, เบอร์โทรศัพท์ติดต่อ, ค่านิยม และสาส์นต้อนรับหน้าแรก
                    </p>
                  </div>
                  {!isEditingCollege && <button
    onClick={() => {
      setTempCollege({ ...collegeInfo });
      setIsEditingCollege(true);
    }}
    className="flex items-center space-x-1 bg-brand-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
  >
                      <Edit className="w-3.5 h-3.5" />
                      <span>แก้ไขข้อมูลทั่วไป</span>
                    </button>}
                </div>

                {isEditingCollege ? <form onSubmit={handleSaveCollege} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">ชื่อวิทยาลัย (ภาษาไทย)</label>
                        <input
    type="text"
    required
    value={tempCollege.name}
    onChange={(e) => setTempCollege({ ...tempCollege, name: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">ชื่อวิทยาลัย (ภาษาอังกฤษ)</label>
                        <input
    type="text"
    required
    value={tempCollege.englishName}
    onChange={(e) => setTempCollege({ ...tempCollege, englishName: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[11px] font-bold text-slate-500">ปรัชญาสถานศึกษา</label>
                        <input
    type="text"
    required
    value={tempCollege.philosophy}
    onChange={(e) => setTempCollege({ ...tempCollege, philosophy: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[11px] font-bold text-slate-500">วิสัยทัศน์</label>
                        <textarea
    rows={3}
    required
    value={tempCollege.vision}
    onChange={(e) => setTempCollege({ ...tempCollege, vision: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">อัตลักษณ์</label>
                        <input
    type="text"
    required
    value={tempCollege.identity}
    onChange={(e) => setTempCollege({ ...tempCollege, identity: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">เอกลักษณ์</label>
                        <input
    type="text"
    required
    value={tempCollege.uniqueness}
    onChange={(e) => setTempCollege({ ...tempCollege, uniqueness: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[11px] font-bold text-slate-500">ที่ตั้ง / ที่อยู่ติดต่อ</label>
                        <input
    type="text"
    required
    value={tempCollege.address}
    onChange={(e) => setTempCollege({ ...tempCollege, address: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">เบอร์โทรสาร</label>
                        <input
    type="text"
    value={tempCollege.phone}
    onChange={(e) => setTempCollege({ ...tempCollege, phone: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">เบอร์มือถือรับสายหลัก</label>
                        <input
    type="text"
    value={tempCollege.mobile}
    onChange={(e) => setTempCollege({ ...tempCollege, mobile: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">อีเมลทางการ</label>
                        <input
    type="email"
    value={tempCollege.email}
    onChange={(e) => setTempCollege({ ...tempCollege, email: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">Facebook URL</label>
                        <input
    type="text"
    value={tempCollege.facebook}
    onChange={(e) => setTempCollege({ ...tempCollege, facebook: e.target.value })}
    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
                      </div>
                    </div>

                    <div className="flex space-x-3 justify-end pt-4 border-t border-slate-100">
                      <button
    type="button"
    onClick={() => setIsEditingCollege(false)}
    className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
  >
                        ยกเลิก
                      </button>
                      <button
    type="submit"
    className="bg-brand-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
  >
                        บันทึกการแก้ไข
                      </button>
                    </div>
                  </form> : <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">วิทยาลัย</p>
                          <p className="text-sm font-extrabold text-slate-800">{collegeInfo.name}</p>
                          <p className="text-[11px] text-slate-500">{collegeInfo.englishName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">ปีที่ก่อตั้ง</p>
                          <p className="text-xs font-semibold text-slate-700">พ.ศ. {collegeInfo.foundedYear}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">ที่ตั้งสำนักงาน</p>
                          <p className="text-xs font-medium text-slate-600 leading-relaxed">{collegeInfo.address}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">ปรัชญา</p>
                          <p className="text-xs font-bold text-brand-primary">“{collegeInfo.philosophy}”</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">วิสัยทัศน์</p>
                          <p className="text-xs font-medium text-slate-600 leading-relaxed">{collegeInfo.vision}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">อัตลักษณ์</p>
                            <p className="text-xs font-semibold text-slate-700">{collegeInfo.identity}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">เอกลักษณ์</p>
                            <p className="text-xs font-semibold text-slate-700">{collegeInfo.uniqueness}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                      <h3 className="text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">ช่องทางการติดต่อวิทยาลัย</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                          <span>เบอร์โทร: {collegeInfo.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>เบอร์มือถือ: {collegeInfo.mobile}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-red-500 shrink-0" />
                          <span>อีเมล: {collegeInfo.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span>Facebook: {collegeInfo.facebook}</span>
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>}

            {
    /* SUB-TAB 3: Manage Majors / Curriculums */
  }
            {activeSubTab === "majors" && <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800 font-display">
                      จัดการสาขาวิชาในหลักสูตร (ปวช. / ปวส.)
                    </h2>
                    <p className="text-xs text-slate-500">
                      เพิ่ม ลบ หรือแก้ไขข้อมูลสาขาวิชาที่เปิดรับสมัครจริง
                    </p>
                  </div>
                  <button
    onClick={handleOpenAddMajor}
    className="flex items-center space-x-1 bg-brand-primary hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>เพิ่มสาขาวิชาใหม่</span>
                  </button>
                </div>

                {
    /* Majors list table */
  }
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-extrabold uppercase">
                        <th className="p-4">ระดับ</th>
                        <th className="p-4">ชื่อสาขาวิชา</th>
                        <th className="p-4">ระยะเวลาศึกษา</th>
                        <th className="p-4 text-right">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {majors.map((major) => <tr key={major.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-bold">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${major.level === "\u0E1B\u0E27\u0E2A." ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                              {major.level}
                            </span>
                          </td>
                          <td className="p-4">
                            <p className="font-extrabold text-slate-800">{major.name}</p>
                            <p className="text-[10px] text-slate-400 italic font-mono">{major.englishName}</p>
                          </td>
                          <td className="p-4 text-slate-500">{major.duration}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <button
    onClick={() => handleOpenEditMajor(major)}
    className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
    title="แก้ไขสาขาวิชา"
  >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
    onClick={() => {
      if (confirm(`\u0E04\u0E38\u0E13\u0E41\u0E19\u0E48\u0E43\u0E08\u0E27\u0E48\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E2B\u0E25\u0E31\u0E01\u0E2A\u0E39\u0E15\u0E23 ${major.name} (${major.level}) \u0E43\u0E0A\u0E48\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48?`)) {
        deleteMajor(major.id);
        triggerToast(`\u0E25\u0E1A\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32 ${major.name} \u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!`);
      }
    }}
    className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
    title="ลบสาขาวิชา"
  >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>}

            {
    /* SUB-TAB 4: Manage News */
  }
            {activeSubTab === "news" && <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800 font-display">
                      จัดการหัวข้อข่าวสารและกิจกรรมประชาสัมพันธ์
                    </h2>
                    <p className="text-xs text-slate-500">
                      สร้างหัวข้อข่าวใหม่ แก้ไขประกาศสำคัญ หรือลบข่าวสารที่พ้นกำหนด
                    </p>
                  </div>
                  <button
    onClick={handleOpenAddNews}
    className="flex items-center space-x-1 bg-brand-primary hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>เขียนประกาศข่าวใหม่</span>
                  </button>
                </div>

                {
    /* News Table */
  }
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-extrabold uppercase">
                        <th className="p-4">หมวดหมู่</th>
                        <th className="p-4">หัวข้อข่าวสาร</th>
                        <th className="p-4">วันที่ลง</th>
                        <th className="p-4">ยอดดู</th>
                        <th className="p-4 text-right">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {newsData.map((news) => <tr key={news.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                            <span className="bg-slate-100 border border-slate-200 text-slate-600 font-bold px-2 py-1 rounded-md text-[10px]">
                              {news.category}
                            </span>
                          </td>
                          <td className="p-4 max-w-xs md:max-w-md">
                            <p className="font-extrabold text-slate-800 truncate">{news.title}</p>
                            <p className="text-[10px] text-slate-400 truncate">{news.excerpt}</p>
                          </td>
                          <td className="p-4 text-slate-500">{news.date}</td>
                          <td className="p-4 text-slate-500">{news.views} ครั้ง</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <button
    onClick={() => handleOpenEditNews(news)}
    className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
  >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
    onClick={() => {
      if (confirm(`\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D "${news.title}" \u0E43\u0E0A\u0E48\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48?`)) {
        deleteNews(news.id);
        triggerToast("\u0E25\u0E1A\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!");
      }
    }}
    className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
  >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>}

            {
    /* SUB-TAB 5: Online Admissions Applications Manager */
  }
            {activeSubTab === "admissions" && <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800 font-display">
                    ระบบจัดการใบสมัครเรียนออนไลน์
                  </h2>
                  <p className="text-xs text-slate-500">
                    ค้นหาผู้สมัครงาน ตรวจคุณสมบัติเกรดเฉลี่ย (GPA) และเปลี่ยนสถานะใบสมัครของผู้สมัครเรียน
                  </p>
                </div>

                {
    /* Filter and Search controls */
  }
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                    <input
    type="text"
    placeholder="ค้นหาด้วยชื่อผู้สมัคร หรือรหัสใบสมัคร..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full text-xs pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
  />
                  </div>

                  <div className="flex space-x-2">
                    {["all", "pending", "verified", "approved", "rejected"].map((stat) => <button
    key={stat}
    onClick={() => setStatusFilter(stat)}
    className={`text-[10px] font-extrabold px-3 py-2 rounded-xl border transition-all ${statusFilter === stat ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
  >
                        {stat === "all" ? "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : stat === "pending" ? "\u0E23\u0E2D\u0E15\u0E23\u0E27\u0E08" : stat === "verified" ? "\u0E15\u0E23\u0E27\u0E08\u0E41\u0E25\u0E49\u0E27" : stat === "approved" ? "\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34" : "\u0E44\u0E21\u0E48\u0E1C\u0E48\u0E32\u0E19"}
                      </button>)}
                  </div>
                </div>

                {
    /* Student list table */
  }
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-extrabold uppercase">
                        <th className="p-4">รหัสสมัคร</th>
                        <th className="p-4">ชื่อ-สกุล</th>
                        <th className="p-4">ระดับที่สมัคร / สาขาวิชา</th>
                        <th className="p-4">เกรดเฉลี่ย</th>
                        <th className="p-4">สถานะ</th>
                        <th className="p-4 text-right">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {enrolledStudents.filter((s) => {
    const matchesSearch = s.fullName.includes(searchQuery) || s.id.includes(searchQuery);
    const matchesFilter = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesFilter;
  }).map((student) => <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono font-bold text-slate-600">{student.id}</td>
                            <td className="p-4">
                              <p className="font-extrabold text-slate-800">{student.fullName}</p>
                              <p className="text-[10px] text-slate-400">โทร: {student.phone}</p>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-slate-800">{student.levelInterest} </span>
                              <span className="text-slate-500">
                                {majors.find((m) => m.id === student.majorInterest)?.name || student.majorInterest}
                              </span>
                            </td>
                            <td className="p-4 font-mono font-bold text-blue-600">{student.prevGpa}</td>
                            <td className="p-4">
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${student.status === "approved" ? "bg-emerald-100 text-emerald-800" : student.status === "verified" ? "bg-blue-100 text-blue-800" : student.status === "rejected" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`}>
                                {student.status === "approved" ? "\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34\u0E41\u0E25\u0E49\u0E27" : student.status === "verified" ? "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E41\u0E25\u0E49\u0E27" : student.status === "rejected" ? "\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E44\u0E21\u0E48\u0E1C\u0E48\u0E32\u0E19" : "\u0E23\u0E2D\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A"}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <button
    onClick={() => setSelectedStudent(student)}
    className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors flex items-center space-x-1"
    title="ดูใบสมัครเต็มรูปแบบ"
  >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span className="text-[10px] font-bold">เปิดดู</span>
                                </button>
                                <select
    value={student.status}
    onChange={(e) => {
      updateEnrollmentStatus(student.id, e.target.value);
      triggerToast(`\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E02\u0E2D\u0E07 ${student.fullName} \u0E40\u0E1B\u0E47\u0E19 ${e.target.value}`);
    }}
    className="text-[10px] bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 font-bold focus:outline-none"
  >
                                  <option value="pending">รอตรวจสอบ</option>
                                  <option value="verified">ตรวจสอบแล้ว</option>
                                  <option value="approved">อนุมัติเรียน</option>
                                  <option value="rejected">ไม่ผ่านเกณฑ์</option>
                                </select>
                              </div>
                            </td>
                          </tr>)}
                      {enrolledStudents.length === 0 && <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            ไม่มีใบสมัครในระดับ/เงื่อนไขนี้
                          </td>
                        </tr>}
                    </tbody>
                  </table>
                </div>
              </div>}

            {
    /* SUB-TAB 6: Manage Contact us Questions / Feedbacks */
  }
            {activeSubTab === "contacts" && <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800 font-display">
                    กล่องจดหมายข้อความติดต่อฝ่ายประชาสัมพันธ์
                  </h2>
                  <p className="text-xs text-slate-500">
                    ตอบรับความช่วยเหลือข้อแนะนำที่กรอกจากหน้าเว็บไซต์
                  </p>
                </div>

                <div className="space-y-4">
                  {contactMessages.map((msg) => <div
    key={msg.id}
    className={`border rounded-2xl p-5 transition-all relative ${msg.isRead ? "bg-slate-50/50 border-slate-200" : "bg-rose-50/20 border-rose-200 shadow-sm"}`}
  >
                      {!msg.isRead && <span className="absolute top-4 right-4 bg-rose-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                          ใหม่
                        </span>}
                      
                      <div className="space-y-3">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-1">
                          <div>
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                              {msg.id}
                            </span>
                            <h3 className="text-sm font-extrabold text-slate-800 mt-1.5">{msg.subject}</h3>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center space-x-1.5">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(msg.submittedAt).toLocaleString("th-TH")}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 bg-white border border-slate-100 rounded-xl p-3.5 leading-relaxed font-medium">
                          {msg.message}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 border-t border-slate-100 text-[10px] text-slate-500 gap-2">
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <span className="font-bold">ผู้ส่ง: <span className="text-slate-800">{msg.name}</span></span>
                            <span>อีเมล: <span className="text-slate-800 underline">{msg.email}</span></span>
                          </div>
                          <div className="flex space-x-2 w-full sm:w-auto justify-end">
                            {!msg.isRead && <button
    onClick={() => {
      markContactMessageRead(msg.id);
      triggerToast("\u0E17\u0E33\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2B\u0E21\u0E32\u0E22\u0E27\u0E48\u0E32\u0E2D\u0E48\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27!");
    }}
    className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all"
  >
                                อ่านแล้ว
                              </button>}
                            <button
    onClick={() => {
      if (confirm("\u0E04\u0E38\u0E13\u0E41\u0E19\u0E48\u0E43\u0E08\u0E27\u0E48\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E19\u0E35\u0E49\u0E17\u0E34\u0E49\u0E07\u0E16\u0E32\u0E27\u0E23?")) {
        deleteContactMessage(msg.id);
        triggerToast("\u0E25\u0E1A\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22!");
      }
    }}
    className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all flex items-center space-x-1"
  >
                              <Trash2 className="w-3 h-3" />
                              <span>ลบ</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>)}

                  {contactMessages.length === 0 && <div className="text-center py-12 text-slate-400 text-xs">
                      กล่องข้อความว่างเปล่า ไม่มีจดหมายติดต่อในขณะนี้
                    </div>}
                </div>
              </div>}
          </div>
        </div>
      </div>

      {
    /* ==================== MODALS / OVERLAYS ==================== */
  }

      {
    /* 1. Modal for Major edit/create */
  }
      <AnimatePresence>
        {isMajorModalOpen && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
  >
              <div className="bg-brand-secondary text-white p-5 flex justify-between items-center">
                <h3 className="font-extrabold text-sm md:text-base font-display">
                  {editingMajor ? `\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E25\u0E31\u0E01\u0E2A\u0E39\u0E15\u0E23: ${editingMajor.name}` : "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2B\u0E25\u0E31\u0E01\u0E2A\u0E39\u0E15\u0E23\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32\u0E43\u0E2B\u0E21\u0E48"}
                </h3>
                <button onClick={() => setIsMajorModalOpen(false)} className="text-white hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMajor} className="p-6 overflow-y-auto space-y-4 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ระดับการศึกษา</label>
                    <select
    value={tempMajor.level}
    onChange={(e) => setTempMajor({ ...tempMajor, level: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold"
  >
                      <option value="ปวช.">ปวช. (ประกาศนียบัตรวิชาชีพ)</option>
                      <option value="ปวส.">ปวส. (ประกาศนียบัตรวิชาชีพชั้นสูง)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ระยะเวลาเรียนตามหลักสูตร</label>
                    <input
    type="text"
    required
    value={tempMajor.duration}
    onChange={(e) => setTempMajor({ ...tempMajor, duration: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
    placeholder="เช่น 3 ปี หรือ 2 ปี"
  />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ชื่อสาขาวิชา (ภาษาไทย)</label>
                    <input
    type="text"
    required
    value={tempMajor.name}
    onChange={(e) => setTempMajor({ ...tempMajor, name: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
    placeholder="เช่น สาขาวิชาช่างไฟฟ้ากำลัง"
  />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ชื่อสาขาวิชา (ภาษาอังกฤษ)</label>
                    <input
    type="text"
    required
    value={tempMajor.englishName}
    onChange={(e) => setTempMajor({ ...tempMajor, englishName: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
    placeholder="เช่น Electrical Power"
  />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="font-bold text-slate-600">คำอธิบายหลักสูตรย่อ</label>
                    <textarea
    required
    rows={3}
    value={tempMajor.description}
    onChange={(e) => setTempMajor({ ...tempMajor, description: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
    placeholder="อธิบายว่าเรียนอะไรบ้าง และมุ่งเน้นเสริมสร้างคุณสมบัติไหนแก่ผู้เรียน..."
  />
                  </div>

                  {
    /* Features inputs list */
  }
                  <div className="space-y-2.5 md:col-span-2 border-t border-slate-100 pt-3">
                    <label className="font-bold text-slate-700 flex justify-between items-center">
                      <span>จุดเด่นทักษะเด่นของสาขา (ข้อดี)</span>
                      <button
    type="button"
    onClick={() => setTempMajor({ ...tempMajor, features: [...tempMajor.features, ""] })}
    className="text-brand-primary text-[10px] font-bold border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-50"
  >
                        + เพิ่มจุดเด่น
                      </button>
                    </label>
                    {tempMajor.features.map((feature, idx) => <div key={idx} className="flex items-center space-x-2">
                        <input
    type="text"
    required
    value={feature}
    onChange={(e) => {
      const copy = [...tempMajor.features];
      copy[idx] = e.target.value;
      setTempMajor({ ...tempMajor, features: copy });
    }}
    className="w-full p-2 border border-slate-300 rounded-xl text-xs"
    placeholder={`\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19\u0E02\u0E49\u0E2D\u0E17\u0E35\u0E48 ${idx + 1}`}
  />
                        {tempMajor.features.length > 1 && <button
    type="button"
    onClick={() => {
      const copy = tempMajor.features.filter((_, fIdx) => fIdx !== idx);
      setTempMajor({ ...tempMajor, features: copy });
    }}
    className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg"
  >
                            <Trash2 className="w-4 h-4" />
                          </button>}
                      </div>)}
                  </div>

                  {
    /* Career Paths inputs list */
  }
                  <div className="space-y-2.5 md:col-span-2 border-t border-slate-100 pt-3">
                    <label className="font-bold text-slate-700 flex justify-between items-center">
                      <span>สายงานอาชีพหลังเรียนจบ (Careers)</span>
                      <button
    type="button"
    onClick={() => setTempMajor({ ...tempMajor, careerPaths: [...tempMajor.careerPaths, ""] })}
    className="text-brand-primary text-[10px] font-bold border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-50"
  >
                        + เพิ่มอาชีพ
                      </button>
                    </label>
                    {tempMajor.careerPaths.map((path, idx) => <div key={idx} className="flex items-center space-x-2">
                        <input
    type="text"
    required
    value={path}
    onChange={(e) => {
      const copy = [...tempMajor.careerPaths];
      copy[idx] = e.target.value;
      setTempMajor({ ...tempMajor, careerPaths: copy });
    }}
    className="w-full p-2 border border-slate-300 rounded-xl text-xs"
    placeholder={`\u0E2A\u0E32\u0E22\u0E2D\u0E32\u0E0A\u0E35\u0E1E\u0E17\u0E35\u0E48 ${idx + 1}`}
  />
                        {tempMajor.careerPaths.length > 1 && <button
    type="button"
    onClick={() => {
      const copy = tempMajor.careerPaths.filter((_, pIdx) => pIdx !== idx);
      setTempMajor({ ...tempMajor, careerPaths: copy });
    }}
    className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg"
  >
                            <Trash2 className="w-4 h-4" />
                          </button>}
                      </div>)}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                  <button
    type="button"
    onClick={() => setIsMajorModalOpen(false)}
    className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2 rounded-xl font-bold"
  >
                    ยกเลิก
                  </button>
                  <button
    type="submit"
    className="bg-brand-primary hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold shadow-md"
  >
                    ยืนยันบันทึกข้อมูล
                  </button>
                </div>
              </form>
            </motion.div>
          </div>}
      </AnimatePresence>

      {
    /* 2. Modal for News edit/create */
  }
      <AnimatePresence>
        {isNewsModalOpen && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
  >
              <div className="bg-brand-secondary text-white p-5 flex justify-between items-center">
                <h3 className="font-extrabold text-sm md:text-base font-display">
                  {editingNews ? "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E1B\u0E23\u0E30\u0E01\u0E32\u0E28\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23" : "\u0E40\u0E02\u0E35\u0E22\u0E19\u0E41\u0E25\u0E30\u0E25\u0E07\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E43\u0E2B\u0E21\u0E48"}
                </h3>
                <button onClick={() => setIsNewsModalOpen(false)} className="text-white hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNews} className="p-6 overflow-y-auto space-y-4 flex-grow text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">หัวข้อข่าวสาร/ประกาศ (หัวข้อใหญ่)</label>
                  <input
    type="text"
    required
    value={tempNews.title}
    onChange={(e) => setTempNews({ ...tempNews, title: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold text-slate-800"
    placeholder="ใส่หัวข้อข่าวที่ชัดเจน ดึงดูดความสนใจ..."
  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">หมวดหมู่ข่าว</label>
                    <select
    value={tempNews.category}
    onChange={(e) => setTempNews({ ...tempNews, category: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold text-slate-700"
  >
                      <option value="ข่าวประชาสัมพันธ์">ข่าวประชาสัมพันธ์</option>
                      <option value="ข่าววิชาการ">ข่าววิชาการ</option>
                      <option value="ข่าวกิจกรรม">ข่าวกิจกรรม</option>
                      <option value="ข่าวจัดซื้อจัดจ้าง">ข่าวจัดซื้อจัดจ้าง</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">รูปภาพปกข่าวสาร (URL ลิงก์รูปภาพ)</label>
                    <input
    type="text"
    value={tempNews.imageUrl}
    onChange={(e) => setTempNews({ ...tempNews, imageUrl: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
    placeholder="เช่น https://images.unsplash.com/... หรือเว้นว่างเพื่อใช้ภาพจำลอง"
  />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600">คำโปรยย่อ (Excerpt)</label>
                  <input
    type="text"
    required
    value={tempNews.excerpt}
    onChange={(e) => setTempNews({ ...tempNews, excerpt: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
    placeholder="สรุปเนื้อหาข่าวสารใน 1-2 บรรทัด เพื่อโชว์ที่หน้าการ์ดแรก..."
  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600">เนื้อหาข่าวแบบละเอียด (Content)</label>
                  <textarea
    required
    rows={8}
    value={tempNews.content}
    onChange={(e) => setTempNews({ ...tempNews, content: e.target.value })}
    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 leading-relaxed font-mono"
    placeholder="ใส่รายละเอียดทั้งหมดของข่าวประชาสัมพันธ์ สามารถขึ้นบรรทัดใหม่ได้..."
  />
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                  <button
    type="button"
    onClick={() => setIsNewsModalOpen(false)}
    className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2 rounded-xl font-bold"
  >
                    ยกเลิก
                  </button>
                  <button
    type="submit"
    className="bg-brand-primary hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold shadow-md"
  >
                    ยืนยันเขียนประกาศ
                  </button>
                </div>
              </form>
            </motion.div>
          </div>}
      </AnimatePresence>

      {
    /* 3. Modal/Receipt detail for Enrolled Student */
  }
      <AnimatePresence>
        {selectedStudent && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col"
    id="student-receipt-modal"
  >
              <div className="bg-brand-secondary text-white p-5 flex justify-between items-center print:hidden">
                <h3 className="font-extrabold text-xs md:text-sm flex items-center space-x-2">
                  <Printer className="w-4 h-4 text-amber-300" />
                  <span>หลักฐานและใบสมัครสอบคัดเลือกนักเรียนใหม่</span>
                </h3>
                <button onClick={() => setSelectedStudent(null)} className="text-white hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {
    /* Printable Area */
  }
              <div className="p-6 md:p-10 space-y-6 text-slate-800" id="admission-printable-content">
                {
    /* Receipt Header Badge */
  }
                <div className="text-center space-y-2 border-b border-dashed border-slate-200 pb-5">
                  <GraduationCap className="w-10 h-10 text-brand-primary mx-auto" />
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">{collegeInfo.name}</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{collegeInfo.englishName}</p>
                    <p className="text-[11px] text-slate-500 font-bold bg-slate-100 py-1 px-3 rounded-full inline-block mt-2">
                      ใบเสร็จรับเงิน/หลักฐานการยืนยันการรับสมัครออนไลน์ ปีการศึกษา 2570
                    </p>
                  </div>
                </div>

                {
    /* Info Block */
  }
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">รหัสผู้สมัครสอบคัดเลือก</p>
                    <p className="font-mono font-extrabold text-brand-primary text-sm">{selectedStudent.id}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">วันที่ยื่นเรื่องเข้าระบบ</p>
                    <p className="font-semibold text-slate-700">{new Date(selectedStudent.submittedAt).toLocaleDateString("th-TH")} เวลา {new Date(selectedStudent.submittedAt).toLocaleTimeString("th-TH")}</p>
                  </div>

                  <div className="space-y-1 md:col-span-2 border-t border-slate-100 pt-3">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ชื่อ-นามสกุล ผู้สมัครเรียน</p>
                    <p className="font-extrabold text-slate-800 text-sm">{selectedStudent.fullName}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">เลขบัตรประจำตัวประชาชน</p>
                    <p className="font-mono font-bold text-slate-700">{selectedStudent.citizenId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">เบอร์โทรศัพท์ติดต่อประสานงาน</p>
                    <p className="font-bold text-slate-700">{selectedStudent.phone}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">อีเมลติดต่อกลับ</p>
                    <p className="text-slate-600 underline">{selectedStudent.email || "\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E30\u0E1A\u0E38"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">เกรดเฉลี่ยสะสม (GPA)</p>
                    <p className="font-mono font-extrabold text-blue-600">{selectedStudent.prevGpa}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">โรงเรียนเดิมที่สำเร็จการศึกษา</p>
                    <p className="font-bold text-slate-700">{selectedStudent.prevSchool}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">สาขาที่สมัครเรียน</p>
                    <p className="font-extrabold text-slate-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg inline-block text-[11px]">
                      {selectedStudent.levelInterest} {majors.find((m) => m.id === selectedStudent.majorInterest)?.name || selectedStudent.majorInterest}
                    </p>
                  </div>

                  <div className="space-y-1 md:col-span-2 border-t border-slate-100 pt-3">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ที่อยู่จัดส่งเอกสารและตารางสอบ</p>
                    <p className="text-slate-600 font-medium leading-relaxed">{selectedStudent.address}</p>
                  </div>
                </div>

                {
    /* Stamp and sign area */
  }
                <div className="flex justify-between items-center pt-8 border-t border-slate-200">
                  <div className="space-y-1 text-center border-2 border-dashed border-emerald-500/20 p-3 rounded-2xl bg-emerald-50/10">
                    <p className="text-[10px] text-slate-400">สถานะเอกสารปัจจุบัน</p>
                    <p className={`text-xs font-extrabold ${selectedStudent.status === "approved" ? "text-emerald-600" : selectedStudent.status === "verified" ? "text-blue-600" : "text-amber-500"}`}>
                      {selectedStudent.status === "approved" ? "\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34\u0E21\u0E35\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E2A\u0E2D\u0E1A\u0E41\u0E25\u0E49\u0E27" : selectedStudent.status === "verified" ? "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23" : "\u0E23\u0E2D\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E15\u0E23\u0E27\u0E08\u0E17\u0E32\u0E19"}
                    </p>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="w-32 h-1 bg-slate-300 mx-auto" />
                    <p className="text-[10px] text-slate-400">ลงชื่อ นายทะเบียนวิทยาลัย</p>
                    <p className="text-[9px] text-slate-500 italic">งานรับสมัครเทคโนโลยีปทุมรัตต์</p>
                  </div>
                </div>
              </div>

              {
    /* Action Buttons */
  }
              <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-200 print:hidden">
                <div className="flex space-x-2">
                  <button
    onClick={() => {
      updateEnrollmentStatus(selectedStudent.id, "approved");
      setSelectedStudent({ ...selectedStudent, status: "approved" });
      triggerToast("\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34\u0E43\u0E1A\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27");
    }}
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
  >
                    อนุมัติใบสมัคร
                  </button>
                  <button
    onClick={() => {
      updateEnrollmentStatus(selectedStudent.id, "rejected");
      setSelectedStudent({ ...selectedStudent, status: "rejected" });
      triggerToast("\u0E1B\u0E23\u0E31\u0E1A\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E44\u0E21\u0E48\u0E1C\u0E48\u0E32\u0E19");
    }}
    className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs px-4 py-2 rounded-xl transition-all border border-rose-200"
  >
                    ปฏิเสธ/เอกสารไม่ผ่าน
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
    onClick={() => {
      window.print();
    }}
    className="bg-slate-900 hover:bg-black text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all flex items-center space-x-1"
  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>พิมพ์ใบสมัคร</span>
                  </button>
                  <button
    type="button"
    onClick={() => setSelectedStudent(null)}
    className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-extrabold text-xs px-4 py-2 rounded-xl transition-all"
  >
                    ปิดหน้าต่าง
                  </button>
                </div>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
}
