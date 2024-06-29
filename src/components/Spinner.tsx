const Spinner = () => {
    return (
      <div
        style={{
          border: "2px solid #f3f3f3",
          borderTop: "2px solid #3498db",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          animation: "spin 2s linear infinite",
          margin: "0 auto",
        }}
      ></div>
    );
  };
  
  export default Spinner;
  