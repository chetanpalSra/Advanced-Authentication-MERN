import FloatingShapes from "./components/FloatingShapes"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage";
import {Routes,Route,Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import useAuthStore from "./store/authStore";
import DashboardPage from "./pages/DashboardPage";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";


//protect routes that require authentication.

const ProtectedRoute = ({children})=>{
  const {isAuthenticated,user} = useAuthStore();

  if(!isAuthenticated){
    return < Navigate to='/login' replace/>
  }
  if(!user.isVerified){
    return < Navigate to='/verify-email' replace/>
  }
  return children;
}

//redirect authenticated users to home page.

const RedirectAuthencticatedUser = ({children})=>{
       const {isAuthenticated,user} = useAuthStore();

       if(isAuthenticated && user.isVerified){
         return <Navigate to='/' replace/>
       }
       return children;

       //The replace prop ensures that the current page (where the user was before being redirected) is replaced in the browser history. This prevents the user from going "back" to the previous page after redirection.

       //In React, children is a special prop that represents the content or components nested inside a component.
}

function App() {
  const {isCheckingAuth,checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
 
 if(isCheckingAuth){
  return <LoadingSpinner/>
 }
  
  return (
    <>
     
		<div
			className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
		>
			<FloatingShapes color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShapes color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShapes color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <DashboardPage/>
        </ProtectedRoute>} />

        <Route path="signup" element={<RedirectAuthencticatedUser>
          <SignUpPage/>
        </RedirectAuthencticatedUser>} />

        <Route path="login" element={<RedirectAuthencticatedUser>
          <LoginPage/>
        </RedirectAuthencticatedUser>} />

        <Route path="/verify-email" element={<RedirectAuthencticatedUser><EmailVerificationPage/> </RedirectAuthencticatedUser>} />

        <Route path="/forgot-password" element={<RedirectAuthencticatedUser><ForgotPasswordPage/> </RedirectAuthencticatedUser>} />

        <Route path="/reset-password/:token" element={<RedirectAuthencticatedUser><ResetPasswordPage/> </RedirectAuthencticatedUser>} />

        <Route path="*" element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
		</div>
      
    </>
  )
}

export default App
