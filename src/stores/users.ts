import { defineStore } from 'pinia';
import jsonUsersData from '../data/usersData.json';

interface Item {
    id: number;
    name: string;
    email:string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    registrationDate: string;
    [key:string]: any;
}

export const useUsersStore = defineStore('usersStore', {
    state: () => ({
        itemsUsers: [] as Item[],
    }),
    actions: {
        loadUsers() {
            this.itemsUsers = jsonUsersData;
        },
    },
});

