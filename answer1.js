// You can use https://jsfiddle.net/ to test this code quickly

const changes = [
    { id: 1, username: "user", password: "password" },
    { phone: "123456789", user: "new user", password: "123456" },
    { email: "example@gmail.com", username: "example" },
    { phone: "987654321" },
];

const calculateState = (changes) => {
    // A below recursive function goes through our changes array and
    // objects within it via Object.entries method, supports nested arrays of objects
    const flatArrayRecursive = (changes, propertyMap = {}) => {
        for(const [key, value] of Object.entries(changes)) {
            const property = key;

            if(value && typeof value === 'object') {
                flatArrayRecursive(value, propertyMap);
            } else {
                propertyMap[property] = value;
            }
        }

        return propertyMap;
    };

    return flatArrayRecursive(changes);
};

console.log(calculateState(changes));