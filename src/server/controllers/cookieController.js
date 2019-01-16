module.exports = {
  setCookie(req, res, next) {
    res.cookie('txChange', 'authorized')
    next()
  }
}