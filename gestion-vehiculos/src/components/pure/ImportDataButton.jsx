import React from 'react';
import PropTypes from 'prop-types';
import { importData } from '../../services/importExportData';
import '../../styles/addVehicle.css';

const importDataSVG = (
  <svg
    className="import__data--svg"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    color="currentColor"
  >
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      d="M20 12H4M8 16V20M12 20V16M16 20V12M8 8V4M12 4V8M16 4V12"
    ></path>
  </svg>
);

export default function ImportDataButton({ onImport }) {
  const handleImportData = () => {
    importData((importedData) => {
      onImport(importedData);
    });
  };

  return (
    <button className="import__data--btn" onClick={handleImportData} title='Importar datos'>
      {importDataSVG}
    </button>
  );
}

ImportDataButton.propTypes = {
  onImport: PropTypes.func.isRequired,
};
