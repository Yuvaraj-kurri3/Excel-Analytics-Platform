const Signupmodel=require('../models/signup');
 

const signupController = async (req, res)=>{
    try {
       const { username, email, password } = req.body;
      const existingUser = await Signupmodel.find({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User already exists, Please Login' });
            }
        const newUser = new Signupmodel({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Signupmodel.findOne({ email});
        if (!user) {
            return res.status(401).json({ message: 'User Not Found!' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid Credidentals' });
        }

        res.status(200).json({ message: 'Login successful', user });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { signupController , loginController };