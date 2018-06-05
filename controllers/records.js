const Record = require('../models/record.js');

function indexRoute(req, res){
  Record
    .find()
    .populate('creator')
    .exec()
    .then(records => {
      res.render('records/index', {
        title: 'All Records',
        records
      });
    });
}

function showRoute(req, res){
  Record
    .findById(req.params.id)
    .populate('comments')
    .exec()
    .then(record => {
      res.render('records/show', {record});
    });
}

function newRoute(req, res){
  if(!res.locals.isLoggedIn) return res.redirect('/');
  res.render('records/new');
}

function createRoute(req, res){
  const recordData = req.body;
  recordData['creator'] = res.locals.user.id;
  Record
    .create(req.body)
    .then((record)=>{
      return res.redirect(`/records/${record._id}`);
    });
}

function editRoute(req, res){
  Record
    .findById(req.params.id)
    .exec()
    .then(record => {
      res.render('records/edit', {record});
    });
}

function updateRoute(req, res){
  Record
    .findById(req.params.id)
    .exec()
    .then(record => {
      Object.assign(record, req.body);
      return record.save();
    });
  return res.redirect(`/records/${req.params.id}`);
}

function deleteRoute(req, res){
  Record
    .findById(req.params.id)
    .exec()
    .then(record => {
      record.remove();
      return res.redirect('/records');
    });
}

function createCommentRoute(req, res){
  Record
    .findById(req.params.id)
    .exec()
    .then((record) =>{
      record.comments.push(req.body);
      return record.save();
    })
    .then((record) => res.redirect(`/records/${record._id}`));
}


module.exports = {
  index: indexRoute,
  // collection: collectionRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  comment: createCommentRoute
};
