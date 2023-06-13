import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Single() {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const params = useParams();
    const id = params.id;
    
    const url=`http://localhost:8000/api/post/${id}`;

    useEffect(()=> {
        axios.get(url)
        .then(response => {
            console.log(response.data);
            setPost(response.data);
            setLoaded(true);
        })
        .catch(err =>{
            console.log(err.response.status)
            setError(err.response.status);
            setLoaded(true);
        })
    }, []);

    if(!loaded) {
        return(<h1>En cours de chargement...</h1>);
    } else if (error) {
        return(<h1>Erreur {error}</h1>);
    } else {
        return(
        <div className="m-5">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Publié le {new Date(post.createdAt).toLocaleDateString()}</p>
            <p>Écrit par <em className="fw-bold">{post.author.login}</em></p>
            <a className="btn btn-light" href="/">Retour à l'accueil</a>
        </div>
        );
    }
}