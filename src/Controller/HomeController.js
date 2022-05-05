const video = require('../config/modules/video');

class HomeController {
    banhTheCake(req, res, next) {
        return res.render('Banh')
    }
    // load data to home page [GET]
    async loadFirstPage(req, res, next) {
        let data = [];
        await video.find({})
            .lean()
            .then((docs) => {data = [...docs]})
            .catch(err => next(err));
        return res.render('home', {data});
    }

    // go to createPage [GET]
    createPage(req, res, next) {
       return res.render('create')
    }

    // Create data [POST]
    createData(req, res, next) {
        const {name, desc, video_id, img = `https://i.ytimg.com/vi/${req.body.video_id}/maxresdefault.jpg`} = req.body;
        video.create({ name: name.trim(), desc: desc, video_id: video_id, img: img })
            .then(data => {console.log("da luu")})
            .catch(err => {console.log("xay ra loi")});
        return res.redirect('/')
    }

    // Go to details page [GET]
    async detailsPage(req, res, next) {
        let {name} = req.params;
        let data = await video.find({name: name}).lean().exec();
        data = {...data[0]};
        return res.render("details", {data})
    }

    // Update data [PUT]
    updateData(req, res, next) {
        const {name, desc, video_id, id} = req.body
        video.findById(id)
             .then(doc => {
                doc.name = name.trim();
                doc.desc = desc;
                doc.video_id = video_id;
                doc.img = `https://i.ytimg.com/vi/${video_id}/maxresdefault.jpg`;
                doc.save();
            })
            .catch(err => {next(err)});
        return res.redirect('/')
    }
    // [GET] upload file page
    uploadFilePage(req, res, next) {
        return res.render("uploadFile")
    }
    //[POST] upload file
    uploadFile(req, res, next) {
        if (!req.file) return next(new Error('File does not exist'))
        console.log("check data");
        const data = req.file.filename;
        console.log(data);
        return res.render('uploadFile', {data})
    }
    // [GET] upload multi page
    uploadMultiPage(req, res, next) {
        return res.render('uploadMulti')
    }
    //[POST] upload multi file
    uploadMultiFile(req, res, next) {
        const data = req.files;
        return res.render('uploadMulti', {data})
    }
}
module.exports = new HomeController;