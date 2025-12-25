export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'agent' | 'customer' | string; // ניתן להגדיר תפקידים ספציפיים או להשאיר כ-string כללי
    created_at: string; // מיוצג כמחרוזת (ISO format בדרך כלל)
  }