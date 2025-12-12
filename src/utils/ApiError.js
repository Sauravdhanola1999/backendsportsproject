import messages from "../config/en.json" with { type: "json" };

export class ApiError {
  constructor(messageKey = "COMMON.SERVER_ERROR", statusCode = 500) {
    this.success = false;
    this.message = ApiError.resolveMessage(messageKey);
    this.statusCode = statusCode;
  }
  static resolveMessage(key) {
    if (!key) return "";
    if (!key.includes(".")) return key;
    const keys = key.split(".");
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
      if (!value) return key;
    }

    return value;
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: false,
      message: this.message,
      statusCode: this.statusCode
    });
  }
}


export default ApiError;  