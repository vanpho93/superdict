import td from 'testdouble'
import { deepEqual } from 'assert'
import { TestUtilities, Fetch, Tipster, deepOmit } from '../global-refs'
import { UpdateTipster } from './update-tipster'

const TEST_TITLE = TestUtilities.getTestTitle(__filename)

describe(TEST_TITLE, () => {
  beforeEach(`${TEST_TITLE} init database`, async () => {
    const sampleHtml = `
      <table width="98%" border=1 bordercolor=black cellpadding=1 cellspacing=0 class="altrow">
        <tr>
          <td nowrap align="left" valign="center" nowrap width=100 title="Last seen 3 days ago">
          <font size="2" face="Verdana">571.
          <img src="/down.gif" width="12" height="10" title="cssheader=[red1] header=[Last ranked: #529]
          body=[Decreased: <font color=bb0000>-42</font>]">[<font color=darkred>-42</font>]
          </font>
          </td>
          <td width=40% align="left" style="padding-left:8px;">
          <font size="2" face="Verdana"><a href="index.cfm?player=G%26%23224%3B%2Evl&ID=359870">G&#224;.vl</a></font>
          </td>
          <td align="center" bgcolor="D9EAD7" width=40>
          8
          </td>
          <td align="center" bgcolor="d1ddee" width=40>
          0
          </td>
          <td align="center" bgcolor="F3E3DE" width=40>
          5
          </td>
          <td align="center">
          62%
          </td>
          <td align="center">
          64%
          </td>
          <td align="right">
          23.2%&nbsp;
          </td>
          <td align="center" nowrap>
          <span title="Current Winning Streak: 1 Days" style="cursor:help">1 days</span>
          /&nbsp;<span title="Longest Winning Streak: 2 Days" style="cursor:help">(2d)</span>
          </td>
          <td align="center" nowrap>
          <img src='/iconwin.gif' width=16 height=15 align=absmiddle> <img src='/iconwin.gif' width=16 height=15 align=absmiddle> <img src='/iconlose.gif' width=16 height=15 align=absmiddle> <img src='/iconwin.gif' width=16 height=15 align=absmiddle>
          </td>
          <td align="right" nowrap>
          <font size="2" face="Verdana" color="darkblue"><b>AB$ 1,266,250 </b></font></td>
          </tr>
          <tr></tr>
          <tr>
          <td nowrap align="left" valign="center" nowrap width=100 title="Last seen 15 hours ago">
          <font size="2" face="Verdana">572.
          <img src="/down.gif" width="12" height="10" title="cssheader=[red1] header=[Last ranked: #275]
          body=[Decreased: <font color=bb0000>-297</font>]">[<font color=darkred>-297</font>]
          </font>
          </td>
          <td width=40% align="left" style="padding-left:8px;">
          <font size="2" face="Verdana"><a href="index.cfm?player=Cruiser&ID=9400">Cruiser</a></font>
          <a href=http://tipsters.asianbookie.com/index.cfm?prizes=1><img border="0" src="top20award.gif" height="25" title="Tipsters Championship Top 50 Medal" align=absmiddle></a>
          </td>
          <td align="center" bgcolor="99C893" width=40>
          53
          </td>
          <td align="center" bgcolor="aac3e6" width=40>
          16
          </td>
          <td align="center" bgcolor="DFB6AA" width=40>
          49.5
          </td>
          <td align="center">
          52%
          </td>
          <td align="center">
          54%
          </td>
          <td align="right">
          3.4%&nbsp;
          </td>
          <td align="center" nowrap>
          <span title="Current Winning Streak: 0 Days" style="cursor:help">0 days</span>
          /&nbsp;<span title="Longest Winning Streak: 3 Days" style="cursor:help">(3d)</span>
          </td>
          <td align="center" nowrap>
          <img src='/iconwin.gif' width=16 height=15 align=absmiddle> <img src='/iconwin.gif' width=16 height=15 align=absmiddle> <img src='/iconlose.gif' width=16 height=15 align=absmiddle> <img src='/icondraw.gif' width=16 height=15 align=absmiddle> <img src='/iconlose.gif' width=16 height=15 align=absmiddle>
          </td>
          <td align="right" nowrap>
          <font size="2" face="Verdana" color="darkblue"><b>AB$ 1,265,938 </b></font></td>
          </tr>
          <tr>
          <td nowrap align="left" valign="center" nowrap width=100 title="Last seen 6 hours ago">
          <font size="2" face="Verdana">573.
          <img src="/down.gif" width="12" height="10" title="cssheader=[red1] header=[Last ranked: #540]
          body=[Decreased: <font color=bb0000>-33</font>]">[<font color=darkred>-33</font>]
          </font>
          </td>
          <td width=40% align="left" style="padding-left:8px;">
          <font size="2" face="Verdana"><a href="index.cfm?player=Suria&ID=188968">Suria</a></font>
          </td>
          <td align="center" bgcolor="D9EAD7" width=40>
          83.5
          </td>
          <td align="center" bgcolor="d1ddee" width=40>
          16
          </td>
          <td align="center" bgcolor="F3E3DE" width=40>
          74.5
          </td>
          <td align="center">
          53%
          </td>
          <td align="center">
          62%
          </td>
          <td align="right">
          4.3%&nbsp;
          </td>
          <td align="center" nowrap>
          <span title="Current Winning Streak: 2 Days" style="cursor:help">2 days</span>
          /&nbsp;<span title="Longest Winning Streak: 2 Days" style="cursor:help">(2d)</span>
          </td>
          <td align="center" nowrap>
          <img src='/iconwin.gif' width=16 height=15 align=absmiddle> <img src='/iconwin.gif' width=16 height=15 align=absmiddle> <img src='/iconlose.gif' width=16 height=15 align=absmiddle> <img src='/iconwin.gif' width=16 height=15 align=absmiddle> <img src='/iconwin.gif' width=16 height=15 align=absmiddle>
          </td>
          <td align="right" nowrap>
          <font size="2" face="Verdana" color="darkblue"><b>AB$ 1,265,625 </b></font></td>
          </tr>
      </table>
    `
    td.replace(Fetch, 'getText', () => sampleHtml)
  })

  it(`${TEST_TITLE} Can update tipsters`, async function () {
    await UpdateTipster.process()
    const tipsters = await Tipster.findAll({})
    deepEqual(deepOmit(tipsters, ['created', 'modified']), [
      {
        tipsterId: 9400,
        name: 'Cruiser',
        no: 572,
        balance: 1265938,
        winCount: 53,
        drawCount: 16,
        loseCount: 49.5,
        totalBet: 118.5,
        winRate: 0.52,
        bigBetWinRate: 0.54,
        yield: 0.034,
      },
      {
        tipsterId: 188968,
        name: 'Suria',
        no: 573,
        balance: 1265625,
        winCount: 83.5,
        drawCount: 16,
        loseCount: 74.5,
        totalBet: 174,
        winRate: 0.53,
        bigBetWinRate: 0.62,
        yield: 0.043,
      },
    ])
  })
})
