import React,{Component} from 'react'
import { Dropdown,Grid,Card,Image,Dimmer,Loader,Popup } from 'semantic-ui-react'
import '../index.css'
export default class TopNews extends Component {
	state={
		data:[],
		loading:false,
		error:false,
	}
	fetchData = (e,{value}) => {
		this.setState({
			value
		})
		fetch(`https://newsapi.org/v2/top-headlines?country=${value}&apiKey=8e3184e308114f77a772e6f531ea25a7`)
			.then(response => response.json())
			.then(data => {
				this.setState({
					data,
					loading:true,
					error:false
				});
			});
	}

	fetchNewData = (e,{value}) => {
		const category = value
		fetch(`https://newsapi.org/v2/top-headlines?country=${this.state.value}&category=${category}&apiKey=8e3184e308114f77a772e6f531ea25a7`)
			.then(response => response.json())
			.then(data => {
				this.setState({
					data,
					loading:true,
					error:false
				});
			});
	}
    render(){
			const countryOption = [
				{
					key:'au',
					value:'au',
					flag:'au',
					text:'Australia'
				},
				{
					key:'de',
					value:'de',
					flag:'de',
					text:'Germany'
				},
				{
					key:'in',
					value:'in',
					flag:'in',
					text:'India'
				},
				{
					key:'us',
					value:'us',
					flag:'us',
					text:'United States'
				},
			]
			const category = [
				{
					key:'general',
					value:'general',
					text:'General'
				},
				{
					key:'business',
					value:'business',
					text:'Business'
				},
				{
					key:'entertainment',
					value:'entertainment',
					text:'Entertainment'
				},
				{
					key:'science',
					value:'science',
					text:'Science'
				},
				{
					key:'sports',
					value:'sports',
					text:'Sports'
				},{
					key:'technology',
					value:'technology',
					text:'Technology'
				}
			]
			const {value} = this.state
			if(this.state.loading){
				var newsData = this.state.data.articles.map((item,index)=>{
					const url=(item.urlToImage)
					const fullurl=(item.url)
					const date = (item.publishedAt).split('T')
					const sources = `https://icon-locator.herokuapp.com/icon?url=${item.url}&size=70..120..200`	
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
								<Popup
                    key={index}
                    trigger={<Image floated='right' src={sources} avatar size='mini'/>}
                    header={item.source.name}/>
							</Card.Content>
  					</Card>
					)
				})
			}
			return(
					<div>
						<h3 style={{textAlign:'center',marginBottom:'10px'}} >Sort Top News By Following Things</h3>
						<Grid columns={2} divided textAlign={"center"}>
						<Grid.Row>
							<Grid.Column>
								<Dropdown placeholder='Country' search 
																								selection 
																								options={countryOption}
																								value={value}
																								onChange={this.fetchData}/>
							</Grid.Column>
							<Grid.Column>
								<Dropdown placeholder='Category'		search
																										selection 
																										options={category}
																										value={value}
																										onChange={this.fetchNewData} />
							</Grid.Column>
						</Grid.Row>
						</Grid>
						<div style={{marginLeft:"66px",marginRight:"66px",marginTop:"20px"}}>
							<Card.Group>
								{newsData}
							</Card.Group>
						</div>	
					</div>	
        )
    }
}