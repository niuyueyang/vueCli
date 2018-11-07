export default{
	updateCountSync(store,data){
		store.commit("updateCount",data.num)
	}
}
