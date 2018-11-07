<template>
  <div id="app">
		<router-link to="/login">login</router-link>
		<router-link to="/list">list</router-link>
		<transition name="fade">
		    <router-view></router-view>
	  </transition>
	  <p>{{counter}}</p>
	  <p>{{fullName}}</p>
	  <p>a模块中的state:   {{countA}}</p>
	  <p>a模块中的getter:  {{getCountA}}</p>
	  <p></p>
	  <button @click="changeSync">改变store中的count【+1】</button>
	  <button @click="changeCountA">改变A模块值</button>
		<!--<ToDo></ToDo>-->
		<router-view name="login"></router-view>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

var counts=0;
export default {
	created(){
		//console.log(this.$route.query.id);
	},
	data(){
		return{
			counts:0
		}
	},
	computed:{
		/*三种方法，第二种方法将vuex state里面的count传递给counter*/
//		...mapState(['count']),
		...mapState({
			counter:(state)=>state.count,
			countA:(state)=>state.a.countA
		}),
//		count(){
//			return this.$store.state.count
//		},
			
			/*getters两种方法*/
		...mapGetters({'fullName':'fullName','getCountA':'a/getCountA'}),
//		fullName(){
//			return this.$store.getters.fullName
//		}


		/*模块调用两种方法*/
//		countA(){
//			return this.$store.state.a.countA
//		}
	},
	mounted(){
		console.log(this.$store)
	},
	methods:{
		//mapMutations,mapActions,a/updateCountA是因为在store.js里面的a模块加入了namespaced
		...mapMutations(['updateCount','a/updateCountA']),
		...mapActions(['updateCountSync','a/add']),
		
		
		//dispatch触发action
		changeSync(){
			var newCounts=this.counts;
			newCounts++;
			this.counts=newCounts;
			
			/*两种方案*/
			//this.$store.dispatch("updateCountSync",{num:newCounts})
			this.updateCountSync({num:newCounts})
		},
		
		
		//commit触发mutations
		changeCount(){
			var newCounts=this.counts;
			newCounts++;
			this.counts=newCounts;
			
			/*两种方案*/
			//this.$store.commit('updateCount',newCounts)
			this.updateCount(newCounts);
		},
		
		
		changeCountA(){
			//a/updateCountA是因为在store.js里面的a模块加入了namespaced
			//this['a/updateCountA']('改变A模块之后的值');
			//this.updateCountA('改变A模块之后的值');
			this['a/add']({text:'改变A模块中action'})
		}
	},
	components:{
	}
}
</script>

<style  scoped>
#app{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#cover{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: .9;
  z-index: -1;
}
</style>


