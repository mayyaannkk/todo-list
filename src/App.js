import React from 'react';
import logo from './logo.svg';
import './App.css';
import PropType from 'prop-types';
import papercss from 'papercss/dist/paper.css'

class App extends React.Component {

  constructor(){
    super()
    this.state={}
    this.state.list=[]
    this.state.change=""
    this.state.total=0
    this.state.selected=0
    this.state.duedate=""
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
      duedate: this.state.duedate,
      isPinned : false
      }
    l.push(temp)
    this.setState({
      list:l, 
      change:"",
      total: this.state.total+1,
      duedate: ""
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
    } 
    else if(l[i].status==true){
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
        if(!(l.length -1 == i)){
          l[i]=l[i+1]
          l[i+1]=temp
        }
    this.setState({
      list:l
    })
  }
  up(i) {
    let l=this.state.list
    if(!l[i-1].isPinned){
        let temp=l[i]
        if(!(i == 0)){
          l[i]=l[i-1]
          l[i-1]=temp
        }
    }
    this.setState({
      list:l
    })
  }

  pin(i) {
    // swap each and every element
   let temp = this.state.list
   temp[i].isPinned=!temp[i].isPinned
   console.log(temp[i].isPinned)
   let tt = temp[i]
   temp.splice(i,1)
   console.log(tt)
   temp.unshift(tt)
   this.setState({
     list:temp
   })
  }

  dateChanged(e) {
    this.state.duedate=e.target.value
  }

  // Sorting Functions
  sortByName(e) {
    console.log(e.target.value)
    let temp = this.state.list
    let arr = temp.sort(function(a, b){
      var A=a.val.toLowerCase(), B=b.val.toLowerCase()
      if (A < B) 
          return -1 
      if (A > B)
          return 1
      return 0 
    })
    this.setState({
      list:arr
    })
  }
  sortByDateAdded() {
    let temp = this.state.list
    let arr = temp.sort(function(a, b){
      var dateA=new Date(a.date), dateB=new Date(b.date)
      return dateA-dateB
    })
    this.setState({
      list: arr
    })
  }
  sortByCompleted() {
//Sort
  }

  render() {
    return(

      // Top row
      <div className="wrapper">
          <h1 className="header text-center animated heartBeat">Todo List</h1>
          <div className="row">
              <input className="inputBox col-9 col" onChange={(e)=>{this.changeElement(e)}} value={this.state.change}/>
              <button className="add paper-btn btn-warning col-3 col" onClick={()=>{this.whenClicked()}}>Add Item</button>
          </div>

        {/* Second row */}

          <div className="row">
            <label className="lab col-1">Sort By: </label> 
              <select className="lab col-2">
                  <option >Select</option>
                  {/* No function call applied , use different eventhandler */}
                  <option onSelect={(e)=>{this.sortByName(e)}}>By Name</option>
                  <option onClick={()=>{this.sortByDateAdded()}}>Date Added</option>
                  <option onClick={()=>{this.sortByCompleted()}}>Completed</option>
                </select>  
                {/* add progress bar */}
              <p className="col-5"></p>
            <label  htmlFor="date" className="col-1">Due Date</label>
            {/* Make date input as required and empty the date picker after insertion  */}
            <input id="date" type="date" className="col-3"  onChange={(e)=>{this.dateChanged(e)}}></input>    
          </div>
               
          <p className="text-center" >Completed Items : {this.state.selected +"/"+ this.state.total}</p>

          {this.state.list.map((x,i)=>{
              return(
                  <div className="row animated slideInRight">
                    <p onClick={()=>{this.selected(i)}} className={this.state.list[i].status?"alert alert-success col-6":"alert alert-secondary col-6"}>{x.val} <span className="spans">{x.date}  {x.time}</span> </p>
                    <button className="col-1 btn-warning"  onClick={()=>{this.pin(i)}}>Pin</button>
                    <button className="col-1  alert-secondary" disabled={x.isPinned}  onClick={()=>this.up(i)}>up</button>
                    <button className="col-1  alert-secondary" disabled={x.isPinned} onClick={()=>this.down(i)}>down</button>
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
