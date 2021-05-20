import { useEffect } from "react";
import { useParams } from "react-router";
import server from "../sockets/useServer";

export default function Confirmation() {
  const { token } = useParams<{ token: string }>();
  useEffect(() => {
    server.confirm(token).then(() => {
      window.open('/home', '_self', "");
    });

  }, [token])
  return null;
}