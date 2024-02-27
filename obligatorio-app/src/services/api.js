//Login logica POST
const login = (userName, password) => {
  return fetch("https://calcount.develotion.com/login.php", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      usuario: userName,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject({
          message: "Ha ocurrido un error",
        });
      }
    })
    .catch((e) =>
      Promise.reject({
        message: "Ha ocurrido un error",
      })
    );
};
const getPaises = () => {
  return fetch(`https://calcount.develotion.com/paises.php`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject({
          message: "Ha ocurrido un error",
        });
      }
    })
    .catch((e) =>
      Promise.reject({
        message: "Ha ocurrido un error",
      })
    );
};
const getUsuariosPorPais = (userId,apiKey) => {

  const headers = new Headers();
  headers.append("apikey", `${apiKey}`);
  headers.append("iduser", `${userId}`);

  return fetch(`https://calcount.develotion.com/usuariosPorPais.php`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject({
          message: "Ha ocurrido un error",
        });
      }
    })
    .catch((e) =>
      Promise.reject({
        message: "Ha ocurrido un error",
      })
    );
};
//Registro usuario logica POST
const registroUsuario = (userName, password, idPais, calorias) => {
  return fetch("https://calcount.develotion.com/usuarios.php", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      usuario: userName,
      password: password,
      idPais: parseInt(idPais),
      caloriasDiarias: parseInt(calorias)
    }),
  })
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        return response.json();
      } 
      else if (response.status === 409) 
      {
        return Promise.reject({
          message: "Ya existe ese usuario",
        });      
      } 
      else 
      {
        return Promise.reject({
          message: "Ha ocurrido un error",
        });
      }
    })
    .catch((e) =>
      Promise.reject({
        message: "Ha ocurrido un error",
      })
    );
};
const getRegistors = (userId,apiKey) => {

  const headers = new Headers();
  headers.append("apikey", `${apiKey}`);
  headers.append("iduser", `${userId}`);

  return fetch(`https://calcount.develotion.com/registros.php?idUsuario=${userId}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject({
          message: "Ha ocurrido un error",
        });
      }
    })
    .catch((e) =>
      Promise.reject({
        message: "Ha ocurrido un error",
      })
    );
};
//Registro usuario logica POST
const postAgregarAlimento = (idAlimento, idUsuario, cantidad, fecha,apiKey) => {
  
  const headers = new Headers();
  headers.append("apikey", `${apiKey}`);
  headers.append("iduser", `${idUsuario}`);
  headers.append("Content-type", "application/json");

  return fetch("https://calcount.develotion.com/registros.php", {
    method: "POST",
    headers:headers,
    body: JSON.stringify({
        idAlimento: idAlimento,
        idUsuario: idUsuario,
        cantidad: cantidad,
        fecha: fecha
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject({
          message: "Ha ocurrido un error",
        });
      }
    })
    .catch((e) =>
      Promise.reject({
        message: "Ha ocurrido un error",
      })
    );
};
const eliminarRegistro = (idRegistro,idUser, apiKey) => {
  const headers = new Headers();
  headers.append("apikey", apiKey);
  headers.append("iduser", idUser);
  return fetch(`https://calcount.develotion.com/registros.php?idRegistro=${idRegistro}`, {
    method: "DELETE",
    headers: headers,
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error al eliminar el registro");
    }
  })
  .catch((error) => {
    console.error('Hubo un problema con la solicitud:', error.message);
  });
};
const getAlimentos = (userId,apiKey) => {
  const headers = new Headers();
  headers.append("apikey", `${apiKey}`);
  headers.append("iduser", `${userId}`);
 
  return fetch(`https://calcount.develotion.com/alimentos.php`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject({
          message: "Ha ocurrido un error",
        });
      }
    })
    .catch((e) =>
      Promise.reject({
        message: "Ha ocurrido un error",
      })
    );
};



export {registroUsuario,
        login, 
        getPaises,
        getUsuariosPorPais,
        getRegistors,
        postAgregarAlimento,
        eliminarRegistro,
        getAlimentos,
      };
