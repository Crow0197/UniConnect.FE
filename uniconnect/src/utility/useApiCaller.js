import { useState, useEffect } from 'react';
import axios from 'axios';

// Importa il tuo file JSON direttamente nel tuo hook
import jsonData from './data/data.json'; // Assicurati di specificare il percorso corretto

function useApiCaller(apiKey, requestType = 'GET', authToken = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    try {
      // Utilizza il contenuto del file JSON in base alla chiave (API Key) passata
      const apiUrl = jsonData[apiKey];

      if (!apiUrl) {
        throw new Error('API Key non valida');
      }

      // Configura Axios con il token di autenticazione Bearer, se fornito
      const axiosConfig = {
        method: requestType,
        headers: {},
      };

      if (authToken) {
        axiosConfig.headers['Authorization'] = `Bearer ${authToken}`;
      }

      // Simula una richiesta API utilizzando Axios in base al tipo di richiesta specificato
      axios(apiUrl, axiosConfig)
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [apiKey, requestType, authToken]);

  return { data, isLoading, error };
}

export default useApiCaller;
