import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProfile } from "../../helpers/GetProfile";
import { Global } from "../../helpers/Global";
import { UserList } from "../user/UserList";

export const Following = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  const params = useParams();

  useEffect(() => {
    getUser(1);
    GetProfile(params.userId, setUserProfile);
  }, []);

  const getUser = async (nextPage = 1) => {
    //Efecto de carga
    setLoading(true);
    //Sacar el userid de la URL
    const userId = params.userId;
    //Peticion para sacar usuarios
    const request = await fetch(
      `${Global.url}follow/following/${userId}/${nextPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = await request.json();
    let cleanUsers = [];
    //Recorrer y limpiar follows para quedarme con followed
    data.follows.forEach((follow) => {
      cleanUsers = [...cleanUsers, follow.followed];
    });
    data.users = cleanUsers;
    //Crear estado para poder listarlos
    if (data.users && data.status == "success") {
      let newUsers = data.users;
      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }
      setUsers(newUsers);
      setFollowing(data.user_following);
      setLoading(false);
    }
    //Paginacion
    if (users.length >= data.total - data.users.length) {
      setMore(false);
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">
          Usuarios que sigue: {userProfile.name} {userProfile.surname}
        </h1>
      </header>
      <UserList
        users={users}
        getUsers={getUser}
        following={following}
        setFollowing={setFollowing}
        page={page}
        setPage={setPage}
        more={more}
        loading={loading}
      />
      <br />
    </>
  );
};