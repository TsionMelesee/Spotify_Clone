const Loading = () => {
  const bubblingGStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50px",
    height: "10px",
  };

  const bubbleStyle = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#1db954",
    animation: "bubbling 1.4s infinite ease-in-out",
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <div style={bubblingGStyle}>
        <span style={{ ...bubbleStyle, animationDelay: "0s" }}></span>
        <span style={{ ...bubbleStyle, animationDelay: "0.2s" }}></span>
        <span style={{ ...bubbleStyle, animationDelay: "0.4s" }}></span>
      </div>
    </div>
  );
};

export default Loading;
