import { useState } from 'react';

function useLocalStorage(key, initialValue = null) {
  // Leggi il valore dal localStorage all'inizializzazione
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      // Analizza il valore come JSON se esiste, altrimenti restituisci l'iniziale
      if (item === "undefined") return initialValue;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Errore nella lettura del localStorage:', error);
      return initialValue;
    }
  });

  // Funzione per impostare un nuovo valore nel localStorage
  const setValue = (value) => {
    try {
      // Consentiamo ai valori di essere una funzione per supportare il valore iniziale dinamico
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salva il valore nel localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore));
      // Aggiorna lo stato locale
      setStoredValue(valueToStore);
    } catch (error) {
      console.error('Errore nella scrittura nel localStorage:', error);
    }
  };

  // Funzione per rimuovere un valore dal localStorage
  const removeValue = () => {
    try {
      // Rimuovi il valore dal localStorage
      localStorage.removeItem(key);
      // Aggiorna lo stato locale a null
      setStoredValue(null);
    } catch (error) {
      console.error('Errore nella rimozione dal localStorage:', error);
    }
  };

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
