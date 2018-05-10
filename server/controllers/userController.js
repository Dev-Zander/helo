module.exports = {
    getUser:(req,res,next)=>{
        const db = req.app.get('db')
        db.getuserinfo([req.user.id]).then(info =>{
            console.log(info,'Backend data')
            res.status(200).send(info)
        })
    },

    updateUser:(req,res,next)=>{
        const db = req.app.get('db')
        db.updateProfile([req.user.id, req.body.firstName, req.body.lastName, req.body.gender,  req.body.hair, req.body.eye, req.body.hobby, req.body.birthday, req.body.birthmonth, req.body.birthyear, req.body.userPhoto]).then(response =>{
            res.status(200).send('Profile Updated Successfully!')
        })
    },

    getAllUsers:(req,res,next)=>{
        const db = req.app.get('db')
        db.getAllUserProfiles([req.user.id]).then(info=>{
            res.status(200).send(info)
        }
            
        )
    },
    getProfiles:(req,res,next)=>{
        const db = req.app.get('db')
        db.getProfiles([req.user.id]).then(info=>{
            res.status(200).send(info)
        }
            
        )
    }
}
