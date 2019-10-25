
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CrudTable from '../../component/CrudTable';
import Pagination from '../../component/Pagination';


const baseUrl = 'http://localhost:3001/users' 

const CrudTableView = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(4);

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
            <CrudTable posts ={currentPosts} loading ={loading} setPosts={setPosts} lista={posts}/>
            <Pagination 
                       postsPerPage={postsPerPage} 
                       totalPosts={posts.length} 
                       paginate={paginate}
            />
        </div>
    );
};

export default CrudTableView;