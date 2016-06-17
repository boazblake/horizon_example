var horizon = Horizon();
horizon.onReady(function() {
  document.querySelector('body').innerHTML = `<marquee direction="left"><h1>'example_app works!'</h1></marquee>`
});
horizon.connect();

//Triggers when client successfully connects to server
horizon.onReady().subscribe(() => { console.log("Successfully Connected to Horizon Server") })

//Triggers when disconnecting from a server
horizon.onDisconnected().subscribe(() { console.log("Successfully Disconnected to Horizon Server") })

// creating a collection //
const collectionOfChats = horizon("chats");

let chat = {
  message: "1st Blog!",
  datetime: new Date(),
  author: '@boazblakeInTheWorld'
}

//Saving a collection//
collectionOfChats.store(chat)


//Retriveing a collection ~ using the RxJS subscriber//
collectionOfChats.fetch().subscribe(
  (chats) => {
    chats.forEach((chat) => {
      //each result from the  collection
      //will pass through this function
      console.log(chat);
    })
  },
  //If an error occurs, this fucntion
  //will execute with the err message
  (err) => {
    console.log(err)
  })

//Removing Documents//
//Both of these queries are equivilant and will remove the document with id:1

collectionOfChats.remove(1).subscribe((id) => { console.log(id) })
collectionOfChats.remove({id: 1}).subscribe((id) => { console.log(id) })

//This query will remove all items in the collection
collectionOfChats.removeAll([1, 2, 3, 4, 5])

//Watching for changes//
collectionOfChats.watch().subscribe((chats) => { console.log(chats) })

//Queryy all documents and sort them in ascending order by datetime,
//then if any of them chnage, the handler function is called.
collectionOfChats.order("datetime").watch().subscribe((chats) => { console.log(chats) })

//watch a single document in the collection
collectionOfChats.find({author: "@boazblakeInTheWorld"}).watch().subscribe((chats) => { console.log(chats) })

//The entire collection is refreshed when one item changes//

let newCollectionOfchats = []

//query chats with '.order()' - by default this is in ascending order
newCollectionOfchats.order("datetime").watch().subscribe(

  //returns the entire array
  (newChats) => {

    //Here the old value of 'chats' is replaced with the new array
    //this will cause re-rendering
    chats = newChats;
  },
  (err) => {
    console.log(err);
  })