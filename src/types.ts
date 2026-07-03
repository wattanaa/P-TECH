/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Major {
  id: string;
  name: string;
  englishName: string;
  level: "ปวช." | "ปวส."; // Vocational Certificate vs High Vocational Certificate
  duration: string;
  description: string;
  features: string[];
  careerPaths: string[];
  icon: string; // Lucide icon name
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "ข่าววิชาการ" | "ข่าวกิจกรรม" | "ข่าวประชาสัมพันธ์" | "ข่าวจัดซื้อจัดจ้าง";
  imageUrl: string;
  views: number;
}

export interface Teacher {
  name: string;
  position: string;
  department: string;
  imageUrl: string;
}

export interface AdmissionForm {
  fullName: string;
  citizenId: string;
  phone: string;
  email: string;
  prevSchool: string;
  prevGpa: string;
  levelInterest: "ปวช." | "ปวส.";
  majorInterest: string;
  address: string;
}

export interface EnrolledStudent extends AdmissionForm {
  id: string;
  status: "pending" | "verified" | "approved" | "rejected";
  submittedAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AdminContactMessage extends ContactMessage {
  id: string;
  submittedAt: string;
  isRead: boolean;
}

export interface CollegeInfo {
  name: string;
  englishName: string;
  philosophy: string;
  vision: string;
  identity: string;
  uniqueness: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;
  facebook: string;
  foundedYear: string;
}

