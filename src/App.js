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
    if(this.state.change!=="" )  
    {
        if(this.state.duedate != ""){
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
      else alert('Enter Duedate!!')
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
    if(!(i == 0)){
        let temp=l[i]
        if(!l[i-1].isPinned){
          l[i]=l[i-1]
          l[i-1]=temp
        }
    }
    this.setState({
      list:l
    })
  }

  pin(i) {
   let temp = this.state.list
   temp[i].isPinned=!temp[i].isPinned
   let tt = temp[i]
   temp.splice(i,1)
   temp.unshift(tt)
   this.setState({
     list:temp
   })
  }

  dateChanged(e) {
    this.state.duedate=e.target.value
  }

  // Sorting Functions
  sortFun(e) {  
        if (e.target.value == 'by name') {
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

      if (e.target.value == 'by date') {
          let temp = this.state.list
          let arr = temp.sort(function(a, b){
            var dateA=new Date(a.duedate), dateB=new Date(b.duedate)
            return dateA-dateB
          })
          this.setState({
            list: arr
          })
      }
      
      if (e.target.value == 'by completed') {
    //Sort
      }
  }


  render() {
    let styles = {
      position: 'fixed',
     top: '0px',
      left: '0px',
       zIndex: '101px',
        background: 'white',
         margin: '0px',
        height: '15px'
      }

    return(

      <div>
        <div style = {styles} className="progress col-12 margin-bottom">
      <div  className={`bar secondary w-${((parseFloat((this.state.selected/this.state.total).toFixed(2)))*100)}`}></div>
    </div>
      {/* // Top row */}
      <div className="wrapper">
          <h1 className="header text-center animated heartBeat">Todo List</h1>
          <div className="row">
              <input className="inputBox sm-9 md-10 col" onChange={(e)=>{this.changeElement(e)}} value={this.state.change}/>
              <button className="add paper-btn btn-warning sm-3 md-2 col" onClick={()=>{this.whenClicked()}}>Add Item</button>
          </div>

        {/* Second row */}

          <div className="row">
            <label className="lab sm-1 col">Sort By: </label> 
              <select onChange={(e)=>{this.sortFun(e)}} className="lab ">
                  <option >Select</option>
                  <option value='by name'>By Name</option>
                  <option value='by date'>By Date</option>
                  <option value='by completed'>Completed</option>
                </select>
                <span className="md-2 sm-1 col"></span>
            <label  htmlFor="date" className="col-fill col">Due Date</label>
            <input id="date" type="date" className="col-fill col" onChange={(e)=>{this.dateChanged(e)}}></input> 
            <span className="col-fill col"></span>
          </div>
               
          <p className="text-center" >Completed Items : {this.state.selected +"/"+ this.state.total}</p>

          {this.state.list.map((x,i)=>{
              return(
                  <div className="row animated slideInRight">
                    <p onClick={()=>{this.selected(i)}} className={this.state.list[i].status?"alert alert-success col xs-12 md-6":"alert alert-secondary col xs-12 md-6"}>{x.val} <span className="spans">{x.date}  {x.time}</span> </p>
                    <button className="col md-1 xs-2 btn-warning"  onClick={()=>{this.pin(i)}}>Pin</button>
                    <button className="col md-1 xs-2 alert-secondary" disabled={x.isPinned}  onClick={()=>this.up(i)}>up</button>
                    <button className="col md-1 xs-2 alert-secondary" disabled={x.isPinned} onClick={()=>this.down(i)}>down</button>
                    <button className="col md-1 xs-2 animated wobble btn-danger" onClick={()=>this.deleted(i)}>x</button>
                    <p className="col md-2 alert xs-4 alert-primary">Due Date : {x.duedate}</p>
                  </div>
                )
              }
      )
  }
     </div>
     </div>
    )
  }
}
export default App;
