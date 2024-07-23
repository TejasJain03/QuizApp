const Role = require('../models/roles')

// Create a new role
exports.addRole = async (req, res) => {
  const { roleName } = req.body;

  try {
    // Validate input
    if (!roleName || roleName.trim() === '') {
      return res
        .status(400)
        .json({ success: false, message: 'Role name cannot be null or empty' });
    }

    const upperCaseName = roleName.toUpperCase();

    // Check if the role already exists
    let existingRole = await Role.findOne({ roleName: upperCaseName });

    if (existingRole) {
      return res
        .status(400)
        .json({ success: false, message: 'Role name already exists' });
    }

    // Create and save the new role
    const highestRole = await Role.findOne().sort({ identifier: -1 });
    let identifier = 1; // Default value if no roles exist yet

    if (highestRole) {
      identifier = highestRole.identifier + 1;
    }

    const newRole = new Role({ roleName: upperCaseName, identifier });
    await newRole.save();

    res.status(200).json({ success: true, message: 'Role added successfully', role: newRole });
  } catch (error) {
    console.error('Error adding role:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllRoles = async (req, res) => {
  const currentUserIdentifier = req.user.role

  const excludeIdentifiers = [currentUserIdentifier]

  const roles = await Role.find({
    roleName: { $nin: 'ADMIN' },
    identifier: { $nin: excludeIdentifiers },
  })

  res.json({ roles })
}

exports.getRole = async (req, res) => {
  const { id } = req.params
  const role = await Role.find({ identifier: id })
  if (!role) {
    return res.status(404).json({ message: 'Role not found' })
  }
  res.json({ role })
}
