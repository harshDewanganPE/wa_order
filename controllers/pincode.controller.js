const Pincode = async (req, res) => {
    try {
        const { pincode } = req.body;
        const url = `https://api.postalpincode.in/pincode/${pincode}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data[0].Status === "Success") {
            res.status(200).json(data[0]);
        } else {
            res.status(404).json({ message: "Pincode not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};  


export default {
    Pincode
};