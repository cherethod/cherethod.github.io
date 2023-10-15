import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { importData, exportData } from "../../services/importExportData";
import '../../styles/cfgSettings.css';

const SVGStyles = {
  color: '#fff',
  stroke: 'currentColor',
  strokeWidth: '1.5',
  width: '30px',
  height: '30px',
};

const pathStyles = {
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const settingsSVG = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={SVGStyles}>
    <path style={pathStyles} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"></path>
  </svg>
);

const deleteSVG = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="delete__icon">
    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
)

const cfgIconStylesOpened = {
  color: '#fff',
  position: 'fixed',
  top: '18px',
  right: '40px',
  backgroundColor: '#444',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50px',
  width: '50px',
  zIndex: '4',
};

const cfgIconStylesClosed = {
  color: '#fff',
  position: 'relative',
  top: '0',
  right: '0',
  backgroundColor: '#444',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50px',
  width: '50px',
  zIndex: '4',
};

export const SettingsContainer = ({ categories, updateCategories, shops, updateShops }) => {
  const [cfgIsOpened, setCfgIsOpened] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newShop, setNewShop] = useState('');

  const addCategory = () => {
    if (newCategory.trim() === '') {
      return; 
    }
  
    if (!categories.includes(newCategory)) {
      const newCategories = [...categories, newCategory];
      updateCategories(newCategories);
      setNewCategory('');
      localStorage.setItem('categories', JSON.stringify(newCategories));
    } else {
      alert('Esta categoría ya existe.');
    }
  };
  
  const addShop = () => {
    if (newShop.trim() === '') {
      return;
    }
  
    if (!shops.includes(newShop)) {
      const newShops = [...shops, newShop];
      updateShops(newShops);
      setNewShop('');
  
      localStorage.setItem('shops', JSON.stringify(newShops));
    } else {
      alert('Esta tienda ya existe.');
    }
  };
  
  const deleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    updateCategories(updatedCategories);
  
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };
  
  const deleteShop = (index) => {
    const updatedShops = [...shops];
    updatedShops.splice(index, 1);
    updateShops(updatedShops);
  
    localStorage.setItem('shops', JSON.stringify(updatedShops));
  };

  const handleExportData = () => {
    exportData({ categories, shops }, 'gestorVehiculosGTA_DB.json');
  };

  const handleImportData = () => {
    importData((importedData) => {
      const { categories: importedCategories, shops: importedShops } = importedData;
      updateCategories(importedCategories);
      updateShops(importedShops);
        
      localStorage.setItem('categories', JSON.stringify(importedCategories));
      localStorage.setItem('shops', JSON.stringify(importedShops));
    });
  };

  return (
    <div>
      <button className='cfg__btn' onClick={() => setCfgIsOpened(!cfgIsOpened)} style={(cfgIsOpened) ? cfgIconStylesOpened : cfgIconStylesClosed} title='Editar categorias y tiendas'>
        {settingsSVG}
      </button>
      {
        cfgIsOpened && (
          <div className='config__container'>
            <div className='config'>
              <h3>Config categories and shops</h3>
              <div className='config__inputs'>
                <div className="config__inputs--categories">
                  <div className="input__container">
                    <input
                      type="text"
                      className='categories__input--text input__item'
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={addCategory}>Añadir</button>
                  </div>
                  <div className="categories__container">
                    {categories.map((category, index) => (
                      <div className="category__item" key={index}>
                        <span className="category__name">{category}</span>
                        <div className="delete__category--btn" onClick={() => deleteCategory(index)}>                       
                          {deleteSVG}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="config__inputs--shops">
                  <div className="input__container">
                    <input
                      type="text"
                      className='categories__input--text input__item'
                      value={newShop}
                      onChange={(e) => setNewShop(e.target.value)}
                    />
                    <button onClick={addShop}>Añadir</button>
                  </div>
                  <div className="shops__container">
                    {shops.map((shop, index) => (
                      <div className="shop__item" key={index}>
                        <span className="shop__name">{shop}</span>
                        <div className="delete__shop--btn" onClick={() => deleteShop(index)}>
                          {deleteSVG}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="btns__container">
              <button onClick={handleImportData}>Import Data</button>
              <button onClick={handleExportData}>Export Data</button>
            </div>
          </div>
        )
      }
    </div>
  );
};

SettingsContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateCategories: PropTypes.func.isRequired,
  shops: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateShops: PropTypes.func.isRequired,
};