import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productData } from '../assets/data'
import HeaderSearch from '../components/HeaderSearch'
import Header from '../components/Header'
import { FaArrowDown } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { IoStarHalfSharp, IoStarSharp } from 'react-icons/io5'
import { BiSolidOffer } from "react-icons/bi";
import { StoreContext } from '../contexts/StoreContext'
import {useUser} from '@clerk/clerk-react'
import HomeProduct from '../components/HomeProduct'
import Footer from '../components/Footer'
import { useSwipeable } from 'react-swipeable';
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { ImSpinner9 } from "react-icons/im";
import toast from 'react-hot-toast'
import axios from 'axios'

const ProductPage = () => {
    const {id} = useParams()
    const { addToCart, allproduct, loading, setLoading, backendUrl } = useContext(StoreContext);
    const navigate = useNavigate()
    const {user, isLoaded, isSignedIn} = useUser()
    const userId = isLoaded && isSignedIn ? user.id : null;
    const [buyLoading, setBuyLoading] = useState(false)

    const [productInfo, setProductInfo] = useState(null)
    const [changeButton, setChangeButton] = useState("des")
    const fecthProductInfo = () =>{
        if(Array.isArray(allproduct)){
        const productInfo = allproduct.find(product => product._id === id);
        setProductInfo(productInfo)
        }
    }
    const [deliveryDate, setDeliveryDate] = useState('');

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleUnitSelect = (index) => {
        setSelectedIndex(index);
    };

    const handleQuantityChange = (type) => {
        if(type === 'inc' && quantity<=productInfo.stock){
            setQuantity(prev => prev + 1 )
        } else if(type === 'dec' && quantity>1){
            setQuantity(prev => prev - 1 )
        }
        // setQuantity(prev => (type === 'inc' ? (prev + 1) : Math.max(1, prev - 1)));
    };

    const unit = productInfo?.type?.[selectedIndex] || '';
    const price = productInfo?.discountedPrice?.[selectedIndex] || 0;
    const totalPrice = price * quantity
    const originalPrice = productInfo?.price?.[selectedIndex] || 0;

    const handleAddToCart = () => {

    if(!isSignedIn && isLoaded){
        navigate('/signup')
    } else{
        const item = [{
      id: productInfo._id,
      name: productInfo.name,
      image: productInfo.image[0],
      unit: unit,
      price: productInfo.discountedPrice[selectedUnitIndex],
      originalPrice: productInfo.price[selectedIndex],
      discount: productInfo.discount,
      quantity,
      stock: productInfo.stock
    }];
    console.log(item)
    addToCart(item);
    }
    };

    const selectedUnitIndex = selectedIndex;
    useEffect(()=>{
        
    },[selectedIndex])
    // handle buy now item
    const handleBuyNow = () => {
    if(!isSignedIn && isLoaded){
        navigate('/signup')
    } else{
    setBuyLoading(true)
    const orderItem = {
        id: productInfo.id,
        name: productInfo.name,
        image: productInfo.image[0],
        unit: unit,
        quantity,
        price: productInfo.price[selectedUnitIndex],
        discount: productInfo.discount,
        deliveryDate,
    };
    navigate('/order-summary', { state: { buyNowItem: orderItem } });
    setBuyLoading(false)
    }
    };
    const generateDeliveryDate = () => {
    const daysToAdd = Math.floor(Math.random() * 2) + 3; // 3 to 4 days
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    });
    };

    // 👇 Inside your component, add these two states
