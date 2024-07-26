import axios, { AxiosInstance } from 'axios';

function useAxios(): AxiosInstance {
	const headers = {
		"X-App-Version": "0.1",
		"Accept-Language": "en" // TODO: Make this value dynamic based on the user's selected locale
	};
	
	const axiosInstance = axios.create({
		headers: headers,
		baseURL: process.env.EXPO_PUBLIC_API_URL,
		withCredentials: true,
	});

  return axiosInstance
}

export default useAxios;
