import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import StudentList from "./pages/dashboard/manager/student/studentList";
import StudentDetail from "./pages/dashboard/manager/student/studentDetail";
import AddCourse from "./pages/dashboard/manager/courses/add-courses.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout";
import Overview from "./pages/overview";
import { ScrollMode } from "./pages/dashboard/manager/courses/all-course";

const HomeComponent = (
  <Layout>
    <Home />
  </Layout>
);
const StudentListComponent = (
  <Layout>
    <StudentList />
  </Layout>
);
const StudentDetailComponent = (
  <Layout>
    <StudentDetail />
  </Layout>
);

const OverviewComponent = (
  <Layout>
    <Overview />
  </Layout>
);
const TeacherComponent = (
  <Layout>
    <StudentList />
  </Layout>
);
const AddCourseComponent = (
  <Layout>
    <AddCourse />
  </Layout>
);
const ScrollModeComponent = (
  <Layout>
    <ScrollMode />
  </Layout>
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />} />
      <Route path="home" element={HomeComponent} />
      <Route path="studentList" element={StudentListComponent} />
      <Route path="/studentList/:id" element={StudentDetailComponent} />
      <Route path="overview" element={OverviewComponent} />
      <Route path="teacher" element={TeacherComponent} />
      <Route path="AddCourse" element={AddCourseComponent} />
      <Route path="AllCourse" element={ScrollModeComponent} />
    </Route>
  )
);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
