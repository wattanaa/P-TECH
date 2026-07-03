import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Edit, ChevronUp, ChevronDown, Sliders, X, Check } from "lucide-react";
import { useData } from "../context/DataContext";

export default function MenusManager() {
  const { navbarMenus, addNavbarMenu, updateNavbarMenu, deleteNavbarMenu } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  
  const [tempMenu, setTempMenu] = useState({
    label: "",
    targetTab: "home",
    order: 1
  });

  const availableTabs = [
    { value: "home", label: "หน้าแรก (Home)" },
    { value: "curriculum", label: "หลักสูตรที่เปิดสอน (Curriculum)" },
    { value: "news", label: "ข่าวสารและกิจกรรม (News & Events)" },
    { value: "admission", label: "สมัครเรียนออนไลน์ (Admission)" },
    { value: "about", label: "เกี่ยวกับวิทยาลัย (About Us)" },
    { value: "contact", label: "ติดต่อเรา (Contact Us)" }
  ];

  const handleOpenAdd = () => {
    setEditingMenu(null);
    setTempMenu({
      label: "",
      targetTab: "home",
      order: navbarMenus.length > 0 ? Math.max(...navbarMenus.map(m => m.order || 0)) + 1 : 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (menu) => {
    setEditingMenu(menu);
    setTempMenu({
      label: menu.label,
      targetTab: menu.targetTab || "home",
      order: menu.order || 1
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!tempMenu.label.trim()) {
      alert("กรุณาระบุชื่อเมนู");
      return;
    }

    try {
      if (editingMenu) {
        await updateNavbarMenu(editingMenu.id, tempMenu);
      } else {
        await addNavbarMenu(tempMenu);
      }
      setIsModalOpen(false);
      setEditingMenu(null);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const currentMenu = navbarMenus[index];
    const prevMenu = navbarMenus[index - 1];

    const currentOrder = currentMenu.order || 0;
    const prevOrder = prevMenu.order || 0;

    // Swap orders
    await updateNavbarMenu(currentMenu.id, { order: prevOrder });
    await updateNavbarMenu(prevMenu.id, { order: currentOrder });
  };

  const handleMoveDown = async (index) => {
    if (index === navbarMenus.length - 1) return;
    const currentMenu = navbarMenus[index];
    const nextMenu = navbarMenus[index + 1];

    const currentOrder = currentMenu.order || 0;
    const nextOrder = nextMenu.order || 0;

    // Swap orders
    await updateNavbarMenu(currentMenu.id, { order: nextOrder });
    await updateNavbarMenu(nextMenu.id, { order: currentOrder });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800 font-display">
            จัดการเมนูนำทางเว็บไซต์ (Navigation Menus)
          </h2>
          <p className="text-xs text-slate-500">
            เพิ่ม ลบ แก้ไข หรือจัดเรียงปุ่มเมนูนำทางที่แสดงในส่วนหัว (Navbar Header) ของเว็บไซต์
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 bg-brand-primary hover:bg-blue-800 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มปุ่มเมนูใหม่</span>
        </button>
      </div>

      <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 hidden md:grid grid-cols-12 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1 text-center">ลำดับ</div>
          <div className="col-span-4">ชื่อปุ่มเมนู (Label)</div>
          <div className="col-span-3">ลิงก์ไปยังหน้าจอปุ่ม (Target view)</div>
          <div className="col-span-2 text-center">จัดเรียงลำดับ</div>
          <div className="col-span-2 text-right pr-4">จัดการระบบ</div>
        </div>

        <div className="divide-y divide-slate-100">
          {navbarMenus.map((menu, index) => (
            <div
              key={menu.id}
              className="p-4 md:grid md:grid-cols-12 flex flex-col gap-3 md:gap-0 items-start md:items-center text-xs hover:bg-slate-50/50 transition-colors"
            >
              <div className="col-span-1 text-center font-bold text-slate-400 md:block hidden">
                {index + 1}
              </div>
              <div className="col-span-4 font-extrabold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{menu.label}</span>
              </div>
              <div className="col-span-3">
                <span className="bg-blue-50 text-brand-primary px-2.5 py-1 rounded-full text-[10px] font-extrabold border border-blue-100">
                  {availableTabs.find(t => t.value === menu.targetTab)?.label || menu.targetTab}
                </span>
              </div>
              
              <div className="col-span-2 flex justify-center items-center gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => handleMoveUp(index)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    index === 0
                      ? "text-slate-300 bg-slate-50 border-slate-100 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100 border-slate-200 cursor-pointer"
                  }`}
                  title="เลื่อนขึ้น"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={index === navbarMenus.length - 1}
                  onClick={() => handleMoveDown(index)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    index === navbarMenus.length - 1
                      ? "text-slate-300 bg-slate-50 border-slate-100 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100 border-slate-200 cursor-pointer"
                  }`}
                  title="เลื่อนลง"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="col-span-2 flex justify-end gap-1.5 w-full md:w-auto">
                <button
                  onClick={() => handleOpenEdit(menu)}
                  className="p-1.5 px-3 text-[10px] font-bold text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <Edit className="w-3 h-3" />
                  <span>แก้ไข</span>
                </button>
                <button
                  onClick={async () => {
                    if (confirm(`คุณต้องการลบปุ่มเมนู "${menu.label}" หรือไม่?`)) {
                      await deleteNavbarMenu(menu.id);
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

          {navbarMenus.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <Sliders className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              ไม่มีปุ่มเมนูนำทางบันทึกไว้ในขณะนี้ กรุณากดปุ่มเพื่อเริ่มสร้างสรรค์เมนูนำทางวิทยาลัย
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full border border-slate-200 overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="bg-brand-secondary text-white p-5 flex justify-between items-center">
                <h3 className="font-extrabold text-sm md:text-base font-display">
                  {editingMenu ? `แก้ไขข้อมูลปุ่มเมนู: ${editingMenu.label}` : "เพิ่มปุ่มเมนูนำทางใหม่"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ชื่อปุ่มเมนูนำทาง (Label) *</label>
                    <input
                      type="text"
                      required
                      value={tempMenu.label}
                      onChange={(e) => setTempMenu({ ...tempMenu, label: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold"
                      placeholder="เช่น ข่าวประชาสัมพันธ์, หน้าแรกวิทยาลัย"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">ลิงก์ปลายทางเมื่อคลิกเมนู *</label>
                    <select
                      value={tempMenu.targetTab}
                      onChange={(e) => setTempMenu({ ...tempMenu, targetTab: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-bold"
                    >
                      {availableTabs.map((tab) => (
                        <option key={tab.value} value={tab.value}>
                          {tab.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600">เลขลำดับเรียง (Sort Order) *</label>
                    <input
                      type="number"
                      required
                      value={tempMenu.order}
                      onChange={(e) => setTempMenu({ ...tempMenu, order: parseInt(e.target.value) || 1 })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                      placeholder="เช่น 1, 2, 3"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2 rounded-xl font-bold text-xs cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                  >
                    บันทึกข้อมูลเมนู
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
