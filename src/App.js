import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import StudentList from "./pages/studentList";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Layout from './layout';
const HomeComponent = <Layout><Home /></Layout>
const studentListComponent =  <Layout><StudentList /></Layout>
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="login" element={<Login />} />
            <Route path="home" element={HomeComponent} />
            <Route path="studentList" element={studentListComponent} />
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
