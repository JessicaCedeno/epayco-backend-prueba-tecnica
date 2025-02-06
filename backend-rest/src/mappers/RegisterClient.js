const registerClientMapper = (body) => {
    return {
        document: body.document,
        name: body.name,
        email: body.email,
        cellphone: body.cellphone
    }
}

module.exports = registerClientMapper;