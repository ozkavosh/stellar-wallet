import { useContext, createContext, useReducer } from "react";
import { APP_INITIAL_STATE, appReducer } from "./reducers/app";

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useAppContext must be used within an AppContextProvider");

  return context;
};

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [appState, dispatch] = useReducer(appReducer, APP_INITIAL_STATE);

  const toggleLoading = () => {
    dispatch({ type: "TOGGLE_LOADING" });
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        dispatch,
        toggleLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};