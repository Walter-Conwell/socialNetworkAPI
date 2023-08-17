const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getThoughts(req, res) {
    try {
      const users = await Thought.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getSingleThought(req, res) {
    try {
      const user = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createThought(req, res) {
    try {
      const user = await Thought.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteThought(req, res) {
    try {
      const user = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      }

      res.json({ message: "User and users deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateThought(req, res) {
    try {
      const user = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add an reaction to a user
  async addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a user
  async removeReaction(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
