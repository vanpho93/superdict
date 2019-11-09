let i = 0

$('.dwl.hax').each(function (index) {
    $(this).html(`<button class="bh hao hbtn hbtn-tab tb pho-button">Save ${index}</button>`)
})

$('.pho-button').click(function () {
    const getButtonIndex = () => {
        const buttonText = $(this).text()
        const wordArray = buttonText.split(' ')
        return wordArray[wordArray.length - 1]
    }
    const buttonIndex = getButtonIndex()
    const data = getData(buttonIndex)
    console.log(data)
    saveVocabulary(data)
})

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function processMeaningString(meaning) {
    const trimmed = meaning.trim()
    const removedDoubleSpaces = replaceAll(trimmed, '  ', ' ')
    const removedNewLines = replaceAll(removedDoubleSpaces, '\n', ' ')
    const isEndWithAColon = removedNewLines.endsWith(':')
    return isEndWithAColon ? removedNewLines.slice(0, -1) : removedNewLines
}

function getData(index) {
    const word = $('.headword').eq(0).text()
    const pronunciation = $('.us.dpron-i').find('.ipa.dipa.lpr-2.lpl-1').eq(0).text()
    const americanSound = $('.us.dpron-i').find("[type='audio/mpeg']").eq(0).attr('src')
    const britishSound = $('.uk.dpron-i').find("[type='audio/mpeg']").eq(0).attr('src')
    const meaning = $('.def.ddef_d').eq(index).text()
    const examples = []
    $('.def-body.ddef_b').eq(index).find('.examp.dexamp').each(function () {
        examples.push($(this).text())
    })
    const wordType = $('.pos.dpos').eq(index).text()
    return {
        word,
        meaning: processMeaningString(meaning),
        pronunciation,
        examples: examples.join('|'),
        wordType,
        americanSound,
        britishSound,
    }
}

function saveVocabulary(vocabulary) {
    $.ajax({
        type: 'POST',
        url: 'https://superdict.herokuapp.com/api/vocabulary',
        data: JSON.stringify(vocabulary),
        success: function (data) { alert(`saved ${vocabulary.word}`); },
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function(request) {
            request.setRequestHeader("token", 'SUPER_TOKEN:SUPER_PASSWORD@123XYZ@:vanpho01@gmail.com');
        },
    });
}
