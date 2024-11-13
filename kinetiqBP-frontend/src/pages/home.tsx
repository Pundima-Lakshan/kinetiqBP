import { useEffect, useState } from 'react';

export const Home = () => {
  const [he] = useState();

  useEffect(() => {
    console.log(he);
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
