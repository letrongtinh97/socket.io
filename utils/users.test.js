let expect = require('expect')
const {Users} = require('./user')

describe('Users', () => {
    let users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Room test'
        },
            {
                id: '2',
                name: 'Sam',
                room: 'Room test'
            },
            {
                id: '3',
                name: 'John',
                room: 'Meet test'
            }
        ]
    })
    it(' should add new user',() => {
        let users = new Users();
        let user = {
            id: 'dsadsa',
            name: 'test',
            room: 'Room test'
        }
        let reUser = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([user]);

    })
    it(' should return name for the ...',() => {
        let userList = users.getUserList('Room test');


        expect(userList).toEqual(['Mike','Sam']);

    })
    it(' should find user.',() => {
        let userID = '2',
            user = users.getUser(userID)


        expect(user.id).toEqual(userID);

    })
    it(' should not find user.',() => {
        let userID = '122',
            user = users.getUser(userID)


        expect(user).toBeUndefined();

    })
    it(' should remove a user.',() => {
        let userID = '108',
            user = users.removeUser(userID)


        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);

    })
    it(' should remove a user.',() => {
        let userID = '1',
            user = users.removeUser(userID)


        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);

    })

})
