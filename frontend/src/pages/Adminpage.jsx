import { useState } from "react";
import API from "@/utils/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLogin() {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoginCard />
    </div>
  );
}

function LoginCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password");
      return;
    }
    try {
      const res = await API.post("/users/signin", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin-crud");
    } catch (err) {
      setErrorMsg("Invalid credentials or server error");
    }
  }

  return (
    <Card className="w-full max-w-sm bg-[#fafffdff]">
      <CardHeader>
        <CardTitle>ADMIN LOGIN</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent>
          {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="admin@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <br></br>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
