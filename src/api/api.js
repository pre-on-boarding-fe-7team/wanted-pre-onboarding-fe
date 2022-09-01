import getMessage from '../common/utils/getMessage';

const baseUrl = String(process.env.REACT_APP_SERVER_URL);

const get = async endpoint => {
  const url = baseUrl + endpoint;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const result = await res.json();

  if (result.statusCode >= 400) {
    alert(result.message);
    throw new Error(result.error);
  }

  return result;
};

const post = async (endpoint, data) => {
  const url = baseUrl + endpoint;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (result.statusCode >= 400) {
    alert(result.message);
    throw new Error(result.error);
  }

  return result;
};

const put = async (endpoint, data) => {
  const url = baseUrl + endpoint;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (result.statusCode >= 400) {
    alert(result.message);
    throw new Error(result.error);
  }

  return result;
};

const del = async endpoint => {
  const url = baseUrl + endpoint;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!res.ok) {
    alert(getMessage('REQUEST_FAILED'));
    throw new Error(getMessage('ERROR', res.status.toString()));
  }
};

export { post, get, put, del as delete };
