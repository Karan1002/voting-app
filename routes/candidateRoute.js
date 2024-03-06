const express = require("express");
const router = express.Router();
const {
  voting,
  countVote,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controller/candidateController");
const { jwtAuthMiddleware } = require("../middleware/auth");

router.post("/", jwtAuthMiddleware, addCandidate);
router.put("/:candidateID", jwtAuthMiddleware, updateCandidate);
router.delete("/:candidateID", jwtAuthMiddleware, deleteCandidate);
router.post("/vote/:candidateID", jwtAuthMiddleware, voting);
router.get("/vote/count", countVote);
module.exports = router;
