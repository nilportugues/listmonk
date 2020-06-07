import { ToastProgrammatic as Toast } from 'buefy';
import axios from 'axios';
import humps from 'humps';
import qs from 'qs';
import store from '../store';
import { models } from '../constants';

const http = axios.create({
  baseURL: 'http://localhost:9001',
  withCredentials: false,
  responseType: 'json',
  transformResponse: [
    // Apply the defaut transformations as well.
    ...axios.defaults.transformResponse,
    (resp) => {
      if (!resp) {
        return resp;
      }

      if ('message' in resp && resp.message !== '') {
        throw Error(resp.message);
      }

      const data = humps.camelizeKeys(resp.data);
      return data;
    },
  ],

  // Override the default serializer to switch params from becoming []id=a&[]id=b ...
  // in GET and DELETE requests to id=a&id=b.
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});


// Intercept requests to set the 'loading' state of a model.
http.interceptors.request.use((config) => {
  if ('loading' in config) {
    store.commit('setLoading', { model: config.loading, status: true });
  }
  return config;
}, (error) => Promise.reject(error));

// Intercept responses to set them to store.
http.interceptors.response.use((resp) => {
  // Clear the loading state for a model.
  if ('loading' in resp.config) {
    store.commit('setLoading', { model: resp.config.loading, status: false });
  }

  // Store the API response for a model.
  if ('store' in resp.config) {
    store.commit('setModelResponse', { model: resp.config.store, data: resp.data });
  }

  return resp;
}, (error) => {
  Toast.open({
    message: error,
    type: 'is-danger',
    queue: false,
  });
  return Promise.reject(error);
});

// API calls accept the following config keys.
// loading: modelName (set's the loading status in the global store: eg: store.loading.lists = true)
// store: modelName (set's the API response in the global store. eg: store.lists: { ... } )

// Lists.
export const getLists = () => http.get('/api/lists',
  { loading: models.lists, store: models.lists });

export const createList = (data) => http.post('/api/lists', data,
  { loading: models.lists });

export const updateList = (data) => http.put(`/api/lists/${data.id}`, data,
  { loading: models.lists });

export const deleteList = (id) => http.delete(`/api/lists/${id}`,
  { loading: models.lists });

// Subscribers.
export const getSubscribers = async (params) => http.get('/api/subscribers',
  { params, loading: models.subscribers, store: models.subscribers });

export const createSubscriber = (data) => http.post('/api/subscribers', data,
  { loading: models.subscribers });

export const updateSubscriber = (data) => http.put(`/api/subscribers/${data.id}`, data,
  { loading: models.subscribers });

export const deleteSubscriber = (id) => http.delete(`/api/subscribers/${id}`,
  { loading: models.subscribers });

export const blacklistSubscribers = (data) => http.put('/api/subscribers/blacklist', data,
  { loading: models.subscribers });

export const blacklistSubscribersByQuery = (data) => http.put('/api/subscribers/query/blacklist', data,
  { loading: models.subscribers });

export const deleteSubscribers = (params) => http.delete('/api/subscribers',
  { params, loading: models.subscribers });

export const deleteSubscribersByQuery = (data) => http.post('/api/subscribers/query/delete', data,
  { loading: models.subscribers });
