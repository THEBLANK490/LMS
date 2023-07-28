import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

const FavoriteCourses = () => {
    return (
        <>
        <div className="container flex flex-row justify-center mt-3 ml-20 w-11/12">
            <div>
                <Sidebar/>
            </div>
            <div className="ml-2 w-11/12"> 

                <h1 className="px-6 py-2 text-xl text-gray-800 bg-gray-200  flex justify-between">
                    Favorite courses
                </h1>
                {/* Content */}
                <div class="flex flex-col ">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full text-center text-sm font-light">
                                    <thead
                                        class="border-b bg-neutral-800 font-medium ">
                                        <tr>
                                            <th scope="col" class=" px-6 py-4">S.N</th>
                                            <th scope="col" class=" px-6 py-4">Name</th>
                                            <th scope="col" class=" px-6 py-4">Created By:</th>
                                            <th scope="col" class=" px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b dark:border-neutral-500">
                                            <td class="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                                            <td class="whitespace-nowrap  px-6 py-4">PHP development</td>
                                            <td class="whitespace-nowrap  px-6 py-4"> <Link to='#'> Otto </Link></td>
                                            <td class="whitespace-nowrap  px-6 py-4"><button type="button" class="focus:outline-none text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Delete</button></td>
                                        </tr>
                                        <tr class="border-b dark:border-neutral-500">
                                            <td class="whitespace-nowrap  px-6 py-4 font-medium">2</td>
                                            <td class="whitespace-nowrap  px-6 py-4">PHP development</td>
                                            <td class="whitespace-nowrap  px-6 py-4"> <Link to='#'> Otto </Link></td>
                                            <td class="whitespace-nowrap  px-6 py-4"><button type="button" class="focus:outline-none text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Delete</button></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default FavoriteCourses