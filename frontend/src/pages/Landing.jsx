import { IoIosSettings } from "react-icons/io";
import { RiHomeSmile2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#fafffd] flex flex-col items-center justify-center text-[#1e1b18]">
      <h1 className="text-3xl font-bold mb-10">Who's Watching?</h1>
      <div className="flex gap-10">
        <div
          onClick={() => navigate("/user")}
          className="cursor-pointer flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
        >
          <div className="w-32 h-32 rounded-2xl bg-[#ff1b1cff] flex items-center justify-center text-2xl font-bold">
            <RiHomeSmile2Line size="3em" />
          </div>
          <p className="mt-3 text-lg">User</p>
        </div>

        <div
          onClick={() => navigate("/admin")}
          className="cursor-pointer flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
        >
          <div className="w-32 h-32 rounded-2xl bg-[#ff7f11ff] flex items-center justify-center text-2xl font-bold">
            <IoIosSettings size="3em" />
          </div>
          <p className="mt-3 text-lg">Admin</p>
        </div>
      </div>
    </div>
  );
}
