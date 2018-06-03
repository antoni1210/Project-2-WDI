const Record = require('../models/record');

function recordsIndex(req, res){
  Record
    .find()
    .exec()
    .then(records => {
      res.render('records/index',{
        title: 'All Records',
        records
      });
    });
}
function recordsShow(req, res){
  Record
    .findById(req.params.id)
    .exec()
    .then(record => {
      res.render('records/show', {record});
    });
}
function recordsNew(req, res){
  res.render('records/new');
}
function recordsCreate(req, res){
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

module.exports = {
  index: recordsIndex,
  show: recordsShow,
  new: recordsNew,
  create: recordsCreate,
  edit: recordsEdit,
  update: recordsUpdate,
  delete: recordsDelete
};
