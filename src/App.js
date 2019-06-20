import React from 'react';
import logo from './logo.svg';
import './App.css';
import PropType from 'prop-types';
import papercss from 'papercss/dist/paper.css'
import Animatecss from 'animate.css/animate.min.css'

class App extends React.Component {

  constructor(){
    super()
    this.state={}
    this.state.list=[]
    this.state.change=""
    this.state.total=0
    this.state.selected=0
  }

  changeElement(e) {
    this.setState({
      change: e.target.value,
    })
  }

  whenClicked() {
    if(this.state.change!=="")  
    {
      let l=this.state.list;
    let temp = {
      val:this.state.change,
      status: false, 
      time: new Date().toLocaleTimeString(), 
      date: new Date().toLocaleDateString(),
      }
    l.push(temp)
    this.setState({
      list:l, 
      change:"",
      total: this.state.total+1
    })
  }
  }

  selected(i) {
    let l = this.state.list
    if(l[i].status==false){
      l[i].status=true;
      this.setState({
        list: l,
        selected:this.state.selected+1
      }) 
    } else if(l[i].status==true){
      l[i].status=false;
      this.setState({
      list: l,
      selected:this.state.selected-1
    }) 
  }
  }

  deleted(i) {
    let l=this.state.list
    l.splice(i,1)
    this.setState({
      list:l,
      total:this.state.total-1
    })
  }

  down(i) {
    let l=this.state.list
    let temp=l[i]
    if(!(this.state.list.length -1 == i)){
      l[i]=l[i+1]
      l[i+1]=temp
    }
    this.setState({
      list:l
    })
  }
  up(i) {
    let l=this.state.list
    let temp=l[i]
    if(!(i == 0)){
      l[i]=l[i-1]
      l[i-1]=temp
    }
    this.setState({
      list:l
    })
  }

  pin(i) {
   let temp = this.state.list
   let tt = temp[0]
   temp[0]=temp[i]
   temp[i]=tt
   this.setState({
     status:temp
   })
  }

  dateChanged(e) {
    this.setState({
      duedate: e.target.value
    })
  }

  render() {
    return(

      <div className="wrapper">
          <h1 className="header text-center animated heartBeat">Todo List</h1>
          <div className="row">
              <input className="inputBox col-9" onChange={(e)=>{this.changeElement(e)}} value={this.state.change}/>
              <button className="add paper-btn btn-warning col-3" onClick={()=>{this.whenClicked()}}>Add Item</button>
          </div>
          
          <div className="row">
            <label className="lab col-1">Sort By: </label> 
              <select className="lab col-2">
                  <option>Name</option>
                  <option>Date Added</option>
                  <option>Date Completed</option>
                </select>  
              <p className="col-5"></p>
            <label for="date" className="col-1">Due Date</label>
            <input id="date" type="date" className="col-3" onChange={(e)=>{this.dateChanged(e)}}></input>    
          </div>
               
          <p className="text-center" >Completed Items : {this.state.selected +"/"+ this.state.total}</p>

          {this.state.list.map((x,i)=>{
              return(
                  <div className="row animated slideInRight">
                    <p onClick={()=>{this.selected(i)}} className={this.state.list[i].status?"alert alert-success col-6":"alert alert-secondary col-6"}>{x.val} <span className="spans">{x.date}  {x.time}</span> </p>
                    <button className="col-1 btn-warning" onClick={()=>{this.pin(i)}}>Pin</button>
                    <button className="col-1  alert-secondary" onClick={()=>this.up(i)}>up</button>
                    <button className="col-1  alert-secondary" onClick={()=>this.down(i)}>down</button>
                    <button className="col-1 animated wobble btn-danger" onClick={()=>this.deleted(i)}>x</button>
                    <p className="col-2 alert alert-primary">Due Date : {x.duedate}</p>
                  </div>
                )
              }
      )
  }
     </div>
    )
  }
}
export default App;
