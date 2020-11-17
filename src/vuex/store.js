import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        error: null,
        openedList: 0,
        lists: [],
        userId: null
    },
    mutations: {
        addList(state, name) {
            const newList = {
                list: name,
                tasks: []
            }
            state.lists.push(newList);
        },
        changeOpenedList(state, indexList) {
            state.openedList = indexList;
        },
        addDo(state, newDo) {
            state.lists[state.openedList].tasks.push(newDo);
        },
        deleteList(state, indexDel) {
            state.lists = state.lists.filter((val, index) => {
                return index != indexDel;
            })
            console.log(state.lists)
        },
        deleteDo(state, indexDel) {
            state.lists[state.openedList].tasks = state.lists[state.openedList].tasks.filter((val, index) => {
                return index != indexDel;
            })
        },
        setError(state, error) {
            state.error = error;
        },
        isComplate(state, newStatus) {
            state.lists[state.openedList].tasks[newStatus.indexTask].complete = newStatus.status;
        }
    },
    actions: {
        async registerUser({dispatch}, {email, password}) {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            this.state.userId = await dispatch('getUserId');
        },
        async getUserId() {
            return firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
        },
        async login({commit, dispatch}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                this.state.userId = await dispatch('getUserId');
            } catch (e) {
                commit('setError', e.code);
                throw e
            }
        },
        async logout() {
            await firebase.auth().signOut();
            this.state.userId = null;
            this.state.lists = [];
            this.state.openedList = 0;
        },
        async addList({commit}, newList) {
            commit('addList', newList);
            await firebase.database().ref(`/users/${this.state.userId}`).set({
                lists: this.state.lists
            });
        },
        async addDo({commit}, newDo) {
            commit('addDo', newDo);
            await firebase.database().ref(`/users/${this.state.userId}`).set({
                lists: this.state.lists
            });
        },
        async deleteList({commit}, index) {
            commit('deleteList', index);
            await firebase.database().ref(`/users/${this.state.userId}`).set({
                lists: this.state.lists
            });
        },
        async deleteDo({commit}, index) {
            commit('deleteDo', index);
            await firebase.database().ref(`/users/${this.state.userId}`).set({
                lists: this.state.lists
            });
        },
        async isComplete({commit}, newStatus) {
            commit('isComplate', newStatus);
            await firebase.database().ref(`/users/${this.state.userId}`).set({
                lists: this.state.lists
            });
        },
        async getList() {
            let lists = await firebase.database().ref(`/users/${this.state.userId}/lists`).once('value');
            lists = lists.val();
            for (let list in lists) {
                if (!lists[list].tasks) {
                    lists[list].tasks = [];
                }
                this.state.lists.push(lists[list]);
            }
        },
        async loggedUser({dispatch}) {
            this.state.userId = await dispatch('getUserId');
            await dispatch('getList');
        },
        async changeImport() {
            await firebase.database().ref(`/users/${this.state.userId}`).set({
                lists: this.state.lists
            });
        }
    },
    getters: {
        LISTS(state) {
            return state.lists;
        },
        CASES(state) {
            return state.lists[state.openedList].tasks;
        }
    }
});

export default store;