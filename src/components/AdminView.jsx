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
  ShieldCheck,
  Award,
  Eye,
  GraduationCap,
  Database,
  FileSpreadsheet,
  Download,
  Check,
  ExternalLink,
  FileCode,
  Server,
  HardDrive,
  HelpCircle,
  Image as ImageIcon,
  Sliders
} from "lucide-react";
import CollegeLogo from "./CollegeLogo";
import MenusManager from "./MenusManager";
export default function AdminView() {
  const {
    collegeInfo,
    majors,
    newsData,
    enrolledStudents,
    contactMessages,
    dbSettings,
    setDbSettings,
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
    resetToDefaultData,
    administrators,
    faqList,
    heroSlides,
    addAdministrator,
    updateAdministrator,
    deleteAdministrator,
    addFaq,
    updateFaq,
    deleteFaq,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser
  } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("ptc_admin_authenticated") === "true";
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const uInput = usernameInput.trim().toLowerCase();
    const pInput = passwordInput.trim();
    
    const foundUser = adminUsers.find(
      (u) => u.username.trim().toLowerCase() === uInput && u.password === pInput
    );
    
    if (foundUser || (uInput === "admin" && pInput === "admin")) {
      const adminName = foundUser ? foundUser.name : "ผู้ดูแลระบบ";
      sessionStorage.setItem("ptc_admin_authenticated", "true");
      sessionStorage.setItem("ptc_admin_username", uInput);
      sessionStorage.setItem("ptc_admin_name", adminName);
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("ชื่อผู้ใช้งาน (ID) หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
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
  const handleFileUpload = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("ขนาดไฟล์ใหญ่เกินไป (ไม่ควรเกิน 2MB) เพื่อประสิทธิภาพของระบบฐานข้อมูล");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const [dbType, setDbType] = useState(dbSettings ? dbSettings.type : "local");
  const [gsUrl, setGsUrl] = useState(dbSettings ? dbSettings.gsheetUrl : "");
  const [gsId, setGsId] = useState(dbSettings ? dbSettings.gsheetId : "");

  // Administrator Form State
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [tempAdmin, setTempAdmin] = useState({
    name: "",
    position: "",
    department: "",
    imageUrl: ""
  });

  // FAQ Form State
  const [editingFaq, setEditingFaq] = useState(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [tempFaq, setTempFaq] = useState({
    question: "",
    answer: ""
  });

  // Hero Slide Form State
  const [editingSlide, setEditingSlide] = useState(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [tempSlide, setTempSlide] = useState({
    title: "",
    subtitle: "",
    description: "",
    bgImage: "",
    badge: "",
    cta: "",
    ctaTab: "admission"
  });

  // Admin Users CMS State & Handlers
  const [isAdminUserModalOpen, setIsAdminUserModalOpen] = useState(false);
  const [editingAdminUser, setEditingAdminUser] = useState(null);
  const [tempAdminUser, setTempAdminUser] = useState({
    username: "",
    password: "",
    name: ""
  });

  const handleOpenAddAdminUser = () => {
    setEditingAdminUser(null);
    setTempAdminUser({
      username: "",
      password: "",
      name: ""
    });
    setIsAdminUserModalOpen(true);
  };

  const handleOpenEditAdminUser = (user) => {
    setEditingAdminUser(user);
    setTempAdminUser({
      username: user.username,
      password: user.password,
      name: user.name
    });
    setIsAdminUserModalOpen(true);
  };

  const handleSaveAdminUser = (e) => {
    e.preventDefault();
    if (!tempAdminUser.username.trim() || !tempAdminUser.password.trim() || !tempAdminUser.name.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง");
      return;
    }
    
    if (editingAdminUser) {
      updateAdminUser(editingAdminUser.username, tempAdminUser);
      triggerToast("แก้ไขบัญชีผู้ดูแลระบบสำเร็จ!");
    } else {
      const exists = adminUsers.some(
        (u) => u.username.toLowerCase() === tempAdminUser.username.trim().toLowerCase()
      );
      if (exists) {
        alert("ชื่อผู้ใช้งาน (ID) นี้ถูกใช้ไปแล้วในระบบ");
        return;
      }
      addAdminUser(tempAdminUser);
      triggerToast("เพิ่มผู้ดูแลระบบคนใหม่สำเร็จ!");
    }
    setIsAdminUserModalOpen(false);
    setEditingAdminUser(null);
  };

  const handleSaveDbSettings = (e) => {
    e.preventDefault();
    setDbSettings({
      type: dbType,
      gsheetUrl: gsUrl,
      gsheetId: gsId,
      syncEnabled: dbType === "gsheet" && !!gsUrl
    });
    triggerToast("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E02\u0E42\u0E02\u0E49\u0E21\u0E39\u0E25\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!");
  };

  const exportAdmissionsCSV = () => {
    const headers = ["วันที่สมัคร", "เลขที่ใบสมัคร", "ชื่อ-นามสกุล", "เบอร์โทร", "อีเมล", "โรงเรียนเดิม", "GPA", "ระดับชั้นที่สนใจ", "สาขาวิชาที่สนใจ", "สถานะ"];
    const rows = enrolledStudents.map((student) => [
      new Date(student.submittedAt).toLocaleDateString("th-TH"),
      student.id,
      student.fullName,
      student.phone,
      student.email,
      student.prevSchool,
      student.prevGpa,
      student.levelInterest,
      majors.find((m) => m.id === student.majorInterest)?.name || student.majorInterest,
      student.status === "approved" ? "อนุมัติเรียน" : student.status === "verified" ? "ตรวจสอบแล้ว" : student.status === "rejected" ? "เอกสารไม่ผ่าน" : "รอตรวจสอบ"
    ]);
    let csvContent = "\uFEFF";
    csvContent += [headers, ...rows].map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `admissions_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("\u0E2A\u0E48\u0E07\u0E2D\u0E22\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!");
  };

  const exportContactsCSV = () => {
    const headers = ["วันที่ติดต่อ", "รหัสข้อความ", "ชื่อผู้ส่ง", "อีเมล", "หัวข้อ", "ข้อความ", "สถานะการอ่าน"];
    const rows = contactMessages.map((msg) => [
      new Date(msg.submittedAt).toLocaleDateString("th-TH"),
      msg.id,
      msg.name,
      msg.email,
      msg.subject,
      msg.message,
      msg.isRead ? "อ่านแล้ว" : "ยังไม่ได้อ่าน"
    ]);
    let csvContent = "\uFEFF";
    csvContent += [headers, ...rows].map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `contacts_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("\u0E2A\u0E48\u0E07\u0E2D\u0E22\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08!");
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

  // Administrator Handlers
  const handleOpenAddAdmin = () => {
    setEditingAdmin(null);
    setTempAdmin({
      name: "",
      position: "",
      department: "",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop"
    });
    setIsAdminModalOpen(true);
  };
  const handleOpenEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setTempAdmin({
      name: admin.name,
      position: admin.position,
      department: admin.department,
      imageUrl: admin.imageUrl
    });
    setIsAdminModalOpen(true);
  };
  const handleSaveAdmin = (e) => {
    e.preventDefault();
    if (editingAdmin) {
      updateAdministrator(editingAdmin.id, tempAdmin);
      triggerToast("แก้ไขข้อมูลผู้บริหารสำเร็จ!");
    } else {
      addAdministrator(tempAdmin);
      triggerToast("เพิ่มผู้บริหารคนใหม่สำเร็จ!");
    }
    setIsAdminModalOpen(false);
    setEditingAdmin(null);
  };

  // FAQ Handlers
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setTempFaq({
      question: "",
      answer: ""
    });
    setIsFaqModalOpen(true);
  };
  const handleOpenEditFaq = (faq) => {
    setEditingFaq(faq);
    setTempFaq({
      question: faq.question,
      answer: faq.answer
    });
    setIsFaqModalOpen(true);
  };
  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (editingFaq) {
      updateFaq(editingFaq.id, tempFaq);
      triggerToast("แก้ไขคำถามที่พบบ่อยสำเร็จ!");
    } else {
      addFaq(tempFaq);
      triggerToast("เพิ่มคำถามใหม่สำเร็จ!");
    }
    setIsFaqModalOpen(false);
    setEditingFaq(null);
  };

  // Hero Slide Handlers
  const handleOpenAddSlide = () => {
    setEditingSlide(null);
    setTempSlide({
      title: "",
      subtitle: "",
      description: "",
      bgImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop",
      badge: "ประกาศใหม่",
      cta: "ดูรายละเอียด",
      ctaTab: "admission",
      mediaType: "image"
    });
    setIsSlideModalOpen(true);
  };
  const handleOpenEditSlide = (slide) => {
    setEditingSlide(slide);
    setTempSlide({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      bgImage: slide.bgImage,
      badge: slide.badge,
      cta: slide.cta,
      ctaTab: slide.ctaTab,
      mediaType: slide.mediaType || "image"
    });
    setIsSlideModalOpen(true);
  };
  const handleSaveSlide = (e) => {
    e.preventDefault();
    if (editingSlide) {
      updateHeroSlide(editingSlide.id, tempSlide);
      triggerToast("แก้ไขสไลด์แบนเนอร์สำเร็จ!");
    } else {
      addHeroSlide(tempSlide);
      triggerToast("เพิ่มสไลด์แบนเนอร์ใหม่สำเร็จ!");
    }
    setIsSlideModalOpen(false);
    setEditingSlide(null);
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
                ชื่อผู้ใช้งาน / ID ผู้ดูแลระบบ (Admin Username)
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                placeholder="กรอกชื่อผู้ใช้งาน..."
                className="w-full text-sm px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary focus:outline-none transition-all duration-150 font-medium"
                id="admin-username-input"
                autoFocus
              />
            </div>

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
    { id: "overview", label: "หน้าแรกสารสนเทศ", icon: Building2 },
    { id: "college", label: "ข้อมูลวิทยาลัย & ปรัชญา", icon: Settings },
    { id: "slides", label: "จัดการสไลด์แบนเนอร์", icon: ImageIcon },
    { id: "majors", label: "จัดการสาขาวิชาหลักสูตร", icon: Award },
    { id: "news", label: "จัดการข่าวสารกิจกรรม", icon: Newspaper },
    { id: "administrators", label: "จัดการคณะผู้บริหาร", icon: GraduationCap },
    { id: "faq", label: "จัดการคำถามที่พบบ่อย (FAQ)", icon: HelpCircle },
    { id: "admissions", label: "ระบบผู้สมัครเรียนออนไลน์", icon: Users, count: pendingAdmissions },
    { id: "contacts", label: "กล่องข้อความติดต่อ", icon: Mail, count: unreadMessages },
    { id: "admin_users", label: "จัดการผู้ดูแลระบบ", icon: ShieldCheck },
    { id: "menus", label: "จัดการเมนูเว็บไซต์", icon: Sliders },
    { id: "database", label: "ตั้งค่าฐานข้อมูล & ส่งออก", icon: Database }
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

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[11px] font-bold text-slate-500">โลโก้วิทยาลัย (Logo URL หรือ อัพโหลดรูปภาพ)</label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="text"
                            value={tempCollege.logoUrl || ""}
                            onChange={(e) => setTempCollege({ ...tempCollege, logoUrl: e.target.value })}
                            className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            placeholder="https://... หรืออัพโหลดรูปภาพทางด้านขวา"
                          />
                          <label className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border border-blue-200 cursor-pointer shrink-0">
                            <span>อัพโหลดรูป</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (base64) => setTempCollege({ ...tempCollege, logoUrl: base64 }))}
                            />
                          </label>
                        </div>
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

            {activeSubTab === "database" && <div className="space-y-8" id="database-setup-tab">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800 font-display flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span>ศูนย์ตั้งค่าฐานข้อมูลและการส่งออกข้อมูลวิทยาการ (Database & Data Center)</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    ตั้งค่าการเชื่อมต่อฐานข้อมูลภายนอก (Google Sheets / Local) และส่งออกรายงานทั้งหมดเป็นไฟล์ Excel (CSV)
                  </p>
                </div>

                {/* Grid 1: Database Types Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div 
                    onClick={() => {
                      setDbType("local");
                      setDbSettings({
                        type: "local",
                        gsheetUrl: gsUrl,
                        gsheetId: gsId,
                        syncEnabled: false
                      });
                      triggerToast("เปิดใช้งานฐานข้อมูล Local Browser (LocalStorage) สำเร็จ!");
                    }}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between h-40 ${dbType === "local" ? "bg-amber-50/70 border-amber-500 shadow-md ring-1 ring-amber-500/20" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow"}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                          <HardDrive className="w-4 h-4" />
                        </span>
                        {dbType === "local" && <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded-full">ใช้งานอยู่</span>}
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 pt-1">Local Browser Database (LocalStorage)</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium">สำรองและประมวลผลข้อมูลออฟไลน์อย่างสมบูรณ์ในเว็บบราวเซอร์ของคุณ</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      setDbType("gsheet");
                      setDbSettings({
                        type: "gsheet",
                        gsheetUrl: gsUrl,
                        gsheetId: gsId,
                        syncEnabled: !!gsUrl
                      });
                      triggerToast("เลือกฐานข้อมูลโหมด Google Sheets สำเร็จ! (กรุณากรอกและบันทึกสคริปต์ Webhook ด้านล่าง)");
                    }}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between h-40 ${dbType === "gsheet" ? "bg-emerald-50/70 border-emerald-500 shadow-md ring-1 ring-emerald-500/20" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow"}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <FileSpreadsheet className="w-4 h-4" />
                        </span>
                        {dbType === "gsheet" && <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">ใช้งานอยู่</span>}
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 pt-1">Google Sheets Database (Sync Mode)</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium">ซิงโครไนซ์ใบสมัครเรียนและคำถามติดต่อเพิ่มเติมเข้าสู่ Google Sheets โดยตรง</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      setDbType("firestore");
                      setDbSettings({
                        type: "firestore",
                        gsheetUrl: gsUrl,
                        gsheetId: gsId,
                        syncEnabled: false
                      });
                      triggerToast("เปิดใช้งานฐานข้อมูลหลัก Firebase Cloud Firestore เรียบร้อยแล้ว!");
                    }}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between h-40 ${dbType === "firestore" ? "bg-blue-50/70 border-blue-500 shadow-md ring-1 ring-blue-500/20" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow"}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-brand-primary">
                          <Server className="w-4 h-4" />
                        </span>
                        {dbType === "firestore" && <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">ใช้งานอยู่</span>}
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 pt-1">Firebase Cloud Firestore</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium">เชื่อมต่อกับฐานข้อมูลหลักของระบบคลาวด์แบบเรียลไทม์ ปลอดภัยและเสถียร</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left block: Config Form & Guides */}
                  <div className="lg:col-span-7 space-y-6">
                    {dbType === "gsheet" ? (
                      <form onSubmit={handleSaveDbSettings} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
                        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700">
                          <FileSpreadsheet className="w-4 h-4" />
                          <span>กำหนดค่า Google Sheets Webhook</span>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 block">
                            Google Sheets ID
                          </label>
                          <input
                            type="text"
                            value={gsId}
                            onChange={(e) => setGsId(e.target.value)}
                            placeholder="เช่น 1aBcDeFgHiJkLmNoPqRsTuVwXyZ"
                            className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 block">
                            Google Web App Script URL (Webhook URL) *
                          </label>
                          <input
                            type="url"
                            required
                            value={gsUrl}
                            onChange={(e) => setGsUrl(e.target.value)}
                            placeholder="https://script.google.com/macros/s/.../exec"
                            className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                          <p className="text-[9px] text-slate-400 leading-normal">
                            * ระบบจะส่งข้อมูลไปทาง Webhook นี้ทันทีที่มีผู้ส่งใบสมัครเรียนหรือฝากคำถามติดต่อเข้ามาใหม่แบบเรียลไทม์
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>บันทึกและเปิดใช้งาน Google Sheets Sync</span>
                        </button>
                      </form>
                    ) : dbType === "local" ? (
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-4 shadow-sm">
                        <HardDrive className="w-12 h-12 text-amber-500 mx-auto bg-amber-50 p-2.5 rounded-2xl" />
                        <h4 className="text-xs font-bold text-slate-800">ระบบทำงานบนฐานข้อมูล Local Storage (LocalStorage)</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm mx-auto">
                          ข้อมูลใบสมัคร, ข่าวสาร, คณะผู้บริหาร, คำถามที่พบบ่อย และสไลด์นำเสนอทั้งหมดได้รับการบันทึกอย่างออฟไลน์และปลอดภัยในเว็บบราวเซอร์ของคุณเรียบร้อยแล้ว
                          คุณสามารถส่งออกรายงานและสำรองข้อมูลได้จากแผงควบคุมหลักได้ทันที
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-4 shadow-sm">
                        <Server className="w-12 h-12 text-blue-500 mx-auto bg-blue-50 p-2.5 rounded-2xl" />
                        <h4 className="text-xs font-bold text-slate-800">ระบบทำงานบนฐานข้อมูล Firebase Cloud Firestore</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm mx-auto">
                          เปิดใช้งานระบบฐานข้อมูลหลักคลาวด์คีย์ ข้อมูลใบสมัครเรียนและการปรับแต่งทั้งหมดเชื่อมโยงเรียลไทม์ผ่าน Google Cloud Run คอนเทนเนอร์ของคุณอย่างปลอดภัยสูงสุด
                        </p>
                      </div>
                    )}

                    {/* Instruction Box for Google Apps Script */}
                    {dbType === "gsheet" && <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl space-y-3">
                        <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
                          <FileCode className="w-4 h-4" />
                          <span>วิธีการตั้งค่า Google Apps Script (ทำครั้งเดียว)</span>
                        </div>
                        <ol className="list-decimal list-inside text-[10px] space-y-1.5 text-slate-400">
                          <li>เปิด Google Sheets ของคุณขึ้นมา</li>
                          <li>ไปที่เมนู <span className="text-white">Extensions (ส่วนขยาย)</span> &gt; <span className="text-white">Apps Script</span></li>
                          <li>ลบโค้ดเดิมออกทั้งหมด แล้วคัดลอกและวางโค้ดสคริปต์ด้านล่างนี้ลงไป</li>
                          <li>คลิกที่ปุ่ม <span className="text-white">Deploy (ทำให้ใช้งานได้)</span> &gt; <span className="text-white">New deployment</span></li>
                          <li>เลือกประเภทเป็น <span className="text-white">Web app</span>, ตั้งค่า Who has access เป็น <span className="text-white">Anyone (ทุกคน)</span></li>
                          <li>คัดลอก URL สคริปต์เว็บแอปที่ได้มาใส่ในช่องด้านบน แล้วกดบันทึก</li>
                        </ol>

                        {/* Code box */}
                        <div className="relative mt-2">
                          <pre className="text-[9px] bg-black/60 p-3 rounded-lg overflow-x-auto text-cyan-400 font-mono h-48 border border-white/5">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var params = JSON.parse(e.postData.contents);
  var data = params.data;
  
  if (params.type === "enrollment") {
    sheet.appendRow([
      new Date(),
      data.id,
      data.fullName,
      data.phone,
      data.email,
      data.prevSchool,
      data.prevGpa,
      data.levelInterest,
      data.majorInterest,
      data.status
    ]);
  } else if (params.type === "contact") {
    sheet.appendRow([
      new Date(),
      data.id,
      data.name,
      data.email,
      data.subject,
      data.message
    ]);
  }
  return ContentService.createTextOutput("Success");
}`}
                          </pre>
                        </div>
                      </div>}
                  </div>

                  {/* Right block: Data Exports */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
                      <h3 className="text-xs font-extrabold text-slate-800 flex items-center space-x-2">
                        <Download className="w-4 h-4 text-brand-primary" />
                        <span>ดาวน์โหลดข้อมูลรายงาน (Excel CSV Exports)</span>
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        ส่งออกข้อมูลดิบในระบบหลังบ้าน ณ ปัจจุบัน เป็นไฟล์ Excel (.csv) โดยรองรับภาษาไทย 100% (UTF-8 BOM)
                      </p>

                      <div className="space-y-2.5 pt-2">
                        <button
                          onClick={exportAdmissionsCSV}
                          className="w-full text-left flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all text-xs font-bold text-slate-700 cursor-pointer"
                        >
                          <div className="flex items-center space-x-2.5">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span>รายชื่อผู้สมัครเรียนทั้งหมด ({enrolledStudents.length} รายการ)</span>
                          </div>
                          <Download className="w-3.5 h-3.5 text-slate-400" />
                        </button>

                        <button
                          onClick={exportContactsCSV}
                          className="w-full text-left flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all text-xs font-bold text-slate-700 cursor-pointer"
                        >
                          <div className="flex items-center space-x-2.5">
                            <Mail className="w-4 h-4 text-rose-500" />
                            <span>ข้อความติดต่อสอบถามทั้งหมด ({contactMessages.length} รายการ)</span>
                          </div>
                          <Download className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>
                    </div>

                    {/* UX/UI Stats visualization */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5 shadow-sm">
                      <h3 className="text-xs font-extrabold text-slate-800">
                        สถิตินักศึกษาที่สนใจเรียน (Visual Insights)
                      </h3>

                      {/* Stats metric 1: Level Interest proportion */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-600">
                          <span>สัดส่วนระดับชั้นที่สนใจ (ปวช. vs ปวส.)</span>
                          <span>
                            ปวช. {enrolledStudents.filter(s => s.levelInterest === "ปวช.").length} | ปวส. {enrolledStudents.filter(s => s.levelInterest === "ปวส.").length}
                          </span>
                        </div>
                        {/* Progress Bar styled visual meter */}
                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div 
                            style={{ width: `${(enrolledStudents.filter(s => s.levelInterest === "ปวช.").length / (enrolledStudents.length || 1)) * 100}%` }}
                            className="bg-brand-primary h-full transition-all duration-300" 
                          />
                          <div 
                            style={{ width: `${(enrolledStudents.filter(s => s.levelInterest === "ปวส.").length / (enrolledStudents.length || 1)) * 100}%` }}
                            className="bg-cyan-400 h-full transition-all duration-300" 
                          />
                        </div>
                        <div className="flex justify-between text-[8px] text-slate-400 font-bold pt-0.5">
                          <span className="flex items-center space-x-1">
                            <span className="w-2 h-2 rounded-full bg-brand-primary" />
                            <span>ปวช. (ประกาศนียบัตรวิชาชีพ)</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            <span>ปวส. (ประกาศนียบัตรวิชาชีพชั้นสูง)</span>
                          </span>
                        </div>
                      </div>

                      {/* Stats metric 2: Popular majors horizontal bar */}
                      <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-bold text-slate-600">สาขาวิชายอดนิยมอันดับต้นๆ</p>
                        
                        <div className="space-y-2.5">
                          {["it-high", "acc-voc", "auto-voc"].map((majorId) => {
                            const count = enrolledStudents.filter(s => s.majorInterest === majorId).length;
                            const majorName = majors.find(m => m.id === majorId)?.name || majorId;
                            const percentage = Math.round((count / (enrolledStudents.length || 1)) * 100);
                            
                            return (
                              <div key={majorId} className="space-y-1">
                                <div className="flex justify-between text-[9px] font-semibold text-slate-600">
                                  <span>{majorName}</span>
                                  <span>{count} ราย ({percentage}%)</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    style={{ width: `${percentage}%` }}
                                    className="bg-amber-400 h-full rounded-full"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

            {activeSubTab === "admin_users" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800 font-display flex items-center space-x-2">
                      <ShieldCheck className="w-5 h-5 text-brand-primary" />
                      <span>จัดการสิทธิ์ผู้ดูแลระบบ (Admin User Management)</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      เพิ่ม ลบ หรือแก้ไขบัญชีและรหัสผ่านสำหรับเข้าใช้งานระบบหลังบ้าน CMS Portal แห่งนี้
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddAdminUser}
                    className="flex items-center space-x-1.5 bg-brand-primary hover:bg-blue-800 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มบัญชีผู้ดูแลระบบ</span>
                  </button>
                </div>

                <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
                          <th className="p-4 pl-6">ชื่อ-นามสกุล / เจ้าหน้าที่</th>
                          <th className="p-4">ชื่อผู้ใช้งาน (Username / ID)</th>
                          <th className="p-4">รหัสผ่าน (Password)</th>
                          <th className="p-4 text-right pr-6">การจัดการ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                        {adminUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 pl-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-primary font-bold">
                                  {user.name ? user.name.charAt(0) : "A"}
                                </div>
                                <span className="font-bold text-slate-800">{user.name}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-600 font-mono text-[11px]">
                                {user.username}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="font-mono tracking-widest text-slate-400">
                                {user.password}
                              </span>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex space-x-2 justify-end">
                                <button
                                  onClick={() => handleOpenEditAdminUser(user)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-xl transition-all cursor-pointer"
                                  title="แก้ไขข้อมูลผู้ใช้"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (user.username.toLowerCase() === "admin") {
                                      alert("ไม่สามารถลบบัญชีหลัก (admin) ของระบบได้");
                                      return;
                                    }
                                    if (confirm(`คุณแน่ใจว่าต้องการลบบัญชีผู้ใช้งาน "${user.name}" ออกจากระบบ?`)) {
                                      deleteAdminUser(user.id);
                                      triggerToast("ลบบัญชีผู้ดูแลระบบเรียบร้อย!");
                                    }
                                  }}
                                  className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-xl transition-all cursor-pointer"
                                  title="ลบบัญชีผู้ใช้"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {adminUsers.length === 0 && (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-400">
                              ไม่มีบัญชีผู้ดูแลระบบในระบบขณะนี้
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* NEW SUB-TAB: Hero Slides Manager */}
            {activeSubTab === "slides" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800 font-display">
                      จัดการภาพสไลด์แบนเนอร์หน้าแรก (Hero Carousel)
                    </h2>
                    <p className="text-xs text-slate-500">
                      เพิ่ม ลบ หรือแก้ไขภาพสไลด์และเนื้อหาแบนเนอร์ประชาสัมพันธ์ที่ปรากฏในหน้าหลักของวิทยาลัย
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddSlide}
                    className="flex items-center space-x-1.5 bg-brand-primary hover:bg-blue-800 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มแบนเนอร์ใหม่</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {heroSlides.map((slide) => (
                    <div key={slide.id} className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm flex flex-col hover:shadow-md transition-all">
                      <div className="relative h-40 bg-slate-100">
                        <img 
                          src={slide.bgImage} 
                          alt={slide.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                          {slide.badge && (
                            <span className="self-start bg-amber-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md mb-1.5 shadow-sm">
                              {slide.badge}
                            </span>
                          )}
                          <h3 className="text-sm font-extrabold text-white leading-snug drop-shadow-sm">{slide.title}</h3>
                          <p className="text-[11px] text-slate-200 line-clamp-1 mt-0.5">{slide.subtitle}</p>
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{slide.description}</p>
                        
                        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 font-bold uppercase">ลิงก์หน้าจอ</span>
                            <span className="text-[10px] text-brand-primary font-extrabold">
                              {slide.cta} ({slide.ctaTab === "admission" ? "สมัครเรียน" : slide.ctaTab === "majors" ? "หลักสูตรที่เปิดสอน" : slide.ctaTab === "about" ? "เกี่ยวกับวิทยาลัย" : "ข่าวสารและประกาศ"})
                            </span>
                          </div>
                          
                          <div className="flex space-x-1.5">
                            <button
                              onClick={() => handleOpenEditSlide(slide)}
                              className="p-2 text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-xl transition-all cursor-pointer"
                              title="แก้ไขสไลด์"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("คุณแน่ใจว่าต้องการลบสไลด์นี้?")) {
                                  deleteHeroSlide(slide.id);
                                  triggerToast("ลบสไลด์แบนเนอร์เรียบร้อยแล้ว!");
                                }
                              }}
                              className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-xl transition-all cursor-pointer"
                              title="ลบสไลด์"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {heroSlides.length === 0 && (
                    <div className="col-span-full border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 text-xs">
                      <ImageIcon className="w-10 h-10 mx-auto text-slate-300 mb-2 animate-pulse" />
                      ไม่มีสไลด์แบนเนอร์แสดงผลในขณะนี้ กรุณากดปุ่มเพิ่มเพื่อเริ่มต้นใช้งาน
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* NEW SUB-TAB: Administrators Manager */}
            {activeSubTab === "administrators" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800 font-display">
                      จัดการทำเนียบคณะผู้บริหาร (College Administrators)
                    </h2>
                    <p className="text-xs text-slate-500">
                      จัดการข้อมูลรายชื่อ รูปภาพ ตำแหน่ง และฝ่ายงานของคณะผู้บริหารเพื่อแสดงในหน้าเกี่ยวกับเรา
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddAdmin}
                    className="flex items-center space-x-1.5 bg-brand-primary hover:bg-blue-800 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มคณะผู้บริหาร</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {administrators.map((admin) => (
                    <div key={admin.id} className="border border-slate-200 rounded-3xl p-5 bg-white shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all relative group">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-200 mb-4 shadow-inner relative">
                        <img 
                          src={admin.imageUrl} 
                          alt={admin.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-xs font-extrabold text-slate-800">{admin.name}</h3>
                        <p className="text-[10px] text-brand-primary font-bold">{admin.position}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{admin.department}</p>
                      </div>

                      <div className="flex space-x-1.5 mt-5 pt-3 border-t border-slate-100 w-full justify-center">
                        <button
                          onClick={() => handleOpenEditAdmin(admin)}
                          className="p-1.5 px-3 text-[10px] font-bold text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                        >
                          <Edit className="w-3 h-3" />
                          <span>แก้ไข</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`คุณแน่ใจว่าต้องการลบรายชื่อผู้บริหาร ${admin.name}?`)) {
                              deleteAdministrator(admin.id);
                              triggerToast("ลบข้อมูลคณะผู้บริหารเรียบร้อย!");
                            }
                          }}
                          className="p-1.5 px-3 text-[10px] font-bold text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>ลบ</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {administrators.length === 0 && (
                    <div className="col-span-full border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 text-xs">
                      <GraduationCap className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                      ไม่มีข้อมูลคณะผู้บริหารในทำเนียบขณะนี้
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* NEW SUB-TAB: FAQ Manager */}
            {activeSubTab === "faq" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800 font-display">
                      จัดการคำถามที่พบบ่อย (FAQs Management)
                    </h2>
                    <p className="text-xs text-slate-500">
                      แก้ไขข้อสงสัยยอดฮิตและข้อมูลคำถามพบบ่อยเกี่ยวกับการรับสมัครเรียนของวิทยาลัย
                    </p>
                  </div>
                  <button
                    onClick={handleOpenAddFaq}
                    className="flex items-center space-x-1.5 bg-brand-primary hover:bg-blue-800 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มคำถามใหม่</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {faqList.map((faq, index) => (
                    <div key={faq.id} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm flex flex-col md:flex-row justify-between gap-4 hover:border-slate-300 transition-all">
                      <div className="space-y-2 flex-grow">
                        <div className="flex items-start space-x-2">
                          <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2 py-0.5 rounded-md shrink-0">
                            Q#{index + 1}
                          </span>
                          <h3 className="text-xs font-extrabold text-slate-800 leading-snug">{faq.question}</h3>
                        </div>
                        <p className="text-xs text-slate-500 pl-8 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">{faq.answer}</p>
                      </div>

                      <div className="flex md:flex-col justify-end gap-1.5 self-end md:self-center shrink-0">
                        <button
                          onClick={() => handleOpenEditFaq(faq)}
                          className="p-2 text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-xl transition-all flex items-center space-x-1.5 text-xs font-bold cursor-pointer"
                          title="แก้ไขคำถาม"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span className="md:hidden">แก้ไข</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("คุณแน่ใจว่าต้องการลบคำถามพบบ่อยหัวข้อนี้?")) {
                              deleteFaq(faq.id);
                              triggerToast("ลบหัวข้อคำถามพบบ่อยสำเร็จ!");
                            }
                          }}
                          className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-xl transition-all flex items-center space-x-1.5 text-xs font-bold cursor-pointer"
                          title="ลบคำถาม"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="md:hidden">ลบ</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {faqList.length === 0 && (
                    <div className="border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 text-xs">
                      <HelpCircle className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                      ยังไม่มีคำถามที่พบบ่อยบันทึกไว้ในทำเนียบ
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB: Menus Management */}
            {activeSubTab === "menus" && (
              <MenusManager />
            )}
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
                    <label className="font-bold text-slate-600">รูปภาพปกข่าวสาร (หรืออัพโหลด)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tempNews.imageUrl}
                        onChange={(e) => setTempNews({ ...tempNews, imageUrl: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                        placeholder="เช่น https://images.unsplash.com/... หรืออัพโหลดรูปภาพ"
                      />
                      <label className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border border-blue-200 cursor-pointer shrink-0 flex items-center">
                        <span>อัพโหลด</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (base64) => setTempNews({ ...tempNews, imageUrl: base64 }))}
                        />
                      </label>
                    </div>
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

      {/* 4. Modal for Hero Slide edit/create */}
      <AnimatePresence>
        {isSlideModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-brand-secondary text-white p-5 flex justify-between items-center">
                <h3 className="font-extrabold text-sm md:text-base font-display">
                  {editingSlide ? `แก้ไขแบนเนอร์หน้าแรก: ${tempSlide.title}` : "เพิ่มภาพสไลด์แบนเนอร์ใหม่"}
                </h3>
                <button onClick={() => setIsSlideModalOpen(false)} className="text-white hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSlide} className="p-6 overflow-y-auto space-y-4 flex-grow">
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">หัวข้อแบนเนอร์ (Title) *</label>
                    <input
                      type="text"
                      required
                      value={tempSlide.title}
                      onChange={(e) => setTempSlide({ ...tempSlide, title: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold"
                      placeholder="เช่น สมัครเรียนออนไลน์ โควตาพิเศษ 2570!"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">หัวข้อย่อย (Subtitle)</label>
                    <input
                      type="text"
                      value={tempSlide.subtitle}
                      onChange={(e) => setTempSlide({ ...tempSlide, subtitle: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                      placeholder="เช่น ระดับ ปวช. และ ปวส. เรียนต่อสายอาชีพอนาคตไกล"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">คำอธิบายเพิ่มเติม *</label>
                    <textarea
                      required
                      rows={3}
                      value={tempSlide.description}
                      onChange={(e) => setTempSlide({ ...tempSlide, description: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                      placeholder="คำอธิบายสั้นๆ เกี่ยวกับแบนเนอร์นี้ที่จะแสดงบนเว็บหน้าแรก..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">ป้ายสัญลักษณ์ (Badge)</label>
                      <input
                        type="text"
                        value={tempSlide.badge}
                        onChange={(e) => setTempSlide({ ...tempSlide, badge: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                        placeholder="เช่น ด่วนที่สุด, ใหม่, ข่าวดี"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">ข้อความบนปุ่มกด (CTA Button) *</label>
                      <input
                        type="text"
                        required
                        value={tempSlide.cta}
                        onChange={(e) => setTempSlide({ ...tempSlide, cta: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                        placeholder="เช่น สมัครเรียนเลย!"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ลิงก์หน้าปลายทางเมื่อคลิกปุ่ม *</label>
                    <select
                      value={tempSlide.ctaTab}
                      onChange={(e) => setTempSlide({ ...tempSlide, ctaTab: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold"
                    >
                      <option value="admission">ระบบสมัครเรียนออนไลน์</option>
                      <option value="majors">หลักสูตรที่เปิดสอน</option>
                      <option value="about">เกี่ยวกับวิทยาลัย / คณะผู้บริหาร</option>
                      <option value="news">ข่าวประชาสัมพันธ์ล่าสุด</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ประเภทสื่อแบนเนอร์ *</label>
                    <select
                      value={tempSlide.mediaType || "image"}
                      onChange={(e) => setTempSlide({ ...tempSlide, mediaType: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold"
                    >
                      <option value="image">รูปภาพ (Image)</option>
                      <option value="video">วิดีโอ (Video MP4)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">
                      {tempSlide.mediaType === "video" ? "ลิงก์วิดีโอ หรือ อัพโหลดวิดีโอ MP4 *" : "URL ภาพพื้นหลังแบนเนอร์ หรือ อัพโหลดรูปภาพ *"}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={tempSlide.bgImage || ""}
                        onChange={(e) => setTempSlide({ ...tempSlide, bgImage: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-mono text-[10px]"
                        placeholder={tempSlide.mediaType === "video" ? "เช่น https://.../video.mp4 หรืออัพโหลด" : "เช่น https://images.unsplash.com/... หรืออัพโหลด"}
                      />
                      <label className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border border-blue-200 cursor-pointer shrink-0 flex items-center">
                        <span>อัพโหลด</span>
                        <input
                          type="file"
                          accept={tempSlide.mediaType === "video" ? "video/mp4" : "image/*"}
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (base64) => setTempSlide({ ...tempSlide, bgImage: base64 }))}
                        />
                      </label>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {tempSlide.mediaType === "video" 
                        ? "แนะนำไฟล์ขนาดไม่เกิน 2MB เพื่อความเร็วในการโหลดเล่น หรือระบุลิงก์วิดีโอ MP4 ภายนอก" 
                        : "แนะนำความละเอียดขนาด 1920x1080 หรือรูปถ่ายทิวทัศน์วิทยาลัยที่สวยงาม"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsSlideModalOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2 rounded-xl font-bold text-xs cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                  >
                    บันทึกข้อมูลสไลด์
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Modal for Administrator edit/create */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="bg-brand-secondary text-white p-5 flex justify-between items-center">
                <h3 className="font-extrabold text-sm md:text-base font-display">
                  {editingAdmin ? `แก้ไขประวัติผู้บริหาร: ${tempAdmin.name}` : "เพิ่มคณะผู้บริหารใหม่"}
                </h3>
                <button onClick={() => setIsAdminModalOpen(false)} className="text-white hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAdmin} className="p-6 space-y-4">
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ชื่อ-นามสกุลผู้บริหาร *</label>
                    <input
                      type="text"
                      required
                      value={tempAdmin.name}
                      onChange={(e) => setTempAdmin({ ...tempAdmin, name: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold"
                      placeholder="เช่น ดร.วิทยา เทพประสิทธิ์"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ตำแหน่งงาน *</label>
                    <input
                      type="text"
                      required
                      value={tempAdmin.position}
                      onChange={(e) => setTempAdmin({ ...tempAdmin, position: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                      placeholder="เช่น ผู้อำนวยการวิทยาลัยเทคโนโลยีปทุมรัตต์"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">แผนกงาน / ฝ่ายบริหาร *</label>
                    <input
                      type="text"
                      required
                      value={tempAdmin.department}
                      onChange={(e) => setTempAdmin({ ...tempAdmin, department: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                      placeholder="เช่น ฝ่ายวิชาการและเทคโนโลยีสารสนเทศ"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">URL รูปถ่ายผู้บริหาร * (หรืออัพโหลด)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={tempAdmin.imageUrl}
                        onChange={(e) => setTempAdmin({ ...tempAdmin, imageUrl: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-mono text-[10px]"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                      <label className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border border-blue-200 cursor-pointer shrink-0 flex items-center">
                        <span>อัพโหลด</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (base64) => setTempAdmin({ ...tempAdmin, imageUrl: base64 }))}
                        />
                      </label>
                    </div>
                    <p className="text-[10px] text-slate-400">ขนาดแนะนำ: อัตราส่วนสี่เหลี่ยมจัตุรัส (1:1)</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAdminModalOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2 rounded-xl font-bold text-xs cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                  >
                    บันทึกผู้บริหาร
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Modal for FAQ edit/create */}
      <AnimatePresence>
        {isFaqModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="bg-brand-secondary text-white p-5 flex justify-between items-center">
                <h3 className="font-extrabold text-sm md:text-base font-display">
                  {editingFaq ? "แก้ไขหัวข้อคำถามพบบ่อย" : "เพิ่มข้อคำถามพบบ่อยใหม่"}
                </h3>
                <button onClick={() => setIsFaqModalOpen(false)} className="text-white hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveFaq} className="p-6 space-y-4">
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">คำถาม (Question) *</label>
                    <input
                      type="text"
                      required
                      value={tempFaq.question}
                      onChange={(e) => setTempFaq({ ...tempFaq, question: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold"
                      placeholder="เช่น สมัครเรียนที่วิทยาลัยต้องเตรียมเอกสารอะไรบ้าง?"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">คำตอบเฉลยละเอียด (Answer) *</label>
                    <textarea
                      required
                      rows={5}
                      value={tempFaq.answer}
                      onChange={(e) => setTempFaq({ ...tempFaq, answer: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 leading-relaxed"
                      placeholder="เช่น เอกสารที่ต้องเตรียม ได้แก่ 1. สำเนาใบระเบียนแสดงผลการเรียน (ปพ.1)..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsFaqModalOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2 rounded-xl font-bold text-xs cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                  >
                    บันทึกคำถามพบบ่อย
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Modal for Admin Users edit/create */}
      <AnimatePresence>
        {isAdminUserModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="bg-brand-secondary text-white p-5 flex justify-between items-center">
                <h3 className="font-extrabold text-sm md:text-base font-display">
                  {editingAdminUser ? `แก้ไขบัญชีผู้ดูแลระบบ: ${tempAdminUser.username}` : "เพิ่มบัญชีผู้ดูแลระบบใหม่"}
                </h3>
                <button onClick={() => setIsAdminUserModalOpen(false)} className="text-white hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAdminUser} className="p-6 space-y-4">
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ชื่อแสดงผล / ชื่อ-นามสกุล เจ้าหน้าที่ *</label>
                    <input
                      type="text"
                      required
                      value={tempAdminUser.name}
                      onChange={(e) => setTempAdminUser({ ...tempAdminUser, name: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold"
                      placeholder="เช่น อาจารย์ณรงค์ชัย สายดี"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ชื่อผู้ใช้งาน (ID / Username) *</label>
                    <input
                      type="text"
                      required
                      disabled={!!editingAdminUser}
                      value={tempAdminUser.username}
                      onChange={(e) => setTempAdminUser({ ...tempAdminUser, username: e.target.value })}
                      className={`w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-mono ${editingAdminUser ? "opacity-60 cursor-not-allowed bg-slate-100" : ""}`}
                      placeholder="เช่น narong_ptc"
                    />
                    {!editingAdminUser && (
                      <p className="text-[10px] text-slate-400">ใช้เป็น ID สำหรับพิมพ์กรอกในช่องตอนเข้าระบบ</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">รหัสผ่าน (Password) *</label>
                    <input
                      type="text"
                      required
                      value={tempAdminUser.password}
                      onChange={(e) => setTempAdminUser({ ...tempAdminUser, password: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-mono"
                      placeholder="เช่น 123456"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAdminUserModalOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2 rounded-xl font-bold text-xs cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                  >
                    บันทึกบัญชีผู้ดูแลระบบ
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>;
}
