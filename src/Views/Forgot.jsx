import Forgot from "../Component/Login/Forgot";
import Navbar from "../Component/Navbar";

function Login() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#0F172A] text-slate-200">
        <Forgot />
        <Navbar />
      </div>
    </div>
  );
};
export default Login;
