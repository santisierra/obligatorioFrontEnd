import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";


const ContadorNuevoPlan = () => {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const userLogged = useSelector((store) => store.userSlice.userLogged);

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
    <div className='container-fluid' style={{ backgroundColor: '#f0f0f0', padding: '20px', border: '2px solid #ccc', borderRadius: '10px'  }}>
    <div className='row'>
      <div className='col-auto mx-auto'>
        <h2 className="text-center">PLAN ALIMENTICIO ACTUAL</h2>
        <h1 className="text-center">{userLogged.caloriasDiarias}</h1>
        <h3 className="text-center" style={{ marginBottom: "40px"}}>CALORIAS DIARIAS</h3>
        <p className="text-center">Quedan {daysRemaining} días hasta el 31 de marzo de 2024.</p>
      </div>
    </div>
  </div>
      
  );
};

export default ContadorNuevoPlan;