 let db, config

module.exports = (_db, _config) => {
	db = _db,
	config = _config
	return Genres
}

let Genres = class{
	
	static getById(genre_id){
		
		return new Promise((next) => {
			db.query('SELECT * from genres where genre_id = ?',  [genre_id])
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
					
					db.query('SELECT * from genres LIMIT 0, ?', [parseInt(max)])
					.then((result) => next(result))
					.catch((err) => next(err))
				
				
			}else if(max != undefined){
				next(new Error(config.errors.wrongMaxValue));
			}else{
				
				db.query('SELECT * from genres')
					.then((result) => next(result))
					.catch((err) => next(err))
			}
		})
	}
	
	static add(genre_name) {
		
		return new Promise((next) => {
			if(genre_name && genre_name.trim() != '')
			{
				genre_name = genre_name.trim()
				
				db.query('SELECT * from genres where genre_name = ?' , [genre_name])
					.then((result) => {
						if(result[0] != undefined)
						{
							next(new Error(config.errors.nameAlreadyIn));
						}else{
							return db.query('INSERT INTO genres(genre_name) VALUES (?)', [genre_name])	
						}
					
					})
					.then (() => {
						return db.query('SELECT * from genres where genre_name = ?' , [genre_name])
					})
					.then((result) => {
						next({
							id:result[0].genre_id,
							genre_name:result[0].genre_name
						})
										
					})
					.catch((err) => next(err))				

			}else{
				next(new Error(config.errors.noNameValue));
			}
		
		})

	}
	
	static update(genre_id, genre_name) {
		
		return new Promise((next) => {
			if(genre_name && genre_name.trim() != '')
			{
				genre_name = genre_name.trim()
				
				db.query('SELECT * from genres where genre_id = ?', [genre_id])
					.then((result) => {
						if(result[0] != undefined)
						{	
							return db.query('SELECT * from genres where genre_name = ? and genre_id != ?', [genre_name,genre_id])
						}
						else
							next(new Error(config.errors.wrongId))
					})
					.then ((result) => {
						if(result[0] != undefined){
							next (new Error(config.errors.sameName))
						}
						else{
							return db.query('UPDATE genres SET genre_name = ? where genre_id = ?' , [genre_name,genre_id])
						}
					})
					.then(() => next(true))
					.catch((err) => next(err))	
							
			
			}else{
				next(new Error(config.errors.noNameValue));
			}
		})
	}
	
	static delete(genre_id) {
		return new Promise((next) => {
			db.query('SELECT * from genres where genre_id = ?', [genre_id])
				.then((result) => {
					if(result[0] != undefined)
					{
						return db.query('DELETE from genres where genre_id =?', [genre_id])	
					}
					else
						next(new Error(config.errors.wrongId))
				})
				.then(() => next(true))
				.catch((err) => next(err))	
		})
	}
	
}