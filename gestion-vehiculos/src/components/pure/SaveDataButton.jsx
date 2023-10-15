import React from 'react'
import PropTypes from 'prop-types';
import { exportData } from '../../services/importExportData';
import '../../styles/addVehicle.css';
const saveDataSVG = (
  <svg className='save__data--svg' xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" color="currentColor">
    <path stroke="currentColor" strokeWidth="1.5" d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path>
    <path stroke="currentColor" strokeWidth="1.5" d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"></path>
  </svg>
)
export default function SaveDataButton({ vehicles }) {
  const handleSaveData = () => {
    exportData(vehicles, 'vehicles.json');
  };

  return (
    <button className='save__data--btn' onClick={handleSaveData} title='Exportar datos'>
      {saveDataSVG}
    </button>
  );
}

SaveDataButton.propTypes = {
  vehicles: PropTypes.array.isRequired, 
};
