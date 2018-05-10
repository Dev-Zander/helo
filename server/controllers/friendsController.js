module.exports = {

    addFriend:(req,res,next) =>{
        console.log(req.body, 'Info')
        const db = req.app.get('db')
        db.addToFriends([req.body.MyUserID, req.body.MyFriendsID]).then(friendID =>{
            res.status(200).send(friendID)
        })
    },

    removeFriend:(req,res,next)=>{
        console.log(req.body, 'Info')
        const db = req.app.get('db')
        db.removeFromFriends([]).then( update =>{
            res.status(200).send(update)
        })
    },
    getFriends:(req,res,next)=>{
        const db = req.app.get('db')
        db.getFriendList([req.user.id]).then(friends =>{
            res.status(200).send(friends)
        } )
    }

}