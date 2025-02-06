const ConfirmMapper = (body) => {
    return {
        sessionId: body.sessionId,
        token: body.token,
    }
}

module.exports = ConfirmMapper;