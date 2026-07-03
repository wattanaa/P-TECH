/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Service to fetch and parse data from a public Google Sheet using the Google Visualization API.
 */
export const fetchNewsFromGoogleSheet = async (sheetId) => {
  if (!sheetId) {
    throw new Error("Spreadsheet ID is required");
  }
  
  // Use the gviz endpoint to fetch the JSON representation of the first sheet (gid=0)
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    const text = await res.text();
    // Parse the JSONP response wrapped in google.visualization.Query.setResponse(...)
    const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/);
    if (!match) {
      throw new Error("Invalid response format from Google Visualization API");
    }
    
    const json = JSON.parse(match[1]);
    if (json.status !== "ok" || !json.table) {
      throw new Error(`API response error: ${json.status || "Unknown error"}`);
    }
    
    const { cols, rows } = json.table;
    if (!rows || rows.length === 0) {
      return [];
    }
    
    // Normalize and trim column labels to lowercase for robust mapping
    const colLabels = cols.map(c => (c.label || "").trim().toLowerCase());
    
    // Find column indexes using synonyms
    const getColIndex = (possibleNames) => {
      return colLabels.findIndex(label => possibleNames.includes(label));
    };
    
    const idIdx = getColIndex(["id", "newsid", "news_id", "รหัส"]);
    const titleIdx = getColIndex(["title", "หัวข้อ", "ชื่อเรื่อง", "name", "หัวข้อข่าว"]);
    const excerptIdx = getColIndex(["excerpt", "description", "คำโปรย", "รายละเอียดอย่างย่อ", "คำโปรยข่าว"]);
    const contentIdx = getColIndex(["content", "รายละเอียด", "เนื้อหา", "เนื้อหาข่าว"]);
    const categoryIdx = getColIndex(["category", "ประเภท", "หมวดหมู่", "หมวดหมู่ข่าว"]);
    const imageIdx = getColIndex(["imageurl", "image", "photo", "รูปภาพ", "ลิงก์รูปภาพ", "รูป"]);
    const dateIdx = getColIndex(["date", "วันที่", "วันที่ข่าว"]);
    const viewsIdx = getColIndex(["views", "views_count", "ยอดเข้าชม", "จำนวนผู้เข้าชม", "ยอดวิว"]);
    
    // Map rows to News objects
    const parsedNews = rows.map((row, rIdx) => {
      const getVal = (idx, fallback) => {
        if (idx === -1 || !row.c || !row.c[idx]) return fallback;
        const val = row.c[idx].v;
        return val !== null && val !== undefined ? val : fallback;
      };
      
      const getFormattedVal = (idx, fallback) => {
        if (idx === -1 || !row.c || !row.c[idx]) return fallback;
        return row.c[idx].f || String(row.c[idx].v || fallback);
      };
      
      // If we couldn't match columns by header labels, fallback to standard column index order:
      // Col 0: ID, Col 1: Title, Col 2: Excerpt, Col 3: Content, Col 4: Category, Col 5: ImageUrl, Col 6: Date, Col 7: Views
      const id = idIdx !== -1 ? getVal(idIdx, `news-sheet-${rIdx + 1}`) : getVal(0, `news-sheet-${rIdx + 1}`);
      const title = titleIdx !== -1 ? getVal(titleIdx, "") : getVal(1, "");
      const excerpt = excerptIdx !== -1 ? getVal(excerptIdx, "") : getVal(2, "");
      const content = contentIdx !== -1 ? getVal(contentIdx, "") : getVal(3, "");
      const category = categoryIdx !== -1 ? getVal(categoryIdx, "ข่าวประชาสัมพันธ์") : getVal(4, "ข่าวประชาสัมพันธ์");
      const imageUrl = imageIdx !== -1 ? getVal(imageIdx, "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop") : getVal(5, "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop");
      const date = dateIdx !== -1 ? getFormattedVal(dateIdx, new Date().toISOString().split("T")[0]) : getFormattedVal(6, new Date().toISOString().split("T")[0]);
      const views = Number(viewsIdx !== -1 ? getVal(viewsIdx, 0) : getVal(7, 0));
      
      return {
        id: String(id),
        title: String(title),
        excerpt: String(excerpt),
        content: String(content),
        category: String(category),
        imageUrl: String(imageUrl),
        date: String(date),
        views: isNaN(views) ? 0 : views
      };
    });
    
    // Filter out rows that are entirely empty or don't have a title
    return parsedNews.filter(item => item.title && item.title.trim().length > 0);
  } catch (error) {
    console.error("Error fetching news from Google Sheet:", error);
    throw error;
  }
};
