import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl='http://127.0.0.1:8000/api';  
const CourseDetail = () => {
  const[courseData,setCourseData] = useState([]);
  const[studentData,setStudentData]=useState([]);
  const[teacherData,setTeacherData] = useState([]);
  const[chapterData,setChapterData] = useState([]);
  const[userLoginStatus,setUserLoginStatus] = useState();
  const[enrollStatus,setEnrollStatus] = useState();
  const studentId = localStorage.getItem('student_id');
 
  const [showModal, setShowModal] = useState(false);
  let { course_id } = useParams();

      // fetch courses when we load
      useEffect(()=>{
        try {
            axios.get(baseUrl+'/course/'+course_id)
            .then((res) => {
              setCourseData(res.data);
              setChapterData(res.data.course_chapters);
              setTeacherData(res.data.teacher);
            })
        } catch (error) {
            console.log(error);
        }
        
        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
        if(studentLoginStatus === 'true'){
          try {
            axios.get(baseUrl+'/fetch-enroll-status/'+studentId+"/"+course_id)
            .then((res) => {
              if(res.bool === true){
                setEnrollStatus('success');
              }
             
            })
        } catch (error) {
            console.log(error);
            
        }
          setUserLoginStatus('success');
        }
    },[])

    const enrollCourse = async() => {
     
      const formData = new FormData();
      formData.append('course',course_id);
      formData.append('student',studentId);
      try {
        const response = await axios.post(baseUrl + "/student-enroll-course/", formData, {
          headers: {
            'content-type': 'multipart/form-data',
          }
        })
        .then((res) => {
          if(res.status === 200 || res.status === 201){
            Swal.fire({
                title: 'Data has been added',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton:false,
              })
              setEnrollStatus('success');
             }
        });
      } catch (error) {
        setEnrollStatus('success');
        Swal.fire({
          title: 'Already Enrolled in this course',
          icon: 'error',
          toast: true,
          timer: 3000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton:false,
        })
      }
    }


  return (
    <>
      <div className="container ml-10">
        <div className=" flex p-7 justify-left ml-32">
          <img src={courseData.featured_img} alt={courseData.title} className="h-80 w-96" />
          <div className="mx-5 leading-8">
            <h1 className="text-2xl mb-3 font-bold">{courseData.title}</h1>
            <p className="mb-3">
              {courseData.description}
            </p>
            <p className="font-bold ">
              Course By: <Link to={`/teacher-detail/${teacherData.id}`} className="text-red-500">{teacherData.full_name}</Link>{" "}
            </p>
            <p className="font-bold">Languages:
              {courseData.languages}
              </p>
            <p className="font-bold">Duration: 3hours 30 minutes </p>
            <p className="font-bold">Students Enrolled: {courseData.total_enrolled_student} Students </p>
            <p className="font-bold mb-2">Rating: 4/5</p>
            {
              enrollStatus === 'success' && userLoginStatus === 'success' &&
              <p><span>You are already enrolled in this course.</span></p>
            }
            {
              userLoginStatus === 'success' && enrollStatus !== 'success' &&
            <button className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={enrollCourse}>Enroll in this course</button>
            }
            {
              userLoginStatus !== 'success' &&
            <Link to='/user-login' className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Please Login to enroll.</Link>
            }
          </div>
        </div>

        {/* table part */}

        <div className="flex flex-col ml-36">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        In This Course
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {chapterData.map((chapter,index)=>
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-800  flex justify-between">
                        <p className="pt-1">{chapter.title}</p> 
                        <div className="flex">
                          <p className="mr-3 pt-1">1 hours 30 minutes</p>

                          {/* Modal */}
                          <div className=""> 
                            <button
                              className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm p-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(true)}
                            >
                              <i className="fa-brands fa-youtube fa-lg pt-2"></i>
                            </button>
                            {showModal ? (
                              <>
                                <div
                                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full w-full"
                                >
                                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                      {/*header*/}
                                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                          {chapter.title}
                                        </h3>
                                        <button
                                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                          onClick={() => setShowModal(false)}
                                        >
                                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                          </span>
                                        </button>
                                      </div>
                                      {/*body*/}
                                      <div className="relative p-6 flex-auto">
                                        <iframe title={chapter.title} width="700" height="500"  src={chapter.video} alt="No video available" ></iframe>
                                      </div>
                                      {/*footer*/}
                                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                          onClick={() => setShowModal(false)}
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </td>
                    </tr>
                    )}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
