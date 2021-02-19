import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired');

    //load the socket library and make a connection
    const socket = io();

    //messenger service event handling -> incoming from the manager 
    function setUserId({sID, message}) {
        // incoming connected event with data
        // debugger;
        vm.socketID = sID;
    }

    function appendMessage(message) {
        //debugger;
        vm.messages.push(message);
    }

    function userTyping() {
        console.log('user typing'); // got the user typing to load in console but not too sure why it doesnt pop up, 
        //it sometimes pops up when the page is refreshed but it wont show other than that
    }

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: "",
            socketID: "",
            message: "",
            typing: false
        },

        watch: {
            message(value) {
            value ? socket.emit('typing', this.nickname) : socket.emit('stoptyping');
            }
        },
        
        created() {
            socket.on('typing', (data) => {
                console.log(data);
                this.typing = data || 'Anonymous';
            });
            socket.on('stoptyping', () => {
                this.typing = false;
            });
        },

        created: function() {
            console.log('its alive!');
        },

        methods: {
            dispatchMessage() {
                //debugger;
                socket.emit('chatmessage', {content: this.message, name: this.nickname || "Anonymous" });

                this.message="";
            },
            
            userTyping() {
                socket.emit('typing', this.nickname);
            },
        },

        components: {
            newmessage: ChatMessage
        }
        
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage);
    socket.addEventListener('typing', userTyping);
})();