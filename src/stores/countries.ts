import { defineStore } from 'pinia';
import jsonData from '../data/countryData.json';

interface Item {
    id: number;
    country: string;
    sessions: number;
}

export const useCountryStore = defineStore('countryStore', {
    state: () => ({
        itemsCountries: [] as Item[],
    }),
    actions: {
        loadItems() {
            this.itemsCountries = jsonData;
        },
    },
});

