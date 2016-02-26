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
    var row = req.param('row');
    var closeDateString = "";

    if (row.alive === false) {
      var date = new Date();
      sqlDate = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
      closeDateString = ", close_date = '" + sqlDate + "'";
    }

    var myQuery = "update bond_isin set alive = " + row.alive + closeDateString + " where id = " + row.id;

    sails.log.debug("Query :", myQuery);

    Bond.query(myQuery, function(err, result) {
      if (err) {
        return res.json({
          "status": 0,
          "error": err
        });
      } else {
        if (result.rowCount > 0 && row.alive === false) {
          row.close_date = date;
        }
        return res.ok(row);
      }
    });
  }
};