import React from "react";

const App = () => {

  const handleClick = () => {
    console.log('I AM THE CLICK HANDLER.  WHY HAVE YOU DISTRUBED MY SLUMBER???');
  }

  return (
    <div>
      <h1>
        THIS IS THE RECIPE WISH LIST
      </h1>
      <button onClick={handleClick}>CLICK ME</button>
    </div>
  );

}

export default App;