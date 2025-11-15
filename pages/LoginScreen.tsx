/**
 * @file LoginScreen.tsx
 * @description
 * This file defines the `LoginScreen` component, which is the first page most users will see.
 *
 * Responsibilities:
 * 1.  Displays the university logo.
 * 2.  Shows a login form with fields for Username, Password, and College.
 * 3.  Handles user input and updates its internal memory (state).
 * 4.  When the user submits the form, it calls the `login` function from our "magic backpack"
 *     (AppContext) to check if the credentials are valid.
 * 5.  If login is successful, it navigates the user to the main part of the application.
 * 6.  If login fails, it displays an error message.
 * 7.  Includes quick login buttons for demo purposes.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext'; // Helper to get shared data.
import { College, User } from '../types'; // Imports the `College` & `User` types from our data dictionary.
import InfoModal from '../components/InfoModal';
import { Info } from '../components/Icons';

// This is the main component function for the Login Screen.
const LoginScreen: React.FC = () => {
    // We ask our "magic backpack" (AppContext) for the tools we need.
    const { login, data, setProgramAndBatch } = useAppContext();
    
    // `useNavigate` gives us a function to tell the app to go to a different page.
    const navigate = useNavigate();

    // `useState` is a React Hook that gives a component its own memory.
    // Here, we create pieces of memory to store what the user types into the form fields.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // We set the default college to the first one in our data list.
    const [college, setCollege] = useState<College>(data.colleges[0]?.id || 'CUIET');
    const [error, setError] = useState(''); // Memory for any error messages to display.
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Memory for the info modal.

    // This function runs when the user clicks the "LOGIN" button.
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the browser from reloading the page, which is the default form behavior.
        setError(''); // Clear any previous error messages.
        
        // We call the `login` function from our magic backpack.
        if (login(username, password, college)) {
            // If `login` returns true (success), we navigate to the main application page.
            navigate('/');
        } else {
            // If `login` returns false (failure), we set an error message to show the user.
            setError('Invalid username or password.');
        }
    };

    // This function handles the quick login buttons and dropdown.
    const handleQuickLogin = (userToLogin: User) => {
        if (!userToLogin || !userToLogin.password) {
            setError(`Could not find user or password.`);
            return;
        }

        setError('');
        // We assume the default college 'CUIET' for all quick logins for simplicity.
        if (login(userToLogin.username, userToLogin.password, 'CUIET')) {
            // Special handling for the PC ECE quick login to pre-select their program and batch.
            if (userToLogin.username === 'pc_ece') {
                const devProgram = data.programs.find(p => p.id === userToLogin.programId);
                if (devProgram) {
                    setProgramAndBatch(devProgram, '2025-2029');
                }
            }
            navigate('/');
        } else {
            setError(`Quick login failed for ${userToLogin.name}.`);
        }
    };

    // The JSX below describes what the Login Screen looks like.
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <div className="w-full max-w-md p-8">
                {/* The university logo. */}
                <div className="flex justify-center mb-8">
                     <img src="https://d1hbpr09pwz0sk.cloudfront.net/logo_url/chitkara-university-4c35e411" alt="Logo" className="h-20" />
                </div>
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <div className="flex justify-center items-center mb-6 relative">
                        <h2 className="text-3xl font-bold text-red-600">LOG IN</h2>
                        <button 
                            type="button" 
                            onClick={() => setIsInfoModalOpen(true)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-500 bg-opacity-10 text-red-600 hover:bg-opacity-20 transition-colors"
                            aria-label="About this application"
                            title="About this application"
                        >
                            <Info className="w-6 h-6" />
                        </button>
                    </div>
                    {/* The `onSubmit` event on the form triggers our `handleLogin` function. */}
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username" className="text-sm font-bold text-gray-600 tracking-wide">USERNAME</label>
                            <input
                                id="username"
                                type="text"
                                required
                                value={username} // The input's value is tied to our component's memory.
                                onChange={(e) => setUsername(e.target.value)} // When the user types, we update the memory.
                                className="w-full px-4 py-2 mt-2 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-input" className="text-sm font-bold text-gray-600 tracking-wide">PASSWORD</label>
                            <input
                                id="password-input"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-2 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                         <div>
                            <label htmlFor="college" className="text-sm font-bold text-gray-600 tracking-wide">COLLEGE</label>
                            <select
                                id="college"
                                value={college}
                                onChange={(e) => setCollege(e.target.value as College)}
                                className="w-full px-4 py-2 mt-2 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                {/* We create an <option> for each college in our data. */}
                                {data.colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        {/* If there's an error in our memory, we display it here. */}
                        {error && <p className="text-sm text-center text-red-600">{error}</p>}
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center bg-red-600 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300 hover:bg-red-700"
                            >
                                LOGIN
                            </button>
                        </div>
                    </form>
                    
                    {/* New Quick Logins section */}
                    <div className="p-4 mt-6 text-sm text-gray-600 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-center mb-3">Quick Logins</h4>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <button
                                type="button"
                                onClick={() => {
                                    const user = data.users.find(u => u.username === 'teacher_ece1');
                                    if(user) handleQuickLogin(user);
                                }}
                                className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                            >
                                Teacher (ECE)
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const user = data.users.find(u => u.username === 'pc_ece');
                                    if(user) handleQuickLogin(user);
                                }}
                                className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                            >
                                PC (ECE)
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const user = data.users.find(u => u.username === 'dept_cuiet');
                                    if(user) handleQuickLogin(user);
                                }}
                                className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                            >
                                Department
                            </button>
                             <button
                                type="button"
                                onClick={() => {
                                    const user = data.users.find(u => u.username === 'admin');
                                    if(user) handleQuickLogin(user);
                                }}
                                className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                            >
                                Admin
                            </button>
                        </div>
                         <div>
                            <label htmlFor="quick-login-select" className="text-xs font-bold text-gray-500 tracking-wide block text-center mb-1">Or select any user</label>
                            <select
                                id="quick-login-select"
                                defaultValue=""
                                onChange={(e) => {
                                    const userId = e.target.value;
                                    if (!userId) return;
                                    const user = data.users.find(u => u.id === userId);
                                    if (user) handleQuickLogin(user);
                                    e.target.value = ''; // Reset dropdown
                                }}
                                className="w-full px-4 py-2 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">-- Select a User --</option>
                                {data.users.sort((a,b) => a.name.localeCompare(b.name)).map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.role})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {isInfoModalOpen && <InfoModal onClose={() => setIsInfoModalOpen(false)} />}
        </div>
    );
};

export default LoginScreen;