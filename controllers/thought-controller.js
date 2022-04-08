const res = require('express/lib/response');
const {Thought, User} = require('../models');


// router
// .route('/') 
// .get(getAllThought) done
// .post(createThought) done

// router
// .route('/:id') 
// .get(getThoughtById) done
// .put(updateThought) done
// .delete(deleteThought) done

// router
// .route('/:thoughtId/reactions') done
// .post(createReaction)
// .route('/:thoughtId/reactions/:reactionId') done
// .delete(deleteReaction)


const thoughtController = {

    getAllThought(req, res) {
        Thought.find({})
          .populate({
            path: 'reactions',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

      createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

      getThoughtById(req, res) {
        Thought.find({})
          .populate({
            path: 'reactions',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, body, 
            { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with that id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },

     
      deleteThought({ params}, res) {
        Thought.findByIdAndDelete(
            ({ _id: params.id }))
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                return User.findByIdAndDelete(
                    { _id: params.userId },
                    { $pull: { thoughts: params.Id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
          {_id: params.thoughtId}, 
          {$push: {reactions: body}}, 
          {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought with this ID.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought with this ID'});
              return;
            }
           res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      }
}

module.exports = thoughtController