import { useEffect, useState } from "react";
import { api } from "../Login";
import { CanceledError } from "axios";

/*
model Profile {
  id        Int     @id @default(autoincrement())
  firstName String
  lastName  String
  userId    Int     @unique
  user      User    @relation(fields: [userId], references: [id])
}
*/

export type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  userId: number;
}

type Props = {
  id?: number;
}

const useProfile = ({ id }: Props) => {
  const [profiles, setProfiles] = useState<Profile[]>();
  const [profile, setProfile] = useState<Profile>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id === 0 ) return;
    const controller = new AbortController();
    const endpoint = id ? `/api/profile/${id}` : '/api/profile';
    setLoading(true);
    api.get(endpoint)
      .then(res => {
        if (id) setProfile(res.data);
        else setProfiles(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { profiles, profile, error, loading };
}

export default useProfile;
