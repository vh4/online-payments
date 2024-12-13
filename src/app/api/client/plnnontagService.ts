import axios from 'axios';

export const checkPlnNonTag = async (idpel: string) => {
  const response = await axios.post('/api/', {
    method: 'cek',
    uid: 'SP300203',
    pin: '085648',
    produk: 'PLNNON',
    idpel,
    ref1: '',
  });

  return response.data;
};

export const payPlnNonTa = async (idpel: string) => {
  const response = await axios.post('/api/', {
    method: 'bayar',
    uid: 'SP300203',
    pin: '085648',
    produk: 'PLNNON',
    idpel,
    ref1: '',
  });

  return response.data;
};
