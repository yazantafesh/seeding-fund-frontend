import { createContext, useState, React, useEffect } from "react";
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';

const API = process.env.REACT_APP_API;

export const AuthContext = createContext();

export default function Auth(props) {

  const [user, setUser] = useState({
		email:'',
		password:'',
		firstName:'',
		lastName:'',
		role:'',
		projects:[]
	});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
  }, []);

	useEffect(() => {
		console.log('changed')
	}, [user])

  function validateToken(token) {
    try {
      const user = jwt.decode(token);
      if (user) setLoginState(true, token, user);
    } catch (error) {
      setLoginState(false, null, {});
      console.log(`Token Validation Error ${error.message}`);
    }
  }

  async function setLoginState(loggedIn, token, user) {
		cookie.save('auth', token);
		let userData = await getProjects(user.email, token);
		setUser(userData);
		setLoggedIn(loggedIn);
	}

  function setLogoutState(loggedIn, user) {
		cookie.save('auth', null);
		setUser( user );
		setLoggedIn(loggedIn);
	}

  async function login(email, password) {
		try {
			const response = await superagent
				.post(`${API}/sign/in`)
				.set('authorization', `Basic ${base64.encode(`${email}:${password}`)}`);
			validateToken(response.body.token);
			console.log(response.body)
		} catch (error) {
			console.error('Signin Error', error.message);
		}
	}

  async function signup(email, password, firstName, lastName, role) {
		try {
			const response = await superagent.post(`${API}/sign/up`, {
				email,
				password,
        firstName,
        lastName,
				role,
        projects:[]
			});

			validateToken(response.body.token);
		} catch (error) {
			console.error('Signup Error', error.message);
		}
	}

	async function createProject( name, description, sector, requiredFunding, urgency) {
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
				console.log('hello',response.body)
				setUser(response.body)
			} catch (error) {
				console.error('Authorization Error', error.message);

		}
	}

  function logout() {
		setLogoutState(false, {
			email:'',
			password:'',
			firstName:'',
			lastName:'',
			role:'',
			projects:[]
		});
	}

	async function getProjects(email, token) {
		const response = await superagent.get(`${API}/read?email=${email}`)
		.set('authorization', `Bearer ${token}`);
		return response.body;
	}

	async function deleteProject(projectName) {
		const token = cookie.load('auth');
		const response = await superagent.delete(`${API}/delete`, {
			name: projectName,
			email: user.email
		})
		.set('authorization', `Bearer ${token}`);
		setUser(response.body);
	}

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
		updateProjectStatus
	};

  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  )
}
