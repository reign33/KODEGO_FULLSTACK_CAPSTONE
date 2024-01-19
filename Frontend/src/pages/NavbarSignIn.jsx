import React, {useState, useEffect} from 'react'
import profileService from '../services/profileService';
import LoadingSpinner from '../components/LoadingSpinner';
import { BiLogOutCircle } from "react-icons/bi";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Logo from '../asset/REL_Logo.png'
import Date from '../components/Date'
import Calculator from '../components/Calculator'
import ModalAvatar from '../components/ModalAvatar';
import CalculatorButton from '../components/CalculatorButton';

const navigation = [
  { name: 'Calendar', href: '#', current: true },
  // { name: 'Team', href: '#', current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Time', href: '#', current: false },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarSignIn({user, setUser, isLoading, setIsLoading}) {
  const [profile, setProfile] = useState([]); //photoInfo
  const [open, setOpen] = useState(false); //modal toggle
  const navigate = useNavigate();

  useEffect(() => {
    profileService.getProfiles().then((res) => {
      setProfile(res);
    });
  }, []);
  
  const handleLogout = () => {
            window.localStorage.removeItem("loggedUser");
            setUser(null);
            navigate('/signup');
          }
  
  const handleOpen = () => {
    setOpen(!open);
          }

          if (isLoading === true) {
            return (
              <div className="flex justify-center items-center">
                <LoadingSpinner />
              </div>
            );
          }

  return (
    <div>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        
        <div>
          <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="mr-20 h-10 w-auto"
                    src={Logo}
                    alt="REL Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <div >
                    <Date/>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <div >
                    <CalculatorButton/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 font-medium"
                >
                  <div className="font-lg text-[16px] text-[white]">
                    {user?.username}{" "}
                  </div>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-9 w-9 rounded-full"
                        src={Array.isArray(profile) && profile.map((data)=>data.photoInfo.url)}
                        alt="Profile Pic"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <p onClick={handleOpen}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            User Settings
                          </p>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                       <a
                       onClick={handleLogout}     
                       className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            <div className="flex items-center font-medium text-[red]">
                            <BiLogOutCircle className="mr-[5px] text-[20px]" />
                            <p>Sign Out</p>
                            </div>
                          </a>
                          
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
     <ModalAvatar 
     open={open}
     setOpen={setOpen}
     handleOpen={handleOpen} 
     profile={profile}
     setProfile={setProfile}
     isLoading={isLoading}
     setIsLoading={setIsLoading}
     />
     </div>
     

  )
}
