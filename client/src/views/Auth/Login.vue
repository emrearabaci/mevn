<template>
    <div>

        login
        <br/>
        <br/>

        <form @submit.prevent="loginUser">
            <label for="username">username
                <input v-model="username" placeholder="username" id="username" type="text"/>
            </label>
            <br/>
            <label for="password">password
                <input v-model="password" placeholder="password" id="password" type="password"/>
            </label>
            <br/>
            <button type="submit">Login</button>
        </form>

    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'Login',
        data: () => ({
            username: '',
            password: '',
        }),
        methods: {
            ...mapActions(['login']),
            loginUser() {
                let user = {
                    username: this.username,
                    password: this.password
                };
                this.login(user)
                    .then(res => {
                        if (res.data.success) {
                            this.$router.push('/profile')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>