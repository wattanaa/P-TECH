/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs,
  getDoc
} from "firebase/firestore";
import {
  collegeInfo as defaultCollegeInfo,
  majors as defaultMajors,
  newsData as defaultNewsData,
  administrators as defaultAdministrators,
  faqList as defaultFaqList
} from "../data";

const DataContext = createContext(void 0);

const initialMockStudents = [
  {
    id: "PTC-2570-001",
    fullName: "นายเกียรติศักดิ์ ศรีสมบูรณ์",
    citizenId: "1-4599-00214-55-1",
    phone: "089-123-4567",
    email: "kiatisak.sri@gmail.com",
    prevSchool: "โรงเรียนปทุมรัตต์พิทยาคม",
    prevGpa: "3.75",
    levelInterest: "ปวส.",
    majorInterest: "it-high",
    address: "12/4 หมู่ 3 ต.บัวแดง อ.ปทุมรัตต์ จ.ร้อยเอ็ด",
    status: "verified",
    submittedAt: "2026-06-28T09:30:00Z"
  },
  {
    id: "PTC-2570-002",
    fullName: "นางสาวศิริพร บุญเหลือ",
    citizenId: "1-4599-00123-99-2",
    phone: "081-987-6543",
    email: "siriporn.boon@gmail.com",
    prevSchool: "โรงเรียนเกษตรวิสัยวิทยาคม",
    prevGpa: "3.20",
    levelInterest: "ปวช.",
    majorInterest: "acc-voc",
    address: "99 หมู่ 1 ต.บัวแดง อ.ปทุมรัตต์ จ.ร้อยเอ็ด",
    status: "pending",
    submittedAt: "2026-07-01T14:15:00Z"
  },
  {
    id: "PTC-2570-003",
    fullName: "นายธนวัฒน์ พัฒนชัย",
    citizenId: "1-4122-00512-11-0",
    phone: "085-555-1212",
    email: "thanawat.pat@outlook.com",
    prevSchool: "โรงเรียนเมืองร้อยเอ็ด",
    prevGpa: "2.85",
    levelInterest: "ปวช.",
    majorInterest: "auto-voc",
    address: "145/2 ถนนประชาสำราญ อ.เมือง จ.ร้อยเอ็ด",
    status: "approved",
    submittedAt: "2026-06-24T11:02:00Z"
  }
];

const initialMockContactMessages = [
  {
    id: "MSG-001",
    name: "นายสมชาย ใจดี",
    email: "somchai.j@hotmail.com",
    subject: "สอบถามรายละเอียดทุนเรียนดีแต่ยากจน",
    message: "สวัสดีครับ อยากทราบว่าถ้านักเรียนมีเกรดเฉลี่ยสะสม ม.3 อยู่ที่ 3.85 แต่ฐานะทางบ้านค่อนข้างยากจน จะสามารถยื่นขอทุนเรียนดีแต่ยากจนในระดับ ปวช. ช่างยนต์ ได้ตั้งแต่ตอนรายงานตัวเลยไหมครับ หรือต้องเข้าไปเรียนก่อนจึงจะยื่นได้ ขอบคุณครับ",
    submittedAt: "2026-06-30T08:12:00Z",
    isRead: false
  },
  {
    id: "MSG-002",
    name: "คุณพรทิพย์ รักษ์ดี",
    email: "porntip.rak@gmail.com",
    subject: "ติดต่อขอความอนุเคราะห์วิทยากรฝึกอบรมไฟฟ้าระดับหมู่บ้าน",
    message: "ทางเทศบาลตำบลบัวแดงมีความประสงค์จะจัดโครงการอบรมซ่อมบำรุงระบบไฟฟ้าขั้นพื้นฐานในครัวเรือน จึงขอประสานสอบถามความเป็นไปได้ในการขอความอนุเคราะห์อาจารย์แผนกช่างไฟฟ้าของวิทยาลัยเป็นวิทยากร จำนวน 1 วันในเดือนหน้าค่ะ",
    submittedAt: "2026-06-27T10:45:00Z",
    isRead: true
  }
];

