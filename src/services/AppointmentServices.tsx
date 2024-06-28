const url = 'http://127.0.0.1:5000/';

export async function getAppointments() {
  const response = await fetch(url + 'appointments');
  return await response.json();
}

export async function postAppointment(data) {
  const response = await fetch(url + 'appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function putAppointment(data, id) {
  const response = await fetch(url + `appointment/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function deleteAppointment(id) {
  const response = await fetch (url + `appointment/${id}`, {
    method : 'DELETE',
    headers:{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
    return await response.json();

}
