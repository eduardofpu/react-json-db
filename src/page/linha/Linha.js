
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Posts from '../../component/Posts';
import Pagination from '../../component/Pagination';

const baseUrl = 'http://localhost:3001/users' 

const Linha = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5);

    useEffect(() =>{
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(baseUrl)
            setPosts(res.data);
            setLoading(false);
        }

        fetchPosts();
    }, []);   
    // console.log("paginaton: ",posts)

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //Get page
    const paginate = pageNumber => setCurrentPage(pageNumber);
 

    return (
        <div className="container mt-5">
            <h1 className="text-primary mb-3">Usando o State do Hook</h1>
            <Posts posts ={currentPosts} loading ={loading} />
            <Pagination 
                       postsPerPage={postsPerPage} 
                       totalPosts={posts.length} 
                       paginate={paginate}
            />
        </div>
    );
};

export default Linha;