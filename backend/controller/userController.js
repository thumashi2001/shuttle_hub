const User = require('../Model/userModel')

//display
const getAllUsers = async (req, res, next) => {

    let users;

    try {
        users = await User.find()
    }
    catch (err) {
        console.log(err)
    }

    if (!users) {
        return res.status(404).json({ message: "no users" })
    }
    return res.status(200).json({ users })
}

// adduser
const addUsers = async (req, res, next) => {
    const { name, userName, password, contactNumber, address, role, email, salary } = req.body;


    try {
        const existingUser = await User.findOne({
            $or: [{ email: email }, { userName: userName }, { name: name }, { contactNumber: contactNumber }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email,name,contact or username already exists"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to check existing user" });
    }


    let user;
    try {
        user = new User({
            name,
            userName,
            password,
            contactNumber,
            address,
            role,
            email,
            salary,

        });
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to add user" });
    }


    res.status(200).json({ user });
};


//get by id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id)

    } catch (err) {
        console.log(err)
    }

    if (!user) {
        res.status(404).json({ message: "no users" })
    }
    res.status(200).json({ user })
}


const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, userName, password, contactNumber, address, email, salary, total_salary_with_OT } = req.body;

    try {

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }


        const nameExists = await User.findOne({ name, _id: { $ne: id } });
        if (nameExists) {
            return res.status(400).json({ message: "Name already in use by another user" });
        }


        const userNameExists = await User.findOne({ userName, _id: { $ne: id } });
        if (userNameExists) {
            return res.status(400).json({ message: "Username already in use by another user" });
        }


        const emailExists = await User.findOne({ email, _id: { $ne: id } });
        if (emailExists) {
            return res.status(400).json({ message: "Email already in use by another user" });
        }
        const numberExists = await User.findOne({ contactNumber, _id: { $ne: id } });
        if (numberExists) {
            return res.status(400).json({ message: "contact number already in use by another user" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            name,
            userName,
            password,
            contactNumber,
            address,
            email,
            salary,
            total_salary_with_OT
        }, { new: true });

        res.status(200).json({ user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update user" });
    }
};



//delete

const deleteUser = async (req, res, next) => {

    const id = req.params.id

    let user;

    try {
        user = await User.findByIdAndDelete(id)
    } catch (err) {
        console.log(err)
    }
    if (!user) {
        res.status(404).json({ message: "unabel to delete" })
    }
    res.status(200).json({ user })
}


exports.getAllUsers = getAllUsers
exports.addUsers = addUsers
exports.getById = getById
exports.updateUser = updateUser
exports.deleteUser = deleteUser