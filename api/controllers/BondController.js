/**
 * BondController
 *
 * @description :: Server-side logic for managing bonds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getIsins: function(req, res) {
    BondService.getIsins(function(bonds) {
      res.json(bonds);
    });
  },
  list: function(req, res) {
    var myQuery = "select * from bond_isin order by id";

    sails.log.debug("Query :", myQuery);

    Bond.query(myQuery, function(err, isins) {
      if (err || !isins.rows.length) {
        return res.json({
          "status": 0,
          "error": err
        });
      } else {
        return res.ok(isins.rows);
      }
    });
  },
  updateRow: function(req, res) {
    var row = req.params.all();

    var myQuery = "update bond_isin set alive = " + row.alive + " where id = " + row.id;

    sails.log.debug("Query :", myQuery);

    Bond.query(myQuery, function(err, isins) {
      if (err || !isins.rows.length) {
        return res.json({
          "status": 0,
          "error": err
        });
      } else {
        return res.ok(isins.rows);
      }
    });
  }
};