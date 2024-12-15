// Define the shape of the PLN data
export interface MandatoryInterface {
	kodeproduk: string;
	tanggal: string;
	idpel1: string;
	nominal: string;
	admin:string;
	fee:string;
	total_bayar: string;
	keterangan: string;
	[key: string]: string; 
}
  
export const InitialMandatory: MandatoryInterface = {
	kodeproduk: '',
	tanggal: '',
	idpel1: '',
	nominal: '',
	admin: '',
	fee: '',
	total_bayar: '',
	keterangan: '',
};
  