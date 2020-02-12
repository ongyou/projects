 let db, config

module.exports = (_db, _config) => {
	db = _db,
	config = _config
	return Tvshow
}

let Tvshow = class{
	
	static getById(tvshow_id){
		
		return new Promise((next) => {
			db.query('SELECT * from tvshow where tvshow_id = ?',  [tvshow_id])
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
					
					db.query('SELECT * from tvshow LIMIT 0, ?', [parseInt(max)])
					.then((result) => next(result))
					.catch((err) => next(err))
				
				
			}else if(max != undefined){
				next(new Error(config.errors.wrongMaxValue));
			}else{
				
				db.query('SELECT * from tvshow')
					.then((result) => next(result))
					.catch((err) => next(err))
			}
		})
	}
	
	static add(tvshow_title) {
		
		return new Promise((next) => {
			if(tvshow_title && tvshow_title.trim() != '')
			{
				tvshow_title = tvshow_title.trim()
				
				db.query('SELECT * from tvshow where tvshow_title = ?' , [tvshow_title])
					.then((result) => {
						if(result[0] != undefined)
						{
							next(new Error(config.errors.nameAlreadyIn));
						}else{
							return db.query('INSERT INTO tvshow(tvshow_title) VALUES (?)', [tvshow_title])	
						}
					
					})
					.then (() => {
						return db.query('SELECT * from tvshow where tvshow_title = ?' , [tvshow_title])
					})
					.then((result) => {
						next({
							id:result[0].tvshow_id,
							tvshow_title:result[0].tvshow_title
						})
										
					})
					.catch((err) => next(err))				

			}else{
				next(new Error(config.errors.noNameValue));
			}
		
		})

	}
	
	static update(tvshow_id, tvshow_title) {
		
		return new Promise((next) => {
			if(tvshow_title && tvshow_title.trim() != '')
			{
				tvshow_title = tvshow_title.trim()
				
				db.query('SELECT * from tvshow where tvshow_id = ?', [tvshow_id])
					.then((result) => {
						if(result[0] != undefined)
						{	
							return db.query('SELECT * from tvshow where tvshow_title = ? and tvshow_id != ?', [tvshow_title,tvshow_id])
						}
						else
							next(new Error(config.errors.wrongId))
					})
					.then ((result) => {
						if(result[0] != undefined){
							next (new Error(config.errors.sameName))
						}
						else{
							return db.query('UPDATE tvshow SET tvshow_title = ? where tvshow_id = ?' , [tvshow_title,tvshow_id])
						}
					})
					.then(() => next(true))
					.catch((err) => next(err))	
							
			
			}else{
				next(new Error(config.errors.noNameValue));
			}
		})
	}
	
	static delete(tvshow_id) {
		return new Promise((next) => {
			db.query('SELECT * from tvshow where tvshow_id = ?', [tvshow_id])
				.then((result) => {
					if(result[0] != undefined)
					{
						return db.query('DELETE from tvshow where tvshow_id =?', [tvshow_id])	
					}
					else
						next(new Error(config.errors.wrongId))
				})
				.then(() => next(true))
				.catch((err) => next(err))	
		})
	}
	
}