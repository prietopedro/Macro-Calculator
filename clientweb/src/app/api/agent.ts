import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { IUser, IUserFormValues } from '../models/user';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, (error) => {
  const { status, data, config } = error.response;
  const history = useHistory();
  console.log('ERROR', error);
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error - make sure API is running!');
  }
  if (status === 404) {
    history.push('/NotFound');
  }
  if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/NotFound');
  }
  if (status === 500) {
    toast.error('Server error - check the terminal for more info!');
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(1000)).then(responseBody)
};

const User = {
  current: (): Promise<IUser> => requests.get('/users'),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post('/users/login', user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post('/users/login', user)
};

export default {
  User
};