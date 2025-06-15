import React, { useState } from 'react'

export const Navbar = () => {

    const [seachQuery, setSearchQuery] = useState('');

    const handleChange = e => {
        const searchText = e.target.value;
        setSearchQuery(searchText);
    }

    return (
        <div className='flex items-center justify-around bg-base-100 p-6 shadow-lg sticky top-0 gap-3 font-script'>

            <div className="brand lg:flex-1">
            </div>
            
            <label className='input bg-transparent rounded border-sec lg:flex-1 text-sec'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    type="text"
                    placeholder='Search . . .'
                    className='placeholder:text-sec'
                    value={seachQuery}
                    onChange={handleChange}
                />
            </label>

            <div className="icons justify-center flex gap-5 items-center lg:flex-1">
                <button className='btn bg-transparent text-sec border-0  hover:text-white hover:bg-transparent shadow-none p-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>

                <button className="btn hover:text-sec text-sec btn-outline lg:text-lg">
                    Logout
                </button>

            </div>

        </div>

    )
}
