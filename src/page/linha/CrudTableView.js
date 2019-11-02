
import React, { useState, useEffect } from 'react'
import CrudTable from '../../component/CrudTable';
import Pagination from '../../component/Pagination';
import Hook from '../../component/msg/Hook';
import apiDb from '../apiDb';


const baseUrl = '/users' 

const CrudTableView = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);  
    const [loadingEnter, setLoadingEnter] = useState(false);  
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(4);

    useEffect(() =>{
        const fetchPosts = async () => {
            // setLoading(true);            
            const res = await apiDb.get(baseUrl)
            setPosts(res.data);
            setLoading(true); 
            setLoadingEnter(true);          
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

    const mostrarPagination = () => {
        if(!loading){
            return 

        }else if(!loadingEnter){
            return <Pagination 
                       postsPerPage={postsPerPage} 
                       totalPosts={posts.length} 
                       paginate={paginate}
            />
        }
    }

    return (
        <div className="container mt-5">
            <h5 className="text-primary mb-3"> <Hook name="Clique aqui para saber mais..."></Hook></h5>
            <CrudTable posts={currentPosts} loading={loading} loadingEnter ={loadingEnter} setLoadingEnter={setLoadingEnter} setPosts={setPosts} lista={posts}/>
           {mostrarPagination()}
        </div>
    );
};

export default CrudTableView;