import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa';
export const ProductAction = () => {

    const [fetchedData, setFetchedData] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchSubcategories();
    }, []);



    const fetchSubcategories = async () => {
        try {
            const response = await axios.get('http://localhost:3333/product/subcategories');
            if (response.status === 200 || response.status === 201) {
                setFetchedData(response.data.Subcategories);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleSelect = (selected) => {
        setSelectedSubcategory(selected._id);
        setIsDropDownOpen(false);
    }


    const handleImageUpload = e => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));

        setImages(prev => [...prev, ...previews]);
    }


    return (
        <div>
            {/* The button to open modal */}
            <label htmlFor="product" className="btn btn-outline text-sec">Add Product</label>

            <input type="checkbox" id="product" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box bg-base-100 max-w-3xl p-10 ">
                    <h3 className="text-lg font-bold text-center ">Add Product</h3>
                    {/* title */}
                    <div className="title p-5 flex items-center justify-between">
                        <label htmlFor="title" className='title label'>Title :</label>
                        <input
                            type="text"
                            className='input border-sec lg:w-md'
                            placeholder='product title'
                        />
                    </div>

                    {/* varients */}
                    <div className="varients flex items-center p-5 justify-between">
                        <div className="varientLabel flex">
                            <label htmlFor="varients" className='label'>Varients :</label>
                        </div>

                        <div className="varientsGroup flex justify-between gap-2">
                            <div className="ram flex gap-1.5">
                                <label htmlFor="" className='label'>Ram:</label>
                                <input
                                    type="text"
                                    className='input border-sec lg:w-[6rem]'
                                    placeholder='ram size'
                                />
                            </div>

                            <div className="price flex gap-1.5">
                                <label htmlFor="" className='label'>Price:</label>
                                <input
                                    type="text"
                                    className='input  border-sec lg:w-[6rem]'
                                    placeholder='price'
                                />
                            </div>

                            <div className="qty flex gap-1.5">
                                <label htmlFor="" className='label'>QTY:</label>
                                <input
                                    type="text"
                                    className='input  border-sec lg:w-[6rem]'
                                    placeholder='quantity'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end p-5 pt-1">
                        <button className="btn btn-outline text-sec">
                            Add Variants
                        </button>
                    </div>

                    {/* subcategory dropdown */}
                    <div className="w-full p-5">
                        <div className="flex items-center justify-between gap-21">
                            <div>
                                <label className="label mb-0">Subcategory :</label>
                            </div>

                            <div className="relative flex-grow">
                                <button
                                    type="button"
                                    onClick={() => setIsDropDownOpen(prev => !prev)}
                                    className="btn btn-outline w-[28rem] flex justify-between items-center hover:text-sec"
                                >
                                    {selectedSubcategory
                                        ? fetchedData.find(sub => sub._id === selectedSubcategory)?.subCategory
                                        : "Select Subcategory"}
                                    <FaAngleDown
                                        className={`transition-transform duration-200 ${isDropDownOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isDropDownOpen && (
                                    <ul className="absolute left-0 right-0 z-50 bg-base-100 rounded-box shadow mt-1 max-h-40 overflow-y-auto">
                                        {fetchedData.map((sub) => (
                                            <li key={sub._id}>
                                                <button
                                                    type="button"
                                                    className="w-full text-left px-4 py-2 hover:bg-base-200"
                                                    onClick={() => handleSelect(sub)}
                                                >
                                                    {sub.subCategory}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* description */}
                    <div className="description p-5 flex justify-between">
                        <label className='label'>
                            Description :
                        </label>
                        <input
                            type="text"
                            className="input w-full lg:w-md bg-transparent border-sec"
                            placeholder='product description'
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex items-center gap-15">
                        <label className="label p-5">Upload image:</label>

                        <div className="flex gap-4 flex-wrap">
                            {/* Image Previews */}
                            {images.map((img, index) => (
                                <div key={index} className="w-32 h-24 rounded-lg border border-gray-300 p-2 flex items-center justify-center">
                                    <img
                                        src={img.url}
                                        alt={`preview-${index}`}
                                        className="object-contain max-h-full max-w-full"
                                    />
                                </div>
                            ))}

                            {/* Upload Box */}
                            <label
                                htmlFor="image-upload"
                                className="w-32 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </label>
                            <input
                                id="image-upload"
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>

                    <div className="modal-action flex justify-center">
                        <button className='btn btn-outline hover:text-sec'>ADD</button>
                        <label htmlFor="product" className="btn btn-outline hover:text-sec">DISCARD</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
