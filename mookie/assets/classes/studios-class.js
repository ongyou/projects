 let db, config

module.exports = (_db, _config) => {
	db = _db,
	config = _config
	return Studios
}

let Studios = class{
	
	static getById(studio_id){
		
		return new Promise((next) => {
			db.query('SELECT * from studios where studio_id = ?',  [studio_id])
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
					
					db.query('SELECT * from studios LIMIT 0, ?', [parseInt(max)])
					.then((result) => next(result))
					.catch((err) => next(err))
				
				
			}else if(max != undefined){
				next(new Error(config.errors.wrongMaxValue));
			}else{
				
				db.query('SELECT * from studios')
					.then((result) => next(result))
					.catch((err) => next(err))
			}
		})
	}
	
	static add(studio_name) {
		
		return new Promise((next) => {
			if(studio_name && studio_name.trim() != '')
			{
				studio_name = studio_name.trim()
				
				db.query('SELECT * from studios where studio_name = ?' , [studio_name])
					.then((result) => {
						if(result[0] != undefined)
						{
							next(new Error(config.errors.nameAlreadyIn));
						}else{
							return db.query('INSERT INTO studios(studio_name) VALUES (?)', [studio_name])	
						}
					
					})
					.then (() => {
						return db.query('SELECT * from studios where studio_name = ?' , [studio_name])
					})
					.then((result) => {
						next({
							id:result[0].studio_id,
							studio_name:result[0].studio_name
						})
										
					})
					.catch((err) => next(err))				

			}else{
				next(new Error(config.errors.noNameValue));
			}
		
		})

	}
	
	static update(studio_id, studio_name) {
		
		return new Promise((next) => {
			if(studio_name && studio_name.trim() != '')
			{
				studio_name = studio_name.trim()
				
				db.query('SELECT * from studios where studio_id = ?', [studio_id])
					.then((result) => {
						if(result[0] != undefined)
						{	
							return db.query('SELECT * from studios where studio_name = ? and studio_id != ?', [studio_name,studio_id])
						}
						else
							next(new Error(config.errors.wrongId))
					})
					.then ((result) => {
						if(result[0] != undefined){
							next (new Error(config.errors.sameName))
						}
						else{
							return db.query('UPDATE studios SET studio_name = ? where studio_id = ?' , [studio_name,studio_id])
						}
					})
					.then(() => next(true))
					.catch((err) => next(err))	
							
			
			}else{
				next(new Error(config.errors.noNameValue));
			}
		})
	}
	
	static delete(studio_id) {
		return new Promise((next) => {
			db.query('SELECT * from studios where studio_id = ?', [studio_id])
				.then((result) => {
					if(result[0] != undefined)
					{
						return db.query('DELETE from studios where studio_id =?', [studio_id])	
					}
					else
						next(new Error(config.errors.wrongId))
				})
				.then(() => next(true))
				.catch((err) => next(err))	
		})
	}
	
}