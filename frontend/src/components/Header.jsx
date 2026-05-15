// src/components/Header.jsx

import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Btnone from './small compo/Btn-one'
import Btntwo from './small compo/Btn-two'
import AvatarDropdownComponent from './AvatarDropdownComponent'
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";


export default function Header() {
  const { isLoggedIn, user, userAvatar } = useUser();


  const [menuOpen, setMenuOpen] = useState(false)
  const [stateOpen, setStateOpen] = useState(false)
  const [search, setSearch] = useState("")

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ]
  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <header className="bg-(--black-color) w-full min-h-[15vh] border-b ">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/top_logo.jpg"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-(--secondary-color) hover:opacity-80">
            Home
          </Link>

          {/* States Dropdown */}
          <div className="relative">
            <button
              onClick={() => setStateOpen(!stateOpen)}
              className="flex items-center gap-1 text-(--secondary-color)"
            >
              States
              <ChevronDown size={16} />
            </button>

            {stateOpen && (
              <div className="absolute left-0 top-8 z-50 max-h-60 w-48 overflow-y-auto rounded-md bg-white shadow-lg">

                <>
                  <div className="p-2 border-b sticky top-0 bg-white">
                    <input
                      type="text"
                      placeholder="Search state..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  {filteredStates.length > 0 ? (
                    filteredStates.map((state, index) => (
                      <Link
                        key={index}
                        to={`/search/?state=${encodeURIComponent(state)}&source=state`}
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                        onClick={() => setStateOpen(false)}
                      >
                        {state}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-500">
                      No state found
                    </p>
                  )}
                </>
              </div>
            )}
          </div>


          <Link to="/for-business" className="text-(--secondary-color) hover:opacity-80">
            For Business
          </Link>

          <Link to="/contact" className="text-(--secondary-color) hover:opacity-80">
            Contact
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <AvatarDropdownComponent img={userAvatar} />
            </>
          ) : (
            <>
              <Btnone text="Login" path="login" />
              <Btntwo text="Sign Up" path="register" />
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-(--secondary-color) md:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-700 bg-(--black-color)">

          <nav className="flex flex-col px-4 py-4">
            <AvatarDropdownComponent img={userAvatar} />

            <Link to="/" className="py-3 text-(--secondary-color)">
              Home
            </Link>

            {/* Mobile States */}
            <div className="py-3 text-(--secondary-color)">
              <p className="mb-2">States</p>
              <div className="max-h-40 overflow-y-auto pl-3">
                {states.slice(0, 10).map((state, i) => (
                  <Link key={i} to={`/search/?state=${encodeURIComponent(state)}&source=state`} className="block py-1 text-sm">
                    {state}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/for-business" className="py-3 text-(--secondary-color)">
              For Business
            </Link>

            <Link to="/contact" className="py-3 text-(--secondary-color)">
              Contact
            </Link>

            {/* Mobile Buttons */}
            <div className="mt-4 flex flex-row justify-center items-center gap-3">
              <Btnone text="Login" path="login" />
              <Btntwo text="Sign Up" path="signup" />
            </div>

          </nav>
        </div>
      )}
    </header>
  )
}