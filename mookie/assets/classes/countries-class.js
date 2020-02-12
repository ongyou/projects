 let db, config

module.exports = (_db, _config) => {
	db = _db,
	config = _config
	return Countries
}

let Countries = class{
	
	static getById(country_id){
		
		return new Promise((next) => {
			db.query('SELECT * from countries where country_id = ?',  [country_id])
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
					
					db.query('SELECT * from countries LIMIT 0, ?', [parseInt(max)])
					.then((result) => next(result))
					.catch((err) => next(err))
				
				
			}else if(max != undefined){
				next(new Error(config.errors.wrongMaxValue));
			}else{
				
				db.query('SELECT * from countries')
					.then((result) => next(result))
					.catch((err) => next(err))
			}
		})
	}
	
	static add(country_name) {
		
		return new Promise((next) => {
			if(country_name && country_name.trim() != '')
			{
				country_name = country_name.trim()
				
				db.query('SELECT * from countries where country_name = ?' , [country_name])
					.then((result) => {
						if(result[0] != undefined)
						{
							next(new Error(config.errors.nameAlreadyIn));
						}else{
							return db.query('INSERT INTO countries(country_name) VALUES (?)', [country_name])	
						}
					
					})
					.then (() => {
						return db.query('SELECT * from countries where country_name = ?' , [country_name])
					})
					.then((result) => {
						next({
							id:result[0].country_id,
							country_name:result[0].country_name
						})
										
					})
					.catch((err) => next(err))				

			}else{
				next(new Error(config.errors.noNameValue));
			}
		
		})

	}
	
	static update(country_id, country_name) {
		
		return new Promise((next) => {
			if(country_name && country_name.trim() != '')
			{
				country_name = country_name.trim()
				
				db.query('SELECT * from countries where country_id = ?', [country_id])
					.then((result) => {
						if(result[0] != undefined)
						{	
							return db.query('SELECT * from countries where country_name = ? and country_id != ?', [country_name,country_id])
						}
						else
							next(new Error(config.errors.wrongId))
					})
					.then ((result) => {
						if(result[0] != undefined){
							next (new Error(config.errors.sameName))
						}
						else{
							return db.query('UPDATE countries SET country_name = ? where country_id = ?' , [country_name,country_id])
						}
					})
					.then(() => next(true))
					.catch((err) => next(err))	
							
			
			}else{
				next(new Error(config.errors.noNameValue));
			}
		})
	}
	
	static delete(country_id) {
		return new Promise((next) => {
			db.query('SELECT * from countries where country_id = ?', [country_id])
				.then((result) => {
					if(result[0] != undefined)
					{
						return db.query('DELETE from countries where country_id =?', [country_id])	
					}
					else
						next(new Error(config.errors.wrongId))
				})
				.then(() => next(true))
				.catch((err) => next(err))	
		})
	}
	
}