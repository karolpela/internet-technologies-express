This is a Express.js app featuring a Sequelize based backend. It provides an web interface for a sports equipment rental and repair shop.


Database schema explanations:
- Each Service has its own type.
  - One Service can consist of multiple Repairs.
- Each Repair has an assigned Employee.
  - Repairs have a problem description and a status.
