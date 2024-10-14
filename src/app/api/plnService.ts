// src/app/api/plnService.ts
import axios from 'axios';

const LOCAL_API = '/api/plnProxy';

const checkPln = async (idpel: string) => {
  const response = await axios.post(LOCAL_API, {
    method: 'cek',
    uid: 'SP300203',
    pin: '085648',
    produk: 'PLNPASCH',
    idpel,
    ref1: '',
  });
  return response.data;
};

const payPln = async (idpel: string) => {
  const response = await axios.post(LOCAL_API, {
    method: 'bayar',
    uid: 'SP300203',
    pin: '085648',
    produk: 'PLNPASCH',
    idpel,
    ref1: '',
  });
  return response.data;
};

export { checkPln, payPln };
