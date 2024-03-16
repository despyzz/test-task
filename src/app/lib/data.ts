import {unstable_noStore as noStore} from 'next/cache';

export async function fetchOperators(limit?: number) {
  noStore()

  const limitUrl = limit !== undefined ? `?limit=${limit}` : '';
  return fetch('/api/operators' + limitUrl)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch operators data.');
      return response;
    })
    .catch(error => {
      throw error;
    });
}

export async function fetchOperator(id?: string) {
  noStore()

  return fetch(`/api/operators?id=${id}`)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch operator data.');
      return response;
    })
    .catch(error => {
      throw error;
    });
}

export async function sendData(data: any) {
  return fetch('/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to send data to server.');
      return response;
    })
    .catch(error => {
      throw error;
    });
}
