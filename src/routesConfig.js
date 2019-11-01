import Home from "./page/home/Home";
import User from "./page/user/contato";
import UserEdit from "./page/user/editar-contato";
import reduxForm from "./page/exemplo-form/reduxForm";
import Form from "./page/exemplo-form/form";
import Linha from './page/linha/Linha'
import TableView from './page/linha/TableView'
import CrudTableView from './page/linha/CrudTableView'
import InfinitSimple from "./page/infinit-scroll/InfinitSimple";
import ScrollContato from "./page/infinit-scroll/ScrollContato";
import ScrollJson from "./page/infinit-scroll/ScrollJson";


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
    , 
    {
        path:"/infinitSimple",
        component:InfinitSimple,
        exact:true
    }  
    , 
    {
        path:"/infinitJson",
        component:ScrollJson,
        exact:true
    },  
    {
        path:"/infinitContato",
        component:ScrollContato,
        exact:true
    }  
    
]

export default routesConfig
