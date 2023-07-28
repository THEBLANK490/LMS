import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from './pages/Navbar';
import Footer from "./pages/Footer";
import About from './components/About'
import Home from "./components/Home";
import CourseDetail from "./components/CourseDetail";

//User
import Login from "./components/user/UserLogin";
import Register from "./components/user/UserRegister";
import Dashboard from "./components/user/Dashboard";
import MyCourses from "./components/user/MyCourses";
import FavoriteCourses from "./components/user/FavoriteCourses";
import RecommendedCourses from "./components/user/RecommendedCourses";
import ProfileSetting from "./components/user/ProfileSetting";
import ChangePassword from "./components/user/ChangePassword";

// Teacher
import TeacherLogin from "./components/teacher/TeacherLogin";
import TeacherRegister from "./components/teacher/TeacherRegister";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import TeacherProfileSetting from "./components/teacher/TeacherProfileSetting";
import TeacherChangePassword from "./components/teacher/TeacherChangePassword";
import TeacherMyCourses from "./components/teacher/TeacherMyCourses";
import MyUsers from "./components/teacher/MyUsers";
import AddCourses from "./components/teacher/AddCourses";
import TeacherDetail from "./components/TeacherDetail";

import Sliders from "./pages/Sliders";
import AllCourses from "./components/AllCourses";
import PopularCourses from "./components/PopularCourses";
import PopularTeachers from "./components/PopularTeachers";
import CategoryCourses from "./components/CategoryCourses";
import AddChapters from "./components/teacher/AddChapters";
import Try from "./pages/Try";
import CourseChapters from "./components/teacher/CourseChapters";
import EditChapters from "./components/teacher/EditChapters";
import EditCourse from "./components/teacher/EditCourse";


function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/slider" element={<Sliders/>}></Route>
        <Route path="/detail/:course_id" element={<CourseDetail/>}></Route>
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail/>}></Route>

        {/* User Routes */}
        <Route path="/user-login" element={<Login/>}></Route>
        <Route path="/user-register" element={<Register/>}></Route>
        <Route path="/user-dashboard" element={<Dashboard/>}></Route>
        <Route path="/my-courses" element={<MyCourses/>}></Route>
        <Route path="/favorite-courses" element={<FavoriteCourses/>}></Route>
        <Route path="/recommended-courses" element={<RecommendedCourses/>}></Route>
        <Route path="/profile-setting" element={<ProfileSetting/>}></Route>
        <Route path="/change-password" element={<ChangePassword/>}></Route>

        {/* Teacher Routes */}
        <Route path="/teacher-login" element={<TeacherLogin/>}></Route>
        <Route path="/teacher-register" element={<TeacherRegister/>}></Route>
        <Route path="/teacher-dashboard" element={<TeacherDashboard/>}></Route>
        <Route path="/teacher-my-courses" element={<TeacherMyCourses/>}></Route>
        <Route path="/my-users" element={<MyUsers/>}></Route>
        <Route path="/add-courses" element={<AddCourses/>}></Route>
        <Route path="/edit-courses/:course_id" element={<EditCourse/>}></Route>
        <Route path="/add-chapters/:course_id" element={<AddChapters/>}></Route>
        <Route path="/all-chapters/:course_id" element={<CourseChapters/>}></Route>
        <Route path="/edit-chapters/:chapter_id" element={<EditChapters/>}></Route>
        <Route path="/teacher-profile-setting" element={<TeacherProfileSetting/>}></Route>
        <Route path="/teacher-change-password" element={<TeacherChangePassword/>}></Route>

        {/* List Courses */}
        <Route path="/all-courses" element={<AllCourses/>}></Route>
        <Route path="/popular-courses" element={<PopularCourses/>}></Route>
        <Route path="/popular-teachers" element={<PopularTeachers/>}></Route>
        <Route path="/category-courses" element={<CategoryCourses/>}></Route>


        <Route path="/try" element={<Try/>}></Route>


      </Routes>
      <Footer/>
    </>

  );
}

export default App;
