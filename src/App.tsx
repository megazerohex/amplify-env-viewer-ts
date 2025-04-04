import React, { useState } from "react";
import { fetchSigned } from "./aws-signed-fetch";
import "./App.css";

const App: React.FC = () => {
  const [message, setMessage] = useState("");
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const start = Date.now();
    setLoading(true);
    try {
      const res = await fetchSigned();
      const data = await res.text();
      setMessage(data);
    } catch (e) {
      console.error(e);
      setMessage("This did NOT work");
    } finally {
      setLoading(false);
      setTimeTaken(Date.now() - start);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Call IAM-Protected API</h1>
      <button onClick={handleClick}>Call Lambda</button>
      {timeTaken !== null && <p>Time taken: {timeTaken}ms</p>}
      <p>Response: {message}</p>

      {loading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}
    </div>
  );
};

export default App;
