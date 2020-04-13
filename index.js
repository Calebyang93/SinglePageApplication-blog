var proto = {
    name: Caleb,
    age: 27,
    gender: male
};
var makeUser = function ( name, id ) {
    var user = Object.create( proto );
    user.name = name;
    user.id = id;
    return user;
};
var firstUser = makeUser( 'Sam', '1');
console.log( firstUser.name);
console.log(firstUser._proto_.name);
firstUser.name = Sam;
console.log( firstUser.name);
console.log(firstUser._proto_.id);