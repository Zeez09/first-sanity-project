import React from 'react'
import { ChevronDown, Search, Heart, User, ShoppingBag } from "lucide-react"

const NavBar = () => {
  return (
    <nav className='shadow-md px-10'>
      <div className='flex flex-row items-center justify-between p-5'>
        <div>
          <h1 className='font-semibold text-3xl'>KITS + ACE</h1>

        </div>

        <div>
          <ul className='flex justify-between items-center gap-5'>
            <li>New Arrivals<ChevronDown className="ml-1 inline-block" /></li>
            <li>Women<ChevronDown className="ml-1 inline-block" /></li>
            <li>Men<ChevronDown className="ml-1 inline-block" /></li>
            <li>Sale<ChevronDown className="ml-1 inline-block" /></li>
          </ul>

        </div>

        <div>
          <ul className='flex justify-between items-center gap-5'>
            <li><Search/></li>
            <li><Heart/></li>
            <li>$CAD<ChevronDown className="ml-1 inline-block" /></li>
            <li><User/></li>
            <li><ShoppingBag/></li>
          </ul>
        </div>

      </div>
      
    </nav>
  )
}

export default NavBar