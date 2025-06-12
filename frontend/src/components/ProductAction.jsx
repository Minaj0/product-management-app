import React from 'react'

export const ProductAction = () => {
    return (
        <div>
            <label htmlFor="product" className="btn btn-outline hover:text-sec font-script">Add Product</label>
            <input type="checkbox" id="product" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box bg-pri w-11/12 max-w-2xl">
                    <h3 className="text-lg font-bold text-center">Add Product</h3>
                    {/* title */}
                    <div className="form-control flex justify-between py-6">
                        <label className="label">
                            <span className="label-text font-bold">Title:</span>
                        </label>
                        <input
                            type="text"
                            name="price"
                            className="input input-bordered w-full max-w-lg bg-transparent border-sec"
                            required
                        />
                    </div>
                    {/* variants */}
                    <div className="form-control flex justify-between items-center">
                        <div>
                            <label className="label">
                                <span className="label-text font-bold">Variants:</span>
                            </label>
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex gap-2'>
                                <label className='label'> Ram:</label>
                                <input
                                    type="text"
                                    className="input input-bordered  bg-transparent border-sec w-28"
                                    required
                                />
                            </div>

                            <div className='flex gap-2'>
                                <label className='label'> Price:</label>
                                <input
                                    type="text"
                                    className="input input-bordered  bg-transparent border-sec w-28"
                                    required
                                />
                            </div>

                            <div className='flex gap-2'>
                                <label className='label'> QTY: </label>
                                <input
                                    type="number"
                                    className="input input-bordered  bg-transparent border-sec w-28"
                                    required
                                    min={0}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end mt-4'>
                        <button className='btn btn-outline  hover:text-sec'>Add Variant</button>
                    </div>

                    {/* subcategory */}
                    <div className="flex gap-30 py-6">

                        <div className="label">
                            Subcategory:
                        </div>

                        <div className="dropdown">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-outline items-center hover:text-sec mb-2 text-sec"
                            >
                                select subcategory
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg> */}
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-pri hover:bg-base-200 rounded-box z-1 w-28 p-2 shadow-sm">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
                    </div>


                    <div className="modal-action">
                        <label htmlFor="product" className="btn btn-outline hover:text-sec">Close!</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
