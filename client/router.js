import Router from 'vue-router'
import Routes from './routes'


export default function createRouter() {
	return new Router({
		routes:Routes,
		mode:'history',
		linkActiveClass:'active-link',
		linkExactActiveClass:'exact-active-link',
		scrollBehavior(to,from,savePosition){
			console.log(to,from)
			if(savePosition){
				return savePosition
			}else{
				return {x:0,y:0}
			}
		},
//		parseQuery(query){
//			
//		},
//		stringifyQuery(obj){
//			
//		},
		fallback:true
	})
}
