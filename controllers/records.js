const Record = require('../models/record.js');

function recordsIndex(req, res){
  Record
    .find()
    .populate('creator')
    .exec()
    .then(records => {
      res.render('records/index', {records});
    });
}

function recordsShow(req, res){
  Record
    .findById(req.params.id)
    .populate('comments')
    .exec()
    .then(record => {
      res.render('records/show', {record});
    });
}

function recordsNew(req, res){
  if(!res.locals.isLoggedIn) return res.redirect('/');
  res.render('records/new');
}

function recordsCreate(req, res){
  const recordData = req.body;
  recordData['creator'] = res.locals.user.id;
  Record
    .create(req.body)
    .then((record)=>{
      return res.redirect(`/records/${record._id}`);
    });
}

function recordsEdit(req, res){
  Record
    .findById(req.params.id)
    .exec()
    .then(record => {
      res.render('records/edit', {record});
    });
}

function recordsUpdate(req, res){
  Record
    .findById(req.params.id)
    .exec()
    .then(record => {
      Object.assign(record, req.body);
      return record.save();
    });
  return res.redirect(`/records/${req.params.id}`);
}

function recordsDelete(req, res){
  Record
    .findById(req.params.id)
    .exec()
    .then(record => {
      record.remove();
      return res.redirect('/records');
    });
}

function createComment(req, res){
  Record
    .findById(req.params.id)
    .exec()
    .then( record =>{
      record.comments.create(req.body);
      return res.redirect(`/records/${record.id}`);
    });
}


module.exports = {
  index: recordsIndex,
  show: recordsShow,
  new: recordsNew,
  create: recordsCreate,
  edit: recordsEdit,
  update: recordsUpdate,
  delete: recordsDelete,
  comment: createComment
};
