const GetBalanceMapper = (body) => {
    return {
        document: body.document,
        cellphone: body.cellphone
    }
}

module.exports = GetBalanceMapper;