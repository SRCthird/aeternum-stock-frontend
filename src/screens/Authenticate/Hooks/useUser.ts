import { useEffect, useState } from "react";
import { CanceledError } from 'axios';
import { api } from "../Login";

export type User = {
  id: number;
  email: string;
  password: string;
  role: string;
  firstName?: string;
  lastName?: string;
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
  email?: string;
}

const useUser = ({ id, email }: Props) => {
  const [users, setUsers] = useState<User[]>([{
    id: 0,
    email: '',
    password: '',
    role: '',
    createdAt: '',
    updatedAt: ''
  }]);
  const [user, setUser] = useState<User>({
    id: 0,
    email: '',
    password: '',
    role: '',
    createdAt: '',
    updatedAt: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === 0) return;
    if (email === "") return;
    const controller = new AbortController();
    const endpoint = id ? `/api/user/${id}` :
      email ? `/api/user/?email=${email}` :
        '/api/user/';
    setLoading(true);
    api.get(endpoint)
      .then(res => {
        if (id) setUser(res.data);
        if (email) setUser(res.data[0]);
        setUsers(res.data);
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
