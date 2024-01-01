import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

function SignUpUi({user, isLoading, setIsLoading}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const navigate = useNavigate();

  
    useEffect(() => {
        if (user) {
          navigate("/")
        }
      }, [user, navigate]);

 function handleSignUp(e){
    e.preventDefault();

    setIsLoading(true);

    const credentials = {
      username,
      password,
    };

    userService
    .register(credentials)
    .then((_) => {
      navigate("/login");
      setUsername("");
      setPassword("");
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));
    }

    if (isLoading === true) {
        return (
          <div className="flex flex-col justify-center items-center h-screen p-4">
            <LoadingSpinner />
          </div>
        );
      }

  
  return (
    <>
    <section className="bg-indigo-100 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <h2 className=' rounded-md px-2 text-white bg-blue-400'>REL Inventory System</h2>  
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form 
              className="space-y-4 md:space-y-6" 
              onSubmit={handleSignUp}
              >
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                      type="email" 
                      name="email"
                      id="email"
                      value={username} 
                      onChange={(e)=>{setUsername(e.target.value)}}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                      focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input 
                      type="password" 
                      name="password"
                      id="password" 
                      value={password} 
                      placeholder="••••••••"
                      autoComplete="new-password"
                      onChange={(e)=>{setPassword(e.target.value)}} 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  {password.length >=16 && <p style={{ color: 'red' }}>Must be below of 16 characters only</p> }
                  {password.length!==0 && password.length <=5 && <p style={{ color: 'red' }}>Must be min of 6 characters only</p> }

                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input 
                      type="password" 
                      name="confirm-password"
                      id="confirm-password" 
                      value = {confirmpassword}
                      onChange={(e)=>{setConfirmpassword(e.target.value)}} 
                      placeholder="••••••••"
                      autoComplete="off" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  {password.length !== 0 && confirmpassword.length !== 0 &&password!==confirmpassword&&<p style={{ color: 'red' }}>Password Not Matched</p>}



                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button  
                  type="submit" 
                  className="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default SignUpUi;