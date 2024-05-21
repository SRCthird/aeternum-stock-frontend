import { api } from "@src/screens/Authenticate/Login"
import { useEffect, useState } from "react"

export type Log = {
  id: number
  from_location: string
  to_location: string
  date_time: Date
  user: string
  lot_number: string
  quantity_moved: number
  comments: string
}

type Props = {
  id?: number
  location?: string
  lot_number?: string
  user?: string
}
const useLog = ({ id, location, lot_number, user }: Props) => {
  const [logs, setLogs] = useState<Log[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (
      id === 0 ||
      location === "" ||
      lot_number === "" ||
      user === ""
    ) return;
    let endpoint = `/api/log`
    if (id) endpoint += `/${id}`
    if (location || lot_number || user) endpoint += `?`
    if (location) endpoint += `location=${location}&`
    if (lot_number) endpoint += `lot_number=${lot_number}&`
    if (user) endpoint += `user=${user}&`
    const controller = new AbortController();
    api.get<Log[]>(endpoint, { signal: controller.signal })
      .then(res => {
        setLogs(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
    return () => controller.abort()
  }, [])

  return { logs, error, loading }
}

export default useLog;
