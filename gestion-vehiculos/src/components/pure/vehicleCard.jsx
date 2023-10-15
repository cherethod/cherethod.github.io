import React from 'react';
import PropTypes from 'prop-types';

export default function VehicleCard(props) {
  return (
    <div className='vehicle__card'>
      <img src={`./img/${props.hash}.jpg`} alt={`imagen del vehículo ${props.name}`} loading='lazy' />
      <h3>Name: {props.name}</h3>
      <h3>Brand: {props.brand}</h3>
      <h3>Category: {props.category}</h3>
      <h3>Category label: {props.categoryLabel}</h3>
      <h3>Hash: {props.hash}</h3>
      <h3>Model: {props.model}</h3>
      <h3>Price: {props.price}€</h3>
      <h3>Shop: {props.shop}</h3>
      <button className='card__edit--btn' onClick={props.onEdit} title='Editar vehículo'>Edit</button>
    </div>
  );
}

VehicleCard.propTypes = {
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  shop: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired, // Propiedad para manejar la edición
};
