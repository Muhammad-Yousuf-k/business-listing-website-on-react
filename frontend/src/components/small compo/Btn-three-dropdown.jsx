import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from "react-router-dom";

const Btnthreedropdown = () => {
      const [stateOpen, setStateOpen] = useState(false)
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
    
  return (
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
                {states.map((state, index) => (
                  <Link
                    key={index}
                    to={`/${state.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                  >
                    {state}
                  </Link>
                ))}
              </div>
            )}
          </div>
  )
}

export default Btnthreedropdown