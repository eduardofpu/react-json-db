import Home from "./page/home/Home";
import User from "./page/user/contato";
import UserEdit from "./page/user/editar-contato";
import reduxForm from "./page/exemplo-form/reduxForm";
import Form from "./page/exemplo-form/form";
import Linha from './page/linha/Linha'
import TableView from './page/linha/TableView'
import CrudTableView from './page/linha/CrudTableView'


const routesConfig = [
    {
        path:"/",
        component: Home,
        exact:true  
    }, 
    {
        path:"/user",
        component: User,
        exact:true  
    },
    {
        path:"/userEdit",
        component: UserEdit,
        exact:true  
    },
    {
        path:"/reduxForm",
        component:reduxForm,
        exact:true
    }, 
    {
        path:"/form",
        component:Form,
        exact:true
    }   
    , 
    {
        path:"/linha",
        component:Linha,
        exact:true
    }   
    , 
    {
        path:"/table",
        component:TableView,
        exact:true
    }   

    , 
    {
        path:"/crudTable",
        component:CrudTableView,
        exact:true
    }   
    
]

export default routesConfig
