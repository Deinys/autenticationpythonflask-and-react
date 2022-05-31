

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			urlBase: "http://127.0.0.1:3000",
			endPoints: ["people","vehicles","planets"],
			people: JSON.parse(localStorage.getItem("people"))||[],
			// vehicles:JSON.parse(localStorage.getItem("vehicles"))||[],
			planets:JSON.parse(localStorage.getItem("planets"))||[], 
			favorites: JSON.parse(localStorage.getItem("favorites"))||[],
			token: localStorage.getItem("token") || ""
		},
		actions: {
			
			getContent: async ()=>{
				const store = getStore()
				if (!store.people.length && !store.planets.length){
					try{
						let responsePeople = await fetch(`${store.urlBase}/people`)
						let responsePlanets = await fetch(`${store.urlBase}/planets`)
						let dataPeople = await responsePeople.json()
						let dataPlanets = await responsePlanets.json()
						
						if (responsePeople.ok){
							localStorage.setItem("people", JSON.stringify(dataPeople))
							localStorage.setItem("planets", JSON.stringify(dataPlanets))
						}else{
							console.log("ocurrio un error")
						}
					}catch (error){
						console.log("ocurrio un error", error)
					}
				}
			},

			createUser: async (register) => {
				let store= getStore()
				const response = await fetch(`${store.urlBase}/user`,{
					method: 'POST',
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify(register)
				})
			},

			handleLogin: async (login)=>{
				let actions = getActions()
				let store = getStore()
				const response = await fetch(`${store.urlBase}/login`,{
					method: 'POST',
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify(login)
				})
				let data = await response.json()
				if (response.ok){
					setStore({
						...store,
						token: data.token
					})
					localStorage.setItem("token", data.token)
				}else{
					console.log("ocurrio un error")
				}
			},

			getFavorites: async ()=>{
				let store = getStore()
				let response = await fetch(`${store.urlBase}/user/favorite`,{
					method: 'GET',
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						}
				})
				let data = await response.json()
				if (response.ok){
					setStore({
						...store,
						favorites: data
					})
					localStorage.setItem("favorites", JSON.stringify(store.favorites))
				}
			},

			addFavorite: async (nature, nature_id, name)=>{
				let store = getStore()
				let actions = getActions()
				let body = {
					"name": name,
					"nature_id":nature_id
				}
				try{
					let response = await fetch(`${store.urlBase}/favorite/${nature}/${nature_id}`,{
						method: 'POST',
						headers: {
								"Content-Type": "application/json",
								"Authorization": `Bearer ${store.token}`
						},
						body: JSON.stringify(body)
					})
					let data = await response.json()
					console.log(data)
					if (response.ok){
						
						actions.getFavorites()
				}}catch(error){
					console.log("ocurrio un error", error)
				}
			},

			deleteFavorite: async (nature, nature_id)=>{
				let actions = getActions()
				let store= getStore()
				let response = await fetch(`${store.urlBase}/favorite/${nature}/${nature_id}`,{
					method: 'DELETE',
						headers: {
								"Content-Type": "application/json",
								"Authorization": `Bearer ${store.token}`
						}
				})
				if (response.ok){
					actions.getFavorites()
				}
			},

			handleLogout: ()=>{
				let store= getStore()
				setStore({
					...store,
					token: ""
				})
				localStorage.removeItem("token")
				localStorage.removeItem("favorites")
			}

			
				
		// 	getContent: async ()=>{ 
		// 		let store = getStore()
		// 		if (!store.people.length){
		// 			for (let endPoint of store.endPoints){
		// 			try{
		// 				let response = await fetch(`${store.urlBase}/${endPoint}`)
		// 				if (response.ok){
		// 					let data = await response.json()
		// 					data.results.map(async (item)=>{
		// 						let res = await fetch(`${store.urlBase}/${endPoint}/${item.uid}`)
		// 						let result = await res.json()
		// 						setStore({
		// 							...store,
		// 							[endPoint]:[...store[endPoint],result.result]
		// 						})
		// 						localStorage.setItem(endPoint, JSON.stringify(store[endPoint]))
		// 					})
						
		// 				}
		// 			}catch(error){
		// 				console.log(error)

		// 			} 
		// 		}}
				
				
				

		// },

		// addFavorites: (id)=>{
		// 	let store = getStore();
		// 	let exist = store.favorites.find((item)=>{
		// 		return(
		// 			item._id == id
		// 		)
		// 	})
		// 	if(!exist){
		// 		for(let endPoint of store.endPoints){
		// 			let favorite;
		// 			favorite = store[endPoint].find((item)=>{
		// 				return(
		// 					item._id == id
		// 				)
		// 			})
		// 			if(favorite){
		// 				setStore({
		// 					...store,
		// 					favorites: [...store.favorites, favorite]
		// 				})
		// 				localStorage.setItem("favorites", JSON.stringify(store.favorites))
		// 				return;
		// 			}
		// 		}
		// 	}else{
		// 		let newFavorite = store.favorites.filter((item)=>{
		// 			return(
		// 				item._id != id
		// 			)
		// 		})
		// 		setStore({
		// 			...store,
		// 			favorites: newFavorite
		// 		})
		// 		localStorage.setItem("favorites", JSON.stringify(store.favorites))
		// 	}
		// },
		
		// deleteFavorites: (id)=>{
		// 	let store = getStore()
		// 	let deleteFavorite = store.favorites.filter((item)=>{
		// 			return(
		// 				item._id != id
		// 			)
		// 		})
		// 		setStore({
		// 			...store,
		// 			favorites: deleteFavorite
		// 		})
		// 		localStorage.setItem("favorites", JSON.stringify(store.favorites))
		// 	}

		}
	};
};

export default getState;
