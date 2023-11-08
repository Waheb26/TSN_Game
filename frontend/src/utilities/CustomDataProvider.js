import { fetchUtils } from "react-admin";

const httpClient = fetchUtils.fetchJson;

const customDataProvider = {
  // Gestion des vidéos
  videos: {
    getList: (resource, params) => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/videos`;
      return httpClient(url, {
        method: "GET",
      }).then(({ json }) => ({
        data: json || [],
        total: json.length || 0,
      }));
    },
    create: (resource, params) => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/videos`;
      return httpClient(url, {
        method: "POST",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }));
    },
    update: (resource, params) => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/videos/${params.id}`;
      return httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    },
    delete: (resource, params) => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/videos/${params.id}`;
      return httpClient(url, {
        method: "DELETE",
      }).then(({ json }) => ({ data: json }));
    },
  },

  // Gestion des viewers
  viewers: {
    update: (resource, params) => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/viewers/${params.id}`;
      return httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    },
  },
};

export default customDataProvider;
