/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { createContext, useContext, useState, useEffect } from "react";
import { collegeInfo as defaultCollegeInfo, majors as defaultMajors, newsData as defaultNewsData } from "../data";
const DataContext = createContext(void 0);
const initialMockStudents = [
  {
    id: "PTC-2570-001",
    fullName: "\u0E19\u0E32\u0E22\u0E40\u0E01\u0E35\u0E22\u0E23\u0E15\u0E34\u0E28\u0E31\u0E01\u0E14\u0E34\u0E4C \u0E28\u0E23\u0E35\u0E2A\u0E21\u0E1A\u0E39\u0E23\u0E13\u0E4C",
    citizenId: "1-4599-00214-55-1",
    phone: "089-123-4567",
    email: "kiatisak.sri@gmail.com",
    prevSchool: "\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E1B\u0E17\u0E38\u0E21\u0E23\u0E31\u0E15\u0E15\u0E4C\u0E1E\u0E34\u0E17\u0E22\u0E32\u0E04\u0E21",
    prevGpa: "3.75",
    levelInterest: "\u0E1B\u0E27\u0E2A.",
    majorInterest: "it-high",
    // เทคโนโลยีสารสนเทศระดับสูง
    address: "12/4 \u0E2B\u0E21\u0E39\u0E48 3 \u0E15.\u0E1A\u0E31\u0E27\u0E41\u0E14\u0E07 \u0E2D.\u0E1B\u0E17\u0E38\u0E21\u0E23\u0E31\u0E15\u0E15\u0E4C \u0E08.\u0E23\u0E49\u0E2D\u0E22\u0E40\u0E2D\u0E47\u0E14",
    status: "verified",
    submittedAt: "2026-06-28T09:30:00Z"
  },
  {
    id: "PTC-2570-002",
    fullName: "\u0E19\u0E32\u0E07\u0E2A\u0E32\u0E27\u0E28\u0E34\u0E23\u0E34\u0E1E\u0E23 \u0E1A\u0E38\u0E0D\u0E40\u0E2B\u0E25\u0E37\u0E2D",
    citizenId: "1-4599-00123-99-2",
    phone: "081-987-6543",
    email: "siriporn.boon@gmail.com",
    prevSchool: "\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E40\u0E01\u0E29\u0E15\u0E23\u0E27\u0E34\u0E2A\u0E31\u0E22\u0E27\u0E34\u0E17\u0E22\u0E32\u0E04\u0E21",
    prevGpa: "3.20",
    levelInterest: "\u0E1B\u0E27\u0E0A.",
    majorInterest: "acc-voc",
    // การบัญชี
    address: "99 \u0E2B\u0E21\u0E39\u0E48 1 \u0E15.\u0E1A\u0E31\u0E27\u0E41\u0E14\u0E07 \u0E2D.\u0E1B\u0E17\u0E38\u0E21\u0E23\u0E31\u0E15\u0E15\u0E4C \u0E08.\u0E23\u0E49\u0E2D\u0E22\u0E40\u0E2D\u0E47\u0E14",
    status: "pending",
    submittedAt: "2026-07-01T14:15:00Z"
  },
  {
    id: "PTC-2570-003",
    fullName: "\u0E19\u0E32\u0E22\u0E18\u0E19\u0E27\u0E31\u0E12\u0E19\u0E4C \u0E1E\u0E31\u0E12\u0E19\u0E0A\u0E31\u0E22",
    citizenId: "1-4122-00512-11-0",
    phone: "085-555-1212",
    email: "thanawat.pat@outlook.com",
    prevSchool: "\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E40\u0E21\u0E37\u0E2D\u0E07\u0E23\u0E49\u0E2D\u0E22\u0E40\u0E2D\u0E47\u0E14",
    prevGpa: "2.85",
    levelInterest: "\u0E1B\u0E27\u0E0A.",
    majorInterest: "auto-voc",
    // ช่างยนต์
    address: "145/2 \u0E16\u0E19\u0E19\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E2A\u0E33\u0E23\u0E32\u0E0D \u0E2D.\u0E40\u0E21\u0E37\u0E2D\u0E07 \u0E08.\u0E23\u0E49\u0E2D\u0E22\u0E40\u0E2D\u0E47\u0E14",
    status: "approved",
    submittedAt: "2026-06-24T11:02:00Z"
  }
];
const initialMockContactMessages = [
  {
    id: "MSG-001",
    name: "\u0E19\u0E32\u0E22\u0E2A\u0E21\u0E0A\u0E32\u0E22 \u0E43\u0E08\u0E14\u0E35",
    email: "somchai.j@hotmail.com",
    subject: "\u0E2A\u0E2D\u0E1A\u0E16\u0E32\u0E21\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E17\u0E38\u0E19\u0E40\u0E23\u0E35\u0E22\u0E19\u0E14\u0E35\u0E41\u0E15\u0E48\u0E22\u0E32\u0E01\u0E08\u0E19",
    message: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E04\u0E23\u0E31\u0E1A \u0E2D\u0E22\u0E32\u0E01\u0E17\u0E23\u0E32\u0E1A\u0E27\u0E48\u0E32\u0E16\u0E49\u0E32\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E21\u0E35\u0E40\u0E01\u0E23\u0E14\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E2A\u0E30\u0E2A\u0E21 \u0E21.3 \u0E2D\u0E22\u0E39\u0E48\u0E17\u0E35\u0E48 3.85 \u0E41\u0E15\u0E48\u0E10\u0E32\u0E19\u0E30\u0E17\u0E32\u0E07\u0E1A\u0E49\u0E32\u0E19\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E22\u0E32\u0E01\u0E08\u0E19 \u0E08\u0E30\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E22\u0E37\u0E48\u0E19\u0E02\u0E2D\u0E17\u0E38\u0E19\u0E40\u0E23\u0E35\u0E22\u0E19\u0E14\u0E35\u0E41\u0E15\u0E48\u0E22\u0E32\u0E01\u0E08\u0E19\u0E43\u0E19\u0E23\u0E30\u0E14\u0E31\u0E1A \u0E1B\u0E27\u0E0A. \u0E0A\u0E48\u0E32\u0E07\u0E22\u0E19\u0E15\u0E4C \u0E44\u0E14\u0E49\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E15\u0E2D\u0E19\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E22\u0E44\u0E2B\u0E21\u0E04\u0E23\u0E31\u0E1A \u0E2B\u0E23\u0E37\u0E2D\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E02\u0E49\u0E32\u0E44\u0E1B\u0E40\u0E23\u0E35\u0E22\u0E19\u0E01\u0E48\u0E2D\u0E19\u0E08\u0E36\u0E07\u0E08\u0E30\u0E22\u0E37\u0E48\u0E19\u0E44\u0E14\u0E49 \u0E02\u0E2D\u0E1A\u0E04\u0E38\u0E13\u0E04\u0E23\u0E31\u0E1A",
    submittedAt: "2026-06-30T08:12:00Z",
    isRead: false
  },
  {
    id: "MSG-002",
    name: "\u0E04\u0E38\u0E13\u0E1E\u0E23\u0E17\u0E34\u0E1E\u0E22\u0E4C \u0E23\u0E31\u0E01\u0E29\u0E4C\u0E14\u0E35",
    email: "porntip.rak@gmail.com",
    subject: "\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E02\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E2D\u0E19\u0E38\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E27\u0E34\u0E17\u0E22\u0E32\u0E01\u0E23\u0E1D\u0E36\u0E01\u0E2D\u0E1A\u0E23\u0E21\u0E44\u0E1F\u0E1F\u0E49\u0E32\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E2B\u0E21\u0E39\u0E48\u0E1A\u0E49\u0E32\u0E19",
    message: "\u0E17\u0E32\u0E07\u0E40\u0E17\u0E28\u0E1A\u0E32\u0E25\u0E15\u0E33\u0E1A\u0E25\u0E1A\u0E31\u0E27\u0E41\u0E14\u0E07\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E07\u0E04\u0E4C\u0E08\u0E30\u0E08\u0E31\u0E14\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23\u0E2D\u0E1A\u0E23\u0E21\u0E0B\u0E48\u0E2D\u0E21\u0E1A\u0E33\u0E23\u0E38\u0E07\u0E23\u0E30\u0E1A\u0E1A\u0E44\u0E1F\u0E1F\u0E49\u0E32\u0E02\u0E31\u0E49\u0E19\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19\u0E43\u0E19\u0E04\u0E23\u0E31\u0E27\u0E40\u0E23\u0E37\u0E2D\u0E19 \u0E08\u0E36\u0E07\u0E02\u0E2D\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E2A\u0E2D\u0E1A\u0E16\u0E32\u0E21\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49\u0E43\u0E19\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E2D\u0E19\u0E38\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2D\u0E32\u0E08\u0E32\u0E23\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E01\u0E0A\u0E48\u0E32\u0E07\u0E44\u0E1F\u0E1F\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22\u0E40\u0E1B\u0E47\u0E19\u0E27\u0E34\u0E17\u0E22\u0E32\u0E01\u0E23 \u0E08\u0E33\u0E19\u0E27\u0E19 1 \u0E27\u0E31\u0E19\u0E43\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32\u0E04\u0E48\u0E30",
    submittedAt: "2026-06-27T10:45:00Z",
    isRead: true
  }
];
export const DataProvider = ({ children }) => {
  const [collegeInfo, setCollegeInfo] = useState(() => {
    const saved = localStorage.getItem("ptc_college_info");
    return saved ? JSON.parse(saved) : defaultCollegeInfo;
  });
  const [majors, setMajors] = useState(() => {
    const saved = localStorage.getItem("ptc_majors");
    return saved ? JSON.parse(saved) : defaultMajors;
  });
  const [newsData, setNewsData] = useState(() => {
    const saved = localStorage.getItem("ptc_news");
    return saved ? JSON.parse(saved) : defaultNewsData;
  });
  const [enrolledStudents, setEnrolledStudents] = useState(() => {
    const saved = localStorage.getItem("ptc_enrolled_students");
    return saved ? JSON.parse(saved) : initialMockStudents;
  });
  const [contactMessages, setContactMessages] = useState(() => {
    const saved = localStorage.getItem("ptc_contact_messages");
    return saved ? JSON.parse(saved) : initialMockContactMessages;
  });
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
  const updateCollegeInfo = (info) => {
    setCollegeInfo(info);
  };
  const addMajor = (newMajor) => {
    const id = `major-${Date.now()}`;
    setMajors((prev) => [...prev, { ...newMajor, id }]);
  };
  const updateMajor = (id, updated) => {
    setMajors(
      (prev) => prev.map((m) => m.id === id ? { ...m, ...updated } : m)
    );
  };
  const deleteMajor = (id) => {
    setMajors((prev) => prev.filter((m) => m.id !== id));
  };
  const addNews = (news) => {
    const id = `news-${Date.now()}`;
    const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    setNewsData((prev) => [{ ...news, id, views: 0, date }, ...prev]);
  };
  const updateNews = (id, updated) => {
    setNewsData(
      (prev) => prev.map((n) => n.id === id ? { ...n, ...updated } : n)
    );
  };
  const deleteNews = (id) => {
    setNewsData((prev) => prev.filter((n) => n.id !== id));
  };
  const addEnrollment = (form) => {
    const serial = String(enrolledStudents.length + 1).padStart(3, "0");
    const id = `PTC-2570-${serial}`;
    const newEnrollment = {
      ...form,
      id,
      status: "pending",
      submittedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setEnrolledStudents((prev) => [newEnrollment, ...prev]);
    return id;
  };
  const updateEnrollmentStatus = (id, status) => {
    setEnrolledStudents(
      (prev) => prev.map((s) => s.id === id ? { ...s, status } : s)
    );
  };
  const deleteEnrollment = (id) => {
    setEnrolledStudents((prev) => prev.filter((s) => s.id !== id));
  };
  const addContactMessage = (msg) => {
    const id = `MSG-${Date.now().toString().slice(-4)}`;
    const newMsg = {
      ...msg,
      id,
      submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
      isRead: false
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };
  const markContactMessageRead = (id) => {
    setContactMessages(
      (prev) => prev.map((m) => m.id === id ? { ...m, isRead: true } : m)
    );
  };
  const deleteContactMessage = (id) => {
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
  return <DataContext.Provider
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
      resetToDefaultData
    }}
  >
      {children}
    </DataContext.Provider>;
};
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
