import React from 'react';
import './Newitem.css';
class NewItem extends React.Component{
	state = {
		labelName: '',
		editLabel:'',
		discription: '',		
		color:'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',	
		list:[],
		eventToggle:true
	}
	changeVal = (event) => {
		this.setState({labelName: event.target.value});
	}
	changeDis = (e1) => {
		this.setState({discription:e1.target.value});
	}
	onSubmit = () => {
		
		let newArray=[...this.state.list];
		if (newArray.find(element => element.label===this.state.labelName || element.color===this.state.color)){
			window.alert('This label or label color is already used. Please use different label name or color')
			this.setState({
				list:newArray,
				labelName:"",
				discription:"",
				color:'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
			})
		}else{
+			newArray.push({label:this.state.labelName,color:this.state.color,dis:this.state.discription})
			this.setState({
				list:newArray,
				labelName:"",
				discription:""
			})
		}
	}
	onColor = () => {
		var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
		this.setState({
			color:ColorCode
		})
	}
	onCancel =() => {
		this.setState({
			labelName:"",
			discription:"",
			color:this.state.color
		})
	} 
	deleteLabel = (index) => {
		var newarray = [...this.state.list];
		if (window.confirm(`Are you sure that you want to delete ${newarray[index]}`)) { 
			delete newarray[index];
			this.setState({ 
				list:newarray.filter(x=>x)
			 })
		}
		console.log(this.state.list)
	}
	editButton = () => {
		this.setState({eventToggle:false})
	}
	cancelEdit = (e3) => {
		this.setState({eventToggle:true})
	}
	changeEditVal = (e2) =>{
		console.log(e2.target.name)
		let newarray=[...this.state.list];
		newarray[e2.target.name].label=e2.target.value
		this.setState({list:newarray})

	}
	render(){
		return(
			<div className = "container">
				<div className= "form">
					<p><span className="label-preview"  style={{backgroundColor:this.state.color}}>{this.state.labelName || 'Live preview'}</span></p>
					<div className="input-box" >
						<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
						<div>
						<p className = "des"> Label Name </p>
						<input name='labelname' type="text" onChange={this.changeVal} placeholder="Label Name" value={this.state.labelName}></input>
						</div>
						<div>
						<p className = "des"> Label Discription </p>
						<input name='discription' type="text" onChange={this.changeDis} placeholder="Label Discription" value={this.state.discription}></input>
						</div>						
						<div>
						<button className="button-change" onClick={this.onColor} style={{backgroundColor:this.state.color}}><i className="fa fa-refresh"></i></button>
						<input type="text" value={this.state.color}></input> 
						</div>
						<div>
							<button className="submit-button" onClick={this.onCancel}> Cancel </button>
							{this.state.labelName===""
							? <button className="submit-button" style={{backgroundColor:'#94d3a2',color:"white"}} disabled>Create Label</button>
							: <button className="submit-button" onClick={this.onSubmit} style={{backgroundColor:'#28a745',color:"white"}}>Create Label</button>	      								}
						</div>
					</div>
				</div>
				<div className ="box">
					<div className = "box-header">
						<p>{this.state.list.length} Labels</p>
					</div>
					<div>
						
						<div>{this.state.list.map((element,index)=>{
							return(	
								<div>{this.state.eventToggle?
								<div className="box-row">
									
									<div>
										<p className="label-preview" key={index} name={element.label}>
											<span style={{backgroundColor:element.color}}>
												{element.label}
											</span>
										</p>
									</div>
									<div className = "dis-text"> {element.dis} </div>
									<div> 
										<button className="submit-button" onClick={this.editButton}>Edit</button>
										<button className="submit-button" style={{margin:'20px'}} onClick={() => {this.deleteLabel(index)}}> remove label </button>
									</div>

								</div>	
								: 
				<div className= "form">
					<div>
					<div className="flex-inner"><span className="label-preview"  style={{backgroundColor:this.state.color,hieght:'20px'}}>{this.state.labelName || element.label}</span><button className="submit-button" style={{margin:'20px'}} onClick={() => {this.deleteLabel(index)}}> remove label </button></div>	
					</div>					
					<div className="input-box" >
						<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
						<div>
						<p className = "des"> Label Name </p>
						<input name='labelname' type="text" onChange={this.changeEditVal} name={index} placeholder="Label Name" value={element.label}></input>
						</div>
						<div>
						<p className = "des"> Label Discription </p>
						<input name='discription' type="text" onChange={this.changeDis} placeholder="Label Discription" value={element.dis}></input>
						</div>						
						<div>
						<button className="button-change" onClick={this.onColor} style={{backgroundColor:this.state.color}}><i className="fa fa-refresh"></i></button>
						<input type="text" value={element.color}></input> 
						</div>
						<div>
							<button className="submit-button" onClick={this.cancelEdit}> Cancel </button>
							{this.state.labelName===""
							? <button className="submit-button" style={{backgroundColor:'#94d3a2',	color:"white"}} disabled>Update Label</button>
							: <button className="submit-button" onClick={this.onSubmit} style={{backgroundColor:'#28a745',color:"white"}}>Update Label</button>	      								}
						</div>
					</div>
				</div>				}
								</div>						
							)
						})}</div>

					</div>	
				</div>  
			</div>					
		)
	}
}
export default NewItem;


