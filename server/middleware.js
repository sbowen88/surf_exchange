module.exports = function(req, res) {
    // console.log('checking logged in, req.user: ',req.user)
  if (req.user) {
    res.status(200).send(req.user);
    // console.log(req.user.id)
    console.log('logged in')
  }
 else {
     console.log('not logged in')
    res.status(403).send()}
};
