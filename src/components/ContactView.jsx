/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "../context/DataContext";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
export default function ContactView() {
  const { collegeInfo, addContactMessage } = useData();
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
      setErrorMsg("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19\u0E17\u0E38\u0E01\u0E0A\u0E48\u0E2D\u0E07");
      return;
    }
    addContactMessage(formData);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  return <div className="bg-slate-50/50 min-h-screen py-12 md:py-20 font-sans" id="contact-view-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {
    /* Intro Header */
  }
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold text-brand-primary bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            ติดต่อสอบถามประสานงาน
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-secondary font-display tracking-tight">
            ติดต่อเรา (Contact Us)
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
            หากคุณมีข้อสงสัยเกี่ยวกับหลักสูตรการเรียน การสมัครเรียนออนไลน์ ทุนการศึกษา 
            หรือติดต่อขอความอนุเคราะห์จากวิทยาลัย สามารถส่งข้อความหาเราได้ตลอดเวลา
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {
    /* Left Side: Contact Information Cards */
  }
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3">
                ข้อมูลการติดต่ออย่างเป็นทางการ
              </h2>

              <div className="space-y-5">
                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-brand-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">ที่ตั้งวิทยาลัย</p>
                    <p className="mt-1 leading-relaxed">{collegeInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">เบอร์โทรศัพท์ติดต่อหลัก</p>
                    <p className="mt-1 font-semibold">{collegeInfo.phone} (สำนักงาน)</p>
                    <p className="text-slate-500">{collegeInfo.mobile} (ฝ่ายรับสมัครนักเรียนใหม่)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">อีเมลทางการ</p>
                    <p className="mt-1 underline">{collegeInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">เวลาทำการของวิทยาลัย</p>
                    <p className="mt-1">วันจันทร์ – วันศุกร์: 08:30 น. – 16:30 น.</p>
                    <p className="text-slate-400">หยุดวันเสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์</p>
                  </div>
                </div>
              </div>
            </div>

            {
    /* Immersive Mock Google Maps card element */
  }
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-xs font-extrabold text-amber-300">แผนที่การเดินทาง (GPS)</h3>
                  <p className="text-[11px] text-slate-400">วิทยาลัยเทคโนโลยีปทุมรัตต์ ร้อยเอ็ด</p>
                </div>
                <MapPin className="w-5 h-5 text-amber-400 animate-bounce" />
              </div>

              {
    /* Decorative schematic radar/map look */
  }
              <div className="h-40 bg-slate-800 rounded-2xl relative overflow-hidden border border-slate-700 flex items-center justify-center text-xs text-slate-400">
                {
    /* Radial grid circles */
  }
                <div className="absolute w-32 h-32 rounded-full border border-slate-700/50 animate-pulse" />
                <div className="absolute w-56 h-56 rounded-full border border-slate-700/30" />
                
                {
    /* Simulated streets */
  }
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700/40 transform -rotate-12" />
                <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-slate-700/40" />
                
                {
    /* College marker */
  }
                <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-4 h-4 bg-brand-primary rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-ping absolute" />
                  <div className="w-4 h-4 bg-brand-primary rounded-full border-2 border-white flex items-center justify-center shadow-lg relative z-10" />
                  <span className="bg-slate-900 border border-slate-700 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-md mt-1 shadow-lg shrink-0 whitespace-nowrap">
                    {collegeInfo.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {
    /* Right Side: High Fidelity Form */
  }
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-1">
                <h2 className="text-base font-extrabold text-slate-800">
                  แบบฟอร์มส่งข้อความติดต่อกลับ
                </h2>
                <p className="text-xs text-slate-400">
                  กรอกรายละเอียดของคุณเพื่อให้นายทะเบียนของวิทยาลัยตอบข้อสงสัยกลับไปยังคุณ
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4"
  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-extrabold text-emerald-900">
                        ส่งข้อความติดต่อกลับสำเร็จแล้ว!
                      </h3>
                      <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                        ขอบคุณที่ส่งข้อความหาเรา เจ้าหน้าที่กลุ่มงานทะเบียนและประชาสัมพันธ์ของ
                        {collegeInfo.name} จะตรวจสอบข้อร้องเรียน/ข้อมูลของคุณ และติดต่อกลับทางอีเมลในทันที
                      </p>
                    </div>
                    <button
    onClick={() => setIsSubmitted(false)}
    className="text-xs font-bold text-brand-primary border border-blue-200 bg-white hover:bg-blue-50 px-5 py-2 rounded-xl transition-all shadow-sm"
  >
                      ส่งข้อความใหม่อีกครั้ง
                    </button>
                  </motion.div> : <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    {errorMsg && <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl flex items-center space-x-2 font-bold">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-500">ชื่อ-นามสกุล ของคุณ</label>
                        <input
    type="text"
    required
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
    placeholder="เช่น นายปัญญา ใจรักเรียน"
  />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-500">อีเมลติดต่อกลับ</label>
                        <input
    type="email"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
    placeholder="เช่น panya.jai@gmail.com"
  />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">เรื่องที่ต้องการสอบถาม</label>
                      <input
    type="text"
    required
    value={formData.subject}
    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
    className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
    placeholder="เช่น สอบถามรายละเอียดเอกสารการขอทุนเรียนฟรี ปวช."
  />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">ข้อความรายละเอียดเพิ่มเติม</label>
                      <textarea
    required
    rows={5}
    value={formData.message}
    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
    className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
    placeholder="พิมพ์ข้อคำถามหรือรายละเอียดที่คุณต้องการแจ้งให้วิทยาลัยรับทราบที่นี่..."
  />
                    </div>

                    <button
    type="submit"
    className="w-full bg-brand-primary hover:bg-blue-700 text-white p-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center space-x-2"
  >
                      <Send className="w-4 h-4" />
                      <span>ส่งข้อความหาวิทยาลัย</span>
                    </button>
                  </form>}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
