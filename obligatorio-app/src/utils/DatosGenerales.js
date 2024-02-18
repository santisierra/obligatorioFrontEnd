const getFechaDesdeHoy =(dia)=>
{
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - dia);
    const diafecha = fecha.getDate().toString().padStart(2, '0');
    const mesfecha = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anofecha = fecha.getFullYear();
    const fechaFormatted = `${anofecha}-${mesfecha}-${diafecha}`;

    return fechaFormatted;
}


export { getFechaDesdeHoy };