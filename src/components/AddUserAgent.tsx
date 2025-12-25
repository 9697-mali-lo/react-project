import { useParams } from "react-router-dom";
import UserForm from "../hooks/UserForm";
import useAdminUsers from "../api/useAdminUsers";

export default function AddUserAgent() {
    const { roleName } = useParams<{ roleName: string }>();
    const{createAdminUser}=useAdminUsers()
    // 🔍 הוסף את השורה הזו לבדיקה:
    console.log("The role from URL is:", roleName); 
    type RoleType = "admin" | "agent" | "customer";
    const roleMapping: Record<string, { role: RoleType, label: string }> = {
        "admin": { role: "admin", label: "מנהל" },
        "agent": { role: "agent", label: "סוכן" },
        "customer": { role: "customer", label: "לקוח" }
    };

    // אם roleName הוא undefined, זה תמיד יבחר customer
    const currentConfig = roleMapping[roleName as keyof typeof roleMapping] || roleMapping["customer"];

    return (
        <UserForm 
            title={`יצירת חשבון ${currentConfig.label}`} 
            initialRole={currentConfig.role}
            onSubmit={createAdminUser} 
            buttonLabel="הכנס"
        />
    );
}