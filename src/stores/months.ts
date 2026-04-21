import { defineStore } from 'pinia';
import jsonMonthlyData from '../data/monthsData.json';

interface Item {
    id: number;
    month: string;
    year: number;
    sessions: number;
}

export const useMonthlyStore = defineStore('monthlyStore', {
    state: () => ({
        itemsMonthly: [] as Item [],
    }),
    actions: {
        loadMonths() {
           this.itemsMonthly = [];
           this.itemsMonthly = jsonMonthlyData;
           console.log(this.itemsMonthly);
    },
  },
});
