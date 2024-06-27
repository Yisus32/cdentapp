const url = 'http://127.0.0.1:5000/'

export default async function getPayments() {
  const response= await fetch(url + 'payments');
  return await response.json();
}

export async function postPayment(data) {
  const response = await fetch(url + 'payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function putPayment(data, id) {
  const response = await fetch(url + `payment/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
