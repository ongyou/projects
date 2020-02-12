 let db, config

module.exports = (_db, _config) => {
	db = _db,
	config = _config
	return Movies
}

let Movies = class{
	
	static getById(movie_id){
		
		return new Promise((next) => {
			db.query('SELECT * from movies where movie_id = ?',  [movie_id])
				.then((result) => {
					if(result[0] != undefined)
						next(result[0])
					else
						next(new Error(config.errors.wrongId))
				})
				.catch((err) => next(err))
		})
		
	}
	
	static getAll(max){
		
		return new Promise((next) => {
			if(max != undefined && max > 0){
					
					db.query('SELECT * from movies LIMIT 0, ?', [parseInt(max)])
					.then((result) => next(result))
					.catch((err) => next(err))
				
				
			}else if(max != undefined){
				next(new Error(config.errors.wrongMaxValue));
			}else{
				
				db.query('SELECT * from movies')
					.then((result) => next(result))
					.catch((err) => next(err))
			}
		})
	}
	
	static add(movie_title, movie_original_title, movie_url_poster, movie_release_date, movie_release_french_date) {
		
		return new Promise((next) => {
			if(movie_title && movie_title.trim() != '')
			{
				movie_title = movie_title.trim()
				movie_original_title = movie_original_title.trim()
				movie_url_poster = movie_url_poster.trim()
				movie_release_date = movie_release_date.trim()
				movie_release_french_date = movie_release_french_date.trim()
				
				db.query('SELECT * from movies where movie_title = ?' , [movie_title])
					.then((result) => {
						if(result[0] != undefined)
						{
							next(new Error(config.errors.nameAlreadyIn));
						}else{
							return db.query('INSERT INTO movies(movie_title, movie_original_title) VALUES (?,?,?,?,?)', [movie_title, movie_original_title, movie_url_poster, movie_release_date, movie_release_french_date])	
						}
					
					})
					.then (() => {
						return db.query('SELECT * from movies where movie_title = ?' , [movie_title])
					})
					.then((result) => {
						next({
							id:result[0].movie_id,
							movie_title:result[0].movie_title,
							movie_original_title: result[0].movie_original_title
							
						})
										
					})
					.catch((err) => next(err))				

			}else{
				next(new Error(config.errors.noNameValue));
			}
		
		})

	}
	
	static update(movie_id, movie_title) {
		
		return new Promise((next) => {
			if(movie_title && movie_title.trim() != '')
			{
				movie_title = movie_title.trim()
				
				db.query('SELECT * from movies where movie_id = ?', [movie_id])
					.then((result) => {
						if(result[0] != undefined)
						{	
							return db.query('SELECT * from movies where movie_title = ? and movie_id != ?', [movie_title,movie_id])
						}
						else
							next(new Error(config.errors.wrongId))
					})
					.then ((result) => {
						if(result[0] != undefined){
							next (new Error(config.errors.sameName))
						}
						else{
							return db.query('UPDATE movies SET movie_title = ? where movie_id = ?' , [movie_title,movie_id])
						}
					})
					.then(() => next(true))
					.catch((err) => next(err))	
							
			
			}else{
				next(new Error(config.errors.noNameValue));
			}
		})
	}
	
	static delete(movie_id) {
		return new Promise((next) => {
			db.query('SELECT * from movies where movie_id = ?', [movie_id])
				.then((result) => {
					if(result[0] != undefined)
					{
						return db.query('DELETE from movies where movie_id =?', [movie_id])	
					}
					else
						next(new Error(config.errors.wrongId))
				})
				.then(() => next(true))
				.catch((err) => next(err))	
		})
	}
	
}