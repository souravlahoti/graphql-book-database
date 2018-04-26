import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo'
// import Button from 'muicss/lib/react/button';
import {Button} from 'react-materialize'
import Input from 'muicss/lib/react/input';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Panel from 'muicss/lib/react/panel';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../query'

class AddBook extends Component {
constructor(props){
    super(props);
    this.state ={
        name: "",
        authorId: "",
        genre: ""

    }

}
displayAuthor(){
    var data = this.props.getAuthorsQuery
    if(data.loading){
        <option>Loading Authors</option>
    }else{
        return data.authors.map( author => {
            return(
                <Option label={author.name} value={author.id}></Option>
            )
        })
    }
}

postForm(e){
    e.preventDefault()
    this.props.addBookMutation({
        variables:{
            title: this.state.name,
            genre: this.state.genre,
            authorId: this.state.authorId
        },
        refetchQueries: [{query: getBooksQuery}]
    })

    this.state ={
        name: "",
        authorId: "",
        genre: ""

    }

}
  render() {
    return (
        <Panel id="add-book" >
        <form onSubmit={this.postForm.bind(this)}>
           <div className="field">
            <Input label="Book Name" defaultValue={this.state.name} floatingLabel={true} onChange={ (e) => this.setState({name: e.target.value})} />
           </div>
           <div className="field">
            <Input label="Genre" defaultValue={this.state.genre} floatingLabel={true} onChange={ (e) => this.setState({genre: e.target.value})}/>
           </div>
           <div className="field">
            <Select name="input" label="Select Author" onChange={ (e) => this.setState({authorId: e.target.value})}>
                {this.displayAuthor()}
            </Select>
           </div>
           <Button floating large className='red' waves='light' icon="add"></Button>
        </form>
        </Panel>
    );
  }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery" }),
    graphql(addBookMutation, {name: "addBookMutation" })
)(AddBook);
