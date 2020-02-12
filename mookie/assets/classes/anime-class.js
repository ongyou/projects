 let db, config

module.exports = (_db, _config) => {
	db = _db,
	config = _config
	return Anime
}

let Anime = class{
	
	static getById(anime_id){
		
		return new Promise((next) => {
			db.query('SELECT * from anime where anime_id = ?',  [anime_id])
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
					
					db.query('SELECT * from anime LIMIT 0, ?', [parseInt(max)])
					.then((result) => next(result))
					.catch((err) => next(err))
				
				
			}else if(max != undefined){
				next(new Error(config.errors.wrongMaxValue));
			}else{
				
				db.query('SELECT * from anime')
					.then((result) => next(result))
					.catch((err) => next(err))
			}
		})
	}
	
	static add(anime_title) {
		
		return new Promise((next) => {
			if(anime_title && anime_title.trim() != '')
			{
				anime_title = anime_title.trim()
				
				db.query('SELECT * from anime where anime_title = ?' , [anime_title])
					.then((result) => {
						if(result[0] != undefined)
						{
							next(new Error(config.errors.nameAlreadyIn));
						}else{
							return db.query('INSERT INTO anime(anime_title) VALUES (?)', [anime_title])	
						}
					
					})
					.then (() => {
						return db.query('SELECT * from anime where anime_title = ?' , [anime_title])
					})
					.then((result) => {
						next({
							id:result[0].anime_id,
							anime_title:result[0].anime_title
						})
										
					})
					.catch((err) => next(err))				

			}else{
				next(new Error(config.errors.noNameValue));
			}
		
		})

	}
	
	static update(anime_id, anime_title) {
		
		return new Promise((next) => {
			if(anime_title && anime_title.trim() != '')
			{
				anime_title = anime_title.trim()
				
				db.query('SELECT * from anime where anime_id = ?', [anime_id])
					.then((result) => {
						if(result[0] != undefined)
						{	
							return db.query('SELECT * from anime where anime_title = ? and anime_id != ?', [anime_title,anime_id])
						}
						else
							next(new Error(config.errors.wrongId))
					})
					.then ((result) => {
						if(result[0] != undefined){
							next (new Error(config.errors.sameName))
						}
						else{
							return db.query('UPDATE anime SET anime_title = ? where anime_id = ?' , [anime_title,anime_id])
						}
					})
					.then(() => next(true))
					.catch((err) => next(err))	
							
			
			}else{
				next(new Error(config.errors.noNameValue));
			}
		})
	}
	
	static delete(anime_id) {
		return new Promise((next) => {
			db.query('SELECT * from anime where anime_id = ?', [anime_id])
				.then((result) => {
					if(result[0] != undefined)
					{
						return db.query('DELETE from anime where anime_id =?', [anime_id])	
					}
					else
						next(new Error(config.errors.wrongId))
				})
				.then(() => next(true))
				.catch((err) => next(err))	
		})
	}
	
}