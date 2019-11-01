
import React from 'react'

const Posts = ({posts, loading, loadingEnter, setLoadingEnter}) => {

    if(!loading){
      return <h2>Loading...</h2>
    }else if(loadingEnter){
        setTimeout(()=>{
            setLoadingEnter(false);
    },1000);

        return <h2>Loading...</h2>

    }


    return <ul className="list-group mb-4">
        {posts.map(post =>(
            <li key={post.id} className="list-group-item"> {post.id}  -  {post.nome}  -  {post.email} </li>           
        ))}
    </ul>
};

export default Posts;