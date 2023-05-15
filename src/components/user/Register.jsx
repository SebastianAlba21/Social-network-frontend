import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const saveUser = async (e) => {
    //Prevenir el compormatiento default de el formulario
    e.preventDefault();
    //Recogemos los datos del usuario
    let newUser = form;
    //Guardar el usuario en el backend
    const request = await fetch(`${Global.url}user/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    console.log(data);

    if (data.status == "success") {
      setSaved("saved");
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Register</h1>
      </header>
      <div className="content__posts">
        {saved == "saved" ? (
          <strong className="alert alert-success">
            Usuario registrado de manera correcta
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-danger">
            El usuario no pudo ser registrado, intentelo de nuevo
          </strong>
        ) : (
          ""
        )}
        <form className="register-form" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" name="surname" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nickname</label>
            <input type="text" name="nick" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <input type="submit" value="Registrate" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
