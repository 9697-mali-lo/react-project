
import useRegister from '../hooks/useRegister';
import UserForm from '../hooks/UserForm';

// //   //   name: '',
// //   //   email: '',
// //   //   password: ''
// //   // });
// // // const {handleSubmit}=useRegister();
// // //   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value
// // //     });
// // //   };

// //   //  const onFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
// //   //   e.preventDefault();
// //   //   await handleSubmit(formData);
// //   //   try {
// //   //     const response = await fetch('https://your-api-url.com/register', {
// //   //       method: 'POST',
// //   //       headers: {
// //   //         'Content-Type': 'application/json',
// //   //       },
// //   //       body: JSON.stringify(formData),
// //   //     });

// //   //     if (response.ok) {
// //   //       alert('ההרשמה בוצעה בהצלחה!');
// //   //     } else {
// //   //       alert('שגיאה ברישום');
// //   //     }
// //   //   } catch (error) {
// //   //     console.error('Error:', error);
// //   //   }
// //    };

//   return (
 
//       <div className="register-page">
//         <h2>יצירת חשבון חדש</h2>
//         <form onSubmit={onFormSubmit}>
//           <input 
//             name="name" 
//             placeholder="שם מלא" 
//             onChange={handleChange} 
//             value={formData.name} 
//             required 
//           />
//           <input 
//             name="email" 
//             type="email" 
//             placeholder="אימייל" 
//             onChange={handleChange} 
//             value={formData.email} 
//             required 
//           />
//           <input 
//             name="password" 
//             type="password" 
//             placeholder="סיסמה" 
//             onChange={handleChange} 
//             value={formData.password} 
//             required 
//           />
//           <button type="submit">הירשם</button>
//         </form>
//       </div>
//   );
// };
const Register = () => {
  const { handleSubmit } = useRegister();
  return (
    <UserForm 
      title="יצירת חשבון חדש" 
      buttonLabel="הירשם" 
      onSubmit={handleSubmit} 
      initialRole='customer'
    
    />
  );
};
export default Register;