let i = 0

$('.dwl.hax').each(function(index) {
    $(this).html(`<button class="bh hao hbtn hbtn-tab tb pho-button">Save ${index}</button>`)
})

$('.pho-button').click(function() {
    const getButtonIndex = () => {
        const buttonText = $(this).text()
        const wordArray = buttonText.split(' ')
        return wordArray[wordArray.length - 1]        
    }
    const buttonIndex = getButtonIndex()
    const data = getData(buttonIndex)
    console.log(data)
})

function getData(index) {
    const word = $('.hw.dhw').eq(0).text()
    const pronounciation = $('.us.dpron-i').find('.ipa.dipa.lpr-2.lpl-1').eq(0).text()
    const meaning = $('.def.ddef_d').eq(index).text()
    const examples = []
    $('.def-body.ddef_b').eq(index).find('.examp.dexamp').each(function() {
        examples.push($(this).text())
    })
    return { word, meaning, pronounciation, examples }
}
