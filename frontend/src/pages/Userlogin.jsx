import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function UserloginCard() {
  const [card, setCard] = useState("login");

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[#fafffdff]">
        {card === "login" ? (
          <LoginCard setCard={setCard} />
        ) : (
          <SignupCard setCard={setCard} />
        )}
      </div>
    </>
  );
}

function LoginCard({ setCard }) {
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
      navigate("/courses");
    } catch (err) {
      setErrorMsg("Invalid credentials or server error");
    }
  }

  return (
    <Card className="w-full max-w-sm bg-[#fafffdff]">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => setCard("signup")}>
            Sign Up
          </Button>
        </CardAction>
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
                placeholder="yourmail@example.com"
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

function SignupCard({ setCard }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      await API.post("/users/signup", { username, email, password });
      navigate("/courses");
    } catch (err) {
      setErrorMsg("Signup failed. Try again.");
    }
  }

  return (
    <Card className="w-full max-w-sm bg-[#fafffdff]">
      <CardHeader>
        <CardTitle>Register to Start</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => setCard("login")}>
            Login
          </Button>
        </CardAction>
      </CardHeader>
      <form onSubmit={handleSignup}>
        <CardContent>
          {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="myname1010"
              required
            />
          </div>
          <div className="flex flex-col gap-6 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourmail@example.com"
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
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default UserloginCard;
