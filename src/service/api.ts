import { IFormInput } from './../interface/index';
import axios from "axios";


const instance = axios.create({
  baseURL: 'http://localhost:3004'
});

const api = {
  createGateway: (data: IFormInput) => instance.post('/gateway', data),
  updateGatewayById: (id: number | string, data: IFormInput) => instance.put(`/gateway/${id}`, data),
  getGateways: () => instance.get('/gateway'),
  getGatewayById: (id: number | string) => instance.get(`/gateway/${id}`),
  deleteGateway: (id: string | number) => instance.delete(`/gateway/${id}` )
}


export default api;