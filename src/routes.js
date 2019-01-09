import React from 'react'
import {Route} from 'react-router-dom'
import NewsList from './News/NewsList'
import topHeadlines from './News/TopHeadlines'
import topNews from './News/TopNews'

const routes = (
  	<div>
			<Route exact path="/" component={NewsList}/>
			<Route path="/topheadlines/:id" component={topHeadlines}/>
			<Route path="/topnews" component={topNews}/>
    </div>
)

export default routes;

