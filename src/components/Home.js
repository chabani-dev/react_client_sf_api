import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Single() {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const url='http://localhost:8000/api/posts'

    useEffect(()=> {
        axios.get(url)
        .then(response => {
            console.log(response.data);
            setPosts(response.data);
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
            <div className="m-5">{posts.map((post, index)=> {return(
            
                <a href={`/post/${post.id}`} key={index} className="text-decoration-none">
                    <div className="border mb-2 p-2">
                        <h3 className="text-body">{post.title}</h3>
                        <p className="text-secondary">Publié le {new Date(post.createdAt).toLocaleDateString()}</p>
                        <p className="text-secondary">Écrit par <em className="fw-bold text-body">{post.author.login}</em></p>
                    </div>
                </a>
            )
        })}</div>
        );
    }
}