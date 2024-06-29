export interface ICountry {
    name: string;
    capital: string;
    region: string;
    subRegion: string;
    population: number;
    timezone: string;
    continent: string;
    flagUrl: string;
  }
  
  export interface ICountryOverviewProps {
    countries: ICountry[];
  }
  
  export interface ICountryDetailsProps {
    country: ICountry;
  }

  export interface IFormInputs {
    capital: string;
    population: number;
  }
  