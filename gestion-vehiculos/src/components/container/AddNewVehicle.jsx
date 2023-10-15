import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/addVehicle.css';

const addCarSVG = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="add__car--svg">
    <path d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const AddNewVehicle = ({ categories, shops, onSave }) => {
  const [addCarIsOpened, setAddCarIsOpened] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    brand: '',
    category: '',
    categoryLabel: '',
    hash: '',
    model: '',
    price: '',
    shop: '',
  });
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (newVehicle.category) {
      setNewVehicle(prevVehicle => {
        let categoryLabel = newVehicle.category;
        // Realiza ajustes según sea necesario
        if (categoryLabel === 'suvs') {
          categoryLabel = 'SUVs';
        } else if (categoryLabel === 'offroad') {
          categoryLabel = 'Off Road';
        } else if (categoryLabel === 'sportsclassics') {
          categoryLabel = 'Sports Classics';
        }
        return { ...prevVehicle, categoryLabel };
      });
    }
  }, [newVehicle.category, newVehicle]);

  const handleSave = () => {
    onSave(newVehicle);
    setNewVehicle({
      name: '',
      brand: '',
      category: '',
      categoryLabel: '',
      hash: '',
      model: '',
      price: '',
      shop: '',
    });
    setImageSrc(null);
    setAddCarIsOpened(false);
  };

  const handleHashChange = (e) => {
    const hashValue = e.target.value;
    setNewVehicle({ ...newVehicle, hash: hashValue });

    // Construct the image source URL based on the hash input
    const imageSource = hashValue ? `./img/${hashValue}.jpg` : null;
    setImageSrc(imageSource);
  };

  return (
    <div>
      <button className="add__vehicle--btn" onClick={() => setAddCarIsOpened(!addCarIsOpened)} title='Añadir vehículo'>
        {addCarSVG}
      </button>
      {addCarIsOpened && (
        <div className="add__vehicle--container">
          <form>
            <div className="image__container">
              {imageSrc && (
                <img src={imageSrc} alt="Vehicle Image" />
              )}
            </div>
            <div className="input__container">
              <label>
                <span>Name:</span>
                <input
                  type="text"
                  name="name"
                  value={newVehicle.name}
                  onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                />
              </label>
            </div>
            <div className="input__container">
              <label>
                <span>Brand:</span>
                <input
                  type="text"
                  name="brand"
                  value={newVehicle.brand}
                  onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                />
              </label>
            </div>
            <div className="input__container">
              <label>
                <span>Category:</span>
                <select
                  name="category"
                  value={newVehicle.category}
                  onChange={(e) => setNewVehicle({ ...newVehicle, category: e.target.value })}
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
                  value={newVehicle.categoryLabel}
                  onChange={(e) => setNewVehicle({ ...newVehicle, categoryLabel: e.target.value })}
                />
              </label>
            </div>
            <div className="input__container">
              <label>
                <span>Hash:</span>
                <input
                  type="text"
                  name="hash"
                  value={newVehicle.hash}
                  onChange={handleHashChange}
                />
              </label>
            </div>
            <div className="input__container">
              <label>
                <span>Model:</span>
                <input
                  type="text"
                  name="model"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                />
              </label>
            </div>
            <div className="input__container">
              <label>
                <span>Price:</span>
                <input
                  type="number"
                  name="price"
                  value={newVehicle.price}
                  onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })}
                />
              </label>
            </div>
            <div className="input__container">
              <label>
                <span>Shop:</span>
                <select
                  name="shop"
                  value={newVehicle.shop}
                  onChange={(e) => setNewVehicle({ ...newVehicle, shop: e.target.value })}
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
              <button type="button" onClick={handleSave}>
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewVehicle({
                    name: '',
                    brand: '',
                    category: '',
                    categoryLabel: '',
                    hash: '',
                    model: '',
                    price: '',
                    shop: '',
                  });
                  setImageSrc(null);
                  setAddCarIsOpened(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

AddNewVehicle.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  shops: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSave: PropTypes.func.isRequired,
};
