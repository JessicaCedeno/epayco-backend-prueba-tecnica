const TopUpWalletMapper = (body) => {
    return {
        document: body.document,
        balance: body.balance,
        cellphone: body.cellphone
    }
}

module.exports = TopUpWalletMapper;