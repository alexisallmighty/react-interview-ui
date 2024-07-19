import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export interface Widget {
  description: string;
  name: string;
  price: number;
}

const handleError = (error: any) => {
  if (error.response) {
    console.error('Error response:', error.response.data);
    console.error('Error status:', error.response.status);

    switch (error.response.status) {
      case 400:
        alert('Bad Request: ' + error.response.data);
        break;
      case 404:
        alert('Resource Not Found: ' + error.response.data);
        break;
      case 409:
        alert(error.response.data.detail);
        break;
      // Add other cases as needed
      default:
        alert('An error occurred: ' + error.response.data);
    }
  } else {
    console.error('Error message:', error.message);
    alert('Error: ' + error.message);
  }
};

export const fetchAllWidgets = (): Promise<Widget[]> =>
  axios.get(`${BASE_URL}/v1/widgets`).then((response) => response.data);

export const createWidget = (widget: Widget): Promise<Widget> =>
  axios
    .post(`${BASE_URL}/v1/widgets`, widget)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });

export const updateWidget = (widget: Widget): Promise<Widget> =>
  axios
    .put(`${BASE_URL}/v1/widgets`, widget)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });

export const deleteWidget = (name: string): Promise<void> =>
  axios
    .delete(`${BASE_URL}/v1/widgets/delete?name=${name}`)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });
