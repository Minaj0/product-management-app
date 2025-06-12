import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export const SubcategoryAction = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  const displayToast = (message, type) => {
    setShowToast(true);
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setShowToast(false), 3000);
  }


  const dropdownRef = useRef();
  useEffect(() => {
    categories();
  }, []);

  const categories = async () => {
    try {
      const response = await axios.get('http://localhost:3333/product/categories');
      if (response.status === 200 || response.status === 201) {
        setCategoryList(response.data.categories);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSelect = (selected) => {
    setSelectedCategory(selected._id);
    setIsDropDownOpen(false);
    setShowToast(false)
  };

  const submitSubcategory = async (e) => {
    e.preventDefault();
    try {
      if (!selectedCategory) {
        displayToast("Please select a category", 'error');
        return;
      }
      if (!subcategoryName) {
        displayToast('Please enter a subcategory name');
        return;
      }

      const response = await axios.post('http://localhost:3333/product/subcategory', {
        category: selectedCategory,
        subCategory: subcategoryName
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setSelectedCategory('');
      setSubcategoryName('');
      document.getElementById('subcategory').checked = false;
      displayToast('Subcategory Added', 'success');

    } catch (error) {
      console.error("Error details", error.response?.data);
      if (error.response?.status === 400 || error.response?.status === 401) {
        displayToast(error.response.data.message || 'Invalid request', 'error');
      } else {
        displayToast('an error occurd', 'error')
      }
    }
  }

  return (
    <form onSubmit={submitSubcategory}>
      <label htmlFor="subcategory" className="btn btn-outline hover:text-sec">
        Add Subcategory
      </label>

      {showToast && (
        <div className={`toast toast-top toast-center ${toastType === 'success' ? 'alert-success' : 'alert-error'}`}>
          <div className={`alert ${toastType}`}>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <input type="checkbox" id="subcategory" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col gap-3 bg-pri">
          <h3 className="text-lg font-bold py-3 text-center">Add Subcategory</h3>

          {/* Custom Dropdown */}
          <div className="relative w-full" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropDownOpen(prev => !prev)}
              className="btn btn-outline w-full flex justify-between items-center"
            >
              {selectedCategory
                ? categoryList.find(cat => cat._id === selectedCategory)?.category
                : "Select Category"}
              <FaAngleDown className={`transition-transform duration-200 ${isDropDownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropDownOpen && (
              <ul className="absolute z-50 w-full bg-base-100 rounded-box shadow mt-1 max-h-40 overflow-y-auto">
                {categoryList.map(list => (
                  <li key={list._id}>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-base-200"
                      onClick={() => handleSelect(list)}
                    >
                      {list.category}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Subcategory Input */}
          <input
            type="text"
            className="input w-full bg-transparent border border-sec"
            placeholder="Enter subcategory name"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
          />

          <div className="modal-action justify-center">
            <button htmlFor="subcategory" type="submit" className="btn btn-outline" >ADD</button>
            <label htmlFor="subcategory" className="btn btn-outline">DISCARD</label>
          </div>
        </div>
      </div>
    </form>
  );
};
