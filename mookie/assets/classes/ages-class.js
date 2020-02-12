 let db, config

module.exports = (_db, _config) => {
	db = _db,
	config = _config
	return Ages
}

let Ages = class{
	
	static getById(age_id){
		
		return new Promise((next) => {
			db.query('SELECT * from ages where age_id = ?',  [age_id])
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
					
					db.query('SELECT * from ages LIMIT 0, ?', [parseInt(max)])
					.then((result) => next(result))
					.catch((err) => next(err))
				
				
			}else if(max != undefined){
				next(new Error(config.errors.wrongMaxValue));
			}else{
				
				db.query('SELECT * from ages')
					.then((result) => next(result))
					.catch((err) => next(err))
			}
		})
	}
	
	static add(age_name) {
		
		return new Promise((next) => {
			if(age_name && age_name.trim() != '')
			{
				age_name = age_name.trim()
				
				db.query('SELECT * from ages where age_name = ?' , [age_name])
					.then((result) => {
						if(result[0] != undefined)
						{
							next(new Error(config.errors.nameAlreadyIn));
						}else{
							return db.query('INSERT INTO ages(age_name) VALUES (?)', [age_name])	
						}
					
					})
					.then (() => {
						return db.query('SELECT * from ages where age_name = ?' , [age_name])
					})
					.then((result) => {
						next({
							id:result[0].age_id,
							age_name:result[0].age_name
						})
										
					})
					.catch((err) => next(err))				

			}else{
				next(new Error(config.errors.noNameValue));
			}
		
		})

	}
	
	static update(age_id, age_name) {
		
		return new Promise((next) => {
			if(age_name && age_name.trim() != '')
			{
				age_name = age_name.trim()
				
				db.query('SELECT * from ages where age_id = ?', [age_id])
					.then((result) => {
						if(result[0] != undefined)
						{	
							return db.query('SELECT * from ages where age_name = ? and age_id != ?', [age_name,age_id])
						}
						else
							next(new Error(config.errors.wrongId))
					})
					.then ((result) => {
						if(result[0] != undefined){
							next (new Error(config.errors.sameName))
						}
						else{
							return db.query('UPDATE ages SET age_name = ? where age_id = ?' , [age_name,age_id])
						}
					})
					.then(() => next(true))
					.catch((err) => next(err))	
							
			
			}else{
				next(new Error(config.errors.noNameValue));
			}
		})
	}
	
	static delete(age_id) {
		return new Promise((next) => {
			db.query('SELECT * from ages where age_id = ?', [age_id])
				.then((result) => {
					if(result[0] != undefined)
					{
						return db.query('DELETE from ages where age_id =?', [age_id])	
					}
					else
						next(new Error(config.errors.wrongId))
				})
				.then(() => next(true))
				.catch((err) => next(err))	
		})
	}
	
}