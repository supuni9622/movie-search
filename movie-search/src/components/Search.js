import React, { Component } from 'react';
import TVShows from '../resources/data.json';

import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

import '../css/search.css';

class Search extends Component {

    constructor(props){
        super(props);

        // Declare states of query input and TVseries output result
        this.state = {
            query: '',
            TVSeries : []
        }
    }

    // When user type something in the search input, get the input value and keep it in the 'query' 
    handleOnInputChange = (e) => {
        const query = e.target.value;
        console.warn(query);
        this.setState({query:query})
    }

    // After clicking search button search through the data file 
    handleOnInputSubmit = (e) => {
        e.preventDefault();

        const {query} = this.state;
        this.setState({query:query})
        this.state.TVSeries = [];
        // convert user input value to lowercase
        const querylower = query.toLowerCase()
        //Get whole user input as the first string using js regular expression anchors
        const queryfirst = new RegExp("\^" + querylower );
        //Get whole user input as the last string using js regular expression anchors
        const querylast = new RegExp( querylower  + "\$");
        // Separate user input word by word
        const separatewords = /\b\w+\b/g;
        const newquery = querylower.match(separatewords);
        console.log(queryfirst);

        //-------------------------Searching --------------------------------

        //Check whether user input is empty or not
        if(query.length >= 1){  
            
            //If user input is not empty then loop through TVshows array
            for(let i=0; i<TVShows.shows.length; i++){
                
                // Search to find 3 tv shows; by getting user input as it is, at the beggining of the array elements (Beggining)
                if(queryfirst.test(TVShows.shows[i].toLowerCase()) == true){
                     // Check if the tv series already in the result
                    if(!this.state.TVSeries.includes(TVShows.shows[i]) )
                        this.state.TVSeries.push(TVShows.shows[i]);

                        console.log(queryfirst.test(TVShows.shows[i].toLowerCase()))
                        console.log(TVShows.shows[i])
                    } 
                }
            // If not find matching 3 tv shows 
            for(let i=0; i<TVShows.shows.length; i++){
                
                // Search to find tv shows; by getting user input as it is, among any place in the array element (Middle)
                if(TVShows.shows[i].toLowerCase().indexOf(query.toLowerCase()) !== -1){
                    // Check if the tv series already in the result
                    if(!this.state.TVSeries.includes(TVShows.shows[i]))
                         this.state.TVSeries.push(TVShows.shows[i]);
                    }
                }
            
            // If not find matching 3 tv shows yet
            for(let i=0; i<TVShows.shows.length; i++){

                // Search to find tv shows; by getting user input as it is, at the end of the array element (End)
                if(querylast.test(TVShows.shows[i].toLowerCase()) == true){
                     // Check if the tv series already in the result
                    if(!this.state.TVSeries.includes(TVShows.shows[i]) )
                        this.state.TVSeries.push(TVShows.shows[i]);

                        console.log(queryfirst.test(TVShows.shows[i].toLowerCase()))
                        console.log(TVShows.shows[i])
                    } 
                }

            // If not find matching 3 tv shows yet -- From here user input splited to separate strings 
            for(let i=0; i<TVShows.shows.length; i++){

                // Check whether user input consists of only one word or more than one word
                if(newquery.length == 1){
                    if(TVShows.shows[i].toLowerCase().indexOf(querylower) !== -1){
                        // Check if the tv series already in the result
                        if(!this.state.TVSeries.includes(TVShows.shows[i]) )
                            this.state.TVSeries.push(TVShows.shows[i]);
                           }
                }else if(newquery.length > 1 ){

                    // If user input consists of more than one word get each separated word and search in the TV show array elements
                    for(let a=0; a<=newquery.length; a++){ 
                        if(TVShows.shows[i].toLowerCase().indexOf(newquery[a]) !== -1){
                            if(!this.state.TVSeries.includes(TVShows.shows[i]))
                                this.state.TVSeries.push(TVShows.shows[i]);
                        }
                    }
                         console.log(queryfirst.test(TVShows.shows[i].toLowerCase()))  
                }  
            }
        }
    }
                       
    render() {
        const {query} = this.state;
        const {TVSeries} = this.state;
        var TVSeriesCount = TVSeries.length;
        
        return (
            <>
            <div className="jumbotron">
                <h1 id="title">TV Series Search Engine</h1>
                {/* Search Input */}
                <Form onSubmit={this.handleOnInputSubmit} style={{margin: '0px 50px'}}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search your favorite TV series..."
                            aria-label="TV series name"
                            aria-describedby="basic-addon2"
                            type="text"
                            value= {query}
                            onChange = {this.handleOnInputChange}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-light" type='submit' style={{paddingLeft:'30px', paddingRight:'30px'}}>
                                <i class="fas fa-search" style={{ fontWeight:'bold'}}/>
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </div>
            {TVSeriesCount !== 0? 
                <div className="container">
                    {/* Display the results*/}
                    {TVShows.shows.map((TVShowName) => {
                        for(let i=0; i< Math.min(TVSeriesCount,3); i++){
                            if(this.state.TVSeries[i] == TVShowName){
                                return <h4 id="tv-show">{TVShowName}</h4>
                            }
                        }
                    })}
                </div>
            :
                <div className="container">
                    <h6>Search and enjoy your favorite TV series.... </h6>
                </div>
            }
            
          </>
        )
    }
}

export default Search

