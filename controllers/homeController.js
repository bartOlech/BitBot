exports.home = (req, res) => {
    res.render('home', {
        price: req.flash('price'),
        coin: req.flash('coin')
    })
}