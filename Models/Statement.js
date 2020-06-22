class Statement {
    #totalAmount = 0;
    #volumeCredits = 0;
    #comedyCount = 0;

    constructor(invoice, plays) {
        this.invoice = invoice;
        this.plays = plays;
        this.result = `Счет для ${invoice.customer}\n`;
    }

    static toFormat(price) {
        return new Intl.NumberFormat('ru-RU', {
            currency: 'rub',
            style: 'currency',
            minimumFractionDigits: 2,
        }).format(price);
    }

    getAmmount() {
        for (let perf of this.invoice.performance) {
            const play = this.plays[perf.playId];
            
            let thisAmount = 0;
            
            switch (play.type) {
                case "tragedy":
                    thisAmount = 40000;
                    if (perf.audience > 30) {
                        thisAmount += 1000 * (perf.audience - 30);
                    }
                    break;
                case "comedy":
                    thisAmount = 30000;
                    if (perf.audience > 20) {
                        thisAmount += 10000 + 500 * (perf.audience - 20);
                    }
                    thisAmount += 300 * perf.audience;
                    break;
                default:
                    throw new Error(`неизвестный тип: ${perf.type}`);
            }
    
            // Добавление бонусов
            this.#volumeCredits += Math.max(perf.audience - 30, 0);
    
            // Дополнительный бонус за каждые 10 комедий
            if (play.type === "comedy") {
                this.#comedyCount += 1;
    
                if (this.#comedyCount%10 === 0) { 
                    this.#volumeCredits += Math.floor(perf.audience / 5);
                }
            }
            
            // Вывод строки счета
            this.result += ` ${play.name}: ${Statement.toFormat(thisAmount / 100)}`;
            this.result += ` (${perf.audience} мест)\n`;

            this.#totalAmount += thisAmount;
        }

        this.result += `Итого с вас ${Statement.toFormat(this.#totalAmount/100)}\n`;
        this.result += `Вы заработали ${this.#volumeCredits} бонусов\n`;
        
        return this.result;
    }
}

module.exports = Statement;