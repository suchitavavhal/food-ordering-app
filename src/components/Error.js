import {useRouteError} from 'react-router-dom';
import Header from './Header';

const Error= ()=>{
    const err= useRouteError();
    console.log(err)
    return(
        <div className="errorPage">
            <Header/>
            <h1>{err.status} : {err.statusText}</h1>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/page-not-found-5756378-4812410.png"/>
        </div>
    )
}

export default Error;