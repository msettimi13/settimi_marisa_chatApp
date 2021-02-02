(() => {
    console.log('fired');

    //load the socket library and make a connection
    const socket = io();

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: ""
        },

        created: function() {
            console.log('its alive!');
        },

        methods: {

        }
    }).$mount("#app");
})();