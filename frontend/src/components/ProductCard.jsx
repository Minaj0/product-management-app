import React from 'react'

export const ProductCard = () => {

    const rating = <div className="rating rating-xs">
        <input type="radio" name="rating-1" className="mask mask-star" aria-label="1 star" />
        <input type="radio" name="rating-1" className="mask mask-star" aria-label="2 star" defaultChecked />
        <input type="radio" name="rating-1" className="mask mask-star" aria-label="3 star" />
        <input type="radio" name="rating-1" className="mask mask-star" aria-label="4 star" />
        <input type="radio" name="rating-1" className="mask mask-star" aria-label="5 star" />
    </div>

    return (
        <a className="card w-66 shadow-lg">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className='relative'
                />
                <div className="mask mask-circle bg-pri absolute top-2 right-2 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 z-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
               </div>
            </figure>
            <div className="card-body bg-pri">
                <h2 className="card-title">
                    Card Title
                </h2>
                <p>$Price</p>
                <div>{rating}</div>
            </div>
        </a>
    )
}
