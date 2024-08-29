import { React, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import MainLayOut from './Components/MainLayOut/MainLayOut';
import Login from './Components/Login/Login';
import MessageChat from './Components/Chat/MessageChat';
import Home from './Components/Home/Home';
import Profile from './Components/Home/profile';
import io from "socket.io-client"; // Corrected import statement
import { useSelector, useDispatch } from 'react-redux';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/chatSlice';
import { setLikeNotification } from './redux/rtnSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayOut />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/message-chat',
        element: <MessageChat />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      }
    ],
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

const App = () => {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen to all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <RouterProvider router={router}>
      <div className="App" />
    </RouterProvider>
  );
};

export default App;
