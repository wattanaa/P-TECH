/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { Major, NewsItem, EnrolledStudent, AdminContactMessage, CollegeInfo, AdmissionForm, ContactMessage } from "../types";
import { collegeInfo as defaultCollegeInfo, majors as defaultMajors, newsData as defaultNewsData } from "../data";

interface DataContextType {
  collegeInfo: CollegeInfo;
  majors: Major[];
  newsData: NewsItem[];
  enrolledStudents: EnrolledStudent[];
  contactMessages: AdminContactMessage[];
  
  updateCollegeInfo: (info: CollegeInfo) => void;
  
  addMajor: (major: Omit<Major, "id">) => void;
  updateMajor: (id: string, updated: Partial<Major>) => void;
  deleteMajor: (id: string) => void;
  
  addNews: (news: Omit<NewsItem, "id" | "views" | "date">) => void;
  updateNews: (id: string, updated: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  
  addEnrollment: (form: AdmissionForm) => string;
  updateEnrollmentStatus: (id: string, status: EnrolledStudent["status"]) => void;
  deleteEnrollment: (id: string) => void;
  
  addContactMessage: (msg: ContactMessage) => void;
  markContactMessageRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;
  
  resetToDefaultData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to pre-populate mock students
const initialMockStudents: EnrolledStudent[] = [
  {
    id: "PTC-2570-001",
    fullName: "นายเกียรติศักดิ์ ศรีสมบูรณ์",
    citizenId: "1-4599-00214-55-1",
    phone: "089-123-4567",
    email: "kiatisak.sri@gmail.com",
    prevSchool: "โรงเรียนปทุมรัตต์พิทยาคม",
    prevGpa: "3.75",
    levelInterest: "ปวส.",
    majorInterest: "it-high", // เทคโนโลยีสารสนเทศระดับสูง
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
    majorInterest: "acc-voc", // การบัญชี
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
    majorInterest: "auto-voc", // ช่างยนต์
    address: "145/2 ถนนประชาสำราญ อ.เมือง จ.ร้อยเอ็ด",
    status: "approved",
    submittedAt: "2026-06-24T11:02:00Z"
  }
];

// Helper to pre-populate mock contact messages
const initialMockContactMessages: AdminContactMessage[] = [
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

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collegeInfo, setCollegeInfo] = useState<CollegeInfo>(() => {
    const saved = localStorage.getItem("ptc_college_info");
    return saved ? JSON.parse(saved) : defaultCollegeInfo;
  });

  const [majors, setMajors] = useState<Major[]>(() => {
    const saved = localStorage.getItem("ptc_majors");
    return saved ? JSON.parse(saved) : defaultMajors;
  });

  const [newsData, setNewsData] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem("ptc_news");
    return saved ? JSON.parse(saved) : defaultNewsData;
  });

  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>(() => {
    const saved = localStorage.getItem("ptc_enrolled_students");
    return saved ? JSON.parse(saved) : initialMockStudents;
  });

  const [contactMessages, setContactMessages] = useState<AdminContactMessage[]>(() => {
    const saved = localStorage.getItem("ptc_contact_messages");
    return saved ? JSON.parse(saved) : initialMockContactMessages;
  });

  // Sync state with localStorage on changes
  useEffect(() => {
    localStorage.setItem("ptc_college_info", JSON.stringify(collegeInfo));
  }, [collegeInfo]);

  useEffect(() => {
    localStorage.setItem("ptc_majors", JSON.stringify(majors));
  }, [majors]);

  useEffect(() => {
    localStorage.setItem("ptc_news", JSON.stringify(newsData));
  }, [newsData]);

  useEffect(() => {
    localStorage.setItem("ptc_enrolled_students", JSON.stringify(enrolledStudents));
  }, [enrolledStudents]);

  useEffect(() => {
    localStorage.setItem("ptc_contact_messages", JSON.stringify(contactMessages));
  }, [contactMessages]);

  // Actions
  const updateCollegeInfo = (info: CollegeInfo) => {
    setCollegeInfo(info);
  };

  const addMajor = (newMajor: Omit<Major, "id">) => {
    const id = `major-${Date.now()}`;
    setMajors((prev) => [...prev, { ...newMajor, id }]);
  };

  const updateMajor = (id: string, updated: Partial<Major>) => {
    setMajors((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const deleteMajor = (id: string) => {
    setMajors((prev) => prev.filter((m) => m.id !== id));
  };

  const addNews = (news: Omit<NewsItem, "id" | "views" | "date">) => {
    const id = `news-${Date.now()}`;
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    setNewsData((prev) => [{ ...news, id, views: 0, date }, ...prev]);
  };

  const updateNews = (id: string, updated: Partial<NewsItem>) => {
    setNewsData((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
  };

  const deleteNews = (id: string) => {
    setNewsData((prev) => prev.filter((n) => n.id !== id));
  };

  const addEnrollment = (form: AdmissionForm): string => {
    const serial = String(enrolledStudents.length + 1).padStart(3, "0");
    const id = `PTC-2570-${serial}`;
    const newEnrollment: EnrolledStudent = {
      ...form,
      id,
      status: "pending",
      submittedAt: new Date().toISOString()
    };
    setEnrolledStudents((prev) => [newEnrollment, ...prev]);
    return id;
  };

  const updateEnrollmentStatus = (id: string, status: EnrolledStudent["status"]) => {
    setEnrolledStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const deleteEnrollment = (id: string) => {
    setEnrolledStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const addContactMessage = (msg: ContactMessage) => {
    const id = `MSG-${Date.now().toString().slice(-4)}`;
    const newMsg: AdminContactMessage = {
      ...msg,
      id,
      submittedAt: new Date().toISOString(),
      isRead: false
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const markContactMessageRead = (id: string) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const resetToDefaultData = () => {
    setCollegeInfo(defaultCollegeInfo);
    setMajors(defaultMajors);
    setNewsData(defaultNewsData);
    setEnrolledStudents(initialMockStudents);
    setContactMessages(initialMockContactMessages);
    localStorage.removeItem("ptc_college_info");
    localStorage.removeItem("ptc_majors");
    localStorage.removeItem("ptc_news");
    localStorage.removeItem("ptc_enrolled_students");
    localStorage.removeItem("ptc_contact_messages");
  };

  return (
    <DataContext.Provider
      value={{
        collegeInfo,
        majors,
        newsData,
        enrolledStudents,
        contactMessages,
        updateCollegeInfo,
        addMajor,
        updateMajor,
        deleteMajor,
        addNews,
        updateNews,
        deleteNews,
        addEnrollment,
        updateEnrollmentStatus,
        deleteEnrollment,
        addContactMessage,
        markContactMessageRead,
        deleteContactMessage,
        resetToDefaultData,
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
