import axios from 'axios';
import React, { useState } from 'react';


export default function CreateUser() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [login, setLogin] = useState(null);
    const url = "http://127.0.0.1:8000/api/user/new";

    async function handleSubmit(e){
        e.preventDefault();
        console.log("le formulaire a été transmis", login);
        await axios.post(url, {
            login: login
        })
        .then(response=>{
            console.log(response);
            setUser(response.data);
            setLogin(null);
            setLoaded(true);
        })
        .catch(err=>{
            console.log(err);
            setError(err.response);
            setLoaded(true);
        })
    }

    if(!loaded){
        return(
        <form className="m-5" onSubmit={handleSubmit}>
            <input className="form-control mb-2" type="text" onChange={(e)=>setLogin(e.target.value)}/>
            <button className="btn btn-primary">Enregistrer</button>
        </form>
    );
    } else if(error){
        return(
            <div className="m-5">
                <form onSubmit={handleSubmit}>
                    <input className="form-control mb-2" type="text" onChange={(e)=>setLogin(e.target.value)}/>
                    <button className="btn btn-primary">Enregistrer</button>
                </form>
                <h1>{`erreur ${error.status}`}</h1>
                <p>{error.data.detail}</p>
            </div>);
    } else{
        return(
        <div className="m-5">
            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" type="text" onChange={(e)=>setLogin(e.target.value)}/>
                <button className="btn btn-primary">Enregistrer</button>
            </form>
            <h1>Utilisateur {user.login} créé</h1>
            <a className="me-5 btn btn-light" href="/">Accueil</a>
        </div>);
        
    }
}