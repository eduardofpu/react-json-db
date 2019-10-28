import React, {lazy,Suspense} from "react";
// import Home from "../../page/home/Home";

const Home = lazy(() => import(`@page/home/Home`));

export default () => {
  return (
    
    <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  </div>
  );
};