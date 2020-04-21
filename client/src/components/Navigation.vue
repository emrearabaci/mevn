<template>
    <div>

        <router-link to="/">
            <button>
                home
            </button>
        </router-link>

        <router-link to="/about">
            <button>
                about
            </button>
        </router-link>

        <router-link v-if="!isLoggedIn" to="/login">
            <button>
                login
            </button>
        </router-link>

        <router-link v-if="!isLoggedIn" to="register">
            <button>
                register
            </button>
        </router-link>

        <router-link v-if="isLoggedIn" to="/profile">
            <button>
                profile
            </button>
        </router-link>

        <a v-if="isLoggedIn" to="/logout">
            <button @click.prevent="logoutUser">
                logout
            </button>
        </a>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Navigation',
        computed: {
            ...mapGetters(['isLoggedIn'])
        },
        methods: {
            ...mapActions(['logout']),
            logoutUser() {
                this.logout()
            }
        }
    }
</script>