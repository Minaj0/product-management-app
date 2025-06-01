import React, { useState } from 'react';

const ProductImages = () => {
    const images = [
        'https://images.unsplash.com/photo-1746132730694-92a72b5dc843?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
        'https://plus.unsplash.com/premium_photo-1746637009665-0fbbda40e07a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1747171232839-a5fea879ca59?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
    ];

    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="flex flex-col items-left p-6">
            <div className="border border-gray-300 rounded-2xl p-8 mb-6 max-w-xl">
                <img src={mainImage} alt="Main" className="w-full h-auto object-contain" />
            </div>
            <div className="flex gap-5">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-2xl p-3 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setMainImage(img)}
                    >
                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-38 h-auto object-contain" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;
