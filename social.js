// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    let user = {
      "id": ++this.currentID,
      "name": name
    };

    this.users[user.id] = user;
    this.follows[user.id] = new Set();

    return user.id;
  }

  getUser(userID) {
    // Your code here
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    // Your code here
    if (!this.getUser(userID1) || !this.getUser(userID2)) {return false;}

    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID];
  }

  getFollowers(userID) {
    // Your code here
    let followers = new Set();
    for (let follower in this.follows) {
      if (this.follows[follower].has(userID)) {
        let user = this.getUser(follower);
        followers.add(user.id);
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    debugger;
    let recommended = [];
    let queue = [[this.getUser(userID)]];
    let visited = new Set();

    while (queue.length > 0) {
      let path = queue.shift();
      let currentPerson = path[path.length - 1];

      if (!visited.has(currentPerson)) {
        visited.add(currentPerson);

        if (path.length > 2 && path.length - 2 <= degrees) {
          recommended.push(currentPerson.id);
        }

        let follows = this.getFollows(currentPerson.id);
        follows.forEach(
          follow => {
            let newPath = path.concat(this.getUser(follow));
            queue.push(newPath);
          }
        );
      }

    }

    return recommended;

  }
}

let socialNetwork = new SocialNetwork();
userID1 = socialNetwork.addUser("User 1");
userID2 = socialNetwork.addUser("User 2");
userID3 = socialNetwork.addUser("User 3");
userID4 = socialNetwork.addUser("User 4");
userID5 = socialNetwork.addUser("User 5");
userID6 = socialNetwork.addUser("User 6");

socialNetwork.follow(1, 2);
socialNetwork.follow(2, 3);
socialNetwork.follow(3, 4);
socialNetwork.follow(3, 5);
socialNetwork.follow(4, 1);
socialNetwork.follow(4, 2);
socialNetwork.follow(5, 6);

socialNetwork.getRecommendedFollows(1, 1)

module.exports = SocialNetwork;
