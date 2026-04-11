module.exports = (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Only POST method allowed"
    });
  }

  try {
    const { param1, operation, param2, start, end } = req.body;

    if (!param1 || !operation) {
      return res.status(400).json({
        success: false,
        message: "param1 and operation are required"
      });
    }

    let result;

    switch (operation) {

      case "uppercase":
        result = param1.toUpperCase();
        break;

      case "lowercase":
        result = param1.toLowerCase();
        break;

      case "reverse":
        result = param1.split("").reverse().join("");
        break;

      case "length":
        result = param1.length;
        break;

      case "trim":
        result = param1.trim();
        break;

      case "trim_length":
        const trimmed = param1.trim();
        result = {
          trimmed_value: trimmed,
          length: trimmed.length
        };
        break;

      case "substring":
        result = param1.substring(start || 0, end || param1.length);
        break;

      case "replace":
        if (!param2) {
          return res.status(400).json({
            success: false,
            message: "param2 required for replace"
          });
        }
        result = param1.replace(param2, "");
        break;

      case "concat":
        result = param1 + (param2 || "");
        break;

      case "extract_code":
        result = param1.substring(param1.lastIndexOf("/") + 1);
        break;

      case "last_n_chars":
        const n = param2 || 5;
        result = param1.slice(-n);
        break;

      case "substring_from_index":
        if (param2 === undefined) {
          return res.status(400).json({
            success: false,
            message: "param2 required"
          });
        }
        result = param1.substring(param2);
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid operation"
        });
    }

    return res.status(200).json({
      success: true,
      input: param1,
      operation,
      result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
