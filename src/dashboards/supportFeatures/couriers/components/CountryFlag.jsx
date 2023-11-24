import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryFlag = ({ countryName }) => {
  const [flagUrl, setFlagUrl] = useState('');
  
  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        const countryData = response.data[0];
        const flag = countryData.flags.png; // Get the flag URL from the API response
        setFlagUrl(flag);
      } catch (error) {
        console.error('Error fetching country information:', error);
        setFlagUrl(''); // Clear flag URL in case of an error
      }
    };

    fetchCountryInfo();
  }, [countryName]);

  return (
    <div>
      {flagUrl ? (
        <img src={flagUrl} alt={`Flag of ${countryName}`} className='h-5 w-5 rounded-full' />
      ) : (
        ''
      )}
    </div>
  );
};

export default CountryFlag;
