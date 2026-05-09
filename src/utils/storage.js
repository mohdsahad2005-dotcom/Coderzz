// Mock Storage implementation for MVP
// Only runs on client side

const isClient = typeof window !== 'undefined';

export const saveUser = (user) => {
  if (!isClient) return;
  localStorage.setItem('agro_sathi_user', JSON.stringify(user));
}

export const getUser = () => {
  if (!isClient) return null;
  const data = localStorage.getItem('agro_sathi_user');
  return data ? JSON.parse(data) : null;
}

export const saveEquipments = (equipments) => {
  if (!isClient) return;
  localStorage.setItem('agro_sathi_equip', JSON.stringify(equipments));
}

export const getEquipments = () => {
  if (!isClient) return [];
  const data = localStorage.getItem('agro_sathi_equip');
  return data ? JSON.parse(data) : [
    { id: 1, name: 'Tractor (Mahindra 575)', type: 'tractor', price: 500, location: 'Belagavi, 5km away', image: '/images/tractor.png', status: 'available', owner: 'Ramesh' },
    { id: 2, name: 'Harvester', type: 'harvester', price: 1500, location: 'Dharwad, 12km away', image: '/images/harvester.png', status: 'available', owner: 'Suresh' }
  ];
}

export const addEquipment = (equipment) => {
  const all = getEquipments();
  all.push({ ...equipment, id: Date.now() });
  saveEquipments(all);
}

export const saveBookings = (bookings) => {
    if (!isClient) return;
    localStorage.setItem('agro_sathi_bookings', JSON.stringify(bookings));
}

export const getBookings = () => {
    if (!isClient) return [];
    const data = localStorage.getItem('agro_sathi_bookings');
    return data ? JSON.parse(data) : [];
}

export const addBooking = (booking) => {
    const all = getBookings();
    all.push({ ...booking, id: Date.now(), date: new Date().toISOString() });
    saveBookings(all);
}
