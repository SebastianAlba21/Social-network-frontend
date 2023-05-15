import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";
import { SerializeForm } from "../../helpers/SerializeForm";

export const Config = () => {
  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not_saved");
  const updatedUser = async (e) => {
    e.preventDefault();
    //Token de autenticacion
    const token = localStorage.getItem("token");
    //Recoger datos del formulario
    let newDataUser = SerializeForm(e.target);
    //Borrar propiedades innesesarias
    delete newDataUser.file0;
    //Actualizar usuario en la base de datos
    const request = await fetch(`${Global.url}user/update`, {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    if (data.status == "success" && data.user) {
      delete data.user.password;
      setAuth(data.user);
      setSaved("saved");
    } else {
      setSaved("error");
    }
    //Subida de imagenes
    const fileInput = document.querySelector("#file");
    if (data.status == "success" && fileInput.files[0]) {
      //Recoger imagen a subir
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);
      //Peticion para enviar el fichero al backend
      const uploadRequest = await fetch(`${Global.url}user/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      });
      const uploadData = await uploadRequest.json();
      if (uploadData.status == "success" && data.user) {
        delete uploadData.user.password;
        setAuth(uploadData.user);
        setSaved("saved");
      } else {
        setSaved("error");
      }
    }
  };
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Settings</h1>
      </header>
      <div className="content__posts">
        {saved == "saved" ? (
          <strong className="alert alert-success">
            Usuario actualizado de manera correcta
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-danger">
            El usuario no pudo ser actualizado, intentelo de nuevo
          </strong>
        ) : (
          ""
        )}
        <form className="config-form" onSubmit={updatedUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" defaultValue={auth.name} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" name="surname" defaultValue={auth.surname} />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nickname</label>
            <input type="text" name="nick" defaultValue={auth.nick} />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Biografía</label>
            <textarea name="bio" defaultValue={auth.bio} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" defaultValue={auth.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="file0">Avatar</label>
            <div className="general-info__container-avatar">
              {auth.image != "default.png" && (
                <img
                  src={`${Global.url}user/avatar/${auth.image}`}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
              {auth.image == "default.png" && (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>
            <br />
            <input type="file" name="file0" id="file" />
          </div>
          <br />
          <input type="submit" value="Actualizar" className="btn btn-success" />
        </form>
        <br />
      </div>
    </>
  );
};
