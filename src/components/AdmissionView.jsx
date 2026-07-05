/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import {
  User,
  BookOpen,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Download,
  RefreshCw,
  Award,
  FileText,
  Check
} from "lucide-react";
import { useData } from "../context/DataContext";

export default function AdmissionView({
  preSelectedMajor,
  preSelectedLevel,
  setPreSelectedMajor,
  setPreSelectedLevel
}) {
  const { majors, addEnrollment, enrolledStudents, t, currentLang } = useData();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    citizenId: "",
    phone: "",
    email: "",
    prevSchool: "",
    prevGpa: "",
    levelInterest: preSelectedLevel === "" ? "ปวช." : preSelectedLevel,
    majorInterest: preSelectedMajor === "" ? "" : preSelectedMajor,
    address: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [lastSubmittedForm, setLastSubmittedForm] = useState(null);
  const [regNumber, setRegNumber] = useState("");

  useEffect(() => {
    if (preSelectedLevel) {
      setFormData((prev) => ({ ...prev, levelInterest: preSelectedLevel }));
    }
    if (preSelectedMajor) {
      setFormData((prev) => ({ ...prev, majorInterest: preSelectedMajor }));
    }
  }, [preSelectedLevel, preSelectedMajor]);

  const availableMajorsForSelectedLevel = majors.filter(
    (m) => m.level === formData.levelInterest
  );

  useEffect(() => {
    const isMajorValidForLevel = availableMajorsForSelectedLevel.some(
      (m) => m.name === formData.majorInterest
    );
    if (!isMajorValidForLevel && availableMajorsForSelectedLevel.length > 0) {
      setFormData((prev) => ({ ...prev, majorInterest: availableMajorsForSelectedLevel[0].name }));
    }
  }, [formData.levelInterest, availableMajorsForSelectedLevel]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = t("กรุณากรอกชื่อ-นามสกุลจริงของคุณ", "Please enter your real full name");
    }
    if (!/^\d{13}$/.test(formData.citizenId)) {
      errors.citizenId = t("เลขประจำตัวประชาชนต้องเป็นตัวเลข 13 หลัก", "Citizen ID must be exactly 13 digits");
    }
    if (!/^\d{9,10}$/.test(formData.phone)) {
      errors.phone = t("กรุณากรอกเบอร์โทรศัพท์ที่ติดต่อได้ (9-10 หลัก)", "Please enter a valid phone number (9-10 digits)");
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("รูปแบบอีเมลไม่ถูกต้อง", "Invalid email address format");
    }
    if (!formData.address.trim()) {
      errors.address = t("กรุณากรอกที่อยู่ปัจจุบันสำหรับการติดต่อกลับ", "Please enter your address for correspondence");
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.prevSchool.trim()) {
      errors.prevSchool = t("กรุณาระบุชื่อโรงเรียนเดิมที่สำเร็จการศึกษา", "Please enter your previous school name");
    }
    const gpaVal = parseFloat(formData.prevGpa);
    if (!formData.prevGpa.trim() || isNaN(gpaVal) || gpaVal < 0 || gpaVal > 4) {
      errors.prevGpa = t("กรุณาระบุเกรดเฉลี่ยสะสมที่ถูกต้อง (ระหว่าง 0.00 - 4.00)", "Please enter a valid GPAX (between 0.00 and 4.00)");
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (step !== 3) return;
    const assignedId = addEnrollment(formData);
    setRegNumber(assignedId);
    setLastSubmittedForm(formData);
    setPreSelectedMajor("");
    setPreSelectedLevel("");
    setStep(4);
  };

  const startNewAdmission = () => {
    setFormData({
      fullName: "",
      citizenId: "",
      phone: "",
      email: "",
      prevSchool: "",
      prevGpa: "",
      levelInterest: "ปวช.",
      majorInterest: availableMajorsForSelectedLevel[0]?.name || "",
      address: ""
    });
    setFormErrors({});
    setLastSubmittedForm(null);
    setStep(1);
  };

  const handleMockPrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans" id="admission-view">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
          {t("สมัครเรียนออนไลน์", "Online Application")}
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-brand-secondary tracking-tight font-display">
          {t("ลงทะเบียนศึกษาต่อทางออนไลน์", "Online Enrollment Registration")}
        </h2>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
          {t("กรอกรายละเอียดเบื้องต้นเพื่อสมัครโควตาพิเศษ สมัครง่ายผ่าน 3 ขั้นตอน ใช้เวลาเพียง 3 นาทีเพื่อจองสิทธิ์ที่นั่งเรียน", "Fill in your preliminary details to apply for a special quota. Simple 3-step application takes only 3 minutes to reserve your seat.")}
        </p>
      </div>

      {step <= 3 && (
        /* Wizard Progress Header bar */
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm" id="progress-bar-wizard">
          <div className="flex justify-between items-center max-w-md mx-auto">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step === num ? "bg-brand-primary text-white scale-110 shadow-md shadow-blue-500/10" : step > num ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {step > num ? <Check className="w-4.5 h-4.5" /> : num}
                </div>
                <span className={`text-xs font-bold ${step === num ? "text-slate-900" : "text-slate-400"}`}>
                  {num === 1 ? t("ข้อมูลส่วนตัว", "Personal Details") : num === 2 ? t("การศึกษาเดิม", "Prior Education") : t("เลือกหลักสูตร", "Choose Program")}
                </span>
                {num < 3 && <div className="w-8 h-0.5 bg-slate-200 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main wizard component */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
        {step === 1 && (
          /* STEP 1: Personal Details Form */
          <div className="space-y-6" id="form-step-1">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <User className="w-5 h-5 text-brand-primary" />
                <span>{t("ขั้นตอนที่ 1: ข้อมูลประวัติและช่องทางติดต่อ", "Step 1: Bio Profile & Contacts")}</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">{t("กรุณากรอกข้อมูลจริงตามบัตรประชาชนเพื่อใช้ตรวจคุณสมบัติ", "Please enter accurate details matching your Citizen ID/Passport.")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">{t("ชื่อ - นามสกุลจริง (ภาษาไทย) *", "Full Name *")}</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder={t("นายสมชาย มั่นคง", "John Doe")}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${formErrors.fullName ? "border-red-300 focus:ring-red-200" : "border-slate-200"}`}
                />
                {formErrors.fullName && <p className="text-red-500 text-[11px]">{formErrors.fullName}</p>}
              </div>

              {/* Citizen ID */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">{t("เลขประจำตัวประชาชน (13 หลัก) *", "National ID (13 Digits) *")}</label>
                <input
                  type="text"
                  name="citizenId"
                  maxLength={13}
                  placeholder="14599000xxxxx"
                  value={formData.citizenId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${formErrors.citizenId ? "border-red-300 focus:ring-red-200" : "border-slate-200"}`}
                />
                {formErrors.citizenId && <p className="text-red-500 text-[11px]">{formErrors.citizenId}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">{t("เบอร์โทรศัพท์มือถือ *", "Mobile Phone Number *")}</label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  placeholder="088555xxxx"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${formErrors.phone ? "border-red-300 focus:ring-red-200" : "border-slate-200"}`}
                />
                {formErrors.phone && <p className="text-red-500 text-[11px]">{formErrors.phone}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">{t("อีเมล (ถ้ามี)", "Email Address (Optional)")}</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${formErrors.email ? "border-red-300 focus:ring-red-200" : "border-slate-200"}`}
                />
                {formErrors.email && <p className="text-red-500 text-[11px]">{formErrors.email}</p>}
              </div>

              {/* Address full */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-bold text-slate-700">{t("ที่อยู่ตามทะเบียนบ้าน/ปัจจุบัน *", "Permanent/Current Address *")}</label>
                <textarea
                  name="address"
                  rows={3}
                  placeholder={t("บ้านเลขที่ หมู่ที่ ตำบล อำเภอ จังหวัด รหัสไปรษณีย์...", "House No., Street, District, Province, Postal Code...")}
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${formErrors.address ? "border-red-300 focus:ring-red-200" : "border-slate-200"}`}
                />
                {formErrors.address && <p className="text-red-500 text-[11px]">{formErrors.address}</p>}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-brand-primary hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full text-sm flex items-center space-x-2 shadow-md shadow-blue-500/10 transition-colors"
              >
                <span>{t("ถัดไป", "Next")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          /* STEP 2: Educational Details Form */
          <div className="space-y-6" id="form-step-2">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-brand-primary" />
                <span>{t("ขั้นตอนที่ 2: ประวัติการศึกษาเดิม", "Step 2: Prior Education History")}</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">{t("ระบุระดับการศึกษาที่เพิ่งสำเร็จการศึกษาหรือกำลังจะสำเร็จการศึกษา", "Specify details of your recently completed or ongoing schooling.")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prev School name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">{t("โรงเรียนเดิมที่สำเร็จการศึกษา *", "Previous School Name *")}</label>
                <input
                  type="text"
                  name="prevSchool"
                  placeholder={t("โรงเรียนปทุมรัตต์พิทยาคม", "Local Secondary School")}
                  value={formData.prevSchool}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${formErrors.prevSchool ? "border-red-300 focus:ring-red-200" : "border-slate-200"}`}
                />
                {formErrors.prevSchool && <p className="text-red-500 text-[11px]">{formErrors.prevSchool}</p>}
              </div>

              {/* Prev GPA */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">{t("เกรดเฉลี่ยสะสม (GPAX) *", "Cumulative Grade (GPAX) *")}</label>
                <input
                  type="text"
                  name="prevGpa"
                  placeholder="3.50"
                  value={formData.prevGpa}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${formErrors.prevGpa ? "border-red-300 focus:ring-red-200" : "border-slate-200"}`}
                />
                {formErrors.prevGpa && <p className="text-red-500 text-[11px]">{formErrors.prevGpa}</p>}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-5 py-3 rounded-full text-sm flex items-center space-x-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("ย้อนกลับ", "Back")}</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-brand-primary hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full text-sm flex items-center space-x-2 shadow-md shadow-blue-500/10 transition-colors"
              >
                <span>{t("ถัดไป", "Next")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          /* STEP 3: Major selection and Submit */
          <form onSubmit={handleSubmitForm} className="space-y-6" id="form-step-3">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-brand-primary" />
                <span>{t("ขั้นตอนที่ 3: เลือกประเภทหลักสูตรและสาขาวิชาชีพ", "Step 3: Choose Program & Vocational Branch")}</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">{t("เลือกแผนกวิชาที่คุณมุ่งมั่นต้องการเรียนเพื่อปูทักษะสู่อนาคต", "Select the vocational major you are committed to pursuing.")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Level select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">{t("ระดับชั้นที่ต้องการสมัครเรียน *", "Applied Education Level *")}</label>
                <select
                  name="levelInterest"
                  value={formData.levelInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                >
                  <option value="ปวช.">{t("ระดับ ปวช. (จบ ม.3 / 3 ปี)", "Vocational Certificate (Voc. Cert.) - 3 Years")}</option>
                  <option value="ปวส.">{t("ระดับ ปวส. (จบ ปวช. หรือ ม.6 / 2 ปี)", "High Vocational Diploma (High Voc. Cert.) - 2 Years")}</option>
                </select>
              </div>

              {/* Major select dynamically filtered */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">{t("สาขาวิชาที่ต้องการเลือกเรียน *", "Desired Vocational Major *")}</label>
                <select
                  name="majorInterest"
                  value={formData.majorInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                >
                  {availableMajorsForSelectedLevel.map((major) => (
                    <option key={major.id} value={major.name}>
                      {currentLang === "th" ? `${major.name} (${major.englishName})` : `${major.englishName} (${major.name})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Review Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-800 text-sm">{t("สรุปประวัติใบสมัครของคุณ", "Your Application Summary Review")}</h4>
              <p><span className="font-semibold text-slate-700">{t("ผู้สมัคร:", "Applicant:")}</span> {formData.fullName}</p>
              <p><span className="font-semibold text-slate-700">{t("เกรดเฉลี่ย:", "GPAX:")}</span> {formData.prevGpa} {t("จากโรงเรียน", "from School")} {formData.prevSchool}</p>
              <p><span className="font-semibold text-slate-700">{t("หลักสูตรสมัครเรียน:", "Program of Interest:")}</span> {t("ระดับ", "Level")} {formData.levelInterest === "ปวช." ? t("ปวช.", "Voc. Cert") : t("ปวส.", "High Voc. Diploma")} {t("สาขา", "Branch")} {currentLang === "th" ? formData.majorInterest : (majors.find(m => m.name === formData.majorInterest)?.englishName || formData.majorInterest)}</p>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-5 py-3 rounded-full text-sm flex items-center space-x-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("ย้อนกลับ", "Back")}</span>
              </button>
              <button
                type="submit"
                className="bg-brand-primary hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-full text-sm flex items-center space-x-2 shadow-md shadow-blue-500/10 transition-colors"
              >
                <span>{t("ส่งใบสมัครเข้าสู่ระบบ", "Submit Application Into System")}</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 4 && lastSubmittedForm && (
          /* STEP 4: Registration Success card with barcode layout representation */
          <div className="space-y-8 py-4" id="form-success-container">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
                {t("ระบบได้รับข้อมูลใบสมัครศึกษาต่อเรียบร้อยแล้วค่ะ!", "Application Submitted Successfully!")}
              </h3>
              <p className="text-slate-400 text-xs md:text-sm">{t("ขอแสดงความยินดีกับก้าวแรกของการศึกษาที่วิทยาลัยปทุมรัตต์", "Congratulations on taking your first step with Pathumrat Technology College!")}</p>
            </div>

            {/* Official PDF-like card */}
            <div className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-50 shadow-sm" id="admission-receipt-card">
              {/* Receipt Header banner */}
              <div className="bg-brand-primary p-5 text-white flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-cyan-300" />
                  <div>
                    <h4 className="font-bold text-xs md:text-sm">{t("วิทยาลัยเทคโนโลยีปทุมรัตต์", "Pathumrat Technology College")}</h4>
                    <p className="text-[9px] text-slate-300">Pathumrat Technology College</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-300 block">{t("เลขที่ใบลงทะเบียน", "Registration No.")}</span>
                  <span className="text-xs md:text-sm font-extrabold text-cyan-300">{regNumber}</span>
                </div>
              </div>

              {/* Receipt main table body */}
              <div className="p-6 md:p-8 space-y-6 text-slate-700 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm border-b border-slate-200 pb-5">
                  <p><span className="text-slate-400 font-semibold">{t("ชื่อ-นามสกุลผู้สมัคร:", "Applicant Full Name:")}</span> <span className="font-bold text-slate-900">{lastSubmittedForm.fullName}</span></p>
                  <p><span className="text-slate-400 font-semibold">{t("เลขบัตรประชาชน:", "National ID Number:")}</span> <span className="font-bold text-slate-900">{lastSubmittedForm.citizenId}</span></p>
                  <p><span className="text-slate-400 font-semibold">{t("เบอร์โทรติดต่อ:", "Phone Number:")}</span> <span className="font-bold text-slate-900">{lastSubmittedForm.phone}</span></p>
                  <p><span className="text-slate-400 font-semibold">{t("อีเมลติดต่อ:", "Email Address:")}</span> <span className="font-bold text-slate-900">{lastSubmittedForm.email || "-"}</span></p>
                  <p><span className="text-slate-400 font-semibold">{t("โรงเรียนเดิม:", "Prior School:")}</span> <span className="font-bold text-slate-900">{lastSubmittedForm.prevSchool} ({t("เกรดเฉลี่ย:", "GPAX:")} {lastSubmittedForm.prevGpa})</span></p>
                  <p><span className="text-slate-400 font-semibold">{t("ที่อยู่ติดต่อ:", "Contact Address:")}</span> <span className="font-bold text-slate-900">{lastSubmittedForm.address}</span></p>
                </div>

                <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50 space-y-3">
                  <h4 className="font-bold text-brand-primary text-xs flex items-center space-x-1.5 uppercase tracking-wide">
                    <Award className="w-4.5 h-4.5" />
                    <span>{t("หลักสูตรวิชาชีพที่คุณผ่านสิทธิ์คัดเลือก", "Selected Vocational Course Track")}</span>
                  </h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-slate-800 text-sm font-bold">{t("ระดับชั้น", "Level:")} {lastSubmittedForm.levelInterest}</p>
                      <p className="text-brand-accent text-sm font-bold">{t("สาขาวิชา", "Major:")} {currentLang === "th" ? lastSubmittedForm.majorInterest : (majors.find(m => m.name === lastSubmittedForm.majorInterest)?.englishName || lastSubmittedForm.majorInterest)}</p>
                    </div>
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {t("ผ่านการยื่นสมัคร", "APPROVED / REGISTERED")}
                    </span>
                  </div>
                </div>

                {/* Checklist steps */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                    {t("ขั้นตอนต่อไปสำหรับการเปิดเรียนเทอม 1/2570", "Next Steps for Academic Term 1/2027")}
                  </h4>
                  <ul className="space-y-2.5 text-xs">
                    <li className="flex items-start space-x-2.5 text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</div>
                      <p>
                        <span className="font-semibold text-slate-800">{t("เตรียมเอกสารรายงานตัว:", "Prepare enrollment documents:")}</span>{" "}
                        {t(
                          "รูปถ่ายขนาด 1 นิ้ว (3 ใบ), สำเนาวุฒิการศึกษา (ม.3 หรือ ม.6/ปวช.) 2 ฉบับ, สำเนาทะเบียนบ้านผู้สมัครและผู้ปกครองอย่างละ 1 ฉบับ",
                          "1-inch portrait photos (3 copies), graduation transcript (M.3, M.6, or Voc. Cert) 2 copies, home registrations of both student and parent (1 copy each)."
                        )}
                      </p>
                    </li>
                    <li className="flex items-start space-x-2.5 text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</div>
                      <p>
                        <span className="font-semibold text-slate-800">{t("เข้ารายงานตัวและสัมภาษณ์:", "Report for Registration & Interview:")}</span>{" "}
                        {t(
                          "เดินทางมายังตึกอำนวยการ แผนกงานวิชาการของวิทยาลัยฯ ในเวลาทำการ เพื่อยื่นหลักฐานและรับบัตรประจำตัวนักศึกษาใหม่",
                          "Visit the Academic Division at the Administration Building during office hours to submit papers and obtain your new student ID card."
                        )}
                      </p>
                    </li>
                    <li className="flex items-start space-x-2.5 text-slate-600">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</div>
                      <p>
                        <span className="font-semibold text-slate-800">{t("สิทธิพิเศษโควตา:", "Quota Privileges:")}</span>{" "}
                        {t(
                          "สิทธิรับส่วนลดค่าจัดหาหนังสือเรียน ตำรา และอุปกรณ์พละชุดกีฬาฟรีเมื่อมารายงานตัวตามวันเวลากำหนด",
                          "Eligible for free textbook subsidies, course materials, physical education uniforms, and sportswear if registered on time."
                        )}
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Mock Barcode representation */}
                <div className="flex flex-col items-center justify-center border-t border-slate-100 pt-6 space-y-1.5 shrink-0">
                  <div className="flex items-center space-x-0.5 h-10 w-44">
                    {[1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 2, 1, 3, 4, 1, 2, 3, 4, 1, 2, 4].map((width, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900 h-full"
                        style={{ width: `${width}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">{regNumber}</span>
                </div>
              </div>
            </div>

            {/* Print or Start new button */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                onClick={handleMockPrint}
                className="bg-brand-primary hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full text-xs flex items-center space-x-2 shadow-md shadow-blue-500/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t("พิมพ์ / บันทึกหน้าจอใบรับสมัคร", "Print / Save Receipt")}</span>
              </button>
              <button
                type="button"
                onClick={startNewAdmission}
                className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-6 py-3 rounded-full text-xs flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t("ยื่นใบสมัครคนใหม่", "Submit New Application")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
