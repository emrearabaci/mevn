<template>
    <div>

        register
        <br/>
        <br/>

        <form @submit.prevent="registerUser">
            <label for="name">name
                <input v-model="name" placeholder="name" id="name" type="text"/>
            </label>
            <br/>
            <label for="username">username
                <input v-model="username" placeholder="username" id="username" type="text"/>
            </label>
            <br/>
            <label for="email">email
                <input v-model="email" placeholder="email" id="email" type="text"/>
            </label>
            <br/>
            <label for="password">password
                <input v-model="password" placeholder="password" id="password" type="password"/>
            </label>
            <br/>
            <label for="confirmPassword">confirm password
                <input v-model="confirmPassword" placeholder="confirmPassword" id="confirmPassword" type="password"/>
            </label>
            <br/>
            <button type="submit">register</button>
        </form>

    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'Register',
        data: () => ({
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }),
        methods: {
            ...mapActions(['register']),
            registerUser() {
                console.log(this.name + ' ' + this.username + ' ' + this.email + ' ' + this.password + ' ' + this.confirmPassword)
                let user = {
                    name: this.name,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword
                };
                this.register(user)
                    .then(res => {
                        if (res.data.success) {
                            this.$router.push('/login')
                        }
                    })
            }
        }
    }
</script>