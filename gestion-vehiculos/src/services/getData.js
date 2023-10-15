export async function getVehicleData() {
  return fetch('./vehicleData.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud.');
      }
      return response.json();
    })
    .then(data => {
      if (data.vehicles) {
        const vehicles = data.vehicles;
        const categories = [...new Set(vehicles.map(vehicle => vehicle.category))];
        const shops = [...new Set(vehicles.map(vehicle => vehicle.shop))];
        return { vehicles, categories, shops };
      } else {
        throw new Error('El archivo JSON no tiene el formato esperado.');
      }
    })
    .catch(error => {
      throw new Error('Error al cargar el archivo JSON:', error);
    });
}
