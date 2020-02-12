 let db, config

module.exports = (_db, _config) => {
	db = _db,
	config = _config
	return Groups
}

let Groups = class{
	
	static getById(group_id){
		
		return new Promise((next) => {
			db.query('SELECT * from groups where group_id = ?',  [group_id])
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
					
					db.query('SELECT * from groups LIMIT 0, ?', [parseInt(max)])
					.then((result) => next(result))
					.catch((err) => next(err))
				
				
			}else if(max != undefined){
				next(new Error(config.errors.wrongMaxValue));
			}else{
				
				db.query('SELECT * from groups')
					.then((result) => next(result))
					.catch((err) => next(err))
			}
		})
	}
	
	static add(group_name) {
		
		return new Promise((next) => {
			if(group_name && group_name.trim() != '')
			{
				group_name = group_name.trim()
				
				db.query('SELECT * from groups where group_name = ?' , [group_name])
					.then((result) => {
						if(result[0] != undefined)
						{
							next(new Error(config.errors.nameAlreadyIn));
						}else{
							return db.query('INSERT INTO groups(group_name) VALUES (?)', [group_name])	
						}
					
					})
					.then (() => {
						return db.query('SELECT * from groups where group_name = ?' , [group_name])
					})
					.then((result) => {
						next({
							id:result[0].group_id,
							group_name:result[0].group_name
						})
										
					})
					.catch((err) => next(err))				

			}else{
				next(new Error(config.errors.noNameValue));
			}
		
		})

	}
	
	static update(group_id, group_name) {
		
		return new Promise((next) => {
			if(group_name && group_name.trim() != '')
			{
				group_name = group_name.trim()
				
				db.query('SELECT * from groups where group_id = ?', [group_id])
					.then((result) => {
						if(result[0] != undefined)
						{	
							return db.query('SELECT * from groups where group_name = ? and group_id != ?', [group_name,group_id])
						}
						else
							next(new Error(config.errors.wrongId))
					})
					.then ((result) => {
						if(result[0] != undefined){
							next (new Error(config.errors.sameName))
						}
						else{
							return db.query('UPDATE groups SET group_name = ? where group_id = ?' , [group_name,group_id])
						}
					})
					.then(() => next(true))
					.catch((err) => next(err))	
							
			
			}else{
				next(new Error(config.errors.noNameValue));
			}
		})
	}
	
	static delete(group_id) {
		return new Promise((next) => {
			db.query('SELECT * from groups where group_id = ?', [group_id])
				.then((result) => {
					if(result[0] != undefined)
					{
						return db.query('DELETE from groups where group_id =?', [group_id])	
					}
					else
						next(new Error(config.errors.wrongId))
				})
				.then(() => next(true))
				.catch((err) => next(err))	
		})
	}
	
}