/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GraduationCap, Phone, Mail, MapPin, Facebook, Globe, Award, ShieldCheck } from "lucide-react";
import { useData } from "../context/DataContext";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const { collegeInfo } = useData();
  const currentYear = new Date().getFullYear();


  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800" id="main-footer">
      {/* Top badges bar */}
      <div className="border-b border-slate-800 bg-slate-950/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">การรับรองคุณภาพมาตรฐาน</p>
              <p className="text-xs text-slate-400">ผ่านการประเมินคุณภาพการศึกษาทางวิชาชีพจากกระทรวงศึกษาธิการ</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">หลักสูตรตรงความต้องการตลาด</p>
              <p className="text-xs text-slate-400">เรียนรู้ทักษะที่ใช้ได้จริงพร้อมฝึกงานในบริษัทระดับประเทศ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About college */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-white font-bold text-md leading-tight">{collegeInfo.name}</h3>
                <p className="text-xs text-slate-400">Pathumrat Technology College</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              "{collegeInfo.philosophy}"
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              วิทยาลัยมุ่งเน้นสร้างแรงงานวิชาชีพที่มีทักษะขั้นสูง ซื่อสัตย์ มีระเบียบวินัย และสามารถใช้เทคโนโลยีสมัยใหม่พัฒนาตนเองและท้องถิ่นได้อย่างยั่งยืน
            </p>
          </div>

          {/* Col 2: Useful Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-brand-primary pl-3">
              ลิงก์ที่เป็นประโยชน์
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick("home")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left"
                >
                  หน้าแรกวิทยาลัย
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("curriculum")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left"
                >
                  หลักสูตรประกาศนียบัตร (ปวช.)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("curriculum")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left"
                >
                  หลักสูตรประกาศนียบัตรชั้นสูง (ปวส.)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("news")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left"
                >
                  ข่าวสารและประกาศจัดซื้อจัดจ้าง
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("admission")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left"
                >
                  แบบฟอร์มสมัครเรียนออนไลน์
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic levels info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-brand-primary pl-3">
              หลักสูตรหลักของเรา
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• แผนกช่างยนต์ (ปวช. / ปวส.)</li>
              <li>• แผนกช่างไฟฟ้ากำลัง (ปวช. / ปวส.)</li>
              <li>• แผนกเทคโนโลยีสารสนเทศ (ปวช. / ปวส.)</li>
              <li>• แผนกการบัญชีและการเงิน (ปวช. / ปวส.)</li>
              <li className="text-xs text-cyan-400 mt-2 font-semibold">
                * พัฒนาหลักสูตรร่วมกับสถานประกอบการเพื่อการมีงานทำ 100%
              </li>
            </ul>
          </div>

          {/* Col 4: Contact details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-brand-primary pl-3">
              ติดต่อสอบถาม
            </h4>
            <div className="flex items-start space-x-2.5 text-sm">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-slate-400 leading-relaxed text-xs">
                {collegeInfo.address}
              </span>
            </div>
            <div className="flex items-center space-x-2.5 text-sm">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-400">{collegeInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2.5 text-sm">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-400 text-xs">{collegeInfo.email}</span>
            </div>

            {/* Social icons */}
            <div className="pt-4 flex items-center space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
                id="footer-fb-link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright area */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p 
            onClick={() => handleLinkClick("admin")}
            className="cursor-pointer hover:text-slate-400 select-none transition-colors duration-200"
            title="ระบบบริหารจัดการสำหรับเจ้าหน้าที่"
            id="footer-admin-gate"
          >
            © {currentYear} {collegeInfo.name}. สงวนลิขสิทธิ์ทั้งหมด
          </p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400">นโยบายความเป็นส่วนตัว</span>
            <span>•</span>
            <span className="hover:text-slate-400">แผนผังเว็บไซต์</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
