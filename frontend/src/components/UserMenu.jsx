import { useState } from "react"
import { User } from "lucide-react"
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";


export default function UserMenu({ img = "/unknownuser.png" }) {
  const [open, setOpen] = useState(false)
  const { logout, user } = useUser();





  return (
    <div className="relative h-10 w-10 cursor-pointer">

      {/* Avatar Button */}
      <img
        onClick={() => setOpen(!open)}
        className={`flex h-10 w-10 items-center justify-center rounded-full`}
        src={img}
      />
      <User size={20} />


      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 rounded-lg border bg-white shadow-lg z-[99] overflow-hidden">

          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="block px-4 py-3 text-sm hover:bg-gray-100">Dashboard</Link>
              <button
                onClick={() => {
                  logout()
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
          {user?.role === "viewer" && (
            <>
              <Link to="/account" className="block px-4 py-3 text-sm hover:bg-gray-100">Account</Link>
              <Link to="/search/?q=save_listing&source=save-listing" className="block px-4 py-3 text-sm hover:bg-gray-100">Save Listing</Link>
              <button
                onClick={() => {
                  logout()
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
          {user?.role === "owner" && (
            <>
              <Link to="/account" className="block px-4 py-3 text-sm hover:bg-gray-100">Account</Link>
              <Link to="/owner/dashboard" className="block px-4 py-3 text-sm hover:bg-gray-100">Dashboard</Link>
              <Link to="/save-listing" className="block px-4 py-3 text-sm hover:bg-gray-100">Save Listing</Link>
              <button
                onClick={() => {
                  logout()
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}


        </div>
      )}
    </div>
  )
}