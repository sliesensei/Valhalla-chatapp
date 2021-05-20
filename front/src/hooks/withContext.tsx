import { FunctionComponent } from "react";
import Store from "../context/Store";

export default function withContext(Component: FunctionComponent) {
  return () => (
    <Store>
      <Component />
    </Store>
  )
}