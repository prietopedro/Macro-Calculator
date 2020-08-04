import axios, { AxiosResponse } from 'axios';
import { MealPreview, NutrientsQuery } from '../models/meals';
import { queries } from '@testing-library/react';
// import { toast } from 'react-toastify';
// import { history } from '../index';

const recipesAxios = () => {
  return axios.create({
    baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapid-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      useQueryString: true
    }
  });
};

const responseBody = (response: AxiosResponse) => response.data.results;

const requests = {
  get: (url: string) => recipesAxios().get(url).then(responseBody)
};

const availableQueries = new Set([
  'minCarbs',
  'minProtein',
  'maxProtein',
  'offset',
  'maxCalories',
  'maxCarbs',
  'minCalories',
  'minCarbs',
  'maxFat',
  'minFat'
]);
const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];

interface MealPreviewRes {
  id: number;
  image: string;
  title: string;
  nutrition: Nutrition[];
}

interface Nutrition {
  title: string;
  amount: number;
  unit: string;
}

const Recipes = {
  search: (queries: NutrientsQuery): Promise<MealPreviewRes[]> => {
    let url = `/recipes/complexSearch?offset=${queries.offset}&number=${24}`;
    Object.keys(queries).forEach((x) => {
      const value = _getKeyValue_(x)(queries);
      if (x !== 'offset' && availableQueries.has(x) && value) {
        url = url + `&${x}=${value}`;
      }
    });
    return requests.get(url);
  }
};

export default {
  Recipes
};