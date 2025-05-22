import {Component} from 'react'
import User from "./User";
import UserClass from "./UserClass";

class About extends Component{
    constructor(props){
        super(props);

        console.log('parent constructor');
    }

    // componentDidMount is used to make api calls
    componentDidMount(){
        console.log('parent component did mount');
        // API call

    }

    render(){

 
        console.log('parent render');
    return(
        <div>
            <h1> ABOUT US Class Component</h1>
            <User name={'Rita(functional)'}/>
            <UserClass name={'Aleena (Class based)'} location={'London'} contact={'@aleena'}/>
            <UserClass name={'Musk (Class based)'} location={'Miami'} contact={'@musk'}/>
        </div>
    )
}

}

export default About;