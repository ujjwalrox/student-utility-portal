import React, {Component, Fragment} from "react" 
import axios from "axios"
import Header from "./Header"

class AdminPage extends Component {

	state = {
			title: ``,
			text: ``,
			username: `` ,
			password: `` ,
			tag1: false ,
			tag2: false ,
			tag3: false ,
			tag4: false ,
			tag5: false ,
			placeholder: ``,
			status: `failure`,
			type: `normal`,
			error: ``
	}

	handleChange = (event) => {
	    const target = event.target;
	    const value = target.type === `checkbox` ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
  	}

  	/*handleLogin = () => {	

  		this.setState({
				placeholder: "Logging in..."
		})	
		
		const user = {			
		    "username": this.state.username ,
		    "password": this.state.password			
		}

		axios.post('https://damp-fjord-85414.herokuapp.com/login', user)

      	.then(res => {
      		console.log(res)
      		const data = res.data
      		this.setState({
      			status: data.status,
      			type: data.type
      		})
      		console.log(data.status)
      		console.log(this.state.status)
		})

		.catch(error => {

			console.log(error)

			this.setState({
				error: error ,
				placeholder: error.message
			})
		})   
	}
	*/
	
	postNotice = () => {

		this.setState({
					placeholder: `Submitting...`
		})
		const data = this.state

		
		axios.post(`https://damp-fjord-85414.herokuapp.com/create`, data)
      	.then(res => {
      		console.log(res.data)
      		const status = res.data.status
      		const message = res.data.message
      		if(status === `success`) {      			
  				alert(`Notice Submitted Successfully!`)
    			this.props.history.push(`/profile/${this.state.username}`)      			
      		}
      		else if(status === `failure`) {
      			this.setState({
      				placeholder: message
      			})
      		}
		})
		.catch(error => {
				console.log(error)
				this.setState({
				error: error ,
				placeholder: error.message
			})
		}) 
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.setState({
				placeholder: "Logging in..."
		})	
		
		const user = {			
		    "username": this.state.username ,
		    "password": this.state.password			
		}

		axios.post('https://damp-fjord-85414.herokuapp.com/login', user)

      	.then(res => {
      		console.log(res)
      		const data = res.data
      		this.setState({
      			status: data.status,
      			type: data.type
      		})
      		console.log(data.status)
      		console.log(this.state.status)
      		if(this.state.status === `failure`) {
				console.log(this.state.status)
				this.setState({
	      				placeholder: `Failed login of ${this.state.username}`
	  			})	
			}
			else if(this.state.type === `normal`) {
				this.setState({
	      				placeholder: `${this.state.username} is not an admin`
	  			})
			}
			else if(this.state.type === `admin`) {
				this.postNotice()
			}

		})

		.catch(error => {

			console.log(error)

			this.setState({
				error: error ,
				placeholder: error.message
			})
		})   

		
	}
		  
	render() {
		return (
			<Fragment>
				<Header page="AdminPage" />
				<div style = {{marginTop: `60px`}}>
					<h1 >Post Notice</h1>
					<p className="text-danger">{this.state.placeholder}</p>
					<form>
					
						<div>
							<input 
								type="text"
								style={{width: `600px`}} 
								name="title" 
								placeholder="Title"
								value={this.state.title}
								onChange={this.handleChange}
							/>
							<br/>
							<br/>
						</div>

						<div>
							<textarea
								style={{height: `200px` , width: `600px`}} 
								name="text"
								placeholder="Text"
								value={this.state.text}
								onChange={this.handleChange}
								/>
							<br/>
						</div>				

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag1" 
									checked={this.state.tag1} 
									onChange={this.handleChange} 
									/>
								tag1
							</label>
							<br/>
						</div>

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag2" 
									checked={this.state.tag2} 
									onChange={this.handleChange} 
									/>
								tag2
							</label>
							<br/>
						</div>

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag3" 
									checked={this.state.tag3} 
									onChange={this.handleChange} 
									/>
								tag3
							</label>
							<br/>
						</div>

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag4" 
									checked={this.state.tag4} 
									onChange={this.handleChange} 
									/>
								tag4
							</label>
							<br/>
						</div>

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag5" 
									checked={this.state.tag5} 
									onChange={this.handleChange} 
									/>
								tag5
							</label>
							<br/>
						</div>

						<div>
							<label>
								Username:  
								<input 
									type="text" 
									name="username" 
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</label>
							<br/>
						</div>

						<div>
							<label>
								Password:  
								<input 
									type="password" 
									name="password" 
									value={this.state.password} 
									onChange={this.handleChange}
								/>
							</label>
							<br/>
						</div>

						<div>
							<input 
								type="submit" 
								name="Submit" 
								onClick={this.handleSubmit}/>
							<br/>							
						</div>

					</form>
				</div>
			</Fragment>				
 		)
	}
}
export default AdminPage