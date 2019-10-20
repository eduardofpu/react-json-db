export const submitUserAction = (data) => {  
    // event.preventDefault ();  
    let url = "http://localhost:3001/users"
    fetch(url,{
        method:"POST",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
       
    }) .then(Response => Response.json())
    .then(json => {
        console.log(json)        
        alert ('Salvo com sucesso!!') 
     })
}

export const updateAction = (id,data) => {    
    let url = "http://localhost:3001/users/"+id
    fetch(url,{
        method:"PUT",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
       
    }) .then(Response => Response.json())
    .then(json => {
        console.log(json)        
    })
}

export const deleteActionId = (id) => {    
    let url = "http://localhost:3001/users/"+id
    fetch(url,{
        method:"DELETE"
              
    }) .then(console.log("204 No Content"))
    
}
