import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MySubgreddit from './pages/MySubgreddit';
import ProfilePage from './pages/ProfilePage';
import Followers from './pages/Followers';
import Following from './pages/Following';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
);