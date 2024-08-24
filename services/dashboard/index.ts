import type { AxiosError, AxiosInstance } from "axios";
import APIRoutes from "./routes";

export async function getActivities(axiosInstance: AxiosInstance) {
  try {
    const result = await axiosInstance.get(APIRoutes.GetActivities);
    return result.data;
  } catch (error: unknown) {
    throw new Error((error as AxiosError).message);
  }
}

export async function getStudyTips(axiosInstance: AxiosInstance) {
  try {
    const result = await axiosInstance.get(APIRoutes.GetStudyTips);
    return result.data;
  } catch (error: unknown) {
    throw new Error((error as AxiosError).message);
  }
}
