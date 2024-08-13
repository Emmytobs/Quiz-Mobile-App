import axios, { type AxiosInstance } from 'axios';
import { useLocale } from '~/stores/locale';

function useAxios(): AxiosInstance {
	const locale = useLocale((state) => state.locale)
	const headers = {
		"X-App-Version": "0.1",
		"Accept-Language": locale
	};
	
	const axiosInstance = axios.create({
		headers: headers,
		baseURL: process.env.EXPO_PUBLIC_API_URL,
		withCredentials: true,
	});

  return axiosInstance
}

export default useAxios;
