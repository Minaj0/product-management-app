import React from 'react'

export const ProductAction = () => {
  return (
      <div>
          <label htmlFor="my_modal_6" className="btn btn-outline hover:text-sec font-script">Add Product</label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
              <div className="modal-box ">
                  <h3 className="text-lg font-bold">Add Product!</h3>
                  <input type="text" />
                  <div className="modal-action">
                      <label htmlFor="my_modal_6" className="btn">Close!</label>
                  </div>
              </div>
          </div>
    </div>
  )
}
