
// MODULES
	 require("babel-register");
	 const express = require("express");
	 const bodyParser = require("body-parser");
	 
	 const morgan = require("morgan")('dev');
	 const twig = require("twig");
	 const axios = require('axios');
	 
// Variables globales
	 const app = express();
	 const port = 8081;
 
	 const fetch = axios.create({
		  baseURL: 'http://localhost:8080/mookie-api/v1'
	});
	
	
// Middlewares
	app.use(morgan);
	app.use(bodyParser.json()) // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
	
// Routes 

	postFormData("http://localhost:8080/mookie-api/v1/countries","GET").then((countries) =>{
	postFormData("http://localhost:8080/mookie-api/v1/studios","GET").then((studios) =>{
	postFormData("http://localhost:8080/mookie-api/v1/genres","GET").then((genres) =>{
	postFormData("http://localhost:8080/mookie-api/v1/users","GET").then((users) =>{
	postFormData("http://localhost:8080/mookie-api/v1/groups","GET").then((groups) =>{
	postFormData("http://localhost:8080/mookie-api/v1/ages","GET").then((ages) =>{
				
		// Page d'accueil
		app.get('/',(req,res) => {
			res.render('index.twig',{
				name:req.params.name
			});
		});
		
		/************ Movies ************/
		
		// Page récupérant tous les films
		app.get('/movies',(req,res) => {
			apiCall(req.query.max ? '/movies?max='+req.query.max : '/movies', 'get', {}, res, (result) => {
				res.render('./movies/movies.twig',{
					movies:result
				});
			})
		})
		
		// Page récupérant un membre
		app.get('/movies/:id', (req, res) => {
			
			apiCall('/movies/'+req.params.id, 'get', {}, res, (result) => {
				res.render('./movies/movie.twig',{
					movie:result
				});
			})
		})
		
		// Modification d'un film
		app.get('/movies/edit/:id',(req, res) => {
			apiCall('/movies/'+req.params.id, 'get', {}, res, (result) => {
				res.render('./movies/edit_movie.twig',{
					movie:result
				});
			})
		})
		
		app.post('/movies/edit/:id', (req, res) => {
			apiCall('/movies/'+req.params.id, 'put', {
				name: req.body.name
			}, res, () => {
				res.redirect('/movies');
			})
		})
		
		// Suppression d'un film
		app.post('/movies/delete', (req, res) => {
			apiCall('/movies/'+req.body.id, 'delete', {}, res, () => {
				res.redirect('/movies');
			})
		})
		
		// Ajout d'un film
						
		app.get('/add-movie', (req, res) => {
			res.render('./movies/insert_movie.twig',{
				countries : countries,
				genres : genres,
				studios : studios,
				ages : ages
			});
		})
		
		app.post('/add-movie', (req, res) => {
			apiCall('/movies', 'post', {
				movie_title:req.body.movie_title,
				movie_original_title: req.body.movie_original_title,
				movie_url_poster: req.body.movie_url_poster,
				country_id: req.body.country_id,
				movie_release_date: req.body.movie_release_date,
				movie_release_french_date: req.body.movie_release_french_date,
				movie_duration: req.body.movie_duration,
				movie_synopsis: req.body.movie_synopsis,
				movie_rating_pro: req.body.movie_rating_pro,
				movie_rating_consumer: req.body.movie_rating_consumer,
				studio_id: req.body.studio_id
				
				}, res, () =>{
				res.redirect('/movies');
			})
		})							
									
									
	})
	})
	})
	})
	})
	})

// Lancement de l'application
	app.listen(port, () => console.log("started on port "+port));
	
// FONCTIONS

	function renderError(res, errMsg){
		res.render('error.twig',{
			errorMsg: errMsg
		})
	}
	
	function apiCall(url, method, data, res, next){
		fetch({
			method: method,
			url: url,
			data: data
		}).then((response) => {
				if(response.data.status == 'success'){
					next(response.data.result);
					
				}else{
					renderError(res, response.data.message)
				}
			})
			.catch((err) => renderError(res, err.message))
	
	}
	

function postFormData(url, data) {
   return fetch(url, {
    method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
  })
  .then(response => response.data.result)
}