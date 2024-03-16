import { useLoaderData } from 'react-router-dom';

function App() {
  const { data } = useLoaderData() as any;

  console.log(data, 'data');

  return (
    <>
      <div onClick={() => alert('hello')}>Hello Alert</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export default App;
