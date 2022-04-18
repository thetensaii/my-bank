import React from "react";
import Routes from "routes";
import useAuth from "hooks/useAuth";
import "./App.css";

export const App: React.FC = () => {
  const loading = useAuth();

  return <>{loading ? null : <Routes />}</>;
};

export default App;
