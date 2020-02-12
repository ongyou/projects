 let db, config

module.exports = (_db, _config) => {
	db = _db,
	config = _config
	return Users
}

let Users = class{
	
	static getById(user_id){
		
		return new Promise((next) => {
			db.query('SELECT * from users where user_id = ?',  [user_id])
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
					
					db.query('SELECT * from users LIMIT 0, ?', [parseInt(max)])
					.then((result) => next(result))
					.catch((err) => next(err))
				
				
			}else if(max != undefined){
				next(new Error(config.errors.wrongMaxValue));
			}else{
				
				db.query('SELECT * from users')
					.then((result) => next(result))
					.catch((err) => next(err))
			}
		})
	}
	
	static add(user_name) {
		
		return new Promise((next) => {
			if(user_name && user_name.trim() != '')
			{
				user_name = user_name.trim()
				
				db.query('SELECT * from users where user_name = ?' , [user_name])
					.then((result) => {
						if(result[0] != undefined)
						{
							next(new Error(config.errors.nameAlreadyIn));
						}else{
							return db.query('INSERT INTO users(user_name) VALUES (?)', [user_name])	
						}
					
					})
					.then (() => {
						return db.query('SELECT * from users where user_name = ?' , [user_name])
					})
					.then((result) => {
						next({
							id:result[0].user_id,
							user_name:result[0].user_name
						})
										
					})
					.catch((err) => next(err))				

			}else{
				next(new Error(config.errors.noNameValue));
			}
		
		})

	}
	
	static update(user_id, user_name) {
		
		return new Promise((next) => {
			if(user_name && user_name.trim() != '')
			{
				user_name = user_name.trim()
				
				db.query('SELECT * from users where user_id = ?', [user_id])
					.then((result) => {
						if(result[0] != undefined)
						{	
							return db.query('SELECT * from users where user_name = ? and user_id != ?', [user_name,user_id])
						}
						else
							next(new Error(config.errors.wrongId))
					})
					.then ((result) => {
						if(result[0] != undefined){
							next (new Error(config.errors.sameName))
						}
						else{
							return db.query('UPDATE users SET user_name = ? where user_id = ?' , [user_name,user_id])
						}
					})
					.then(() => next(true))
					.catch((err) => next(err))	
							
			
			}else{
				next(new Error(config.errors.noNameValue));
			}
		})
	}
	
	static delete(user_id) {
		return new Promise((next) => {
			db.query('SELECT * from users where user_id = ?', [user_id])
				.then((result) => {
					if(result[0] != undefined)
					{
						return db.query('DELETE from users where user_id =?', [user_id])	
					}
					else
						next(new Error(config.errors.wrongId))
				})
				.then(() => next(true))
				.catch((err) => next(err))	
		})
	}
	
}