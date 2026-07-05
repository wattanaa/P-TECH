/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Users, Mail, ShieldAlert, BadgeCheck, Contact2 } from "lucide-react";
import { useData } from "../context/DataContext";

export default function PersonnelView() {
  const { administrators } = useData();
  const [sortBy, setSortBy] = useState("position");

  const sortedAdministrators = useMemo(() => {
    if (!administrators) return [];
    const list = [...administrators];
    if (sortBy === "name-asc") {
      return list.sort((a, b) => (a.name || "").localeCompare(b.name || "", "th"));
    } else if (sortBy === "name-desc") {
      return list.sort((a, b) => (b.name || "").localeCompare(a.name || "", "th"));
    }
    return list;
  }, [administrators, sortBy]);

  return (
    <div className="bg-slate-50/50 min-h-screen py-12 md:py-20 font-sans" id="personnel-view-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold text-brand-primary bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5 text-brand-primary" />
            <span>ทำเนียบผู้บริหารและคณาจารย์</span>
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-secondary font-display tracking-tight">
            บุคลากรสถานศึกษา (Personnel & Staff)
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
            คณะผู้บริหารและคณาจารย์ผู้มีความเชี่ยวชาญเฉพาะทาง พร้อมส่งเสริม สนับสนุน และร่วมสร้างสรรค์อนาคตทางการศึกษาให้กับคนรุ่นใหม่
          </p>
        </div>

        {/* Executive Committee Section */}
        <div className="space-y-8" id="section-administration">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 flex items-center justify-center space-x-2">
              <BadgeCheck className="w-6 h-6 text-brand-primary" />
              <span>คณะผู้บริหารวิทยาลัยเทคโนโลยีปทุมรัตต์</span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm">
              คณะผู้บริหารผู้มุ่งมั่นพัฒนาแผนหลักสูตร เทคโนโลยี และสภาพแวดล้อมการเรียนรู้ที่ดีที่สุดในภาคอีสาน
            </p>
          </div>

          {/* Sorting Control */}
          <div className="flex justify-center items-center space-x-2.5 pb-2">
            <span className="text-xs font-bold text-slate-500">จัดเรียงลำดับ:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer font-semibold text-slate-700 shadow-xs"
            >
              <option value="position">ลำดับโครงสร้างบริหารเดิม</option>
              <option value="name-asc">เรียงตามชื่อ ก-ฮ (A-Z)</option>
              <option value="name-desc">เรียงตามชื่อ ฮ-ก (Z-A)</option>
            </select>
          </div>

          {/* Administrators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4">
            {sortedAdministrators && sortedAdministrators.map((admin, idx) => (
              <motion.div
                key={admin.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-blue-100 transition-all duration-200 text-center space-y-4 group relative overflow-hidden"
              >
                {/* Decorative background element on hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Avatar Portrait */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-slate-100 group-hover:border-blue-50 transition-all">
                  <img
                    src={admin.imageUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop"}
                    alt={admin.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-slate-800 group-hover:text-brand-primary transition-colors text-base">
                    {admin.name}
                  </h3>
                  <div className="inline-block bg-blue-50/70 border border-blue-100 text-brand-primary font-bold text-[10px] px-2.5 py-1 rounded-full">
                    {admin.position}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wide mt-1 uppercase">
                    {admin.department || "คณะผู้บริหารและคณาจารย์"}
                  </p>
                </div>

                {/* Direct quick mail helper */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-center space-x-1 text-[11px] text-slate-400 font-medium">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-xs select-all">info@pathumrat-tech.ac.th</span>
                </div>
              </motion.div>
            ))}

            {(!sortedAdministrators || sortedAdministrators.length === 0) && (
              <div className="col-span-full bg-slate-100 border border-slate-200 p-8 rounded-2xl text-center space-y-2">
                <ShieldAlert className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-500">ไม่พบรายชื่อผู้บริหารในฐานข้อมูลขณะนี้</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to action for contacting division staff */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 border border-blue-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shrink-0 shadow-sm">
              <Contact2 className="w-6 h-6 text-cyan-200" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">ต้องการติดต่อหน่วยงานเฉพาะเจาะจง?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">คุณสามารถดูเบอร์สายตรง ฝ่ายธุรการ ฝ่ายทะเบียนการศึกษา และส่งอีเมลได้ในหน้าติดต่อเรา</p>
            </div>
          </div>
          <button
            onClick={() => {
              // Smooth dispatch event to trigger nav
              const event = new CustomEvent("changeTab", { detail: "contact" });
              window.dispatchEvent(event);
            }}
            className="bg-brand-primary hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-full text-xs transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            ไปที่หน้าติดต่อเรา
          </button>
        </div>

      </div>
    </div>
  );
}