const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setCurrentImageIndex((prev) =>
            prev < productInfo.image.length - 1 ? prev + 1 : 0
            );
        },
        onSwipedRight: () => {
            setCurrentImageIndex((prev) =>
            prev > 0 ? prev - 1 : productInfo.image.length - 1
            );
        },
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: false,
    });


    useEffect(()=>{
        fecthProductInfo()
        setDeliveryDate(generateDeliveryDate());
    }, [allproduct, id])


    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')

    function calculateNewAverage(reviews) {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return parseFloat((total / reviews.length).toFixed(1));
    }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        setLoading(true)
        const {data} = await axios.post(backendUrl + `/api/product/review-add/${id}`,{userId, rating, comment} )
        if(data.success){
            toast.success(data.message)
            // Create the review object you just added (manually)
            const newReview = {
                user: userId,
                name: user.fullName,
                userImage: user?.imageUrl,
                rating,
                comment,
                createdAt: new Date().toISOString(),
            };

            setProductInfo(prev => {
                const updatedReviews = [...prev.reviews, newReview];
                return {
                ...prev,
                reviews: updatedReviews,
                numReviews: updatedReviews.length,
                averageRating: calculateNewAverage(updatedReviews),
                };
            });
            setRating(1)
            setComment('')
            setLoading(false)
        } else{
            toast.error(data.message)
        }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return productInfo && (
    <div>
      <Header />
    <div className='flex flex-col'>
        <div className='md:flex grid grid-cols-1 mt-4 md:px-20 bg-gray-50'>
            {/* <div className='flex flex-col items-center md:w-[30vw] w-full rounded-md border-1 md:max-h-[480px] border-gray-300 bg-white p-2 mt-5'>
                <img src={productInfo.image[0]} className='w-full' alt="" />
                <div className='flex w-full justify-between'>
                    <div className='my-2 p-1 border-2 border-gray-300 rounded-md'><img src={productInfo.image[0]} className='w-22 rounded-md' alt="" /></div>
                    <div className='my-2 p-1 border-2 border-gray-300 rounded-md'><img src={productInfo.image[1]} className='w-22 rounded-md' alt="" /></div>
                    <div className='my-2 p-1 border-2 border-gray-300 rounded-md'><img src={productInfo.image[2]} className='w-22 rounded-md' alt="" /></div>
                    <div className='my-2 p-1 border-2 border-gray-300 rounded-md'><img src={productInfo.image[3]} className='w-22 rounded-md' alt="" /></div>
                </div>
            </div> */}

        <div className='flex flex-col items-center md:w-[80vw] w-full md:max-h-[480px] rounded-md border border-gray-300 bg-white p-2 mt-5'>
            <div {...handlers} className='w-full rounded-md overflow-hidden'>
                <img
                src={productInfo.image[currentImageIndex]}
                className='w-full h-full object-contain transition-all duration-300 ease-in-out'
                alt='Main'
                />
            </div>

            <div className='flex w-full justify-start gap-2 mt-2'>
            {productInfo.image.map((img, index) => (
            <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`p-1 border-2 rounded-md cursor-pointer ${
                currentImageIndex === index
                    ? 'border-emerald-600'
                    : 'border-gray-300'
                }`}
            >
                <img src={img} className='w-16 h-16 object-contain rounded' alt='' />
            </div>
            ))}
            </div>
        </div>
            <div className='flex flex-col items-start p-5'>
                <p className='text-2xl font-bold'>{productInfo.name}</p>
                <div className='flex gap-1 text-yellow-500 md:text-[25px] text-[20px] mt-3 items-center'>
                {/* {
                    [1,2,3,4].map((item,index)=>(
                        <IoStarSharp key={index} />
                    ))
                }
                <IoStarHalfSharp /> */}
                {[...Array(5)].map((_, i) =>
                    i < productInfo.averageRating ? <IoMdStar key={i} /> : <IoMdStarOutline key={i} />
                )}
                <p className='text-blue-600 ml-3 text-sm font-serif'>Very Good  <span className='font-serif'>~ 23,456 Reviews</span></p>
                </div>
                <div className='rounded-r-lg px-3 py-1 text-md bg-emerald-500 text-white mt-2'>Top Discount of Sale</div>
                <span className='flex py-1 px-3 items-center text-lg font-sans'><div className='text-green-600 text-[20px] gap-1 flex items-center'><FaArrowDown className='' /> {productInfo.discount}% </div><p className='text-gray-500 ml-3 text-md line-through'>₹ {originalPrice}</p><p className='ml-3 text-xl'>₹ {totalPrice}</p></span>
                <div className='text-sm font-sans'>Delivery by {deliveryDate}  | <span className='text-emerald-800'>Free</span></div>
                <div className='md:flex hidden flex-col mt-2'>
                    <p className='flex gap-3 items-center'><BiSolidOffer className='text-[25px] text-green-600' /> <span className='text-md font-medium'>Offers</span></p>
                    <div className='flex gap-15'>
                        <div className='shadow-lg w-[15vw] h-[100px]'>
                            <p className='font-medium text-lg'>Cashback</p>
                            <div className=''>Upto ₹8.00 cashback as Amazon Pay Balance when you…</div>
                        </div>
                        <div className='w-[15vw] h-[100px] shadow-lg'>
                            <p className='font-medium text-lg'>Bank Offer</p>
                            <div>Upto ₹1,250.00 discount on select Credit Cards, HDFC…</div>
                        </div>
                        <div className='w-[15vw] h-[100px] shadow-lg'>
                            <p className='font-medium text-lg'>Partner Offers</p>
                            <div>3% off any 3, 5% off any 4 <span>View products</span></div>
                        </div>
                    </div>
                </div>
                
                {/* <div className='flex mt-2 items-center gap-4'>
                    <h1 className='text-lg'>Size</h1>
                    <div className='flex gap-4'>
                        <div className='px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm border-1 border-gray-300'>SM</div>
                        <div className='px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm border-1 border-gray-300'>M</div>
                        <div className='px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm border-1 border-gray-300'>L</div>
                        <div className='px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm border-1 border-gray-300'>XL</div>
                        <div className='px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm border-1 border-gray-300'>XXL</div>
                    </div>
                </div> */}
                
                <div className='flex mt-2 items-center gap-4'>
                    <h1 className='text-lg'>{productInfo.unit}</h1>
                    <div className='flex max-sm:w-[75vw] gap-4 font-sans overflow-scroll scroll-hide'>
                        {
                            productInfo.type.map((item,index)=>(
                                <div onClick={() => handleUnitSelect(index)} key={index} className={`px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm ${selectedIndex === index ? 'border-2 border-emerald-700' : "border-1 border-gray-300"}`}>{item}</div>
                            ))
                        }
                        {/* <div className='px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm border-1 border-gray-300'>2Kg</div>
                        <div className='px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm border-1 border-gray-300'>3Kg</div>
                        <div className='px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm border-1 border-gray-300'>4Kg</div>
                        <div className='px-6 cursor-pointer hover:bg-gray-200 py-2 rounded-sm border-1 border-gray-300'>5Kg</div> */}
                    </div>
                </div>
                <div className='flex items-center gap-4 mt-3'>
                    <button onClick={()=>handleQuantityChange('dec')} className='flex items-center w-10 h-10 justify-center pb-[5px] rounded-full text-[25px] font-bold bg-emerald-600 text-white cursor-pointer'>-</button>
                    <div className='text-[30px] mb-[7px]'>{quantity}</div>
                    <button onClick={()=>handleQuantityChange('inc')} className='flex items-center w-10 h-10 justify-center rounded-full text-[25px] font-bold bg-emerald-600 text-white cursor-pointer'>+</button>
                </div>
                <div className='flex mt-3 gap-4'>
                    {
                        loading ?
                        <button className='md:px-7 md:py-2 px-4 py-2 flex items-center text-white bg-emerald-600 rounded-full cursor-pointer md:text-[17px] text-md'><ImSpinner9 className='text-md animate-spin' />Please Wait...</button>
                        :
                        <button onClick={handleAddToCart} className='md:px-7 md:py-2 px-4 py-2 text-white bg-emerald-600 rounded-full cursor-pointer md:text-[17px] text-md'>Add to cart</button>
                    }
                    {
                        buyLoading ? 
                        <button className='md:px-7 md:py-2 px-4 py-2 flex items-center text-white bg-emerald-600 rounded-full cursor-pointer md:text-[17px] text-md'><ImSpinner9 className='text-md animate-spin' />Please Wait...</button>
                        :
                        <button onClick={()=>{handleBuyNow();scrollTo(0,0)}} className='md:px-7 md:py-2 px-4 py-2 text-emerald-600 bg-emerald-50 border-2 border-emerald-800 rounded-full cursor-pointer md:text-[17px] text-sm font-bold'>Buy Now</button>
                    }
                    {/* <button className='text-[25px] cursor-pointer text-emerald-800'><FaRegHeart /></button> */}
                </div>
                <div>
                    <h1 className='text-lg font-medium my-2 underline'>Description</h1>
                    <p>{productInfo.description}</p>
                </div>
            </div>
        </div>

        <div className='w-full mt-20 md:px-6 px-2 pb-16'>
        <div className='rounded-md border-1 border-gray-500 py-8 md:px-10 px-2'>
            <div className='flex md:gap-6 gap-2'>
                <button onClick={()=>setChangeButton('des')} className='md:py-2 md:px-5 text-sm px-3 py-1 rounded-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 cursor-pointer'>Description</button>
                <button onClick={()=>setChangeButton('add')} className='md:py-2 md:px-5 text-sm px-3 py-1 rounded-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 cursor-pointer'>Additional Info</button>
                <button onClick={()=>setChangeButton('review')} className='md:py-2 md:px-5 text-sm px-3 py-1 rounded-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 cursor-pointer'>Reviews <span className='font-sans text-[15px]'>{productInfo.numReviews}</span></button>
            </div>

            {
                changeButton === 'des' && 
                    <div className='mt-3'>
                        <p>{productInfo.description}</p>
                    </div>
            
            }
            {
                changeButton === 'add' && 
                <div class="w-full md:py-10 md:px-40 py-3 px-3 mx-auto my-6 border border-gray-400 rounded">
                    <table class="w-full text-sm text-left text-gray-700">
                        <tbody>
                            {
                                productInfo.details.map((item, index) =>(
                                    <tr class="border-b border-1 border-gray-500" key={index}>
                                        <td class="p-3 font-medium bg-gray-100 w-1/2 text-md text-neutral-800">{item}</td>
                                        <td class="p-3 border-l border-l-gray-500 text-md text-neutral-800">{productInfo.details_type[index]}</td>
                                    </tr>
                                ))
                            }
                        
                        </tbody>
                    </table>
                </div>

            }   
            {
                changeButton === 'review' && 
                <div className='mt-3'>
                    <p className='font-medium text-2xl'>Customar questions and answers</p>
                    <div className='w-full py-2 font-sans'>
                
                    {
                        productInfo.reviews && productInfo.reviews.length > 0 ? (
                            productInfo.reviews?.map((item, index)=>(
                            <div key={index} className='flex items-center justify-between gap-1 rounded-md border-1 px-3 py-2 border-gray-400 flex-wrap'>
                            <div className='flex flex-col items-center gap-2 '>
                                <img src={item.userImage} className='w-10 md:w-17 rounded-full' alt="" />
                                <p className='text-emerald-800 font-medium text-sm md:text-[19px]'>{item.name}</p>
                            </div>
                            <div className='text-sm flex flex-col items-start gap-y-1 min-w-30 max-w-80'>
                                <p className='text-gray-600 text-[14px] font-medium'>{new Date(item.createdAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}</p>
                                <p className='text-gray-700 text-md'>{item.comment}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1 text-yellow-500 mb-1 md:text-[30px] text-[20px]">
                                {[...Array(5)].map((_, i) =>
                                    i < item.rating ? <IoMdStar key={i} /> : <IoMdStarOutline key={i} />
                                )}
                                <span className="text-sm text-gray-700 ml-2">({item.rating}/5)</span>
                                </div>
                            </div>
                        </div>
                            ))
                        ):(
                            <div></div>
                        )
                    }
                    
                    </div>
                    <form onSubmit={handleSubmit} action="">
                    <div className='mt-3 flex flex-col md:w-[50vw] w-full'>
                        <label htmlFor="" className='text-gray-700 font-medium'>Add a Review</label>
                        <textarea value={comment} rows={5} onChange={(e) => setComment(e.target.value)} placeholder='Write your review..' className='outline-none border-1 w-full border-gray-400 rounded-md px-3 py-3 mt-4'/>
                    </div>

                     <div className="flex items-center gap-2 py-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <span
                            key={num}
                            onClick={() => setRating(num)}
                            className={`cursor-pointer text-[35px] mt-2 ${
                                num <= rating ? 'text-yellow-400' : 'text-gray-400'
                            }`}
                            >
                            {/* ★ */}
                            <IoMdStar />
                            </span>
                        ))}
                    </div>
                    {
                        loading ?
                        <button className='md:px-7 md:py-2 px-4 py-2 flex items-center text-white bg-emerald-600 rounded-full cursor-pointer md:text-[17px] text-md'><ImSpinner9 className='text-md animate-spin' />Please Wait...</button>
                        :
                        <button type='submit' className='bg-emerald-700 text-white cursor-pointer px-5 py-2 rounded-full mt-2'>Submit Review</button>
                    }
                    </form>
                </div>
            }
            
        </div>
        </div>
    </div>
    <HomeProduct categoryId={productInfo.categoryId} />
    <Footer />
    </div>
  )
}

export default ProductPage
