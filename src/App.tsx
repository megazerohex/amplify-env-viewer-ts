import React from 'react';

type EnvVar = {
  key: string;
  value: string | undefined;
};

const App: React.FC = () => {
  const envVars: EnvVar[] = [
    { key: 'REACT_APP_API_URL', value: process.env.REACT_APP_API_URL },
    { key: 'REACT_APP_REGION', value: process.env.REACT_APP_REGION },
    { key: 'REACT_APP_STAGE', value: process.env.REACT_APP_STAGE },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AWS Amplify Environment Variables</h1>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {envVars.map((env) => (
            <tr key={env.key}>
              <td>{env.key}</td>
              <td>{env.value || 'Not Defined'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
