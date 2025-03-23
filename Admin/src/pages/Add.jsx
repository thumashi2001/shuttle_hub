import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Badminton Equipment');
  const [subCategory, setSubCategory] = useState('Rackets& Shuttlecocks');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation Checks
    if (!name.trim()) return toast.error("Product name is required!");
    if (!description.trim()) return toast.error("Description is required!");
    if (!price || isNaN(price) || price <= 0) return toast.error("Enter a valid price!");
    if (!image1 && !image2 && !image3 && !image4) return toast.error("At least one image is required!");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[{ state: image1, setState: setImage1, id: 'image1' },
            { state: image2, setState: setImage2, id: 'image2' },
            { state: image3, setState: setImage3, id: 'image3' },
            { state: image4, setState: setImage4, id: 'image4' }]
            .map(({ state, setState, id }) => (
              <label key={id} htmlFor={id}>
                <img className='w-20' src={!state ? assets.upload_area : URL.createObjectURL(state)} alt="" />
                <input onChange={(e) => setState(e.target.files[0])} type='file' id={id} hidden />
              </label>
            ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none'>
            <option value="Badminton Equipment">Badminton Equipment</option>
            <option value="Badminton Accessories">Badminton Accessories</option>
            <option value="Badminton Apparel">Badminton Apparel</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none'>
            <option value="Rackets& Shuttlecocks">Rackets& Shuttlecocks</option>
            <option value="Badminton Bags &Sports Wear">Badminton Bags &Sports Wear</option>
            <option value="Shoes">Shoes</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) setPrice(value);  // Only numbers & one decimal allowed
            }}
            value={price}
            className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none'
            type="text"
            placeholder='25'
            required
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {["S", "M", "L", "XL", "XXL"].map(size => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  );
}

export default Add;

