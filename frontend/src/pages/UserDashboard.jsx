import { Navbar } from "./Navbar.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import API from "@/utils/api";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
export function Userdashboard() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function getCourses() {
      try {
        const res = await API.get("http://localhost:5001/api/courses");
        setCourses(res.data.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    }
    getCourses();
  }, []);
  return (
    <div>
      <Navbar />
      <Courses courses={courses} />
    </div>
  );
}
function Courses({ courses }) {
  const [message, setmessage] = useState(null);
  async function purchaseCourse(id) {
    try {
      const res = await API.post(`http://localhost:5001/api/users/${id}/buy`);
      setmessage(res.data.message);
      alert(res.data.message);
    } catch (err) {
      setmessage("Error in purchasing course!");
      alert("Error in purchasing course!");
    }
  }
  return (
    <div className="w-full max-w-4xl mx-auto flex justify-center items-center min-h-screen">
      <Carousel>
        <CarouselContent>
          {courses.map((course) => (
            <CarouselItem key={course._id} className="basis-full">
              <Card className="p-8 rounded-2xl shadow-md w-full">
                <CardContent>
                  <h2 className="text-4xl font-bold mb-4">{course.title}</h2>

                  <p className="text-lg text-gray-500 text-justify mb-6">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold">₹{course.price}</h3>

                    <Button
                      onClick={() => purchaseCourse(course._id)}
                      className="ml-auto"
                    >
                      Purchase
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
