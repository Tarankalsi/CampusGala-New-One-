import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Spinner from '../../components/ui/Spinner';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';



function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const LoginCall = async () => {
        setLoading(true);
        try {
            setError("");


            const response = await axios.post(`${BACKEND_URL}/api/v1/admin/signin`, {
                username,
                password
            });

            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token)
                navigate('/admin/dashboard')
            }

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Login Failed. Please try again later');
            }
            console.error('Login Failed:', error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <span className='font-extrabold text-5xl text-secondary'>Admin Panel</span>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="username"
                                        required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>


                                <button
                                    type="submit"
                                    className="w-full text-white  bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 hover:bg-indigo-950 dark:focus:ring-primary-800"
                                    onClick={LoginCall}
                                >
                                    {loading ? <Spinner /> : 'Log In'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}






export default AdminLogin