const defaultSlides = [
  {
    id: "slide-1",
    title: "ยินดีต้อนรับสู่ วิทยาลัยเทคโนโลยีปทุมรัตต์",
    subtitle: "ก้าวสู่อนาคตที่มั่นคงด้วยการศึกษาสายอาชีพ",
    description: "เน้นการเรียนรู้ภาคปฏิบัติ อุปกรณ์ทันสมัยที่ได้รับมาตรฐานสากล จบมาพร้อมทักษะที่ตลาดแรงงานยุคใหม่ต้องการ",
    cta: "สมัครเรียนออนไลน์",
    ctaTab: "admission",
    bgImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop",
    badge: "เปิดรับสมัครปีการศึกษา 2570 แล้ว!"
  },
  {
    id: "slide-2",
    title: "สร้างนวัตกรและนักปฏิบัติมืออาชีพ",
    subtitle: "วิศวกรรมเทคโนโลยี และ บริหารธุรกิจดิจิทัล",
    description: "ช่างยนต์ ช่างไฟฟ้า เทคโนโลยีสารสนเทศ และการบัญชี พัฒนาตนเองด้วยนวัตกรรม IoT, ยานยนต์ไฟฟ้า EV และ AI",
    cta: "ดูหลักสูตรที่เปิดสอน",
    ctaTab: "curriculum",
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&auto=format&fit=crop",
    badge: "เปิดรับสมัครปีการศึกษา 2570 แล้ว!"
  }
];

