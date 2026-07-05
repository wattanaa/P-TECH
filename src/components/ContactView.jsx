/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "../context/DataContext";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactView() {
  const { collegeInfo, addContactMessage, t, currentLang } = useData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg(t("กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง", "Please fill in all the fields in the form"));
      return;
    }
    addContactMessage(formData);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-12 md:py-20 font-sans" id="contact-view-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold text-brand-primary bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            {t("ติดต่อสอบถามประสานงาน", "Enquiries & Admissions Support")}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-secondary font-display tracking-tight">
            {t("ติดต่อเรา (Contact Us)", "Contact Us")}
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
            {t(
              "หากคุณมีข้อสงสัยเกี่ยวกับหลักสูตรการเรียน การสมัครเรียนออนไลน์ ทุนการศึกษา หรือติดต่อขอความอนุเคราะห์จากวิทยาลัย สามารถส่งข้อความหาเราได้ตลอดเวลา",
              "Have questions regarding our academic curricula, digital application processes, special quota grants, or scholarships? Reach out to our registrars anytime."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3">
                {t("ข้อมูลการติดต่ออย่างเป็นทางการ", "Official Contact Channels")}
              </h2>

              <div className="space-y-5">
                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-brand-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">{t("ที่ตั้งวิทยาลัย", "Campus Location")}</p>
                    <p className="mt-1 leading-relaxed">
                      {currentLang === "th" ? collegeInfo.address : "Pathumrat District, Roi Et Province, Thailand 45190"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">{t("เบอร์โทรศัพท์ติดต่อหลัก", "Direct Hotlines")}</p>
                    <p className="mt-1 font-semibold">{collegeInfo.phone} {t("(สำนักงาน)", "(Office)")}</p>
                    <p className="text-slate-500">{collegeInfo.mobile} {t("(ฝ่ายรับสมัครนักเรียนใหม่)", "(Admissions & Quota Registration Office)")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">{t("อีเมลทางการ", "Official Academic Email")}</p>
                    <p className="mt-1 underline">{collegeInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">{t("เวลาทำการของวิทยาลัย", "Office Business Hours")}</p>
                    <p className="mt-1">{t("วันจันทร์ – วันศุกร์: 08:30 น. – 16:30 น.", "Monday – Friday: 08:30 AM – 04:30 PM")}</p>
                    <p className="text-slate-400">{t("หยุดวันเสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์", "Closed on Saturdays, Sundays, and public holidays.")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GPS Map Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden font-sans" id="gps-map-card">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-800">{t("แผนที่การเดินทาง (GPS Map)", "Location Coordinates (GPS Map)")}</h3>
                  <p className="text-[11px] text-slate-400">{t("ค้นหาพิกัดและนำทางมายังวิทยาลัยได้โดยสะดวก", "Find and navigate to the campus campus with Google Maps easily.")}</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                  <MapPin className="w-5 h-5 animate-bounce" />
                </div>
              </div>

              {collegeInfo.googleMapIframe ? (
                <div className="h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative group bg-slate-100">
                  <iframe
                    src={collegeInfo.googleMapIframe}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                    className="w-full h-full rounded-2xl no-lightbox"
                    id="gps-google-map-iframe"
                  ></iframe>
                </div>
              ) : (
                <div className="h-44 bg-slate-800 rounded-2xl relative overflow-hidden border border-slate-700 flex items-center justify-center text-xs text-slate-400">
                  <div className="absolute w-32 h-32 rounded-full border border-slate-700/50 animate-pulse" />
                  <div className="absolute w-56 h-56 rounded-full border border-slate-700/30" />
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700/40 transform -rotate-12" />
                  <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-slate-700/40" />
                  <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-4 h-4 bg-brand-primary rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-ping absolute" />
                    <div className="w-4 h-4 bg-brand-primary rounded-full border-2 border-white flex items-center justify-center shadow-lg relative z-10" />
                    <span className="bg-slate-900 border border-slate-700 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-md mt-1 shadow-lg shrink-0 whitespace-nowrap">
                      {t(collegeInfo.name, "Pathumrat Technology College")}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(collegeInfo.name + " " + collegeInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-200 transition-all flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{t("เปิดแผนที่นำทาง (Google Maps App)", "Open in Google Maps App")}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: High Fidelity Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-1">
                <h2 className="text-base font-extrabold text-slate-800">
                  {t("แบบฟอร์มส่งข้อความติดต่อกลับ", "Inquiry Form")}
                </h2>
                <p className="text-xs text-slate-400">
                  {t("กรอกรายละเอียดของคุณเพื่อให้นายทะเบียนของวิทยาลัยตอบข้อสงสัยกลับไปยังคุณ", "Fill out the fields below so our registrar desk can respond to you.")}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-extrabold text-emerald-900">
                        {t("ส่งข้อความติดต่อกลับสำเร็จแล้ว!", "Message Sent Successfully!")}
                      </h3>
                      <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                        {t(
                          `ขอบคุณที่ส่งข้อความหาเรา เจ้าหน้าที่กลุ่มงานทะเบียนและประชาสัมพันธ์ของ ${collegeInfo.name} จะตรวจสอบข้อร้องเรียน/ข้อมูลของคุณ และติดต่อกลับทางอีเมลในทันที`,
                          `Thank you for contacting us. The registrar office of Pathumrat Technology College will review your message and reach back to you via your email shortly.`
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-brand-primary border border-blue-200 bg-white hover:bg-blue-50 px-5 py-2 rounded-xl transition-all shadow-sm"
                    >
                      {t("ส่งข้อความใหม่อีกครั้ง", "Send Another Message")}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    {errorMsg && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl flex items-center space-x-2 font-bold">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-500">{t("ชื่อ-นามสกุล ของคุณ", "Your Full Name")}</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder={t("เช่น นายปัญญา ใจรักเรียน", "e.g., John Doe")}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-500">{t("อีเมลติดต่อกลับ", "Return Email Address")}</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="e.g., john.doe@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">{t("เรื่องที่ต้องการสอบถาม", "Message Topic / Subject")}</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder={t("เช่น สอบถามรายละเอียดเอกสารการขอทุนเรียนฟรี ปวช.", "e.g., Questions about scholarship requirements")}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">{t("ข้อความรายละเอียดเพิ่มเติม", "Inquiry Message Description")}</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
                        placeholder={t("พิมพ์ข้อคำถามหรือรายละเอียดที่คุณต้องการแจ้งให้วิทยาลัยรับทราบที่นี่...", "Type your comments, queries or details you would like to submit to the college here...")}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-primary hover:bg-blue-700 text-white p-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t("ส่งข้อความหาวิทยาลัย", "Send Inquiry")}</span>
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
