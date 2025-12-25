// src/types/ticket.ts

  export interface Ticket {
    id: number; // מזהה ייחודי של הפנייה
    subject: string; // נושא הפנייה
    description: string; // תיאור מפורט
    
    // מזהים (IDs) - יכולים להיות null במידה והשרת מאפשר זאת בשלבי ביניים
    status_id: number | null; 
    priority_id: number | null;
    
    // שמות מועשרים (Enriched Data) המגיעים מה-JOIN ב-Backend
    status_name: string | null;
    priority_name: string | null;
    
    // שיוך משתמשים
    created_by: number; // ה-ID של הלקוח שפתח את הפנייה
    assigned_to: number | null; // ה-ID של הסוכן המטפל (יכול להיות ריק)
    
    // שמות מועשרים נוספים (אופציונלי, אם ה-API מחזיר אותם)
    creator_name?: string;
    assignee_name?: string;
  
    // תאריכים
    created_at: string; // תאריך יצירה (ISO string)
    updated_at: string | null; // תאריך עדכון אחרון
  }



