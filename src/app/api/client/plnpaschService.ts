import axios from 'axios';

export const checkPlnPostpaid = async (idpel: string) => {
  const response = await axios.post('/api/', {
    method: 'cek',
    uid: 'SP300203',
    pin: '085648',
    produk: 'PLNPASCH',
    idpel,
    ref1: '',
  });

  return response.data;
};

export const payPlnPostpaid = async (idpel: string) => {
  const response = await axios.post('/api/', {
    method: 'bayar',
    uid: 'SP300203',
    pin: '085648',
    produk: 'PLNPASCH',
    idpel,
    ref1: '',
  });

  return response.data;
};
