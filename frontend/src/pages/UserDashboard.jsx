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

export function Userdashboard() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function getCourses() {
      try {
        const res = await API.get("/courses");
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
  return (
    <div className="w-full max-w-4xl mx-auto flex justify-center items-center min-h-screen">
      <Carousel>
        <CarouselContent>
          {courses.map((course, index) => (
            <CarouselItem key={index} className="basis-full">
              <Card className="p-8 rounded-2xl shadow-md w-full">
                <CardContent>
                  <h2 className="text-4xl font-bold">{course.title}</h2>
                  <br />
                  <p className="text-l text-gray-500 text-justify">
                    {course.description}
                  </p>
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
