// loadTipsterInfo()

function getTipstersByNames(names) {
    return new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: `https://xtips.herokuapp.com/api/tipster?${$.param({ names })}`,
            success: function (data) { resolve(data.result) },
            dataType: 'json',
        });
    })
}

async function loadTipsterInfo() {
    const { leftNames, rightNames } = getTipsterNames()
    const leftTipsters = await getTipstersByNames(leftNames)
    const rightTipsters = await getTipstersByNames(rightNames)
    addTable(leftTipsters, rightTipsters)
}

function getTipsterNames() {
    const loadNameBySide = (side) => {
        const result = []
    
        const position = side === 'LEFT' ? 1 : 2
        const container = $($('table tbody tr td table tbody')[position])
        const length = container.find('tr').length
        for (let index = 1; index < length; index++) {
            const isOU = location.href.includes('matchoustat')
            let name
            if (!isOU && side === 'LEFT') name = $(container.find('tr').eq(index).find('font')[1]).text().trim()
            if (!isOU && side === 'RIGHT') name = $(container.find('tr').eq(index).find('font')[2]).text().trim()
            if (isOU && side === 'LEFT') name = $(container.find('tr').eq(index).find('font')[2]).text().trim()
            if (isOU && side === 'RIGHT') name = $(container.find('tr').eq(index).find('font')[2]).text().trim()

            result.push(name)
        }
        return result
    }

    const leftNames = loadNameBySide('LEFT')
    const rightNames = loadNameBySide('RIGHT')
    return { leftNames, rightNames }
}

function addTable(leftTipsters, rightTipsters) {
    const style = `
        <style>
            .detail-container {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }

            table.side {
                width:49%;
                margin: 10px;
            }

            table.side, .side th, .side td {
                border: 1px solid black;
                border-collapse: collapse;
            }

            .side th, .side td {
                font-size: 13px;
                padding: 2px;
                text-align: left;
            }

            table.side tr:nth-child(even) {
                background-color: #eee;
            }

            table.side tr:nth-child(odd) {
                background-color: #fff;
            }

            table.side th {
                background-color: black;
                color: white;
            }

            table.side tr.hightlight {
                background-color: yellow;
            }
        </style>
    `
    const html = `
        <div class="detail-container">
            <table class="side">
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Win Rate</th> 
                    <th>Big bet Rate</th>
                    <th>Total Bet</th>
                    <th>Yield</th>
                </tr>
                ${leftTipsters.map(tipter => `
                    <tr>
                        <td>${tipter.no}</td>
                        <td>${tipter.name}</td>
                        <td>${(tipter.winRate * 100).toPrecision(2)}%</td>
                        <td>${(tipter.bigBetWinRate * 100).toPrecision(2)}%</td>
                        <td>${tipter.totalBet}</td>
                        <td>${(tipter.yield * 100).toPrecision(2)}%</td>
                        </tr>
                `).join('\n')}
            </table>
            <table class="side">
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Win Rate</th> 
                    <th>Big bet Rate</th>
                    <th>Total Bet</th>
                    <th>Yield</th>
                </tr>
                ${rightTipsters.map(tipter => `
                    <tr>
                        <td>${tipter.no}</td>
                        <td>${tipter.name}</td>
                        <td>${(tipter.winRate * 100).toPrecision(2)}%</td>
                        <td>${(tipter.bigBetWinRate * 100).toPrecision(2)}%</td>
                        <td>${tipter.totalBet}</td>
                        <td>${(tipter.yield * 100).toPrecision(2)}%</td>
                        </tr>
                `).join('\n')}
            </table>
        </div>
    `
    $('body').append(style)
    $('body').append(html)
    $('.side tr').click(function() {
        $(this).hasClass('hightlight') ? $(this).removeClass('hightlight') : $(this).addClass('hightlight')
    })
}

loadTipsterInfo()
