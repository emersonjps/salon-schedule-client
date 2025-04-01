import axios from 'axios';

const apiUrl = `${process.env.API_URL}/auth`;

type AuthData = {
  email: string;
  password: string;
}

type RegisterData = AuthData & {
  name: string;
  role: string;
}

export const login = async(data: AuthData) => {
  const response = await axios.post(`${apiUrl}/login`, data);
  return response.data;
};

export const register = async(data: RegisterData) => {
  const response = await axios.post(`${apiUrl}/register`, data);
  return response.data;
};
