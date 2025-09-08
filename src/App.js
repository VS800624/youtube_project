import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import Head from './components/Head';
import store from './utils/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WatchPage from './components/WatchPage';
import MainContainer from './components/MainContainer';

const appRouter = createBrowserRouter([
  {
  path: "/",
  element: <Body/>,
  children: [
    {
      path: "/",
      element: <MainContainer/>
    },
    {
      path: "/watch",
      element: <WatchPage/>
    }
  ],
},
])

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Head/>
        <RouterProvider router={appRouter}/>
  {/* 
    * Head
    * Body 
    * Sidebar
    *   - Menu Items
    * Main Container
    *   - ButtonsList
    *   - VideoContainer
    *   - VideoCard
    *
    *
  */}

      </div>
    </Provider>
  );
}

export default App;


// our app will behave according to the appRouter wherever we give our <RouterProvider router={appRouter}/> it will render it there so, if our path is "/" our <Body/> will be rendered below the <Head/> and these children will go wherever our outlet is and we create our outlet in the body after <Sidebar/> 