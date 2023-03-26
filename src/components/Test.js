import { useState, useEffect } from 'react';

function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('../../data/listProcducts.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error(error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map(item => (
        <div >{item}</div>
      ))}
    </div>
  );
}

export default Test;