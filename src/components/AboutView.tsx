/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Users, MapPin, Phone, Mail, Globe, Facebook, 
  HelpCircle, ChevronDown, ChevronUp, MessageSquare, Send, CheckCircle 
} from "lucide-react";
import { useData } from "../context/DataContext";
import { administrators, faqList } from "../data";
import { ContactMessage } from "../types";

interface AboutViewProps {
  initialSection?: string;
  setInitialSection?: (section: string) => void;
}

export default function AboutView({ initialSection, setInitialSection }: AboutViewProps = {}) {
  const { collegeInfo, addContactMessage } = useData();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [contactData, setContactData] = useState<ContactMessage>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof ContactMessage, string>>>({});
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (initialSection) {
      const element = document.getElementById(initialSection);
      if (element) {
        // Safe timeout to let browser layout stabilize
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
      if (setInitialSection) {
        setInitialSection("");
      }
    }
  }, [initialSection, setInitialSection]);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
    if (contactErrors[name as keyof ContactMessage]) {
      setContactErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof ContactMessage, string>> = {};

    if (!contactData.name.trim()) errors.name = "กรุณากรอกชื่อของคุณ";
    if (!contactData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      errors.email = "กรุณากรอกอีเมลที่ถูกต้อง";
    }
    if (!contactData.subject.trim()) errors.subject = "กรุณากรอกหัวข้อเรื่อง";
    if (!contactData.message.trim()) errors.message = "กรุณากรอกข้อความ";

    setContactErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Submit dynamically to DataContext!
      addContactMessage(contactData);
      setIsSent(true);
      // Reset form
      setContactData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="about-view">
      {/* 1. History & Vision */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="section-college-history">
        <div className="space-y-6">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            ประวัติและความเป็นมา
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-brand-secondary tracking-tight">
            ประวัติวิทยาลัยเทคโนโลยีปทุมรัตต์
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            วิทยาลัยเทคโนโลยีปทุมรัตต์ ได้รับการจัดตั้งขึ้นเมื่อปีพุทธศักราช {collegeInfo.foundedYear} โดยผู้บริหารผู้มีวิสัยทัศน์กว้างไกลทางด้านการศึกษาและการพัฒนาสายอาชีพในภาคตะวันออกเฉียงเหนือ มุ่งเน้นเติมเต็มความต้องการกำลังพลทักษะสูงในเขตอำเภอปทุมรัตต์ และจังหวัดร้อยเอ็ด
          </p>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            ด้วยนวัตกรรมการสอนแบบเน้นงานปฏิบัติจริง ร่วมมืออย่างใกล้ชิดกับสถานประกอบการอุตสาหกรรม ศูนย์บริการรถยนต์สมัยใหม่ และสถาบันการเงินการคลัง ทำให้นักเรียนและนักศึกษาที่จบจากวิทยาลัยเทคโนโลยีปทุมรัตต์เป็นที่ประจักษ์ในตลาดแรงงานว่าเป็นผู้ที่มีทักษะฝีมือยอดเยี่ยม มีความอ่อนน้อมถ่อมตน มีวินัย และพร้อมปฏิบัติหน้าที่ในอุตสาหกรรมยุคดิจิทัลได้อย่างมืออาชีพ
          </p>
          <div className="flex space-x-6 text-slate-500 pt-2">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-brand-primary" />
              <span className="text-xs font-bold text-slate-700">ก่อตั้งมามากกว่า {new Date().getFullYear() + 543 - parseInt(collegeInfo.foundedYear)} ปี</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-brand-primary" />
              <span className="text-xs font-bold text-slate-700">ผลิตบัณฑิตสายอาชีพหลายพันคน</span>
            </div>
          </div>
        </div>

        {/* Mock visual banner overlay */}
        <div className="relative rounded-3xl overflow-hidden h-72 md:h-96 shadow-lg border border-slate-100" id="visual-about-banner">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop" 
            alt="วิทยาลัยเทคโนโลยีปทุมรัตต์"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 md:p-8">
            <p className="text-white font-bold text-base md:text-lg">
              "ทักษะเยี่ยม เปี่ยมคุณธรรม เลิศล้ำเทคโนโลยี"
            </p>
          </div>
        </div>
      </section>

      {/* 2. Administrative Team cards */}
      <section className="space-y-10" id="section-administration">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            คณะผู้บริหาร
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-secondary tracking-tight">
            คณะผู้บริหารวิทยาลัยเทคโนโลยีปทุมรัตต์
          </h2>
          <p className="text-slate-500 text-sm">
            คณะผู้บริหารวิทยาลัยมีหัวใจมุ่งมั่นส่งเสริมการเรียนรู้ของคนรุ่นใหม่ สนับสนุนอุปกรณ์การทดลอง และโครงสร้างพื้นฐานไอทีที่ดีที่สุด
          </p>
        </div>

        {/* Administrators list Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {administrators.map((admin, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200 text-center space-y-4 group"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-slate-100 group-hover:border-brand-primary/20 transition-all">
                <img 
                  src={admin.imageUrl} 
                  alt={admin.name} 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors text-base">
                  {admin.name}
                </h3>
                <p className="text-xs font-semibold text-brand-accent mt-0.5">{admin.position}</p>
                <p className="text-[10px] text-slate-400 mt-1">{admin.department}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Frequently Asked Questions (FAQ) Accordion list */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12" id="section-faq">
        <div className="space-y-4 lg:col-span-1">
          <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            ถาม-ตอบ คลายข้อสงสัย
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-secondary tracking-tight leading-tight">
            คำถามที่พบบ่อย (FAQ)
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            ไขข้อข้องใจเกี่ยวกับสิทธิ์การกู้ยืม ทุนการศึกษา รายละเอียดโควตา สิทธิพิเศษ และการสมัครเข้าเรียน สำหรับน้องๆ และผู้ปกครองในพื้นที่ปทุมรัตต์
          </p>
        </div>

        {/* FAQ listing with manual state accordion */}
        <div className="lg:col-span-2 space-y-4">
          {faqList.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-bold text-slate-800 text-sm md:text-base flex items-start space-x-2">
                    <HelpCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>

                {/* Animated disclosure panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Contact Us details & message Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm p-6 md:p-10" id="section-contact-form">
        {/* Contact details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              ช่องทางการติดต่อ
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-secondary tracking-tight">
              กองกลางและงานประชาสัมพันธ์
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              ยินดีรับคำแนะนำ ข้อสงสัย หรือการติดต่อขอเข้าเยี่ยมชมสถานศึกษาเป็นกลุ่มของสถาบันมัธยมศึกษาเครือข่าย
            </p>
          </div>

          <div className="space-y-4 text-xs md:text-sm text-slate-600">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {collegeInfo.address}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-brand-primary shrink-0" />
              <span>เบอร์หลัก: {collegeInfo.phone} (เวลาราชการ)</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-brand-primary shrink-0" />
              <span>อีเมลงานกลาง: {collegeInfo.email}</span>
            </div>
          </div>

          {/* Social connections links */}
          <div className="pt-4 flex items-center space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center space-x-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook Page</span>
            </a>
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center space-x-1.5 bg-slate-50 text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>ดูแผนที่วิทยาลัย</span>
            </a>
          </div>
        </div>

        {/* Contact form interaction */}
        <div className="space-y-4" id="contact-interactive-form">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800 text-base flex items-center space-x-1.5">
              <MessageSquare className="w-5 h-5 text-brand-primary" />
              <span>ส่งข้อความสอบถามแอดมิน</span>
            </h3>
            <p className="text-slate-400 text-[11px] mt-0.5">ทีมแอดมินวิทยาลัยจะติดต่อกลับทางอีเมลของคุณโดยเร็วที่สุด</p>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sender Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">ชื่อของคุณ *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="นายกิตติศักดิ์ พลมั่น"
                  value={contactData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-xs md:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                    contactErrors.name ? "border-red-300 focus:ring-red-100" : "border-slate-200"
                  }`}
                />
                {contactErrors.name && <p className="text-red-500 text-[10px]">{contactErrors.name}</p>}
              </div>

              {/* Sender Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">อีเมลกลับ *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="kitti.s@mail.com"
                  value={contactData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-xs md:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                    contactErrors.email ? "border-red-300 focus:ring-red-100" : "border-slate-200"
                  }`}
                />
                {contactErrors.email && <p className="text-red-500 text-[10px]">{contactErrors.email}</p>}
              </div>
            </div>

            {/* Sender Subject */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">หัวเรื่องติดต่อ *</label>
              <input
                type="text"
                name="subject"
                placeholder="สอบถามค่าเทอม/โควตาพิเศษ..."
                value={contactData.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-xs md:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  contactErrors.subject ? "border-red-300 focus:ring-red-100" : "border-slate-200"
                }`}
              />
              {contactErrors.subject && <p className="text-red-500 text-[10px]">{contactErrors.subject}</p>}
            </div>

            {/* Sender Message details */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">เนื้อหาข้อความรายละเอียด *</label>
              <textarea
                name="message"
                rows={3}
                placeholder="พิมพ์สิ่งที่ต้องการสอบถามหรือขอคำแนะนำ..."
                value={contactData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-xs md:text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  contactErrors.message ? "border-red-300 focus:ring-red-100" : "border-slate-200"
                }`}
              />
              {contactErrors.message && <p className="text-red-500 text-[10px]">{contactErrors.message}</p>}
            </div>

            <div className="flex justify-between items-center gap-4">
              <div>
                <AnimatePresence>
                  {isSent && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-emerald-600 text-xs font-bold flex items-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>ส่งข้อความสำเร็จแล้วค่ะ แอดมินจะรีบติดต่อกลับค่ะ!</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                className="bg-brand-primary hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-full text-xs flex items-center space-x-1.5 shadow-md shadow-blue-500/10 shrink-0 transition-colors"
              >
                <span>ส่งอีเมลติดต่อ</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
