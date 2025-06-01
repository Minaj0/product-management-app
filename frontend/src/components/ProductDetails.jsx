import { Breadcrumbs } from './Breadcrumbs'
import { Navbar } from './Navbar'
import ProductImages from './ProductImages'

export const ProductDetails = () => {
    return (
        <div className='min-h-screen bg-pri'>
            <Navbar />
            <div className='mt-6'>
                <Breadcrumbs />
            </div>
            <div className="mainlayout flex mx-auto container">
                <div>
                <ProductImages />
                </div>
                <div className='p-10'>
                    <h1>Product Title</h1>
                    <p>$Price</p>
                    <div className="divider w-2xl"></div>
                    <p>Ram</p>
                    <p>Quandity</p>
                    <div className='flex gap-3'>
                        <button className='btn btn-outline'>Edit</button>
                        <button className='btn btn-outline'>wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
