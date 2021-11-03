const socket = io('https://127.0.0.1:3000');

let username = prompt('Enter Username', "anonymous");
while (username === null) {
    username = prompt('Abe bhen ke lund naam daal, smajha teri bhen ki choot :', "anonymous");
}

socket.emit('new-user', username);

var tmpUser = {};
tmpUser.username = username;
tmpUser.joinedAt = Date.now();


if (tmpUser != null) {
    userCard(tmpUser);
} else {
}

socket.on('greetings', (users) => {
    console.log(users);
    updateUserScreen(users);
});

socket.on('disconnected', (users) => {
    console.log(users);
    updateUserScreen(users);
});

let msgString;
document.querySelector('.send').addEventListener('click', (e) => {
    msgString = document.querySelector('.text-input').value;
    console.log(msgString);
    socket.emit('new-message', msgString);
});

socket.on('msg-received', (pack) => {
    createMessageCard(pack.msg, pack.user.username);
    document.querySelector('.chat-wrap').scrollTo(0, document.querySelector('.chat-wrap').scrollHeight);
});


// ------------------------------------------------------------
// # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # #
// #                                           #
// #           Creation of elements            #
// #      also the Appending of Elemnts        #
// #                                           #
// #                                           #
// # # # # # # # # # # # # # # # # # # # # # # # 
// # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # #
// ------------------------------------------------------------
function userCard (user) {
    const joinedAt = user.joinedAt;
    
    const wrapper = document.createElement('div');
    const headingElement = document.createElement('h5');
    const timeElement = document.createElement('span');
    const overlay =  document.createElement('div');

    wrapper.classList.add('p-4');
    wrapper.classList.add('user');

    headingElement.classList.add('username');
    timeElement.classList.add('time'); 

    wrapper.appendChild(headingElement);
    wrapper.appendChild(timeElement);
    wrapper.appendChild(overlay);

    headingElement.textContent = user.username;

    setInterval(() => {
        let currTime = Date.now() - joinedAt;
        let ago = Math.floor(currTime/1000);
        timeElement.textContent = `${ago}s ago`;
        if (ago > 60) {
            ago = Math.floor(ago/60)
            timeElement.textContent = `${ago}m ago`;
        }
    }, 1000);

    document.querySelector('.wrap').appendChild(wrapper);
}

function createMessageCard (msg, user) {
    const msgCardEle  = document.createElement('div');
    msgCardEle.classList.add('msg-card');
    msgCardEle.classList.add('bg-dark');
    msgCardEle.classList.add('p-3');
    
    const txtMsgEle  = document.createElement('span');
    txtMsgEle.classList.add('text-msg');
    txtMsgEle.textContent = msg;

    const usernameEle  = document.createElement('span');
    usernameEle.classList.add('user-name');
    usernameEle.textContent = user;

    msgCardEle.appendChild(txtMsgEle);
    msgCardEle.appendChild(usernameEle);

    document.querySelector('.chat-wrap').appendChild(msgCardEle);    
}


function updateUserScreen (allUsers) {
    document.querySelector('.wrap').innerHTML = '';
    for (let i = 0; i < allUsers.length; i++) {
        userCard(allUsers[i]);
        
    }
}

function updateMsgScreen (msg, user) {
    document.querySelector('.chat-wrap').innerHTML = '';
    createMessageCard(msg, user);
}
