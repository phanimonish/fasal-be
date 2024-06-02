const { List } = require("../models/list");
const { User } = require("../models/user");

const listControllers = {
  create: async (req, res) => {
    try {
      let { title, movies } = req.body;

      if (!title) {
        return res.status(400).json({ msg: "Title is required" });
      }

      if (!movies) {
        movies = [];
      }

      const list = new List({ title, movies, user: req.user._id });
      if (!list) {
        return res.status(400).json({ msg: "Unable to create list" });
      }

      await User.updateOne(
        { _id: req.user._id },
        { $addToSet: { lists: list._id } }
      );
      await list.save();
      res.json(list.toJSON());
    } catch (err) {
      console.log({ err });
      res.status(400).send(err);
    }
  },

  getById: async (req, res) => {
    try {
      const { listId } = req.params;

      const list = await List.findOne({
        _id: listId,
        user: req.user._id,
      });
      if (!list) {
        return res.status(400).json({ msg: "List not found" });
      }

      res.json(list.toJSON());
    } catch (err) {
      console.log({ err });
      res.status(400).send(err);
    }
  },

  get: async (req, res) => {
    try {
      const lists = await List.find({ user: req.user._id });
      if (!lists) {
        return res.status(400).json({ msg: "Lists not found" });
      }

      res.json(lists.map((list) => list.toJSON()));
    } catch (err) {
      console.log({ err });
      res.status(400).send(err);
    }
  },

  addMoviesToList: async (req, res) => {
    try {
      const { listId } = req.params;
      const { movies } = req.body;

      const list = await List.findById(listId);
      if (!list) {
        return res.status(400).json({ msg: "List not found" });
      }

      list.movies.push(...movies);
      await list.save();

      res.json(list.toJSON());
    } catch (err) {
      console.log({ err });
      res.status(400).send(err);
    }
  },
};

module.exports = listControllers;
