const PayMapper = (body) => {
    return {
        document: body.document,
        amount: body.amount,
        cellphone: body.cellphone
    }
}

module.exports = PayMapper;