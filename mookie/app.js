// API MOOKIE

// MODULES

	// Bibliothèque babel : Variables ES6
	require("babel-register");
	
	// Bibliothèque MYSQL
	const mysql = require("promise-mysql");
	
	// Bibliothèque EXPRESS
	const express = require("express");
	
	// Bibliothèque SWAGGER
	const expressOasGenerator = require('express-oas-generator');
	const swaggerUi = require('swagger-ui-express');
	
	// Bibliothèque Morgan en dev
	const morgan = require("morgan")('dev');
	
	// Bibliothèque Body-parser
	const bodyParser = require("body-parser");

	
// ASSETS

	// Fichier Fonctions
	const {success, error, checkAndChange} = require('./assets/functions');

	// Fichier SWAGGER
	//const swaggerDocument = require('./assets/swagger.json');

	// Fichier CONFIG
	const config = require("./assets/config");

// Declaration + connexion 

	// Connexion MYSQL
	mysql.createConnection({
		host: config.db.host,
		database : config.db.database,
		user: config.db.user, 
		password: config.db.password
	}).then((db) => {
		
		console.log("connected");
		
		// Variable express
		const app = express();
		
		// Generateur Swagger.json
		expressOasGenerator.init(app, {}); // to overwrite generated specification's values use second argument. 
		
		app.use(morgan);
		app.use(bodyParser.json()) // for parsing application/json
		app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
		

		// Declaration des classes 
		let Movies = require('./assets/classes/movies-class')(db, config)
		console.log(Movies)
		
		let TvShow = require('./assets/classes/tvshow-class')(db, config)
		console.log(TvShow)
		
		let Anime = require('./assets/classes/anime-class')(db, config)
		console.log(Anime)
		
		let Countries = require('./assets/classes/countries-class')(db, config)
		console.log(Countries)
		
		let Genres = require('./assets/classes/genres-class')(db, config)
		console.log(Genres)
		
		let Studios = require('./assets/classes/studios-class')(db, config)
		console.log(Studios)
		
		let Users = require('./assets/classes/users-class')(db, config)
		console.log(Users)
		
		let Groups = require('./assets/classes/groups-class')(db, config)
		console.log(Groups)
		
		let Ages = require('./assets/classes/ages-class')(db, config)
		console.log(Ages)
				
		// Declaration de la route
		let ElementsRouter = express.Router();
		
		/******************** MOVIES ************************/
	
		ElementsRouter.route('/movies/:id')
		
			// Récupère un film avec son ID
			.get(async (req, res) => {
				
				let movie = await Movies.getById(req.params.id);
				res.json(checkAndChange(movie)) 
			})

			// Modifie un film avec ID
			.put(async (req, res) => {

				let updateMovies = await Movies.update(req.params.id, req.body.movie_title)
				res.json(checkAndChange(updateMovies)) 				
			})
			
			// Supprime un film avec ID
			.delete(async(req, res) => {

				let deleteMovies = await Movies.delete(req.params.id)
				res.json(checkAndChange(deleteMovies)) 
				
			})		
		
		ElementsRouter.route('/movies/')
			
			// Recupere tous les films
			.get(async (req, res) => {

				let allMovies = await Movies.getAll(req.query.max)
				res.json(checkAndChange(allMovies)) 
			})
		
			// Ajoute un film
			.post(async(req, res) => {

				let addMovie = await Movies.add(req.body.movie_title, req.body.movie_original_title, req.body.movie_url_poster, req.body.movie_release_date, req.body.movie_release_french_date)
				res.json(checkAndChange(addMovie)) 
			})
		
		/******************** TV SHOW ************************/

		ElementsRouter.route('/tvshow/:id')
		
			// Récupère une série avec son ID
			.get(async (req, res) => {
				
				let tvshow = await TvShow.getById(req.params.id);
				res.json(checkAndChange(tvshow)) 
			})

			// Modifie une série avec ID
			.put(async (req, res) => {

				let updateTvshow = await TvShow.update(req.params.id, req.body.tvshow_title)
				res.json(checkAndChange(updateTvshow)) 				
			})
			
			// Supprime une série avec ID
			.delete(async(req, res) => {

				let deleteTvshow = await TvShow.delete(req.params.id)
				res.json(checkAndChange(deleteTvshow)) 
				
			})		
		
		ElementsRouter.route('/tvshow/')
			
			// Recupere toutes les séries
			.get(async (req, res) => {

				let allTvshow = await TvShow.getAll(req.query.max)
				res.json(checkAndChange(allTvshow)) 
			})
		
			// Ajoute une série
			.post(async(req, res) => {

				let addTvshow = await TvShow.add(req.body.tvshow_title)
				res.json(checkAndChange(addTvshow)) 
			})
		
		/******************** ANIME ************************/

		ElementsRouter.route('/anime/:id')
		
			// Récupère un anime avec son ID
			.get(async (req, res) => {
				
				let anime = await Anime.getById(req.params.id);
				res.json(checkAndChange(anime)) 
			})

			// Modifie un anime avec ID
			.put(async (req, res) => {

				let updateAnime = await Anime.update(req.params.id, req.body.anime_title)
				res.json(checkAndChange(updateAnime)) 				
			})
			
			// Supprime un anime avec ID
			.delete(async(req, res) => {

				let deleteAnime = await Anime.delete(req.params.id)
				res.json(checkAndChange(deleteAnime)) 
				
			})		
		
		ElementsRouter.route('/anime/')
			
			// Recupere toutes les séries
			.get(async (req, res) => {

				let allAnime = await Anime.getAll(req.query.max)
				res.json(checkAndChange(allAnime)) 
			})
		
			// Ajoute un anime
			.post(async(req, res) => {

				let addAnime = await Anime.add(req.body.anime_title)
				res.json(checkAndChange(addAnime)) 
			})
		
		/******************** COUNTRY ************************/

		ElementsRouter.route('/countries/:id')
		
			// Récupère un pays avec son ID
			.get(async (req, res) => {
				
				let country = await Countries.getById(req.params.id);
				res.json(checkAndChange(country)) 
			})

			// Modifie un pays avec ID
			.put(async (req, res) => {

				let updateCountry = await Countries.update(req.params.id, req.body.country_name)
				res.json(checkAndChange(updateCountry)) 				
			})
			
			// Supprime un pays avec ID
			.delete(async(req, res) => {

				let deleteCountry = await Countries.delete(req.params.id)
				res.json(checkAndChange(deleteCountry)) 
				
			})		
		
		ElementsRouter.route('/countries/')
			
			// Recupere toutes les séries
			.get(async (req, res) => {

				let allCountries = await Countries.getAll(req.query.max)
				res.json(checkAndChange(allCountries)) 
			})
		
			// Ajoute une série
			.post(async(req, res) => {

				let addCountry = await Countries.add(req.body.country_name)
				res.json(checkAndChange(addCountry)) 
			})
		
		/******************** Genres ************************/

		ElementsRouter.route('/genres/:id')
		
			// Récupère un genre avec son ID
			.get(async (req, res) => {
				
				let genre = await Genres.getById(req.params.id);
				res.json(checkAndChange(genre)) 
			})

			// Modifie un genre avec ID
			.put(async (req, res) => {

				let updateGenre = await Genres.update(req.params.id, req.body.genre_name)
				res.json(checkAndChange(updateGenre)) 				
			})
			
			// Supprime un genre avec ID
			.delete(async(req, res) => {

				let deleteGenre = await Genres.delete(req.params.id)
				res.json(checkAndChange(deleteGenre)) 
				
			})		
		
		ElementsRouter.route('/genres/')
			
			// Recupere toutes les séries
			.get(async (req, res) => {

				let allGenres = await Genres.getAll(req.query.max)
				res.json(checkAndChange(allGenres)) 
			})
		
			// Ajoute une série
			.post(async(req, res) => {

				let addGenre = await Genres.add(req.body.country_name)
				res.json(checkAndChange(addGenre)) 
			})
			
		/******************** AGES ************************/

		ElementsRouter.route('/ages/:id')
		
			// Récupère un age avec son ID
			.get(async (req, res) => {
				
				let age = await Ages.getById(req.params.id);
				res.json(checkAndChange(age)) 
			})

			// Modifie un age avec ID
			.put(async (req, res) => {

				let updateAge = await Ages.update(req.params.id, req.body.age_name)
				res.json(checkAndChange(updateAge)) 				
			})
			
			// Supprime un age avec ID
			.delete(async(req, res) => {

				let deleteAge = await Ages.delete(req.params.id)
				res.json(checkAndChange(deleteAge)) 
				
			})		
		
		ElementsRouter.route('/ages/')
			
			// Recupere tous les ages
			.get(async (req, res) => {

				let allAges = await Ages.getAll(req.query.max)
				res.json(checkAndChange(allAges)) 
			})
		
			// Ajoute un groupe
			.post(async(req, res) => {

				let addAge = await Ages.add(req.body.age_name)
				res.json(checkAndChange(addAge)) 
			})

		
		/******************** Studios ************************/

		ElementsRouter.route('/studios/:id')
		
			// Récupère un studio avec son ID
			.get(async (req, res) => {
				
				let studio = await Studios.getById(req.params.id);
				res.json(checkAndChange(studio)) 
			})

			// Modifie un studio avec ID
			.put(async (req, res) => {

				let updateStudio = await Studios.update(req.params.id, req.body.studio_name)
				res.json(checkAndChange(updateStudio)) 				
			})
			
			// Supprime un studio avec ID
			.delete(async(req, res) => {

				let deleteStudio = await Studios.delete(req.params.id)
				res.json(checkAndChange(deleteStudio)) 
				
			})		
		
		ElementsRouter.route('/studios/')
			
			// Recupere tous les studios
			.get(async (req, res) => {

				let allStudios = await Studios.getAll(req.query.max)
				res.json(checkAndChange(allStudios)) 
			})
		
			// Ajoute un studio
			.post(async(req, res) => {

				let addStudio = await Studios.add(req.body.studio_name)
				res.json(checkAndChange(addStudio)) 
			})
		
		/******************** Users ************************/

		ElementsRouter.route('/users/:id')
		
			// Récupère un utilisateur avec son ID
			.get(async (req, res) => {
				
				let user = await Users.getById(req.params.id);
				res.json(checkAndChange(user)) 
			})

			// Modifie un utilisateur avec ID
			.put(async (req, res) => {

				let updateUser = await Users.update(req.params.id, req.body.user_name)
				res.json(checkAndChange(updateUser)) 				
			})
			
			// Supprime un utilisateur avec ID
			.delete(async(req, res) => {

				let deleteUser = await Users.delete(req.params.id)
				res.json(checkAndChange(deleteUser)) 
				
			})		
		
		ElementsRouter.route('/users/')
			
			// Recupere tous les utilisateurs
			.get(async (req, res) => {

				let allUsers = await Users.getAll(req.query.max)
				res.json(checkAndChange(allUsers)) 
			})
		
			// Ajoute un utilisateur
			.post(async(req, res) => {

				let addUser = await Users.add(req.body.user_name)
				res.json(checkAndChange(addUser)) 
			})
		
		/******************** Groups ************************/

		ElementsRouter.route('/groups/:id')
		
			// Récupère un groupe avec son ID
			.get(async (req, res) => {
				
				let group = await Groups.getById(req.params.id);
				res.json(checkAndChange(group)) 
			})

			// Modifie un groupe avec ID
			.put(async (req, res) => {

				let updateGroup = await Groups.update(req.params.id, req.body.group_name)
				res.json(checkAndChange(updateGroup)) 				
			})
			
			// Supprime un groupe avec ID
			.delete(async(req, res) => {

				let deleteGroup = await Groups.delete(req.params.id)
				res.json(checkAndChange(deleteGroup)) 
				
			})		
		
		ElementsRouter.route('/groups/')
			
			// Recupere tous les groupes
			.get(async (req, res) => {

				let allGroups = await Groups.getAll(req.query.max)
				res.json(checkAndChange(allGroups)) 
			})
		
			// Ajoute un groupe
			.post(async(req, res) => {

				let addGroup = await Groups.add(req.body.group_name)
				res.json(checkAndChange(addGroup)) 
			})

		
		// Ajout des routes
		app.use(config.rootAPI, ElementsRouter)
		
		
		
		

		// Listen
		app.listen( config.port, () => console.log('started on port '+ config.port));

	}).catch((err) => {
		console.log('Error during database connection');
		console.log(err.message);
	})