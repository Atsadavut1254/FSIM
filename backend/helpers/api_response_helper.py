from flask import jsonify, make_response

# import project constant
import backend.Constant as Constant


def create_error_exception(message: str, value, response_code: int):
    return make_response(jsonify({"message": message, "value": value}), response_code, Constant.RESPONSE_HEADERS)


def create_response(message: str, response: bool, data, response_code: int):
    return make_response(jsonify({"response": response, "message": message, "data": data}), response_code, Constant.RESPONSE_HEADERS)


def return_response(data):
    if data['response']:
        return create_response(data['message'], data['response'], data['value'], 200)
    else:
        return create_response(data['message'], data['response'], data['value'], 500)
