import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Errorpage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1e1b18ff] text-white text-center p-6">
      <h1 className="text-5xl font-bold mb-4">Lost your way?</h1>
      <h3 className="text-lg text-gray-400 mb-8">
        Sorry, we can’t find that page. You’ll find lots to explore on the home
        page.
      </h3>
      <Button
        className="bg-[#ff1b1cff] hover:bg-[#ff7f11ff] text-white text-lg px-6 py-3 rounded-md"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
    </div>
  );
}
