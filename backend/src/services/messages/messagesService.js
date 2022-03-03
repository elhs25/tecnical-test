const messagesSchema = require("../../models/messages");
const { ServiceResultHandling } = require("../../utils/helper");
const { STATUS_CODE } = require("../../utils/constants");

const listMessageService = async ({ room_id, page = 0, limit = 15 }) => {
  try {
    const messages = await messagesSchema.find(
      { room_id },
      {
        createdAt: true,
        uid: true,
        cmd: true,
        c: true,
        _id: true,
      },
      {
        skip: limit * page,
        limit,
        sort: { createdAt: "desc" },
      }
    );
    return {
      statusCode: STATUS_CODE.OK,
      result: messages,
    };
  } catch (error) {
    return {
      error: true,
      result: ServiceResultHandling.handleError("unexpected error"),
      statusCode: STATUS_CODE.SERVER_ERROR,
    };
  }
};

const sendMessageService = async ({
  room_id,
  user_id,
  content,
  command = false,
}) => {
  try {
    const message = await messagesSchema.create({
      room_id,
      user_id,
      content,
      command,
    });
    return {
      statusCode: STATUS_CODE.OK,
      result: { id: message.id, createdAt: message.createdAt },
    };
  } catch (error) {
    return {
      error: true,
      result: ServiceResultHandling.handleError("unexpected error"),
      statusCode: STATUS_CODE.SERVER_ERROR,
    };
  }
};

module.exports = {
  listMessageService,
  sendMessageService,
};
