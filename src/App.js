import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Routes';

function App() {
  
  return (
    <div data-theme="garden" className='max-w-screen-xl rounded-2xl	mx-auto'>
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
