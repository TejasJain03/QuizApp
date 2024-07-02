const Role = require('../models/roles')

// Create a new role
exports.addRole = async (req, res) => {
  const { name } = req.body
  const upperCaseName = name.toUpperCase()

  Role.findOne()
    .sort({ identifier: -1 })
    .exec()
    .then(async (highestRole) => {
      let identifier = 0
      if (highestRole) {
        identifier = highestRole.identifier + 1
      }
      const newRole = new Role({ name: upperCaseName, identifier })
      await newRole.save()
      res.status(200).json({ success: true, message: 'Successfully Added' })
    })
}
