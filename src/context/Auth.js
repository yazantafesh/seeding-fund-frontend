import { createContext, useState, React, useEffect } from "react";
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
import {NotificationManager} from 'react-notifications';

const API = process.env.REACT_APP_API;

export const AuthContext = createContext();

export default function Auth(props) {

	//Creation of new states

	const [user, setUser] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		role: '',
		projects: []
	});
	const [loggedIn, setLoggedIn] = useState(false);

	const [projectStatus, setProjectStatus] = useState({
		Accepted: 0,
		Declined: 0,
		Pending: 0
	});

	//Load the cookies and validate the token received on mounting

	useEffect(() => {
		const token = cookie.load('auth');
		validateToken(token);
	}, []);

	// decoding the token received and setting the new user state

	function validateToken(token) {
		try {
			const user = jwt.decode(token);
			if (user) setLoginState(true, token, user);
		} catch (error) {
			setLoginState(false, null, {});
			console.log(`Token Validation Error ${error.message}`);
		}
	}

	// saving the approved token to the cookies, then getting all user data and changing the user and loggedIn states

	async function setLoginState(loggedIn, token, user) {
		cookie.save('auth', token);
		let userData = await getProjects(user.email, token);
		setUser(userData);
		setLoggedIn(loggedIn);
	}

	// Clearing the cookie and the user and loggedIn states

	function setLogoutState(loggedIn, user) {
		cookie.save('auth', null);
		setUser(user);
		setLoggedIn(loggedIn);
	}

	// Sending the login request to the backend with the basic auth and notify if an error occurs

	async function login(email, password) {
		try {
			const response = await superagent
				.post(`${API}/sign/in`)
				.set('authorization', `Basic ${base64.encode(`${email}:${password}`)}`);
			validateToken(response.body.token);
		} catch (error) {
			NotificationManager.error('Incorrect Email or Password!');
		}
	}

	// Sending the signup request to the backend with the new user data and notify if an error occurs

	async function signup(email, password, firstName, lastName, role) {
		try {
			const response = await superagent.post(`${API}/sign/up`, {
				email,
				password,
				firstName,
				lastName,
				role,
				projects: []
			});

			validateToken(response.body.token);
		} catch (error) {
			console.error('Signup Error', error.message);
		}
	}

	// Loading the cookie and then sending the new project request to the backend with the new project data and bearer auth token 

	async function createProject(name, description, sector, requiredFunding, urgency) {
		try {
			const token = cookie.load('auth');
			const response = await superagent
				.post(`${API}/create`, {
					name: name,
					description: description,
					sector: sector,
					requiredFunding: requiredFunding,
					urgency: urgency,
					email: user.email
				})
				.set('authorization', `Bearer ${token}`);
			setUser(response.body)
		} catch (error) {
			console.error('Authorization Error', error.message);
		}
	}

	// Calling the logout function above

	function logout() {
		setLogoutState(false, {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			role: '',
			projects: []
		});
	}

	// Sending a read request to the backend with a bearer token

	async function getProjects(email, token) {
		const response = await superagent.get(`${API}/read?email=${email}`)
			.set('authorization', `Bearer ${token}`);

		setProjectStatus(response.body.projectStatus);
		return {
			email: response.body.email,
			firstName: response.body.firstName,
			lastName: response.body.lastName,
			role: response.body.role,
			projects: response.body.projects
		};
	}

	// Loading the cookie then sending a delete request with a bearer token and setting the state with the new data

	async function deleteProject(projectName) {
		const token = cookie.load('auth');
		const response = await superagent.delete(`${API}/delete`, {
			name: projectName,
			email: user.email
		})
			.set('authorization', `Bearer ${token}`);
		setUser(response.body);
	}

	//Loading the cookie then sending an update request with a bearer token and setting the state with the new data

	async function updateProjectStatus(projectName, email, status) {
		const token = cookie.load('auth');
		let response = await superagent.put(`${API}/update`, {
			name: projectName,
			email: email,
			status: status
		})
			.set('authorization', `Bearer ${token}`);
		let newData = await getProjects(user.email, token);
		setUser(newData);
	}

	const state = {
		loggedIn,
		user,
		setLoggedIn,
		login,
		signup,
		logout,
		setUser,
		createProject,
		deleteProject,
		updateProjectStatus,
		projectStatus
	};

	return (
		<AuthContext.Provider value={state}>
			{props.children}
		</AuthContext.Provider>
	)
}
