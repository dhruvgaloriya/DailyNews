import React, { Component } from 'react';
import {Card, Image, Dimmer, Loader, Popup,Label } from 'semantic-ui-react'
import '../index.css'
import {Link} from 'react-router-dom'
import isoCountries from './country'

export default class NewsList extends Component {
    state = {
        data:[],
        loading:false,
        error:false,
        selectedOption:'general',
        id:'xyz',
    }
		componentDidMount() {
			const url = "https://newsapi.org/v1/sources?apiKey=8e3184e308114f77a772e6f531ea25a7"
			fetch(url)
				.then(response => response.json())
				.then(
					(data) => {
						this.setState({
							data,
              loading:true,
						});
					},
					(error) => {
						this.setState({
							loading:false,
							error:true
						});
					}
				)
    }
    
    handleOptionChange = (changeEvent) => {
      this.setState({
        selectedOption:changeEvent.target.value
      })
    }
    render(){
			if(this.state.loading){
				var news = this.state.data.sources.map((item,index) => {
          if((item.category) === (this.state.selectedOption)){
          const url = `https://icon-locator.herokuapp.com/icon?url=${item.url}&size=70..120..200`
          const url2 = `https://newsapi.org/images/flags/${item.country}.svg`
          const param = (item.id)
            return(
              <Card key={index}>
                <Card.Content>
                  <Image floated='right' size='mini' src={url}/>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Meta>{item.category}</Card.Meta>
                    <Card.Description>
                      {item.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Link to ={`/topheadlines/${param}`} style={{color:'black'}}>Read More</Link>
                  <Popup
                    key={index}
                    trigger={<Image floated='right' src={url2} avatar size='mini'/>}
                    header={isoCountries[(item.country).toUpperCase()].name}
                    content={isoCountries[item.language].name}/>
							  </Card.Content>
              </Card>
            );
          }    
				});
				return(
          <div>
            <center className="filterForm">
            <p>
					    <label>
					       <input value = "general" name="group1" style={{marginRight:"6px"}} type="radio" checked = {this.state.selectedOption === 'general'} 
					        onChange={this.handleOptionChange}/>
					       <span>General</span>
					    </label>
					  </p>
            <p>
					    <label>
					       <input value = "science" name="group1" style={{marginRight:"6px"}} type="radio" checked = {this.state.selectedOption === 'science'} 
					        onChange={this.handleOptionChange}/>
					       <span>science</span>
					    </label>
					  </p>
            <p>
					    <label>
					       <input value = "business" name="group1" style={{marginRight:"6px"}} type="radio" checked = {this.state.selectedOption === 'business'} 
					        onChange={this.handleOptionChange}/>
					       <span>Business</span>
					    </label>
					  </p>
            <p>
					    <label>
					       <input value = "entertainment" name="group1" style={{marginRight:"6px"}} type="radio" checked = {this.state.selectedOption === 'entertainment'} 
					        onChange={this.handleOptionChange}/>
					       <span>Entertainment</span>
					    </label>
					  </p>
            <p>
					    <label>
					       <input value = "sports" name="group1" style={{marginRight:"6px"}} type="radio" checked = {this.state.selectedOption === 'sports'} 
					        onChange={this.handleOptionChange}/>
					       <span>Sports</span>
					    </label>
					  </p>
            <p>
					    <label>
					       <input value = "technology" name="group1" style={{marginRight:"6px"}} type="radio" checked = {this.state.selectedOption === 'technology'} 
					        onChange={this.handleOptionChange}/>
					       <span>Technology</span>
					    </label>
					  </p>
            </center>
            <div style={{marginLeft:"66px",marginRight:"66px",marginTop:"20px"}}>
              <Card.Group>
                {news}
              </Card.Group>
					  </div>
          </div>	
        );
			}else{
				return(
					<div className="preloader">
              <Dimmer active inverted>
                <Loader size='massive'>Loading</Loader>
              </Dimmer>
					</div>
				)
			}
    }
}