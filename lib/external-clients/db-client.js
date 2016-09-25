module.exports = function (table) {
  this.get = function (searchTerm) {
    return table
      .findAll({
        attributes: ['url'],
        where: {
          query: searchTerm
        }
      }).then(result => result.map(item => item.dataValues.url))
  }

  this.save = function (searchTerm, url) {
    return table.create({
      query: searchTerm,
      url: url,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  this.delete = function (searchTerm) {
    return table.destroy({
      where: {
        query: searchTerm
      }
    })
  }
}