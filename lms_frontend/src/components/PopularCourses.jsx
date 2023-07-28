import React from 'react';
import Pagination from '../pages/Pagination';
import PopularCards from '../pages/PopularCards';

const PopularCourses = () => {
    const popularCourse = [
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
        { title: "Course 1", content: "Lorem ipsum dolor sit amet." },
    ];
    return (
        <>
            <h2 className="text-3xl font-bold ml-16 mt-8">Popular Courses</h2>
            <div className=" overflow-x-hidden ">
                <div className="m-auto grid grid-cols-4 justify-center items-center">
                    {popularCourse.map((card, index) => (
                        <PopularCards key={index} title={card.title} content={card.content} />
                    ))}
                </div>
            </div>
            <Pagination />
        </>
    )
}

export default PopularCourses