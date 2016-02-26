module.exports = {
  getIsins: function(next) {
    Bond.find().exec(function(err, todos) {
      if (err) throw err;
      next(todos);
    });
  }
};