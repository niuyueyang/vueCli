import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default ()=>{
	const store= new Vuex.Store({
		state:defaultState,
		mutations,
		getters,
		actions,
		modules:{
			a:{
				namespaced:true,
				state:{
					countA:'A模块中state'
				},
				mutations:{
					updateCountA(state,countAText){
						state.countA=countAText;
					}
				},
				getters:{
					//rootCount是根组件
					getCountA(state,getters,rootState){
						return state.countA+' '+rootState.rootCount+' '+rootState.b.countB
					}
				},
				actions:{
					//ctx是该模块
					add(ctx,data){
						console.log(ctx.rootState.a.countA)
						ctx.commit('updateCountA',data.text)
					}
//					add({state,commit,rootState}){
//						console.log(rootState.text)
//						commit('updateCountA',state.text)
//					}
				}
			},
			b:{
				state:{
					countB:'B模块中state'
				}
			}
		}
	})
	
	//热更替
	if(module.hot){
		module.hot.accept([
			'./state/state',
			'./mutations/mutations',
			'./getters/getters',
			'./actions/actions'
		],()=>{
			const newState=require('./state/state').default;
			const newGetters=require('./getters/getters').default;
			const newMutations=require('./mutations/mutations').default;
			const newActions=require('./actions/actions').default;
			
			store.hotUpdate({
				state:newState,
				getters:newGetters,
				mutations:newMutations,
				actions:newActions
			})
		})
	}
	
	return store;
}
