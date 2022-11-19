class DineroFormatter {

    static formatDinero(obj){
        return obj.setLocale("uk-UA").toFormat('$0,0.00')
    }

    static formatAmount(amount){

        return amount / 100
    }
}

export default DineroFormatter;