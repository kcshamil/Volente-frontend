import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-9xl font-light text-[#2c2c2c] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>404</h1>
      <p className="text-xl text-[#7a6e65] mb-8 uppercase tracking-widest">Page Not Found</p>
      <button 
        onClick={() => navigate("/")}
        className="bg-[#2c2c2c] text-white px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all"
      >
        Return Home
      </button>
    </div>
  );
}
