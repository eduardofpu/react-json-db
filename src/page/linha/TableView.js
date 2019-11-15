
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '../../component/Table';
import Pagination from '../../component/Pagination';
import Hook from '../../component/msg/Hook';

const baseUrl = 'http://localhost:3001/users' 

const TableView = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);  
    const [loadingEnter, setLoadingEnter] = useState(false);      
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(4);

    useEffect(() =>{
        const fetchPosts = async () => {
            // setLoading(true);
            const res = await axios.get(baseUrl)
            setPosts(res.data);
            setLoading(true); 
            setLoadingEnter(true);
        }

        fetchPosts();
    }, []); 
  

    const salvar = (data) =>{  
    
        axios.post(baseUrl, data)
       .then(resp => {
         const list = getUpdateList(resp.data)
        //  this.setState({lista:list})
         setPosts(list)
       })
    } 
    

    const getUpdateList = (user, add = true) => {
        //Remove o usuario da lista  e coloca o novo usuario na primeira posição
        const list = posts.filter(u=> u.id !== user.id)
        
        // coloca o primeiro elemento no array
        console.log("Nova lista: ",list)
        if(add) list.unshift(user)
            return list
    }    

    // console.log("paginaton: ",posts)

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //Get page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const save = data => salvar(data);  

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
            <Table posts={currentPosts} loading={loading} setLoading={setLoading} loadingEnter ={loadingEnter} setLoadingEnter={setLoadingEnter}  submitUserAction={save}/>
            {mostrarPagination()}
        </div>
    );
};

export default TableView;