import React from "react";
import { Navbar } from "./Navbar.jsx";

export function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-orange-wheel mb-6">
          About CourseApp
        </h1>

        <p className="text-lg mb-4 text-justify">
          CourseApp is your go-to platform for discovering and enrolling in
          high-quality online courses. Our mission is to make learning
          accessible, engaging, and effective for everyone, whether you are
          looking to advance your career, pick up a new skill, or explore your
          passions.
        </p>

        <p className="text-lg mb-4 text-justify">
          We partner with top instructors and experts from around the world to
          provide a diverse selection of courses across multiple domains,
          including technology, business, arts, and personal development. Our
          intuitive interface and interactive tools help learners stay motivated
          and track their progress.
        </p>

        <p className="text-lg mb-4 text-justify">
          At CourseApp, we believe that education should be flexible and
          tailored to your needs. You can learn at your own pace, revisit
          lessons anytime, and engage with a supportive community of fellow
          learners.
        </p>

        <p className="text-lg mb-4 text-justify">
          Join thousands of learners today and take the next step in your
          personal and professional growth. With CourseApp, knowledge is just a
          click away.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg text-justify">
            To empower people everywhere with the knowledge and skills they need
            to succeed in a rapidly changing world.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>
              Accessibility – Learning should be available to everyone,
              everywhere.
            </li>
            <li>
              Quality – We prioritize high-quality courses taught by experienced
              instructors.
            </li>
            <li>
              Engagement – We create interactive and motivating learning
              experiences.
            </li>
            <li>
              Community – Learners thrive in a supportive and collaborative
              environment.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
