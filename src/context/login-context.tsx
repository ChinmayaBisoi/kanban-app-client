import * as React from "react";

interface LoginState {
  isLoggedIn: boolean;
  email: string | null;
  userId: string | null;
}

type Action =
  | { type: "update-user-info"; userData?: Partial<LoginState> }
  | { type: "login"; email: string; userId: string }
  | { type: "logout" };

const LoginStateContext = React.createContext<LoginState | undefined>(
  undefined
);
const LoginStateDispatchContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);

const initialState: LoginState = {
  isLoggedIn: false,
  email: null,
  userId: null,
};

function loginStateReducer(state: LoginState, action: Action): LoginState {
  switch (action.type) {
    case "update-user-info":
      const userInfo = { ...(action?.userData || {}) };
      return { ...state, isLoggedIn: true, ...userInfo };
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        email: action.email,
        userId: action.userId,
      };
    case "logout":
      return { ...state, isLoggedIn: false, email: null, userId: null };
    default:
      return state;
  }
}

function LoginStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(loginStateReducer, {
    ...initialState,
  });

  return (
    <LoginStateContext.Provider value={state}>
      <LoginStateDispatchContext.Provider value={dispatch}>
        {children}
      </LoginStateDispatchContext.Provider>
    </LoginStateContext.Provider>
  );
}

function useLoginState(): LoginState {
  const context = React.useContext(LoginStateContext);
  if (context === undefined) {
    throw new Error("useLoginState must be used within a LoginStateProvider");
  }
  return context;
}

function useLoginStateDispatch(): React.Dispatch<Action> {
  const context = React.useContext(LoginStateDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useLoginStateDispatch must be used within a LoginStateProvider"
    );
  }
  return context;
}

export { LoginStateProvider, useLoginState, useLoginStateDispatch };
