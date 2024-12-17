import React from "react";
// Context provider
import { ContextProvider } from "./context/AuthContext.jsx";
import Router from './router.jsx'
function App() {

  return (
    <>
      <ContextProvider>
        <Router/>
      </ContextProvider>
    </>
  );
}

export default App;
