// src/types/auth.ts

export interface RegisterFormData {
    name: string;
    email: string;
    password: string; // מוגדר כאופציונלי למקרה של עדכון נתונים, או חובה במידה ומדובר רק בהרשמה
    role: "customer" | "admin"|"agent"; // Literal Type המגביל את האפשרויות
  }