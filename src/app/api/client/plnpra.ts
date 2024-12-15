import axios from 'axios';

export const checkPlnPra = async (idpel: string, nominal:number) => {
  const response = await axios.post('/api/', {
    method: 'cek',
    uid: 'SP300203',
    pin: '085648',
    produk: 'PLNPRAH',
    nominal,
    idpel,
    ref1: '',
  });

  return response.data;
};

export const payPlnPra = async (idpel: string, nominal:number) => {
  const response = await axios.post('/api/', {
    method: 'bayar',
    uid: 'SP300203',
    pin: '085648',
    produk: 'PLNPRAH',
    nominal,
    idpel,
    ref1: '',
  });

  return response.data;
};
