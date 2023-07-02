import React from "react";
import ClipLoader from "react-spinners/CircleLoader";

const Loading = () => {
  return (
    <ClipLoader
        color={'white'}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Loading