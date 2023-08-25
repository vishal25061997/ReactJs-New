import { Route, Routes, BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";

import HomePage from "./Pages/HomePage"
// import PremiumActivationButton from './components/Profile/PremiumActivationButton';
// import DarkThemeToggle from './components/Profile/DarkThemeToggle';
import ForgetPassword from "./Pages/ForgetPassword";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import AuthForm from "./components/Auth/AuthForm";
import { PriventGoBack } from "./PrivateRoutes/PriventGoBack";
import ProtectedRoutes from "./PrivateRoutes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PriventGoBack>
                <AuthForm />
              </PriventGoBack>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route
            path="/expenseStore"
            element={
              <ProtectedRoutes>
                <ExpenseForm />
              </ProtectedRoutes>
            }
          />
        </Routes>
        {/* <PremiumActivationButton />
        <DarkThemeToggle /> */}
      </Layout>
    </BrowserRouter>
  );
}

export default App;