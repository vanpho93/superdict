// loadTipsterInfo()

function getTipstersResult(tipster) {
    return new Promise((resolve) => {
        $.ajax({
            type: 'GET',
            url: `https://xtips.herokuapp.com/api/tipster?${$.param({ names: tipster.map(tipster => tipster.name) })}`,
            success: function (data) { resolve(data.result) },
            dataType: 'json',
        });
    })
}

async function loadTipsterInfo() {
    let tipsters = getTipstersInput()
    const tipsterResults = await getTipstersResult(tipsters)
    tipsters = tipsters.map(tipster => {
        const tipsterResult = tipsterResults.find(({ name }) => name === tipster.name)
        return { ...tipster, ...tipsterResult }
    })
    addTable(tipsters)
}

function getTipstersInput() {
    const loadNameBySide = (side) => {
        const tipsters = []
    
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
            const isBigBet = container.find('tr').eq(index).find('img').length > 0
            tipsters.push({ name, side, isBigBet })
        }
        return tipsters
    }

    const leftNames = loadNameBySide('LEFT')
    const rightNames = loadNameBySide('RIGHT')
    return [...leftNames, ...rightNames]
}

function addTable(tipsters) {
    const leftTipsters = tipsters.filter(tipster => tipster.side === 'LEFT')
    const rightTipsters = tipsters.filter(tipster => tipster.side === 'RIGHT')
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

            table.side tr.good-normal {
                background-color: green !important;
            }
            
            table.side tr.good-big {
                background-color: blue !important;
            }

            tr.good td {
                color: white;
                font-weight: bold;
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
                ${leftTipsters.map(renderTipster).join('\n')}
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
                ${rightTipsters.map(renderTipster).join('\n')}
            </table>
        </div>
    `
    $('body').append(style)
    $('body').append(html)
    $('.side tr').click(function() {
        $(this).hasClass('hightlight') ? $(this).removeClass('hightlight') : $(this).addClass('hightlight')
    })

    function renderTipster(tipster) {
        const { winRate, no, name, bigBetWinRate, totalBet, yield, isBigBet } = tipster

        function getClass() {
            if (isBigBet && bigBetWinRate >= 0.6) return 'class="good good-big"'
            if (!isBigBet && winRate >= 0.6) return 'class="good good-normal"'
            return ''
        }

        return `
            <tr ${getClass()}>
                <td>${no}</td>
                <td>${name}</td>
                <td>${(winRate * 100).toPrecision(2)}% ${isBigBet ? '' : '√'}</td>
                <td>${(bigBetWinRate * 100).toPrecision(2)}% ${isBigBet ? '√' : ''}</td>
                <td>${totalBet}</td>
                <td>${(yield * 100).toPrecision(2)}%</td>
            </tr>
        `
    }
}

loadTipsterInfo()
