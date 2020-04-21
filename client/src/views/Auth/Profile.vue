<template>
    <div>

        profile
        <br/>
        <br/>
        {{user.name}}
        <br/>
        {{user.username}}
        <br/>
        {{user.email}}
        <br/>
        {{user.date}}
        <br/>
        {{user.password}}

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'Profile',
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            ...mapActions(['getProfile'])
        },
        created() {
            this.getProfile();
        }
    }
</script>