import { createContext, useCallback, useState } from "react";


interface Props {
  children: JSX.Element
}

interface State {
  currentTheme: 'light' | 'dark'
}

type Context = State & {
  handleEditContext: <K extends keyof State, T extends State[K]>(key: K, value: T) => void
}


const initialState: State = { currentTheme: 'light' };
export const GlobalContext = createContext<Context>({ ...initialState, handleEditContext: () => { console.log('yoo') } });


function Store({ children }: Props) {
  const [state, setState] = useState<State>(initialState)
  const handleEditContext = useCallback(function <K extends keyof State, T extends State[K]>(key: K, value: T) {
    setState((prevState) => {
      return {
        ...prevState,
        [key]: value
      }
    })
  }, [])

  return (
    <GlobalContext.Provider value={{ ...state, handleEditContext }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Store;
