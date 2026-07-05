/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GraduationCap, Phone, Mail, MapPin, Facebook, Globe, Award, ShieldCheck } from "lucide-react";
import { useData } from "../context/DataContext";
export default function Footer({ setActiveTab }) {
  const { collegeInfo, t, currentLang } = useData();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const handleLinkClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return <footer className="bg-slate-900 text-slate-300 border-t border-slate-800" id="main-footer">
      {
    /* Top badges bar */
  }
      <div className="border-b border-slate-800 bg-slate-950/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">{t("การรับรองคุณภาพมาตรฐาน", "Accredited Quality Standards")}</p>
              <p className="text-xs text-slate-400">{t("ผ่านการประเมินคุณภาพการศึกษาทางวิชาชีพจากกระทรวงศึกษาธิการ", "Certified by the Ministry of Education for high academic standards")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">{t("หลักสูตรตรงความต้องการตลาด", "Market-Driven Curriculum")}</p>
              <p className="text-xs text-slate-400">{t("เรียนรู้ทักษะที่ใช้ได้จริงพร้อมฝึกงานในบริษัทระดับประเทศ", "Learn practical skills and complete internships in nationwide corporations")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {
    /* Col 1: About college */
  }
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-white font-bold text-md leading-tight">{t(collegeInfo.name, collegeInfo.englishName)}</h3>
                <p className="text-xs text-slate-400">Pathumrat Technology College</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              "{currentLang === "th" ? collegeInfo.philosophy : "Excellent Skills, Rich Morals, Supreme Technology"}"
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("วิทยาลัยมุ่งเน้นสร้างแรงงานวิชาชีพที่มีทักษะขั้นสูง ซื่อสัตย์ มีระเบียบวินัย และสามารถใช้เทคโนโลยีสมัยใหม่พัฒนาตนเองและท้องถิ่นได้อย่างยั่งยืน", "PTC cultivates high-skilled vocational personnel equipped with discipline and technological adaptability for sustainable community growth.")}
            </p>
          </div>

          {
    /* Col 2: Useful Links */
  }
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-brand-primary pl-3">
              {t("ลิงก์ที่เป็นประโยชน์", "Useful Links")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick("home")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left cursor-pointer"
                >
                  {t("หน้าแรกวิทยาลัย", "College Home")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("history")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left cursor-pointer"
                >
                  {t("ประวัติความเป็นมาของวิทยาลัย", "Our History")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("personnel")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left cursor-pointer"
                >
                  {t("ทำเนียบคณะผู้บริหารสถานศึกษา", "Our Personnel List")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("curriculum")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left cursor-pointer"
                >
                  {t("หลักสูตรประกาศนียบัตรวิชาชีพ", "Vocational Curriculum")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("news")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left cursor-pointer"
                >
                  {t("ข่าวสารและกิจกรรมประกาศ", "News & Events")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("admission")}
                  className="hover:text-cyan-400 transition-colors duration-150 text-left cursor-pointer"
                >
                  {t("แบบฟอร์มสมัครเรียนออนไลน์", "Online Application Form")}
                </button>
              </li>
            </ul>
          </div>

          {
    /* Col 3: Academic levels info */
  }
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-brand-primary pl-3">
              {t("หลักสูตรหลักของเรา", "Our Main Courses")}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>{t("• แผนกช่างยนต์ (ปวช. / ปวส.)", "• Automotive (Cert. & Diploma)")}</li>
              <li>{t("• แผนกช่างไฟฟ้ากำลัง (ปวช. / ปวส.)", "• Electrical Power (Cert. & Diploma)")}</li>
              <li>{t("• แผนกเทคโนโลยีสารสนเทศ (ปวช. / ปวส.)", "• Information Technology (Cert. & Diploma)")}</li>
              <li>{t("• แผนกการบัญชีและการเงิน (ปวช. / ปวส.)", "• Accounting & Finance (Cert. & Diploma)")}</li>
              <li className="text-xs text-cyan-400 mt-2 font-semibold">
                * {t("พัฒนาหลักสูตรร่วมกับสถานประกอบการเพื่อการมีงานทำ 100%", "Developed with corporate partners for 100% employment rate")}
              </li>
            </ul>
          </div>

          {
    /* Col 4: Contact details */
  }
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-4 border-brand-primary pl-3">
              {t("ติดต่อสอบถาม", "Contact Us")}
            </h4>
            <div className="flex items-start space-x-2.5 text-sm">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-slate-400 leading-relaxed text-xs">
                {currentLang === "th" ? collegeInfo.address : "Pathumrat Sub-district, Pathumrat District, Roi Et Province, 45190"}
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

            {
    /* Social icons */
  }
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

        {
    /* Bottom copyright area */
  }
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p
            onClick={() => handleLinkClick("admin")}
            className="cursor-pointer hover:text-slate-300 select-none transition-colors duration-200 font-medium"
            title="ระบบจัดการหลังบ้าน"
            id="footer-admin-gate"
          >
            {t("© 2026 วิทยาลัยเทคโนโลยีปทุมรัตต์", "© 2026 Pathumrat Technology College")}
          </p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400">{t("นโยบายความเป็นส่วนตัว", "Privacy Policy")}</span>
            <span>•</span>
            <span className="hover:text-slate-400">{t("แผนผังเว็บไซต์", "Sitemap")}</span>
          </div>
        </div>
      </div>
    </footer>;
}
