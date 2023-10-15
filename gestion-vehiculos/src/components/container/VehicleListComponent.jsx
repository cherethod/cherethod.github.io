  import React, { useEffect, useState } from 'react';

  import { getVehicleData } from "../../services/getData";
  import VehicleCard from "../pure/vehicleCard"; 
  import EditVehicleForm from '../pure/EditedVehicleForm';
  import OptionInput from '../pure/optionInput';
  import { SettingsContainer } from './settingsContainer';
  import '../../styles/cards.css';
  import { AddNewVehicle } from './AddNewVehicle';
  import SaveDataButton from '../pure/SaveDataButton';
  import ImportDataButton from '../pure/ImportDataButton';
  export default function VehicleList() {
    const [vehicles, setVehicles] = useState([]);
    const [filter, setFilter] = useState({
      category: 'all',
      shop: 'all',
    });
    const [categories, setCategories] = useState([]); 
    const [shops, setShops] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [editingVehicle, setEditingVehicle] = useState(null);    

    useEffect(() => {
      const storedCategories = localStorage.getItem('categories');
      if (!storedCategories) {
        getVehicleData()
          .then(data => {
            const categoriesData = data.categories || []; // Asegura que sea un Array
            if (Array.isArray(categoriesData)) {
              // Actualiza el estado y almacena las categorias en localStorage
              setCategories(categoriesData); 
              localStorage.setItem('categories', JSON.stringify(categoriesData)); 
            } else {
              console.error('El formato de las categorías en los datos no es válido.');
            }
          })
          .catch(error => console.error('Error al cargar las categorías:', error)); 
      } else {
        const parsedCategories = JSON.parse(storedCategories);
        if (Array.isArray(parsedCategories)) {
          setCategories(parsedCategories); 
        } else {
          console.error('El formato de las categorías en localStorage no es válido.');
        }
      }
    }, []); 

    useEffect(() => {
      const storedShops = localStorage.getItem('shops');
      if (!storedShops) {
        getVehicleData()
          .then(data => {
            console.log(data);
            const shopsData = data.shops || []; // Asegura que sea un Array
            if (Array.isArray(shopsData)) {
              // Actualiza el estado y almacena las categorias en localStorage
              setShops(shopsData);
              localStorage.setItem('shops', JSON.stringify(shopsData)); 
            } else {
              console.error('El formato de las categorías en los datos no es válido.');
            }
          })
          .catch(error => console.error('Error al cargar las categorías:', error)); 
      } else {
        const parsedShops = JSON.parse(storedShops);
        if (Array.isArray(parsedShops)) {
          setShops(parsedShops);
        } else {
          console.error('El formato de las categorías en localStorage no es válido.');
        }
      }
    }, []); 
    
    useEffect(() => {
      getVehicleData()
        .then(data => {
          setVehicles(data.vehicles);
        })
    }, []);

      const filteredVehicles = vehicles
      .filter((vehicle) => {
        const isCategoryMatch = filter.category === 'all' || vehicle.category === filter.category;
        const isShopMatch = filter.shop === 'all' || vehicle.shop === filter.shop;
        return isCategoryMatch && isShopMatch;
      })
      .filter((vehicle) => {
        if (!searchTerm) {
          return true;
        }
        const searchFields = [vehicle.name, vehicle.description, vehicle.hash].filter(Boolean); // Filtra las propiedades indefinidas
        const searchTermLowerCase = searchTerm.toLowerCase();
        return searchFields.some((field) => field?.toLowerCase().includes(searchTermLowerCase));
      });

    const updateCategories = (newCategories) => {
      setCategories(newCategories);
    };

    const updateShops = (newShops) => {
      setShops(newShops);
    };

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSaveVehicle = (index, editedVehicle) => {
      const updatedVehicles = [...vehicles];
      updatedVehicles[index] = editedVehicle;
      setVehicles(updatedVehicles);
      setEditingVehicle(null);
    };

    const handleImportData = (importedData) => {
      setVehicles(importedData);
    };

    const handleAddVehicle = (newVehicle) => {
      const updatedVehicles = [...vehicles, newVehicle];
      setVehicles(updatedVehicles);
    };

    const handleDeleteVehicle = (vehicleToDelete) => {
      const updatedVehicles = vehicles.filter((vehicle) => vehicle !== vehicleToDelete);
      setVehicles(updatedVehicles);
    };

    return (
      <div>
        <div className='filter__container'>
          <select
            className='category__select filter__input'
            value={filter.category}
            onChange={e => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="all">Todas las categorías</option>
            {
              categories.map((category, index) => (
              <OptionInput key={index} value={category} text={category} />
              ))
            }
          </select>

          <select
            className='shop__select filter__input'
            value={filter.shop}
            onChange={e => setFilter({ ...filter, shop: e.target.value })}
          >
            <option value="all">Todas las tiendas</option>
            {
              shops.map((shop, index) => (
              <OptionInput key={index} value={shop} text={shop} />
              ))
            }
          </select>
          <SettingsContainer
            categories={categories}          
            updateCategories={updateCategories}
            shops={shops}
            updateShops={updateShops}
          />
          <input
            type="text"
            placeholder="Buscar vehículo"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search__input filter__input"
          />
        </div>
        <AddNewVehicle 
          categories={categories}
          shops={shops}
          onSave={handleAddVehicle}
        />
        <SaveDataButton vehicles={vehicles} />
        <ImportDataButton onImport={handleImportData} />
        <div className='vehicles__container'>
          {filteredVehicles.map((vehicle, index) => (
            <div key={index}>
              {editingVehicle === vehicle ? (
                <EditVehicleForm
                  vehicle={vehicle}
                  categories={categories}
                  shops={shops}
                  onSave={(editedVehicle) => handleSaveVehicle(index, editedVehicle)}
                  onDelete={handleDeleteVehicle} 
                  onCancel={() => setEditingVehicle(null)}
                />
              ) : (
                <VehicleCard
                  {...vehicle}
                  onEdit={() => setEditingVehicle(vehicle)}
                />
              )}
            </div>
          ))}
        </div>

      </div>
    );
  }
