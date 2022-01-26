const ConversationModel = require('../models/conversationModel');

exports.updateFiles = async (req, res) => {
  try {
    let file;
    ConversationModel.syncIndexes();
    if (req.body.image) {
      // patch new image to the profile picture
      console.log('---------------', req.body.image);
      file = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        {
          profilePicture: req.body.image,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (req.body.deleteImage) {
      // patch nothing to the profile picture (delete image)
      file = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        {
          profilePicture: '',
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(200).json({
      status: 'success',
      data: file,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};