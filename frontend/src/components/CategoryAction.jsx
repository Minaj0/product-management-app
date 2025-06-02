import React, { useState } from 'react'
import axios from 'axios'

export const CategoryAction = () => {
  const [category, setCategory] = useState('');
  const [adding, setAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayToast = (message, type) => {
    setShowToast(true);
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setShowToast(false), 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      displayToast('Category name cannot be empty', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:3333/product/category', {
         category 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setCategory('');
      setAdding(true);
      displayToast(response.data.message || 'Category added successfully', 'success');
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to add category";
      displayToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <label htmlFor="my_modal_6" className="btn btn-outline hover:text-sec">Add Category</label>

      {showToast && (
        <div className={`toast toast-top toast-center ${toastType === 'success' ? 'alert-success' : 'alert-error'}`}>
          <div className={`alert ${toastType}`}>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-pri w-sm">
          <h3 className="text-lg font-bold flex justify-center mb-5">Add Category</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              required
              className='input w-full bg-transparent border-sec placeholder:text-sec'
              placeholder='Enter category name'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="modal-action flex justify-center">
              <button
                type="submit"
                className="btn btn-outline hover:text-sec"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add'}
              </button>
              <label htmlFor="my_modal_6" className="btn btn-outline hover:text-sec">
                Discard
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}