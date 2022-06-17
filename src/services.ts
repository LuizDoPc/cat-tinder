import {API_KEY, API_URL} from './constants';

export const voteService = async (imageId: string, value: number) => {
  const data = await fetch(`${API_URL}/votes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({
      image_id: imageId,
      value: value,
    }),
  }).then(res => res.json());

  return data;
};

export const getCats = async () => {
  const data: any[] = await fetch(`${API_URL}/breeds`, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(res => res.json());

  return data;
};
