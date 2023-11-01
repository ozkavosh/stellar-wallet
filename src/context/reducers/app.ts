export const APP_INITIAL_STATE: IAppState = {
  isLoading: false,
};

export const appReducer = (state: IAppState, action: IAppAction): IAppState => {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};
