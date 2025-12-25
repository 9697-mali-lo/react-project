# 🚀 מערכת ניהול קריאות תמיכה (Helpdesk System)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)](https://www.typescriptlang.org/)

## 📖 תיאור הפרויקט

מערכת לניהול קריאות תמיכה המאפשרת ניהול בקשות תמיכה, מעקב אחר טיקטים וניהול משתמשים. המערכת נבנתה עם React, TypeScript ו-Vite, ומשתמשת ב-Context API לניהול מצב.

## ✨ תכונות עיקריות

- **התחברות והרשמה** - מערכת אימות משתמשים מלאה
- **ניהול טיקטים** - יצירה, קריאה, עדכון ומחיקת קריאות תמיכה
- **ממשק משתמש אינטואיטיבי** - נבנה עם רכיבי UI מודרניים
- **ניהול הרשאות** - הגבלת גישה לפי תפקידים
- **תגובות לטיקטים** - הוספת תגובות ועדכוני סטטוס

## � הרשאות משתמשים

### משתמש רגיל
- יצירת קריאות תמיכה חדשות
- צפייה בטיקטים אישיים
- מעקב אחר סטטוס טיקטים
- הוספת תגובות לטיקטים קיימים
- עדכון פרטי פרופיל אישי

### תומך (Support)
- כל ההרשאות של משתמש רגיל
- צפייה בכל הטיקטים הפתוחים
- שיוך טיקטים לטיפולם האישי
- עדכון סטטוס טיקטים
- מענה לטיקטים

### מנהל (Admin)
- כל ההרשאות של תומך
- ניהול משתמשים
- הרשאות גישה
- סטטיסטיקות ודוחות
- הגדרות מערכת

## �🛠️ טכנולוגיות מרכזיות

- **Frontend**: React 18, TypeScript, Vite
- **ניהול מצב**: Context API, useReducer
- **ניהול טופסים**: React Hook Form
- **ניתוב**: React Router DOM
- **בקשות HTTP**: Axios
- **אימות**: JWT

## 📦 דרישות מערכת

- Node.js 16+
- npm 8+
- יישומון Git

## 🚀 התקנה והרצה

### התקנת תלויות

```bash
# התקנת תלויות
npm install
```

### הרצת שרת פיתוח

```bash
npm run dev
```

האפליקציה תרוץ ב: [http://localhost:5173](http://localhost:5173)

### בנייה לאוויר

```bash
npm run build
```

הקבצים המהודרים יופיעו בתיקיית `dist/`

## 🏗️ מבנה הפרויקט

```
src/
├── api/              # פונקציות Axios/Fetch לביצוע קריאות לשרת
│   ├── auth.ts       # פונקציות התחברות והרשמה
│   └── tickets.ts    # ניהול טיקטים ופעולות נוספות
│
├── components/       # רכיבים קטנים ושימושיים
│   ├── common/       # רכיבים גנריים
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── LoadingSpinner/
│   │   └── ErrorMessage/
│   │
│   ├── layout/       # רכיבי מבנה
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   └── ProtectedRoute/
│   │
│   └── tickets/      # רכיבים ספציפיים לטיקטים
│       ├── TicketCard/
│       ├── CommentForm/
│       └── FilterBar/
│
├── context/          # ניהול מצב גלובלי
│   └── AuthContext.tsx  # ניהול אימות משתמשים
│
├── hooks/            # Custom Hooks
│   └── useAuth.ts    # הוק לניהול אימות
│
├── pages/            # דפי האפליקציה
│   ├── Login/        # עמוד התחברות
│   ├── Register/     # עמוד הרשמה
│   ├── Dashboard/    # לוח בקרה
│   ├── TicketList/   # רשימת טיקטים
│   └── TicketDetails/ # פרטי טיקט
│
└── types/            # הגדרות TypeScript
    ├── user.ts      # טיפוסי משתמש
    ├── ticket.ts    # טיפוסי טיקטים
    └── comment.ts   # טיפוסי תגובות
```

## 🧪 הרצת בדיקות

```bash
# הרצת בדיקות
npm test
```

## 🤝 תרומה

1. בצעו Fork ל-Repository
2. צרו ענף חדש (`git checkout -b feature/תכונה-חדשה`)
3. בצעו Commit לשינויים (`git commit -m 'הוספת תכונה חדשה'`)
4. דחפו לענף (`git push origin feature/תכונה-חדשה`)
5. פתחו Pull Request

## 📄 רישיון

פרויקט זה מופץ תחת רישיון MIT. לפרטים נוספים, קראו את קובץ [LICENSE](LICENSE).

## ✉️ צרו קשר

שם: [השם שלך]  
אימייל: your.email@example.com