import { api } from "@src/screens/Authenticate/Login"
import { useEffect, useState } from "react"

export type Log = {
  id: number
  fromLocation: string
  toLocation: string
  dateTime: Date
  user: string
  lotNumber: string
  quantityMoved: number
  comments: string
}

type Props = {
  id?: number
  location?: string
  lotNumber?: string
  user?: string
}
const useLog = ({ id, location, lotNumber, user }: Props) => {
  const [logs, setLogs] = useState<Log[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (
      id === 0 ||
      location === "" ||
      lotNumber === "" ||
      user === ""
    ) return;
    let endpoint = `/api/log`
    if (id) endpoint += `/${id}`
    if (location || lotNumber || user) endpoint += `?`
    if (location) endpoint += `location=${location}&`
    if (lotNumber) endpoint += `lotNumber=${lotNumber}&`
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
