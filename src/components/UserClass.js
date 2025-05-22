import React from 'react';

class UserClass extends React.Component{
    constructor(props){
        super(props);
        console.log(props);

        console.log(this.props.name +'child constr')

        this.state={
            count:0,
            count2:2,
            userInfo:{
                name:"Dummy",
                location:"Default"
            }
        }
    }

    async componentDidMount(){
        console.log(this.props.name +'component did mount')

        // Api Call
        const data= await fetch('https://api.github.com/users/akshaymarch7');
        const json= await data.json();

        console.log(json);

        this.setState({
            userInfo: json, 
        })

    

        this.timer=setInterval(()=>{
            console.log('I am in compDidMount')
        },3000)
    }

    componentDidUpdate(){
        console.log('Component did update')
    }
    
    componentWillUnmount(){
        console.log('Component will unmount')
        clearInterval(this.timer)
        
    }
    render(){
        // const {name, location, contact}= this.props;
        const {name, location, avatar_url}= this.state.userInfo;
        // debugger;
        console.log(this.props.name + 'child render')
        return(
            <div className="user-card">
            <h1>Count: {this.state.count}</h1>  
            <h1>Count: {this.state.count2}</h1>  
            <button onClick={()=>{
                // Never update state variables directly using '=' operator
                this.setState({
                    count: this.state.count + 1,
                    count2: this.state.count2 - 1,
                })
            }}>Count Increase</button>
            <img src={avatar_url} alt="user_img"/>
            <h2>Name: {name}</h2>
            <h3>Location: {location }</h3>
            {/* <h4>Contact: {contact}</h4> */}

        </div>
        )
    }
}

export default UserClass;