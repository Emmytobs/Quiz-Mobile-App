import axios, { type AxiosInstance } from "axios";
import { useLocale } from "~/stores/locale";
import { useSession } from "~/stores/session";

function useAxios(): AxiosInstance {
  const locale = useLocale((state) => state.locale);
  const session = useSession((state) => state.session);

  const headers = {
    "X-App-Version": "0.1",
    "Accept-Language": locale,
    Authorization: `Bearer ${session?.access}`,
  };

  const axiosInstance = axios.create({
    headers: headers,
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: true,
  });

  return axiosInstance;
}

export default useAxios;
