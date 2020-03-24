def make_inner_response(response: bool, message: str, value):
    return {
        'response': response,
        'message': message,
        'value': value
    }
