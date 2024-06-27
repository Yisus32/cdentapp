const url = 'http://127.0.0.1:5000/';

export async function getUsers() {
  const response = await fetch(url + 'users');
  return await response.json();
}

export async function postUser(data) {
  const response = await fetch(url + 'users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function editUser(data, id) {
  const response = await fetch(url + `user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function createMedicalHistory (data) {
  const response = await fetch(url + 'medicalhistory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}


export async function getMedicalHistoryById(id) {
  const response = await fetch(url + `medicalhistory/${id}`);
  return await response.json();
}

