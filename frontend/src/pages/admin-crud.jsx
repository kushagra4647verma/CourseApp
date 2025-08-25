import { useState } from "react";
import API from "@/utils/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full max-w-lg gap-6 mx-auto">
      <Tabs defaultValue="Create" className="w-full">
        <TabsList className="w-full flex justify-around">
          <TabsTrigger value="Create">Create</TabsTrigger>
          <TabsTrigger value="Update">Update</TabsTrigger>
          <TabsTrigger value="Delete">Delete</TabsTrigger>
        </TabsList>

        <TabsContent value="Create">
          <Card>
            <CardHeader>
              <CardTitle>Create</CardTitle>
              <CardDescription>Add a new course here!</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Createcom />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Update">
          <Card>
            <CardHeader>
              <CardTitle>Update</CardTitle>
              <CardDescription>Update an existing course!</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Updatecom />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Delete">
          <Card>
            <CardHeader>
              <CardTitle>Delete</CardTitle>
              <CardDescription>Remove a course here!</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Deletecom />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Createcom() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);

  async function handleCreation(e) {
    e.preventDefault();
    try {
      const res = await API.post("/courses", {
        title,
        description: desc,
        price,
      });
      alert("Course created successfully!");
    } catch (err) {
      alert("Error in Adding Courses");
    }
  }

  return (
    <form onSubmit={handleCreation} className="grid gap-4">
      <div>
        <Label htmlFor="title">Course Title</Label>
        <Input
          id="title"
          placeholder="Enter course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Enter course description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <Button type="submit">Create Course</Button>
    </form>
  );
}

function Updatecom() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");

  async function handleUpdation(e) {
    e.preventDefault();
    try {
      const res = await API.put(`/courses/${id}`, {
        title,
        description: desc,
        price,
      });
      alert("Course updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error in updating course!");
    }
  }

  return (
    <form onSubmit={handleUpdation} className="grid gap-4">
      <div>
        <Label htmlFor="courseId">Course ID</Label>
        <Input
          id="courseId"
          placeholder="Enter course ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="title">New Title</Label>
        <Input
          id="title"
          placeholder="Update course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">New Description</Label>
        <Input
          id="description"
          placeholder="Update course description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="price">New Price</Label>
        <Input
          id="price"
          type="number"
          placeholder="Update price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <Button type="submit">Update Course</Button>
    </form>
  );
}

function Deletecom() {
  const [id, setId] = useState("");
  async function handleDeletion(e) {
    e.preventDefault();
    try {
      const res = await API.delete(`/courses/${id}`);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  }
  return (
    <form onSubmit={handleDeletion} className="grid gap-4">
      <div>
        <Label htmlFor="courseId">Course ID</Label>
        <Input
          id="courseId"
          placeholder="Enter course ID to delete"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <Button variant="destructive" type="submit">
        Delete Course
      </Button>
    </form>
  );
}
