import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "./UserList";

export const People = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUser(1);
  }, []);
  const getUser = async (nextPage = 1) => {
    //Peticion para sacar usuarios
    const request = await fetch(`${Global.url}user/list/${nextPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    //Crear estado para poder listarlos
    if (data.users && data.status == "success") {
      let newUsers = data.users;
      setUsers(newUsers);
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
        <h1 className="content__title">Gente</h1>
      </header>
      <UserList
        users={users}
        setUsers={setUsers}
        following={following}
        setFollowing={setFollowing}
        more={more}
        setMore={setMore}
        loading={loading}
        setLoading={setLoading}
        page={page}
        setPage={setPage}
      />
    </>
  );
};
