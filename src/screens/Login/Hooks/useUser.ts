import { useEffect, useState } from "react";
import { CanceledError } from 'axios';
import { api } from "../Login";

/*
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   //@db.VarChar(64) //uncomment this line to use MySQL
  role      String   @default("Operator")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  profile   Profile?
}
*/

export type User = {
  id: number;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export type createUser = {
  id?: number;
  email: string;
  password: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

type Props = {
  id?: number;
}

const useUser = ({ id }: Props) => {
  const [users, setUsers] = useState<User[]>();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id === 0 ) return;
    const controller = new AbortController();
    const endpoint = id ? `/api/user/${id}` : '/api/user';
    setLoading(true);
    api.get(endpoint)
      .then(res => {
        if (id) setUser(res.data);
        else setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { users, user, error, loading };
}

export default useUser;
