import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICountry } from '../../common/interfaces/Country.interface';
import '../CountriesOverview/CountriesOverview.css';
import { CountryService } from '../../services/CountryService.service';
import { AxiosErrorCodes } from '../../common/enums/AxiosErrorCodes.enum';



const CountriesOverview: React.FC = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);

  const getAllCountries = async () => {
    try {
      const response = await  CountryService.getInstance().getAllCountries();
      if(typeof response !== 'string' && response.data){
          setCountries(response.data);
      }
      if(typeof response === 'string') alert(`error: ${response}`);
    } catch (error) {
      alert(AxiosErrorCodes.GENERAL_ERROR_GET_ALL_COUNTRIES);
    }
  };

  useEffect(()=>{
    getAllCountries();
  },[])

  return (
    <div className="container">
      <h1>Countries Overview</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Sub-Region</th>
            <th>Population</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(country => (
            <tr key={country.name}>
              <td>{country.name}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
              <td>{country.subRegion}</td>
              <td>{country.population}</td>
              <td>
                <Link to={`/country/${country.name}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountriesOverview;
