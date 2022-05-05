const video = require('../config/modules/video');

class MeController {
    async loadPage(req, res, next) {
        const data = await video.find({}).lean();
        return res.render('./me/mePage', {data})
    }
    async deleteUser(req, res, next) {
        const {id} = req.params;
        await video.deleteById({_id: id});
        return res.redirect('/me')
    }
    async trashPage(req, res, next) {
        const data = await video.findDeleted({}).lean();
        return res.render('./me/trash', {data})
    }
    async deleteTrash(req, res, next) {
        const {id} = req.params;
        await video.deleteOne({_id: id});
        return res.redirect('/me/trash')
    }
    async restoreTrash(req, res, next) {
        const {id} = req.params;
        await video.restore({_id: id})
            .then(data => {console.log("success")})
            .catch(err => {console.log("something wrong !!");})
        return res.redirect('back');
    }
}

module.exports = new MeController;