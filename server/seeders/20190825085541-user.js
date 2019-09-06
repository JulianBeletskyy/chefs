import bcryptjs from 'bcryptjs'
import uuidv4 from 'uuid/v4'

const admin = {
  userId: uuidv4(),
  firstName: 'Admin',
  email: 'admin@chefs.com',
  password: bcryptjs.hashSync(process.env.ADMIN_PASSWORD, process.env.SALT_ROUNDS*1),
  phone: '0508617135',
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const chef = {
  userId: uuidv4(),
  firstName: 'Chef',
  email: 'chef@chefs.com',
  password: bcryptjs.hashSync(process.env.CHEF_PASSWORD, process.env.SALT_ROUNDS*1),
  phone: '0508617136',
  role: 'chef',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const client = {
  userId: uuidv4(),
  firstName: 'Client',
  email: 'client@chefs.com',
  password: bcryptjs.hashSync(process.env.CLIENT_PASSWORD, process.env.SALT_ROUNDS*1),
  phone: '0508617137',
  role: 'client',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [admin, chef, client])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
