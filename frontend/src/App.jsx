import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navigation from './components/Navigation';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Footer from './components/Footer';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Navigation />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/about' element={<About />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/profile' element={<Profile />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
