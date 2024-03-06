const Candidate = require("../models/candidateModel");
const User = require("../models/userModel");
const addCandidate = async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ msg: "user has not admin role" });

    const data = req.body;
    const newCandidate = new Candidate(data);
    const response = await newCandidate.save();
    console.log("candidate save");
    res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    return user.role === "admin";
  } catch (error) {
    return false;
  }
};

const updateCandidate = async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ msg: "user has not admin role" });
    const candidateID = req.params.id;
    const updateCandidateData = req.body;
    const response = await Candidate.findByIdAndUpdate(
      candidateID,
      updateCandidateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response)
      return res.status(404).json({ error: "Candidate not found" });
    console.log("candidate data update");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ msg: "user has not admin role" });
    const candidateID = req.params.id;
    const response = await Candidate.findByIdAndDelete(candidateID);
    if (!response)
      return res.status(404).json({ error: "candidate not found" });
    console.log("candidate deleted");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const voting = async (req, res) => {
  candidateID = req.params.candidateID;
  userID = req.user.id;
  try {
    const candidate = await Candidate.findById(candidateID);
    if (!candidate) return res.status(404).json({ msg: "candidate not found" });
    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ msg: "user not found" });
    if (user.isVoted) {
      res.status(400).json({ msg: "you have voted" });
    }
    if (user.role == "admin") {
      res.status(403).json({ msg: "admin is not allow" });
    }
    candidate.votes.push({ user: userID });
    candidate.voteCount++;
    await candidate.save();
    user.isVoted = true;
    await user.save();
    res.status(200).json({ msg: "vote recorded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const countVote = async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });
    const voteRecord = candidate.map((data) => {
      return {
        party: data.party,
        count: data.voteCount,
      };
    });

    return res.status(200).json({ voteRecord });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  countVote,
  voting,
};
