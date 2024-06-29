import axios from 'axios';
import * as ApiServiceEnums from "../common/enums/apiService";
import { ICountry } from '../common/interfaces/Country.interface';

export class CountryService {
    private static instance: CountryService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CountryService();
        }
        return this.instance;
    }

    async getCountry(name: string): Promise<string | {data:ICountry}> {
        try {
            const response = await axios.get(
                ApiServiceEnums.ApiService.SERVER_ENDPOINT_ORIGIN +
                ApiServiceEnums.ApiService.COUNTRIES + `/${name}`
            );
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    return error.response.data.message || 'An error occurred';
                } else if (error.request) {
                    // Request was made but no response was received
                    return 'No response received from server';
                } else {
                    // Something happened in setting up the request
                    return error.message;
                }
            }
            return 'An unexpected error occurred';
        }
    }

    async getAllCountries():Promise<string | {data:ICountry[]}>{
        try {
            const response = await axios.get(
                ApiServiceEnums.ApiService.SERVER_ENDPOINT_ORIGIN +
                ApiServiceEnums.ApiService.COUNTRIES
            );
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    return error.response.data.message || 'An error occurred';
                } else if (error.request) {
                    // Request was made but no response was received
                    return 'No response received from server';
                } else {
                    // Something happened in setting up the request
                    return error.message;
                }
            }
            return 'An unexpected error occurred';
        }
    }

    async updateCountry(name:string, updatedCountry:ICountry):Promise<any>{
        try {
            await axios.put(
                ApiServiceEnums.ApiService.SERVER_ENDPOINT_ORIGIN +
                ApiServiceEnums.ApiService.COUNTRIES + `/${name}`,
                updatedCountry
            );
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return error.response.data.message || 'An error occurred';
                } else if (error.request) {
                    return 'No response received from server';
                } else {
                    return error.message;
                }
            }
            return 'An unexpected error occurred';
        }
    }

   
}
