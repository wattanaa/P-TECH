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
import { fetchNewsFromGoogleSheet } from "../services/sheetService";

const OperationType = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  LIST: "list",
  GET: "get",
  WRITE: "write"
};

function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

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
    title: "ยินดีต้อนรับสู่ วิทยาลัยเทคโนโลยีปทุมรัตต์ (PTC)",
    subtitle: "สถาบันการศึกษาวิชาชีพชั้นนำ มุ่งสู่มาตรฐานระดับสากล",
    description: "มุ่งเน้นสร้างนักปฏิบัติมืออาชีพและนวัตกรสายอาชีพที่มีคุณภาพ พร้อมขับเคลื่อนเศรษฐกิจด้วยเทคโนโลยีที่ทันสมัยและทักษะรอบด้าน",
    cta: "สำรวจหลักสูตรวิชาที่เปิดสอน",
    ctaTab: "curriculum",
    bgImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop",
    badge: "ยินดีต้อนรับสู่วิทยาลัย PTC"
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

const getLocalOrSetDefault = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(`Error parsing localStorage key ${key}:`, e);
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
};

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

  const [dbSettings, setDbTypeSettings] = useState(() => {
    const saved = localStorage.getItem("ptc_db_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse db settings:", e);
      }
    }
    return {
      type: "firestore",
      gsheetUrl: "",
      gsheetId: "1wwm30RHJ_icNvMqSo-oFNYfEtPQXQ_NhM69bNQMt4Vk",
      syncEnabled: false
    };
  });

  useEffect(() => {
    if (dbSettings.type === "firestore") {
      setIsLoading(true);
      // 1. Listen to College Info
      const collegeRef = doc(db, "college_info", "current");
      const unsubCollege = onSnapshot(collegeRef, (docSnap) => {
        if (docSnap.exists()) {
          setCollegeInfo(docSnap.data());
        } else {
          setDoc(collegeRef, defaultCollegeInfo).catch(err => {
            handleFirestoreError(err, OperationType.WRITE, "college_info/current");
          });
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, "college_info/current");
      });

      // Seeding logic if collection is empty
      const checkAndSeedCollection = async (colName, defaultItems) => {
        try {
          const colRef = collection(db, colName);
          const snapshot = await getDocs(colRef);
          if (snapshot.empty) {
            for (const item of defaultItems) {
              const docId = item.id || item.username || `${colName}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
              await setDoc(doc(db, colName, docId), { ...item, id: docId });
            }
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, colName);
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
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "majors");
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
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "news");
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
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "enrolled_students");
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
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "contact_messages");
      });

      const unsubAdmins = onSnapshot(collection(db, "administrators"), (snap) => {
        const items = [];
        snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
        setAdministrators(items);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "administrators");
      });

      const unsubFaq = onSnapshot(collection(db, "faqList"), (snap) => {
        const items = [];
        snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
        setFaqList(items);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "faqList");
      });

      const unsubSlides = onSnapshot(collection(db, "hero_slides"), (snap) => {
        const items = [];
        snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
        setHeroSlides(items);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "hero_slides");
      });

      const unsubAdminUsers = onSnapshot(collection(db, "admin_users"), (snap) => {
        const items = [];
        snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
        setAdminUsers(items);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "admin_users");
      });

      const unsubNavbarMenus = onSnapshot(collection(db, "navbar_menus"), (snap) => {
        const items = [];
        snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
        items.sort((a, b) => (a.order || 0) - (b.order || 0));
        setNavbarMenus(items);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "navbar_menus");
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
    } else {
      // Local Storage or Google Sheets Sync Mode
      setIsLoading(true);

      const localCollege = getLocalOrSetDefault("ptc_college_info", defaultCollegeInfo);
      setCollegeInfo(localCollege);

      const localMajors = getLocalOrSetDefault("ptc_majors", defaultMajors);
      setMajors(localMajors);

      const localStudents = getLocalOrSetDefault("ptc_enrolled_students", initialMockStudents);
      setEnrolledStudents(localStudents);

      const localContacts = getLocalOrSetDefault("ptc_contact_messages", initialMockContactMessages);
      setContactMessages(localContacts);

      const localAdmins = getLocalOrSetDefault("ptc_administrators", defaultAdministrators.map((a, idx) => ({ ...a, id: `admin-${idx + 1}` })));
      setAdministrators(localAdmins);

      const localFaqs = getLocalOrSetDefault("ptc_faqList", defaultFaqList.map((f, idx) => ({ ...f, id: `faq-${idx + 1}` })));
      setFaqList(localFaqs);

      const localSlides = getLocalOrSetDefault("ptc_hero_slides", defaultSlides);
      setHeroSlides(localSlides);

      const localAdminUsers = getLocalOrSetDefault("ptc_admin_users", [
        { username: "admin", password: "admin", name: "ผู้ดูแลระบบหลัก" }
      ]);
      setAdminUsers(localAdminUsers);

      const localNavbarMenus = getLocalOrSetDefault("ptc_navbar_menus", [
        { id: "home", label: "หน้าแรก", targetTab: "home", order: 1 },
        { id: "curriculum", label: "หลักสูตรที่เปิดสอน", targetTab: "curriculum", order: 2 },
        { id: "news", label: "ข่าวสารและกิจกรรม", targetTab: "news", order: 3 },
        { id: "contact", label: "ติดต่อเรา", targetTab: "contact", order: 4 }
      ]);
      setNavbarMenus(localNavbarMenus);

      if (dbSettings.type === "gsheet") {
        const sheetId = dbSettings.gsheetId || "1wwm30RHJ_icNvMqSo-oFNYfEtPQXQ_NhM69bNQMt4Vk";
        fetchNewsFromGoogleSheet(sheetId)
          .then((fetchedNews) => {
            if (fetchedNews && fetchedNews.length > 0) {
              setNewsData(fetchedNews);
            } else {
              const localNews = getLocalOrSetDefault("ptc_news", defaultNewsData);
              setNewsData(localNews);
            }
          })
          .catch((err) => {
            console.error("Failed to load Google Sheets news, fallback to local:", err);
            const localNews = getLocalOrSetDefault("ptc_news", defaultNewsData);
            setNewsData(localNews);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        const localNews = getLocalOrSetDefault("ptc_news", defaultNewsData);
        setNewsData(localNews);
        setIsLoading(false);
      }
    }
  }, [dbSettings.type]);

  const updateCollegeInfo = async (info) => {
    setCollegeInfo(info);
    if (dbSettings.type === "firestore") {
      const collegeRef = doc(db, "college_info", "current");
      await setDoc(collegeRef, info);
    } else {
      localStorage.setItem("ptc_college_info", JSON.stringify(info));
    }
  };

  const addMajor = async (newMajor) => {
    const id = `major-${Date.now()}`;
    const item = { ...newMajor, id };
    const updated = [...majors, item];
    setMajors(updated);
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "majors", id), item);
    } else {
      localStorage.setItem("ptc_majors", JSON.stringify(updated));
    }
  };

  const updateMajor = async (id, updatedMajor) => {
    const updated = majors.map(m => m.id === id ? { ...m, ...updatedMajor } : m);
    setMajors(updated);
    if (dbSettings.type === "firestore") {
      await updateDoc(doc(db, "majors", id), updatedMajor);
    } else {
      localStorage.setItem("ptc_majors", JSON.stringify(updated));
    }
  };

  const deleteMajor = async (id) => {
    const updated = majors.filter(m => m.id !== id);
    setMajors(updated);
    if (dbSettings.type === "firestore") {
      await deleteDoc(doc(db, "majors", id));
    } else {
      localStorage.setItem("ptc_majors", JSON.stringify(updated));
    }
  };

  const addNews = async (news) => {
    const id = `news-${Date.now()}`;
    const date = new Date().toISOString().split("T")[0];
    const item = { ...news, id, views: 0, date };
    const updated = [item, ...newsData];
    setNewsData(updated);
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "news", id), item);
    } else {
      localStorage.setItem("ptc_news", JSON.stringify(updated));
    }
  };

  const updateNews = async (id, updatedNews) => {
    const updated = newsData.map(n => n.id === id ? { ...n, ...updatedNews } : n);
    setNewsData(updated);
    if (dbSettings.type === "firestore") {
      await updateDoc(doc(db, "news", id), updatedNews);
    } else {
      localStorage.setItem("ptc_news", JSON.stringify(updated));
    }
  };

  const deleteNews = async (id) => {
    const updated = newsData.filter(n => n.id !== id);
    setNewsData(updated);
    if (dbSettings.type === "firestore") {
      await deleteDoc(doc(db, "news", id));
    } else {
      localStorage.setItem("ptc_news", JSON.stringify(updated));
    }
  };

  const addAdministrator = async (admin) => {
    const id = `admin-${Date.now()}`;
    const item = { ...admin, id };
    const updated = [...administrators, item];
    setAdministrators(updated);
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "administrators", id), item);
    } else {
      localStorage.setItem("ptc_administrators", JSON.stringify(updated));
    }
  };

  const updateAdministrator = async (id, updatedAdmin) => {
    const updated = administrators.map(a => a.id === id ? { ...a, ...updatedAdmin } : a);
    setAdministrators(updated);
    if (dbSettings.type === "firestore") {
      await updateDoc(doc(db, "administrators", id), updatedAdmin);
    } else {
      localStorage.setItem("ptc_administrators", JSON.stringify(updated));
    }
  };

  const deleteAdministrator = async (id) => {
    const updated = administrators.filter(a => a.id !== id);
    setAdministrators(updated);
    if (dbSettings.type === "firestore") {
      await deleteDoc(doc(db, "administrators", id));
    } else {
      localStorage.setItem("ptc_administrators", JSON.stringify(updated));
    }
  };

  const addFaq = async (faq) => {
    const id = `faq-${Date.now()}`;
    const item = { ...faq, id };
    const updated = [...faqList, item];
    setFaqList(updated);
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "faqList", id), item);
    } else {
      localStorage.setItem("ptc_faqList", JSON.stringify(updated));
    }
  };

  const updateFaq = async (id, updatedFaq) => {
    const updated = faqList.map(f => f.id === id ? { ...f, ...updatedFaq } : f);
    setFaqList(updated);
    if (dbSettings.type === "firestore") {
      await updateDoc(doc(db, "faqList", id), updatedFaq);
    } else {
      localStorage.setItem("ptc_faqList", JSON.stringify(updated));
    }
  };

  const deleteFaq = async (id) => {
    const updated = faqList.filter(f => f.id !== id);
    setFaqList(updated);
    if (dbSettings.type === "firestore") {
      await deleteDoc(doc(db, "faqList", id));
    } else {
      localStorage.setItem("ptc_faqList", JSON.stringify(updated));
    }
  };

  const addHeroSlide = async (slide) => {
    const id = `slide-${Date.now()}`;
    const item = { ...slide, id };
    const updated = [...heroSlides, item];
    setHeroSlides(updated);
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "hero_slides", id), item);
    } else {
      localStorage.setItem("ptc_hero_slides", JSON.stringify(updated));
    }
  };

  const updateHeroSlide = async (id, updatedSlide) => {
    const updated = heroSlides.map(s => s.id === id ? { ...s, ...updatedSlide } : s);
    setHeroSlides(updated);
    if (dbSettings.type === "firestore") {
      await updateDoc(doc(db, "hero_slides", id), updatedSlide);
    } else {
      localStorage.setItem("ptc_hero_slides", JSON.stringify(updated));
    }
  };

  const deleteHeroSlide = async (id) => {
    const updated = heroSlides.filter(s => s.id !== id);
    setHeroSlides(updated);
    if (dbSettings.type === "firestore") {
      await deleteDoc(doc(db, "hero_slides", id));
    } else {
      localStorage.setItem("ptc_hero_slides", JSON.stringify(updated));
    }
  };

  const syncToGoogleSheets = (type, data) => {
    if ((dbSettings.type === "gsheet" || dbSettings.syncEnabled) && dbSettings.gsheetUrl) {
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
    const updated = [newEnrollment, ...enrolledStudents];
    setEnrolledStudents(updated);
    
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "enrolled_students", id), newEnrollment);
    } else {
      localStorage.setItem("ptc_enrolled_students", JSON.stringify(updated));
    }

    syncToGoogleSheets("enrollment", newEnrollment);
    return id;
  };

  const updateEnrollmentStatus = async (id, status) => {
    const updated = enrolledStudents.map(s => s.id === id ? { ...s, status } : s);
    setEnrolledStudents(updated);
    if (dbSettings.type === "firestore") {
      await updateDoc(doc(db, "enrolled_students", id), { status });
    } else {
      localStorage.setItem("ptc_enrolled_students", JSON.stringify(updated));
    }
  };

  const deleteEnrollment = async (id) => {
    const updated = enrolledStudents.filter(s => s.id !== id);
    setEnrolledStudents(updated);
    if (dbSettings.type === "firestore") {
      await deleteDoc(doc(db, "enrolled_students", id));
    } else {
      localStorage.setItem("ptc_enrolled_students", JSON.stringify(updated));
    }
  };

  const addContactMessage = async (msg) => {
    const id = `MSG-${Date.now().toString().slice(-4)}`;
    const newMsg = {
      ...msg,
      id,
      submittedAt: new Date().toISOString(),
      isRead: false
    };
    const updated = [newMsg, ...contactMessages];
    setContactMessages(updated);
    
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "contact_messages", id), newMsg);
    } else {
      localStorage.setItem("ptc_contact_messages", JSON.stringify(updated));
    }

    syncToGoogleSheets("contact", newMsg);
  };

  const markContactMessageRead = async (id) => {
    const updated = contactMessages.map(m => m.id === id ? { ...m, isRead: true } : m);
    setContactMessages(updated);
    if (dbSettings.type === "firestore") {
      await updateDoc(doc(db, "contact_messages", id), { isRead: true });
    } else {
      localStorage.setItem("ptc_contact_messages", JSON.stringify(updated));
    }
  };

  const deleteContactMessage = async (id) => {
    const updated = contactMessages.filter(m => m.id !== id);
    setContactMessages(updated);
    if (dbSettings.type === "firestore") {
      await deleteDoc(doc(db, "contact_messages", id));
    } else {
      localStorage.setItem("ptc_contact_messages", JSON.stringify(updated));
    }
  };

  const resetToDefaultData = async () => {
    if (dbSettings.type === "firestore") {
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
    } else {
      localStorage.removeItem("ptc_college_info");
      localStorage.removeItem("ptc_majors");
      localStorage.removeItem("ptc_news");
      localStorage.removeItem("ptc_enrolled_students");
      localStorage.removeItem("ptc_contact_messages");
      localStorage.removeItem("ptc_administrators");
      localStorage.removeItem("ptc_faqList");
      localStorage.removeItem("ptc_hero_slides");
      localStorage.removeItem("ptc_admin_users");
      localStorage.removeItem("ptc_navbar_menus");

      setCollegeInfo(defaultCollegeInfo);
      setMajors(defaultMajors);
      setNewsData(defaultNewsData);
      setEnrolledStudents(initialMockStudents);
      setContactMessages(initialMockContactMessages);
      setAdministrators(defaultAdministrators.map((a, idx) => ({ ...a, id: `admin-${idx + 1}` })));
      setFaqList(defaultFaqList.map((f, idx) => ({ ...f, id: `faq-${idx + 1}` })));
      setHeroSlides(defaultSlides);
      setAdminUsers([
        { username: "admin", password: "admin", name: "ผู้ดูแลระบบหลัก" }
      ]);
      setNavbarMenus([
        { id: "home", label: "หน้าแรก", targetTab: "home", order: 1 },
        { id: "curriculum", label: "หลักสูตรที่เปิดสอน", targetTab: "curriculum", order: 2 },
        { id: "news", label: "ข่าวสารและกิจกรรม", targetTab: "news", order: 3 },
        { id: "contact", label: "ติดต่อเรา", targetTab: "contact", order: 4 }
      ]);
    }
  };

  const addAdminUser = async (user) => {
    const username = user.username.trim().toLowerCase();
    const item = { username, password: user.password, name: user.name };
    const updated = [...adminUsers, item];
    setAdminUsers(updated);
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "admin_users", username), item);
    } else {
      localStorage.setItem("ptc_admin_users", JSON.stringify(updated));
    }
  };

  const updateAdminUser = async (username, updatedUser) => {
    const key = String(username).trim().toLowerCase();
    const updated = adminUsers.map(u => u.username === key ? { ...u, password: updatedUser.password, name: updatedUser.name } : u);
    setAdminUsers(updated);
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "admin_users", key), {
        username: key,
        password: updatedUser.password,
        name: updatedUser.name
      }, { merge: true });
    } else {
      localStorage.setItem("ptc_admin_users", JSON.stringify(updated));
    }
  };

  const deleteAdminUser = async (userKey) => {
    const key = typeof userKey === "string" ? userKey : (userKey?.username || userKey?.id);
    if (key) {
      const cleanKey = String(key).trim().toLowerCase();
      const updated = adminUsers.filter(u => u.username !== cleanKey);
      setAdminUsers(updated);
      if (dbSettings.type === "firestore") {
        await deleteDoc(doc(db, "admin_users", cleanKey));
      } else {
        localStorage.setItem("ptc_admin_users", JSON.stringify(updated));
      }
    }
  };

  const addNavbarMenu = async (menu) => {
    const id = menu.id || `menu-${Date.now()}`;
    const item = { ...menu, id };
    const updated = [...navbarMenus, item];
    setNavbarMenus(updated);
    if (dbSettings.type === "firestore") {
      await setDoc(doc(db, "navbar_menus", id), item);
    } else {
      localStorage.setItem("ptc_navbar_menus", JSON.stringify(updated));
    }
  };

  const updateNavbarMenu = async (id, updatedMenu) => {
    const updated = navbarMenus.map(m => m.id === id ? { ...m, ...updatedMenu } : m);
    setNavbarMenus(updated);
    if (dbSettings.type === "firestore") {
      await updateDoc(doc(db, "navbar_menus", id), updatedMenu);
    } else {
      localStorage.setItem("ptc_navbar_menus", JSON.stringify(updated));
    }
  };

  const deleteNavbarMenu = async (id) => {
    const updated = navbarMenus.filter(m => m.id !== id);
    setNavbarMenus(updated);
    if (dbSettings.type === "firestore") {
      await deleteDoc(doc(db, "navbar_menus", id));
    } else {
      localStorage.setItem("ptc_navbar_menus", JSON.stringify(updated));
    }
  };

  const setDbSettings = (newSettings) => {
    setDbTypeSettings(newSettings);
    localStorage.setItem("ptc_db_settings", JSON.stringify(newSettings));
  };

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
