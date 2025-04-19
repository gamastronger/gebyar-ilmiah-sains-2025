import RegisterPage from "../Component/Register/Register";
import Navbar from "../Component/Navbar";

function Login() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#0F172A] text-slate-200">
        <RegisterPage />
        <Navbar />
      </div>
    </div>
  );
};
export default Login;
