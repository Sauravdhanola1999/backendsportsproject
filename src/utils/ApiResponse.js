import messages from "../config/en.json" with { type: "json" };

export class ApiResponse {
  constructor(success, messageKey, data = null, statusCode = 200) {
    this.success = success;
    this.message = ApiResponse.resolveMessage(messageKey);
    this.data = data;
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
      success: this.success,
      message: this.message,
      status: this.statusCode,
      data: this.data,
    });
  }
}

export default ApiResponse;  
