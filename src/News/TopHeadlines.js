import React,{Component} from 'react';
import { Image,Dimmer,Loader,Card } from 'semantic-ui-react'
import '../index.css'

export default class TopHeadlines extends Component {
	state = {
		data:[],
		loading:false,
		error:false
	}

	componentDidMount(){
		const id = this.props.match.params.id
		const url = `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=8e3184e308114f77a772e6f531ea25a7`
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.setState({
					loading:true,
					data,
					error:false
				});
			},
			(error) => {
				this.setState({
					loading:false,
					error:true
				});
			})
		}
	
	dateConvert = () => {

	}
    render(){
			if(this.state.loading){
				var news = this.state.data.articles.map((item,index)=> {
					const url=(item.urlToImage)
					const fullurl=(item.url)
					const date = (item.publishedAt).split('T')
					return(
						<Card key={index}>
							<Image src={url}/>
							<Card.Content>
								<Card.Header>{item.title}</Card.Header>
								<Card.Meta>{item.author}</Card.Meta>
								<Card.Description>{item.description}</Card.Description>
							</Card.Content>
							<Card.Content extra>
							 Date:{date[0]} Time:{date[1]}
							</Card.Content>
							<Card.Content extra>
								<a href={fullurl} style={{color:'black'}}>Read Full Article</a>
							</Card.Content>
  					</Card>		
					)
				});
				return(
					<div style={{marginLeft:"66px",marginRight:"66px",marginTop:"20px"}}>	
						<Card.Group> 
							{news}			
						</Card.Group>
					</div>		
					)
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