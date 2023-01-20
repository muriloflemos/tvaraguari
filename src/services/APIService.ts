import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../config';

export interface Programa {
  id: number;
  name: string;
  startTime?: string;
  endTime?: string;
  thumbnail: string;
}

export interface Video {
  thumbnail: string;
  name: string;
  hash: string;
  playerSource: string;
  covers: String[];
}

export interface Gravacao {
  name: string;
  videos: Video[];
  id: number;
  total_videos: number;
}

const axiosInstance = axios.create();

function get<T>(path: string, params = {}): Promise<AxiosResponse<T>> {
  return axiosInstance.get<T>(path, { params });
}

export interface APIResponse {
  programacao: Programa;
  gravados: Gravacao[];
}

export function getData(): Promise<APIResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await get<APIResponse>(API_URL);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
