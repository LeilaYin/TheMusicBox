allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const access = { allAccess, userBoard};
module.exports = { access };