import axios, { AxiosResponse } from 'axios';
import { JMV_URL, JMV_KEY, JMV_AUTHORIZATION } from '../config';

export interface JMVResponse {
  status: number;
  message: string;
  data: JMVGallery[];
}

export interface JMVGallery {
  id: number;
  name: string;
  description: string;
  updated_date?: Date;
  created_date: Date;
  videos: JMVVideo[];
}

export interface JMVVideo {
  hash: string;
  name: string;
  description?: string;
  tags?: string[];
  size: number;
  time: string;
  updated_date?: Date;
  created_date: Date;
  cover?: string;
  url: string;
  thumbnail: string;
  covers?: string[];
  player: string;
  playerSource: string;
}

const axiosInstance = axios.create({
  baseURL: JMV_URL,
  headers: {
    jmvkey: JMV_KEY,
    authorization: JMV_AUTHORIZATION,
  },
});

function get<T>(path: string, params = {}): Promise<AxiosResponse<T>> {
  return axiosInstance.get<T>(path, { params });
}

export function listGalleries(): Promise<JMVGallery[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await get<JMVResponse>('galleries/gktxJy5WSUjliGbKJz0xsb9HybNHVm');
      resolve(data.data);
    } catch (err) {
      reject(err);
    }
  });
}
