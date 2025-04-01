import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import SearchBar from '../components/SearchBar';
import { FaPencilAlt } from 'react-icons/fa';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // Fetch product list
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Open edit modal with product data
  const updateProduct = (product) => {
    setEditingProduct(product);
    setUpdatedData({ ...product, sizes: product.sizes || [] });
  };

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle size selection
  const toggleSize = (size) => {
    setUpdatedData((prev) => {
      const updatedSizes = prev.sizes?.includes(size)
        ? prev.sizes.filter((s) => s !== size)  // Remove if already selected
        : [...(prev.sizes || []), size];        // Add if not selected

      return { ...prev, sizes: updatedSizes };
    });
  };

  // Save updated product
  const saveUpdatedProduct = async () => {
    try {
      const response = await axios.put(
        backendUrl + '/api/product/update',
        {
          ...updatedData,
          sizes: updatedData.sizes || [],  // Ensure sizes is an array, not a string
          id: updatedData._id,  // Ensure the correct ID is included
        },
        { headers: { token } }
      );
  
      if (response.data.success) {
        toast.success('Product updated successfully!');
        setEditingProduct(null);
        await fetchList();
      } else if (response.data.message === 'Product not found') {
        toast.error('Product not found!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Filter products based on search input
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SearchBar onSearch={setSearch} />

      <p className='mb-2'>All Products List</p>

      <div className='flex flex-col gap-2'>
        {/* Table Headers */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Description</b>
          <b>Size</b>
          <b>Price</b>
          <b>Best Seller</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {filteredList.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
            key={index}
          >
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.description}</p>
            <p>{item.sizes.join(', ')}</p>
            <p>{currency}{item.price}</p>
            <p>{item.bestSeller ? 'Yes' : 'No'}</p>
            <div className='flex justify-center items-center gap-2'>
              <FaPencilAlt className='cursor-pointer text-blue-500' onClick={() => updateProduct(item)} />
              <p onClick={() => removeProduct(item._id)} className='cursor-pointer text-lg text-red-500'>X</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={updatedData.name || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2 mb-2">Category:</label>
            <input
              type="text"
              name="category"
              value={updatedData.category || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2 mb-2">Description:</label>
            <textarea
              name="description"
              value={updatedData.description || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            ></textarea>

            <label className="block mt-2 mb-2">Sizes:</label>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1 border rounded ${updatedData.sizes?.includes(size) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {size}
                </button>
              ))}
            </div>

            <label className="block mt-2 mb-2">Price:</label>
            <input
              type="number"
              name="price"
              value={updatedData.price || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-400 px-4 py-2 rounded mr-2"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={saveUpdatedProduct}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
