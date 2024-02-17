import { useState, useEffect } from 'react';

const ContadorNuevoPlan = () => {
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    // Define la fecha objetivo (31 de marzo de 2024)
    const targetDate = new Date('2024-03-31');

    // Obtiene la fecha actual
    const currentDate = new Date();

    // Calcula la diferencia en milisegundos
    const differenceMs = targetDate - currentDate;

    // Convierte la diferencia de milisegundos a días
    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    // Actualiza el estado con los días restantes
    setDaysRemaining(days);
  }, []);

  return (
    <>
    <div>
    <h2>Plan Alimenticio</h2>
      <p>Quedan {daysRemaining} días hasta el 31 de marzo de 2024.</p>
    </div>
      
    </>
  );
};

export default ContadorNuevoPlan;