import axios from 'axios';

const setRequestHeaders = config => {
  const token = window.gapi.client && window.gapi.client.getToken().id_token;

  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

const personalOrganizer = axios.create({
  baseURL: 'http://localhost:9002'
});

personalOrganizer.interceptors.request.use(setRequestHeaders);

export default personalOrganizer;