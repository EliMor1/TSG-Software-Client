import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICountry } from '../../common/interfaces/Country.interface';
import { countryValidationSchema } from '../../common/validators/Country.ValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInputs } from '../../common/interfaces/Country.interface';
import { CountryService } from '../../services/CountryService.service';
import '../CountryDetails/CountryDetails.css';
import { Navigations } from '../../common/enums/navigations';
import { AxiosErrorCodes } from '../../common/enums/AxiosErrorCodes.enum';



const CountryDetails: React.FC = () => {
  const { name } = useParams<{ name: string}>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<ICountry | null>(null);

  const { register, handleSubmit, formState: { errors }, reset  } = useForm<IFormInputs>({
    resolver: yupResolver(countryValidationSchema),
    defaultValues: {
      capital: country?.capital || '',
      population: country?.population || 0,
    },
  });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCountry = async () => {
    try {
      const response = await  CountryService.getInstance().getCountry(`${name}`)
      if(typeof response !== 'string' && response.data){
          setCountry(response.data);
          reset({
            capital: response.data?.capital,
            population: response.data?.population,
          })
      }
      if(typeof response === 'string') alert(`error: ${response}`);
    } catch (error) {
      alert(AxiosErrorCodes.GENERAL_ERROR_GET_COUNTRY_BY_NAME);
    }
  };

  useEffect(()=>{
    getCountry();
  },[])



  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (country) {
      const updatedCountry = { ...country, ...data };
      setCountry(updatedCountry);
      try{
        const response = await CountryService.getInstance().updateCountry(`${name}`, updatedCountry)
        if(!response){ // upon success (not error)
          navigate(Navigations.OVERVIEW);
        }
      }
      catch(e){
        console.error(AxiosErrorCodes.GENERAL_ERROR_UPDATE_COUNTRY);
      }
    }
  };

  if (!country) return <div>Loading...</div>; // use loader instead of this tsx

  return (
    <div className="container">
      <h1 className="country-header">{country.name}</h1>
      <div className="country-details">
        <img src={country.flagUrl} alt={`${country.name} flag`} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>
              Capital
              <input
                type="text"
                {...register('capital')}
              />
              {errors.capital && <span className="error-message">{errors.capital.message}</span>}
            </label>
          </div>
          <div>
            <label>
              Population
              <input
                type="number"
                {...register('population')}
              />
              {errors.population && <span className="error-message">{errors.population.message}</span>}
            </label>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CountryDetails;
