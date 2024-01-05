import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from "./routes/Home"
import Login from './routes/Login'
import Register from './routes/Register'
import Main from './routes/sub/Main'
import User from './routes/sub/User'
import Game from './routes/sub/Game'
import Rental from './routes/sub/Rental'
import AddGame from './components/AddGame'
import GameList from './components/GameList'
import UpdateGame from './components/UpdateGame'
import UpdateUser from './components/UpdateUser'
import UpdateRental from './components/UpdateRental'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "home",
        element: <Main />,
      },
      {
        path: "home/user",
        element: <User />,
      },
      {
        path: "home/addgame",
        element: <AddGame />,
      },
      {
        path: "home/gamelist",
        element: <GameList />,
      },
      {
        path: "home/update-game/:gameId",
        element: <UpdateGame />,
      },
      {
        path: "home/game",
        element: <Game />,
      },
      {
        path: "home/rental",
        element: <Rental />,
      },
      {
        path: "home/update-user/:userId",
        element: <UpdateUser />,
      },
      {
        path: "home/update-rental/:rentalId",
        element: <UpdateRental />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