export const DataProvider = ({ children }) => {
  const [collegeInfo, setCollegeInfo] = useState(defaultCollegeInfo);
  const [majors, setMajors] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [navbarMenus, setNavbarMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dbSettings, setDbTypeSettings] = useState({
    type: "firestore",
    gsheetUrl: "",
    gsheetId: "",
    syncEnabled: false
  });

  useEffect(() => {
    // 1. Listen to College Info
    const collegeRef = doc(db, "college_info", "current");
    const unsubCollege = onSnapshot(collegeRef, (docSnap) => {
      if (docSnap.exists()) {
        setCollegeInfo(docSnap.data());
      } else {
        setDoc(collegeRef, defaultCollegeInfo);
      }
    });

    // Seeding logic if collection is empty
    const checkAndSeedCollection = async (colName, defaultItems) => {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      if (snapshot.empty) {
        for (const item of defaultItems) {
          const docId = item.id || item.username || `${colName}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
          await setDoc(doc(db, colName, docId), { ...item, id: docId });
        }
      }
    };

    const seedAll = async () => {
      try {
        await checkAndSeedCollection("majors", defaultMajors);
        await checkAndSeedCollection("news", defaultNewsData);
        await checkAndSeedCollection("enrolled_students", initialMockStudents);
        await checkAndSeedCollection("contact_messages", initialMockContactMessages);
        await checkAndSeedCollection("administrators", defaultAdministrators.map((a, idx) => ({ ...a, id: `admin-${idx + 1}` })));
        await checkAndSeedCollection("faqList", defaultFaqList.map((f, idx) => ({ ...f, id: `faq-${idx + 1}` })));
        await checkAndSeedCollection("hero_slides", defaultSlides);
        await checkAndSeedCollection("admin_users", [
          { username: "admin", password: "admin", name: "ผู้ดูแลระบบหลัก" }
        ]);
        await checkAndSeedCollection("navbar_menus", [
          { id: "home", label: "หน้าแรก", targetTab: "home", order: 1 },
          { id: "curriculum", label: "หลักสูตรที่เปิดสอน", targetTab: "curriculum", order: 2 },
          { id: "news", label: "ข่าวสารและกิจกรรม", targetTab: "news", order: 3 },
          { id: "contact", label: "ติดต่อเรา", targetTab: "contact", order: 4 }
        ]);
        setIsLoading(false);
      } catch (err) {
        console.error("Firestore seeding error:", err);
        setIsLoading(false);
      }
    };
    seedAll();

    // 2. Real-time Firestore Listeners
    const unsubMajors = onSnapshot(collection(db, "majors"), (snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      setMajors(items);
    });

    const unsubNews = onSnapshot(collection(db, "news"), (snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      items.sort((a, b) => {
        const timeA = new Date(a.date || a.submittedAt || 0).getTime();
        const timeB = new Date(b.date || b.submittedAt || 0).getTime();
        const valA = isNaN(timeA) ? 0 : timeA;
        const valB = isNaN(timeB) ? 0 : timeB;
        return valB - valA;
      });
      setNewsData(items);
    });

    const unsubStudents = onSnapshot(collection(db, "enrolled_students"), (snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      items.sort((a, b) => {
        const timeA = new Date(a.submittedAt || 0).getTime();
        const timeB = new Date(b.submittedAt || 0).getTime();
        const valA = isNaN(timeA) ? 0 : timeA;
        const valB = isNaN(timeB) ? 0 : timeB;
        return valB - valA;
      });
      setEnrolledStudents(items);
    });

    const unsubContacts = onSnapshot(collection(db, "contact_messages"), (snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      items.sort((a, b) => {
        const timeA = new Date(a.submittedAt || 0).getTime();
        const timeB = new Date(b.submittedAt || 0).getTime();
        const valA = isNaN(timeA) ? 0 : timeA;
        const valB = isNaN(timeB) ? 0 : timeB;
        return valB - valA;
      });
      setContactMessages(items);
    });

    const unsubAdmins = onSnapshot(collection(db, "administrators"), (snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      setAdministrators(items);
    });

    const unsubFaq = onSnapshot(collection(db, "faqList"), (snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      setFaqList(items);
    });

    const unsubSlides = onSnapshot(collection(db, "hero_slides"), (snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      setHeroSlides(items);
    });

    const unsubAdminUsers = onSnapshot(collection(db, "admin_users"), (snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      setAdminUsers(items);
    });

    const unsubNavbarMenus = onSnapshot(collection(db, "navbar_menus"), (snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      setNavbarMenus(items);
    });

    return () => {
      unsubCollege();
      unsubMajors();
      unsubNews();
      unsubStudents();
      unsubContacts();
      unsubAdmins();
      unsubFaq();
      unsubSlides();
      unsubAdminUsers();
      unsubNavbarMenus();
    };
  }, []);

  const updateCollegeInfo = async (info) => {
    const collegeRef = doc(db, "college_info", "current");
    await setDoc(collegeRef, info);
  };

  const addMajor = async (newMajor) => {
    const id = `major-${Date.now()}`;
    await setDoc(doc(db, "majors", id), { ...newMajor, id });
  };

  const updateMajor = async (id, updated) => {
    await updateDoc(doc(db, "majors", id), updated);
  };

  const deleteMajor = async (id) => {
    await deleteDoc(doc(db, "majors", id));
  };

  const addNews = async (news) => {
    const id = `news-${Date.now()}`;
    const date = new Date().toISOString().split("T")[0];
    await setDoc(doc(db, "news", id), { ...news, id, views: 0, date });
  };

  const updateNews = async (id, updated) => {
    await updateDoc(doc(db, "news", id), updated);
  };

  const deleteNews = async (id) => {
    await deleteDoc(doc(db, "news", id));
  };

  const addAdministrator = async (admin) => {
    const id = `admin-${Date.now()}`;
    await setDoc(doc(db, "administrators", id), { ...admin, id });
  };

  const updateAdministrator = async (id, updated) => {
    await updateDoc(doc(db, "administrators", id), updated);
  };

  const deleteAdministrator = async (id) => {
    await deleteDoc(doc(db, "administrators", id));
  };

  const addFaq = async (faq) => {
    const id = `faq-${Date.now()}`;
    await setDoc(doc(db, "faqList", id), { ...faq, id });
  };

  const updateFaq = async (id, updated) => {
    await updateDoc(doc(db, "faqList", id), updated);
  };

  const deleteFaq = async (id) => {
    await deleteDoc(doc(db, "faqList", id));
  };

  const addHeroSlide = async (slide) => {
    const id = `slide-${Date.now()}`;
    await setDoc(doc(db, "hero_slides", id), { ...slide, id });
  };

  const updateHeroSlide = async (id, updated) => {
    await updateDoc(doc(db, "hero_slides", id), updated);
  };

  const deleteHeroSlide = async (id) => {
    await deleteDoc(doc(db, "hero_slides", id));
  };

  const syncToGoogleSheets = (type, data) => {
    if (dbSettings.type === "gsheet" && dbSettings.gsheetUrl) {
      fetch(dbSettings.gsheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type,
          data
        })
      }).catch((err) => console.error("Google Sheets sync failed:", err));
    }
  };

  const addEnrollment = async (form) => {
    const serial = String(enrolledStudents.length + 1).padStart(3, "0");
    const id = `PTC-2570-${serial}`;
    const newEnrollment = {
      ...form,
      id,
      status: "pending",
      submittedAt: new Date().toISOString()
    };
    await setDoc(doc(db, "enrolled_students", id), newEnrollment);
    syncToGoogleSheets("enrollment", newEnrollment);
    return id;
  };

  const updateEnrollmentStatus = async (id, status) => {
    await updateDoc(doc(db, "enrolled_students", id), { status });
  };

  const deleteEnrollment = async (id) => {
    await deleteDoc(doc(db, "enrolled_students", id));
  };

  const addContactMessage = async (msg) => {
    const id = `MSG-${Date.now().toString().slice(-4)}`;
    const newMsg = {
      ...msg,
      id,
      submittedAt: new Date().toISOString(),
      isRead: false
    };
    await setDoc(doc(db, "contact_messages", id), newMsg);
    syncToGoogleSheets("contact", newMsg);
  };

  const markContactMessageRead = async (id) => {
    await updateDoc(doc(db, "contact_messages", id), { isRead: true });
  };

  const deleteContactMessage = async (id) => {
    await deleteDoc(doc(db, "contact_messages", id));
  };

  const resetToDefaultData = async () => {
    const clearCol = async (colName) => {
      const snap = await getDocs(collection(db, colName));
      for (const d of snap.docs) {
        await deleteDoc(doc(db, colName, d.id));
      }
    };
    await setDoc(doc(db, "college_info", "current"), defaultCollegeInfo);
    await clearCol("majors");
    await clearCol("news");
    await clearCol("enrolled_students");
    await clearCol("contact_messages");
    await clearCol("administrators");
    await clearCol("faqList");
    await clearCol("hero_slides");

    for (const item of defaultMajors) {
      await setDoc(doc(db, "majors", item.id), item);
    }
    for (const item of defaultNewsData) {
      await setDoc(doc(db, "news", item.id), item);
    }
    for (const item of initialMockStudents) {
      await setDoc(doc(db, "enrolled_students", item.id), item);
    }
    for (const item of initialMockContactMessages) {
      await setDoc(doc(db, "contact_messages", item.id), item);
    }
    for (const [idx, item] of defaultAdministrators.entries()) {
      const id = `admin-${idx + 1}`;
      await setDoc(doc(db, "administrators", id), { ...item, id });
    }
    for (const [idx, item] of defaultFaqList.entries()) {
      const id = `faq-${idx + 1}`;
      await setDoc(doc(db, "faqList", id), { ...item, id });
    }
    for (const item of defaultSlides) {
      await setDoc(doc(db, "hero_slides", item.id), item);
    }
    for (const item of [
      { id: "home", label: "หน้าแรก", targetTab: "home", order: 1 },
      { id: "curriculum", label: "หลักสูตรที่เปิดสอน", targetTab: "curriculum", order: 2 },
      { id: "news", label: "ข่าวสารและกิจกรรม", targetTab: "news", order: 3 },
      { id: "contact", label: "ติดต่อเรา", targetTab: "contact", order: 4 }
    ]) {
      await setDoc(doc(db, "navbar_menus", item.id), item);
    }
  };

  // Admin Account APIs
  const addAdminUser = async (user) => {
    const username = user.username.trim().toLowerCase();
    await setDoc(doc(db, "admin_users", username), {
      username,
      password: user.password,
      name: user.name
    });
  };

  const updateAdminUser = async (username, updated) => {
    const key = String(username).trim().toLowerCase();
    await setDoc(doc(db, "admin_users", key), {
      username: key,
      password: updated.password,
      name: updated.name
    }, { merge: true });
  };

  const deleteAdminUser = async (userKey) => {
    const key = typeof userKey === "string" ? userKey : (userKey?.username || userKey?.id);
    if (key) {
      await deleteDoc(doc(db, "admin_users", String(key).trim().toLowerCase()));
    }
  };

  const addNavbarMenu = async (menu) => {
    const id = menu.id || `menu-${Date.now()}`;
    await setDoc(doc(db, "navbar_menus", id), { ...menu, id });
  };

  const updateNavbarMenu = async (id, updated) => {
    await updateDoc(doc(db, "navbar_menus", id), updated);
  };

  const deleteNavbarMenu = async (id) => {
    await deleteDoc(doc(db, "navbar_menus", id));
  };

  const setDbSettings = setDbTypeSettings;

  return (
    <DataContext.Provider
      value={{
        collegeInfo,
        majors,
        newsData,
        enrolledStudents,
        contactMessages,
        dbSettings,
        setDbSettings,
        administrators,
        faqList,
        heroSlides,
        adminUsers,
        navbarMenus,
        isLoading,
        updateCollegeInfo,
        addMajor,
        updateMajor,
        deleteMajor,
        addNews,
        updateNews,
        deleteNews,
        addAdministrator,
        updateAdministrator,
        deleteAdministrator,
        addFaq,
        updateFaq,
        deleteFaq,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        addEnrollment,
        updateEnrollmentStatus,
        deleteEnrollment,
        addContactMessage,
        markContactMessageRead,
        deleteContactMessage,
        resetToDefaultData,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        addNavbarMenu,
        updateNavbarMenu,
        deleteNavbarMenu
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
