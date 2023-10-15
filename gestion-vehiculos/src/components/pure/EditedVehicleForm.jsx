import React, { useState } from 'react';
import { PropTypes } from "prop-types";


const deleteCarSVG = (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="deleteSVG">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

)
const EditVehicleForm = ({ vehicle, categories, shops, onSave, onCancel, onDelete }) => {
  const [editedVehicle, setEditedVehicle] = useState(vehicle);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVehicle({ ...editedVehicle, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    let categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
    if (category === 'suvs') {
      categoryLabel = 'SUVs';
    } else if (category === 'offroad') {
      categoryLabel = 'Off Road';
    } else if (category === 'sportsclassics') {
      categoryLabel = 'Sports Classics';
    }
    // setEditedVehicle({ ...editedVehicle, category, categoryLabel });
    setEditedVehicle({ ...editedVehicle, category, categoryLabel, shop: '' })
  };

  const handleSaveClick = () => {
    onSave(editedVehicle);
  };

  const handleDelete = () => {
    if (confirm('¿Seguro que deseas eliminar el vehículo?')) onDelete(vehicle);
  };

  return (
    <div className='vehicle__card--editing'>
      <img className='new__car--img' src={`./img/${editedVehicle.hash}.jpg`} alt={`imagen del vehículo ${editedVehicle.name}`} />
      <form>
        <div className="input__container">
          <label>
            <span>Name:</span>
            <input
              type="text"
              name="name"
              value={editedVehicle.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="input__container">
          <label>
            <span>Brand:</span>
            <input
              type="text"
              name="brand"
              value={editedVehicle.brand}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="input__container">
          <label>
            <span>Category:</span>
            <select
              name="category"
              value={editedVehicle.category}
              onChange={handleCategoryChange} 
            >
              <option value="">Select Category</option>
              {categories.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
          </label>
        </div>
        <div className="input__container">
          <label>
            <span>Cat. label:</span>
            <input
              type="text"
              name="categoryLabel"
              value={editedVehicle.categoryLabel}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="input__container">
          <label>
            <span>Hash:</span>
            <input
              type="text"
              name="hash"
              value={editedVehicle.hash}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="input__container">
          <label>
            <span>Model:</span>
            <input
              type="text"
              name="model"
              value={editedVehicle.model}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="input__container">
          <label>
            <span>Price:</span>
            <input
              type="number"
              name="price"
              value={editedVehicle.price}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="input__container">
          <label>
            <span>Shop:</span>
            <select
              name="shop"
              value={editedVehicle.shop}
              onChange={handleInputChange}
            >
              <option value="">Select Shop</option>
              {shops.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
          </label>
        </div>
        <div className="btns__container">
          <button type="button" onClick={handleSaveClick} title='Guardar cambios'>
            Save
          </button>
          <button type="button" onClick={onCancel} title='Cancelar edición'>
            Cancel
          </button>
          <div id='delete-btn' className='delete__car--btn' type="button" onClick={handleDelete} title='Borrar vehículo'>
            {deleteCarSVG}
          </div>
        </div>
      </form>
    </div>
  );
};

EditVehicleForm.propTypes = {
  vehicle: PropTypes.shape({
  name: PropTypes.string.isRequired}).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,  
  onDelete: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  shops: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditVehicleForm;
