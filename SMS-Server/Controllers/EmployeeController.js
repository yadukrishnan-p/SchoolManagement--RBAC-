const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// Create Librarian
exports.CreateEmployee = async (req, res) => {
    const { name, email, password, role, userId } = req.body;
    try {
        if (!name || !email || !password || !role || !userId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            });
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!'
            });
        }

        const newUser = await UserModel.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role,
            userId,
            isVerified: true
        });

        return res.status(200).json({
            success: true,
            message: "Librarian Created!"
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: error.message });
    }
};
// get or view all librarian List
exports.GetAllEmployee = async (req, res) => {
    try {
        const librarianList = await UserModel.find();
        (librarianList) ? res.status(200).json(librarianList) : res.status(404).json({
            success: false,
            message: "not found!"
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// Update
// Update Librarian
exports.UpdateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        console.log('Update request received with ID:', id); // Log the ID
        console.log('Update request body:', updatedData); // Log the data being updated

        // Ensure that the ID and data are correct
        if (!id || !updatedData) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const updatedStaff = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedStaff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        console.log('Updated staff in DB:', updatedStaff); // Log the updated staff
        res.json(updatedStaff);
    } catch (error) {
        console.error('Error updating staff:', error); // Log the actual error
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
}

// Delete Librarian
exports.DeleteEmployee = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};