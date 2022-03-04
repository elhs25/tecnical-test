const {
  createRoomSchema,
  getRoomSchema,
} = require("./schema");
const { STATUS_CODE } = require("../../utils/constants");
const { HttpResponseHandling } = require("../../utils/helper");

const checkRoomFields = async (req, res, next) => {
  const { user_id, room_name } = req.body;
  try {
    await createRoomSchema.validateAsync({
      user_id,
      room_name,
    });
    next();
  } catch (error) {
    return HttpResponseHandling[STATUS_CODE.BAD_REQUEST](res, error.message);
  }
};

const getRoomFields = async (req, res, next) => {
  const { id } = req.params;
  try {
    await getRoomSchema.validateAsync({
      id,
    });
    next();
  } catch (error) {
    return HttpResponseHandling[STATUS_CODE.BAD_REQUEST](res, error.message);
  }
};

module.exports = {
  checkRoomFields,
  getRoomFields,
};