/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Building2, Award, Calendar, HelpCircle, ChevronDown, ChevronUp, BookOpen, Sparkles } from "lucide-react";
import { useData } from "../context/DataContext";

export default function HistoryView() {
  const { collegeInfo, faqList } = useData();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-12 md:py-20 font-sans" id="history-view-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold text-brand-primary bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
            <span>ความเป็นมาและเกียรติประวัติ</span>
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-secondary font-display tracking-tight">
            ประวัติความเป็นมา (College History)
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
            ทำความรู้จักกับสถาบันการศึกษาวิชาชีพชั้นนำในอำเภอปทุมรัตต์ จังหวัดร้อยเอ็ด และเป้าหมายการพัฒนาความรู้สู่สากล
          </p>
        </div>

        {/* 1. Main History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="section-college-history">
          <div className="space-y-6">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              จุดเริ่มต้นของเรา
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-secondary tracking-tight">
              วิทยาลัยเทคโนโลยีปทุมรัตต์
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              วิทยาลัยเทคโนโลยีปทุมรัตต์ ได้รับการจัดตั้งขึ้นเมื่อปีพุทธศักราช {collegeInfo.foundedYear} โดยผู้บริหารผู้มีวิสัยทัศน์กว้างไกลทางด้านการศึกษาและการพัฒนาสายอาชีพในภาคตะวันออกเฉียงเหนือ มุ่งเน้นเติมเต็มความต้องการกำลังพลทักษะสูงในเขตอำเภอปทุมรัตต์ และจังหวัดร้อยเอ็ด
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              ด้วยนวัตกรรมการสอนแบบเน้นงานปฏิบัติจริง ร่วมมืออย่างใกล้ชิดกับสถานประกอบการอุตสาหกรรม ศูนย์บริการรถยนต์สมัยใหม่ และสถาบันการเงินการคลัง ทำให้นักเรียนและนักศึกษาที่จบจากวิทยาลัยเทคโนโลยีปทุมรัตต์เป็นที่ประจักษ์ในตลาดแรงงานว่าเป็นผู้ที่มีทักษะฝีมือยอดเยี่ยม มีความอ่อนน้อมถ่อมตน มีวินัย และพร้อมปฏิบัติหน้าที่ในอุตสาหกรรมยุคดิจิทัลได้อย่างมืออาชีพ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-slate-500 pt-2">
              <div className="flex items-center space-x-2.5 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <Calendar className="w-5 h-5 text-brand-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">ก่อตั้งตั้งแต่ปี</p>
                  <span className="text-xs font-bold text-slate-700">พ.ศ. {collegeInfo.foundedYear} (มากกว่า {new Date().getFullYear() + 543 - parseInt(collegeInfo.foundedYear)} ปี)</span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <Building2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">สถานศึกษามาตรฐาน</p>
                  <span className="text-xs font-bold text-slate-700">รับรองโดยกระทรวงศึกษาธิการ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Image/Banner */}
          <div className="relative rounded-3xl overflow-hidden h-72 md:h-96 shadow-lg border border-slate-200" id="visual-about-banner">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop"
              alt="วิทยาลัยเทคโนโลยีปทุมรัตต์"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-6 md:p-8">
              <p className="text-white font-bold text-base md:text-lg">
                "ทักษะเยี่ยม เปี่ยมคุณธรรม เลิศล้ำเทคโนโลยี"
              </p>
            </div>
          </div>
        </div>

        {/* 2. Philosophy & Vision Block */}
        <div className="bg-gradient-to-br from-brand-secondary to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -mr-20 -mt-20" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="space-y-2 md:border-r border-slate-800 md:pr-8">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-wider font-extrabold flex items-center space-x-1">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>ปรัชญาวิทยาลัย</span>
              </span>
              <h3 className="text-lg font-bold text-white">Philosophy</h3>
              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                "{collegeInfo.philosophy || "ทักษะเยี่ยม เปี่ยมคุณธรรม เลิศล้ำเทคโนโลยี"}"
              </p>
            </div>

            <div className="space-y-2 md:border-r border-slate-800 md:px-8">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-wider font-extrabold flex items-center space-x-1">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>วิสัยทัศน์</span>
              </span>
              <h3 className="text-lg font-bold text-white">Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                "{collegeInfo.vision || "มุ่งเน้นสร้างนวัตกรและนักปฏิบัติมืออาชีพที่ตรงกับความต้องการของอุตสาหกรรมในยุคดิจิทัล"}"
              </p>
            </div>

            <div className="space-y-2 md:pl-8">
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-extrabold flex items-center space-x-1">
                <Award className="w-4 h-4 shrink-0" />
                <span>ค่านิยมหลัก</span>
              </span>
              <h3 className="text-lg font-bold text-white">Core Values</h3>
              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                ซื่อสัตย์ มีระเบียบวินัย ใฝ่รู้คู่คุณธรรม มุ่งเน้นการลงมือปฏิบัติจริงและการแก้ปัญหาอย่างสร้างสรรค์เพื่อความสำเร็จร่วมกัน
              </p>
            </div>
          </div>
        </div>

        {/* 3. FAQ Accordion list */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8" id="section-faq">
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
        </div>

      </div>
    </div>
  );
}
