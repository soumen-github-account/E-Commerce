import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { ImSpinner3 } from "react-icons/im";
import { catagoryData } from '../../../../frontend/src/assets/categoryData'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import upload_area from '../../assets/upload_area.svg'

const ProductEditPage = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
        const [prodImg1, setProdImg1] = useState(false)
        const [prodImg2, setProdImg2] = useState(false)
        const [prodImg3, setProdImg3] = useState(false)
        const [prodImg4, setProdImg4] = useState(false)
        const [name, setName] = useState('')
    
        const unitPlaceholders = {
        size: 'e.g., M, L, XL',
        liter: 'e.g., 1 liter, 2 liter',
        kilos: 'e.g., 1 kg, 2 kg',
        inch: 'e.g., 10 inch, 12 inch',
        foot: 'e.g., 2 ft, 5 ft',
        ton: 'e.g., 1 ton, 2 ton',
        };
    
        const [category, setCategory] = useState('')
        const [change, setChange] = useState(0)
        const [change2, setChange2] = useState(0)
    
        const [subCategory, setSubCategory] = useState('')
        const [subCategory2, setSubCategory2] = useState('')
        const [selectedUnit, setSelectedUnit] = useState('size');
        const [stock, setStock] = useState()
        const [discount,setDiscount] = useState()
        const [description, setDescription] = useState('')
    
        const categoryChoose = async(index)=>{
            setCategory(catagoryData[index].name)
            setChange(index)
        }
    
        const subcategoryChoose = async(name, index)=>{
            setSubCategory(name)
            setChange2(index)
        }
    
        const [items, setItems] = useState([{ type: '', price: '' , discountedPrice: '' }]);
    
      const handleAdd = () => {
        setItems([...items, { type: '', price: '', discountedPrice: ''  }]);
      };
    
        
    
    //   const handleChange = (index, field, value) => {
    //     const updated = [...items];
    //     updated[index][field] = value;
    //     setItems(updated);
    //   };
    
        const handleChange = (index, field, value) => {
      const updated = [...items];
      updated[index][field] = value;
    
      // Grab latest price and discount
      const price = field === 'price' ? value : updated[index].price;
      const discountPercent = discount;
    
      if (price && discountPercent) {
        const discountAmount = (price * discountPercent) / 100;
        updated[index].discountedPrice = Math.round(price - discountAmount);
      }
    
      setItems(updated);
    };
    
    
      const handleDelete = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
      };
    
      const [brands, setBrands] = useState([{ type: '', description: '' }]);
    
      const handleAddBrand = () => {
        setBrands([...brands, { type: '', description: '' }]);
      };
    
      const handleChangeBrand = (index, field, value) => {
        const updated = [...brands];
        updated[index][field] = value;
        setBrands(updated);
      };
    
      const handleDeleteBrand = (index) => {
        const updated = brands.filter((_, i) => i !== index);
        setBrands(updated);
      };


    useEffect(() => {
    const updated = items.map(item => {
        if (item.price && discount) {
        const discountAmount = (item.price * discount) / 100;
        return {
            ...item,
            discountedPrice: Math.round(item.price - discountAmount),
        };
        }
        return item;
    });
    setItems(updated);
    }, [discount]);

    // Fetch old product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/product/products/${id}`);
        setName(data.name);
        setCategory(data.categoryId);
        setSubCategory(data.sub_category);
        setSubCategory2(data.sub_category2);
        setSelectedUnit(data.unit);
        setStock(data.stock);
        setDiscount(data.discount);
        setDescription(data.description);
        setProdImg1(data.image[0]);
        setProdImg2(data.image[1]);
        setProdImg3(data.image[2]);
        setProdImg4(data.image[3]);

        setItems(data.type.map((t, i) => ({
        type: t,
        price: data.price[i],
        discountedPrice: data.discountedPrice[i] || 0
        })));

        setBrands(data.details.map((d, i) => ({
        type: d,
        description: data.details_type[i]
        })));

        // find index to pre-select category
        const catIndex = catagoryData.findIndex(c => c.name === data.categoryId);
        setChange(catIndex);

        const subCatIndex = catagoryData[catIndex]?.subCategory?.findIndex(s => s.name === data.sub_category);
        setChange2(subCatIndex);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load product data');
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()
            if (prodImg1 && typeof prodImg1 !== 'string') {
              formData.append('image1', prodImg1);
            }
            if (prodImg2 && typeof prodImg2 !== 'string') {
              formData.append('image2', prodImg2);
            }
            if (prodImg3 && typeof prodImg3 !== 'string') {
              formData.append('image3', prodImg3);
            }
            if (prodImg4 && typeof prodImg4 !== 'string') {
              formData.append('image4', prodImg4);
            }
            formData.append('name', name)
            formData.append('categoryId', category)
            formData.append('sub_category', subCategory)
            formData.append('sub_category2', subCategory2)
            formData.append('unit', selectedUnit)
            // formData.append('type', items.map(item => item.type))
            formData.append('stock', stock)
            // formData.append('price', items.map(item => Number(item.price))),
            formData.append('discount', Number(discount))
            formData.append('description', description)
            // formData.append('details', brands.map(item => item.type))
            // formData.append('details_type', brands.map(item => item.description))
            items.forEach(item => {
            formData.append('type', item.type);
            formData.append('price', Number(item.price));
            formData.append('discountedPrice', Number(item.discountedPrice));
            })
            brands.forEach(item => {
            formData.append('details', item.type);
            formData.append('details_type', item.description);
            })
            // consol log
            formData.forEach((value,key)=>{
                console.log(`${key}:${value}`)
            })
            const {data}= await axios.post(`http://localhost:8000/api/product/product-edit/${id}`,formData)
            
            if(data.success){
                toast.success(data.message)
            } else{
                toast.error(data.message)
            }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white'>
      <form onSubmit={handleSubmit} className='m-5 w-full px-6'>
              <p className='mb-3 text-lg font-medium'>Edit Product</p>
              <div className='bg-white px-8 py-8 border rounded w-full max-h-[80vh] overflow-y-scroll scroll-hide'>
                  <div>
                      <p className='pb-1'>Upload product images</p>
                      <div className='flex gap-2'>
                          <label htmlFor="image1">
                              <img className='w-17 h-17' src={prodImg1 ? (typeof prodImg1 === 'string' ? prodImg1 : URL.createObjectURL(prodImg1)) : upload_area} alt="" />
                              <input onChange={(e)=>setProdImg1(e.target.files[0])} type="file" id='image1' hidden />
                          </label>
                          <label htmlFor="image2">
                              <img className='w-17 h-17' src={prodImg2 ? (typeof prodImg2 === 'string' ? prodImg2 : URL.createObjectURL(prodImg2)) : upload_area} alt="" />
                              <input onChange={(e)=>setProdImg2(e.target.files[0])} type="file" id='image2' hidden />
                          </label>
                          <label htmlFor="image3"> 
                              <img className='w-17 h-17' src={prodImg3 ? (typeof prodImg3 === 'string' ? prodImg3 : URL.createObjectURL(prodImg3)) : upload_area} alt="" />
                              <input onChange={(e)=>setProdImg3(e.target.files[0])} type="file" id='image3' hidden />
                          </label>
                          <label htmlFor="image4">
                              <img className='w-17 h-17' src={prodImg4 ? (typeof prodImg4 === 'string' ? prodImg4 : URL.createObjectURL(prodImg4)) : upload_area} alt="" />
                              <input onChange={(e)=>setProdImg4(e.target.files[0])} type="file" id='image4' hidden />
                          </label>
                      </div>
                  </div>
                  <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                      <div className='w-full lg:flex-1 flex flex-col gap-4'>
                      <div className='flex-1 flex flex-col gap-1'>
                          <p>Product name</p>
                          <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                      </div>
                      <p>Choose category</p>
                      <div className='flex w-full flex-wrap gap-x-4 gap-y-1 border-1 rounded-md border-gray-300 px-2 py-2'>
                          {
                              catagoryData.map((item, index)=>(
                                  <div onClick={()=>categoryChoose(index)} key={index} className={`flex items-center justify-center flex-col text-sm cursor-pointer`}>
                                      <img src={item.img} className={`rounded-full w-20 ${category === item.name ? 'border-2 border-red-700' : ""}`} alt="" />
                                      <p>{item.name}</p>
                                  </div>
                              ))
                          }
                      </div>
                      <p>Choose Sub - category</p>
                      <div className='flex w-full flex-wrap gap-x-4 gap-y-1 border-1 rounded-md border-gray-300 px-2 py-2'>
                          {
                              catagoryData[change].subCategory.map((item, index)=>(
                                  <div onClick={()=>subcategoryChoose(item.name, index)} key={index} className={`flex items-center justify-center flex-col text-sm cursor-pointer`}>
                                      <img src={item.img} className={`rounded-full w-20 ${subCategory === item.name ? 'border-2 border-red-700' : ""}`} alt="" />
                                      <p>{item.name}</p>
      
                                  </div>
                              ))
                          }
                      </div>
                      <p>Choose Sub - category -2</p>
                      <div className='flex w-full flex-wrap gap-x-4 gap-y-1 border-1 rounded-md border-gray-300 px-2 py-2'>
                      {
                          catagoryData[change]?.subCategory[change2]?.subCatagory2?.map((item, index)=>(
                              <div onClick={()=>setSubCategory2(item.name)} key={index} className={`flex items-center justify-center flex-col text-sm cursor-pointer`}>
                                      <img src={item.img} className={`rounded-full w-20 ${subCategory2 === item.name ? 'border-2 border-red-700' : ""}`} alt="" />
                                      <p>{item.name}</p>
                                  </div>
                          ))
                      }
                      </div>
                      <p>Select Unit</p>
                      <div className='flex gap-x-2'>
                          <div onClick={() => setSelectedUnit('size')} className='flex items-center justify-center flex-col'>
                          <input
                            type="radio"
                            checked={selectedUnit === 'size'}
                            className="w-5 h-5 rounded-full text-blue-600 accent-blue-600"
                          /><p>Size</p>
                          </div>
                          <div onClick={() => setSelectedUnit('liter')} className='flex items-center justify-center flex-col'>
                          <input
                            type="radio"
                            checked={selectedUnit === 'liter'}
                            className="w-5 h-5 rounded-full text-blue-600 accent-blue-600"
                          /><p>Liter</p>
                          </div>
                          <div onClick={() => setSelectedUnit('kilos')} className='flex items-center justify-center flex-col'>
                          <input
                            type="radio"
                            checked={selectedUnit === 'kilos'}
                            className="w-5 h-5 rounded-full text-blue-600 accent-blue-600"
                          /><p>Kilos</p>
                          </div>
                          <div onClick={() => setSelectedUnit('inch')} className='flex items-center justify-center flex-col'>
                          <input
                            type="radio"
                            checked={selectedUnit === 'inch'}
                            className="w-5 h-5 rounded-full text-blue-600 accent-blue-600"
                          /><p>Inch</p>
                          </div>
                          <div onClick={() => setSelectedUnit('foot')} className='flex items-center justify-center flex-col'>
                          <input
                            type="radio"
                            checked={selectedUnit === 'foot'}
                            className="w-5 h-5 rounded-full text-blue-600 accent-blue-600"
                          /><p>Foot</p>
                          </div>
                          <div onClick={() => setSelectedUnit('ton')} className='flex items-center justify-center flex-col'>
                          <input
                            type="radio"
                            checked={selectedUnit === 'ton'}
                            className="w-5 h-5 rounded-full text-blue-600 accent-blue-600"
                          /><p>Ton</p>
                          </div>
                          
                      </div>
                      <div className='flex-1 flex flex-col gap-1'>
                          <p>Product Discount</p>
                          <input onChange={(e)=>setDiscount(e.target.value)} value={discount} className='border rounded px-3 py-2' type="number" placeholder='Discount of product' required />
                      </div>
                      <p>Type and Price</p>
                      <div>
                          {items.map((item, index) => (
                          <div key={index} className="flex gap-4 items-center mb-3">
                          <input
                              type="text"
                              placeholder={unitPlaceholders[selectedUnit]}
                              value={item.type}
                              onChange={(e) => handleChange(index, 'type', e.target.value)}
                              className="w-1/2 p-2 border border-gray-300 rounded"
                          />
                          <input
                              type="number"
                              placeholder="Original Price (e.g., 200)"
                              value={item.price}
                              onChange={(e) => handleChange(index, 'price', e.target.value)}
                              className="w-1/2 p-2 border border-gray-300 rounded"
                          />
                          <input
                              type='number'
                              value={item.discountedPrice}
                              placeholder='Discounted Price'
                              readOnly
                              className='border p-2 rounded w-1/3 bg-gray-100 text-gray-700 font-semibold'
                              />
                          <button
                              type="button"
                              onClick={() => handleDelete(index)}
                              className="text-red-500 hover:text-red-700 font-semibold"
                          >
                              Delete
                          </button>
                          </div>
                      ))}
                          <button
                              type="button"
                              onClick={handleAdd}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              >
                              Add More
                          </button>
                      </div>
                     
                      <div className='flex-1 flex flex-col gap-1'>
                          <p>Stock Product</p>
                          <input onChange={(e)=>setStock(e.target.value)} value={stock} className='border rounded px-3 py-2' type="number" placeholder='Enter nmber of stock product' required />
                      </div>
      
                      </div>
                  
                  <div className='w-full lg:flex-1 flex flex-col gap-4'>
                      <p>Brand And Description</p>
                      {brands.map((item, index) => (
                          <div key={index} className="flex gap-4 items-center mb-3">
                          <input
                              type="text"
                              placeholder='Brand, Color ...etc'
                              value={item.type}
                              onChange={(e) => handleChangeBrand(index, 'type', e.target.value)}
                              className="w-1/2 p-2 border border-gray-300 rounded"
                          />
                          <input
                              type="text"
                              placeholder="Bajaj, red ...etc"
                              value={item.description}
                              onChange={(e) => handleChangeBrand(index, 'description', e.target.value)}
                              className="w-1/2 p-2 border border-gray-300 rounded"
                          />
                          <button
                              type="button"
                              onClick={() => handleDeleteBrand(index)}
                              className="text-red-500 hover:text-red-700 font-semibold"
                          >
                              Delete
                          </button>
                          </div>
                          ))}
                          <button
                              type="button"
                              onClick={handleAddBrand}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              >
                              Add More
                          </button>
                          
                  </div>
                  </div>
                  <div>
                      <div>
                          <p className='mt-4 mb-2'>Product Description</p>
                          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full px-4 pt-2 border rounded' type='text' placeholder='write about product' rows={7} required></textarea>
                      </div>
                      {/* {
                          loading ? 
                          <div className={`bg-blue-400 px-10 py-3 mt-4 text-white rounded-full ${loading ? "cursor-no-drop" : ""}`}><ImSpinner3 className='mx-3 animate-spin duration-75'/></div>
                          
                          : */}
                          <button className='bg-blue-500 px-10 py-3 mt-4 text-white rounded-full' type='submit'>Add Product</button>
      
                      {/* } */}
                  </div>
              </div>
              
          </form>
    </div>
  )
}

export default ProductEditPage
