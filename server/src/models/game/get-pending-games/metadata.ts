export interface IInput {}

export interface IOutput {}

export enum EError {}

export const sampleHtml = `
<table class="group EPL" cellpadding=0 cellspacing=0 width=100%>
<tr>
<td bgcolor="336699" valign="top" colspan="5" background="forumgradient.gif">
<table align=right cellspacing=0 cellpadding=0><tr><td>
<img src="bigbet.gif" height=16 width=16 title="singleclickstop=[on] header=[<img src='bigbetsmall.gif' width='12' height='12' align='absmiddle'> What is this?] body=[<b>BIG BET</b>: Chosen team will be bet with AB$100,000. Limited to a <u><b>Maximum of 3</b></u> BIG BETS per matchday]" border=1 align="absmiddle" style="cursor:help">
<input type="checkbox" name="confident" onclick="checkIf(this,44785)" id="AH44785AH" value="M44785M"></td></tr></table>
&nbsp;&nbsp;
<font color="ffffff">1.
<img src="eplicon.gif" width="26" height="16" align="absmiddle" border="0">
<font color="white" size="3"><B>English Premier League</B></font>
<font color="white" size="2">-
Brighton v Crystal Palace</font>
</td>
<td width=1% bordercolor="FFFFFF"></td>
<td vAlign="absmiddle" bgColor="008000" colSpan="3" width="12%" nowrap>
<table align=right cellspacing=0 cellpadding=0><tr><td>
<img src="bigbet.gif" height=16 width=16 title="singleclickstop=[on] header=[<img src='bigbetsmall.gif' width='12' height='12' align='absmiddle'> What is this?] body=[<b>BIG BET</b>: Chosen team will be bet with AB$100,000. Limited to a <u><b>Maximum of 3</b></u> BIG BETS per matchday]" border=1 align="absmiddle" style="cursor:help">
<input type="checkbox" name="confident" onclick="checkIf(this,44785)" id="OU44785OU" value="O44785O"></td></tr></table>
<font size=2 color="FFFFFF">&nbsp;<b>Over/Under</b></font></td>
</tr>
<tr>
<td bgcolor=d2d2d2 align="center" nowrap width=30% id="HTD144785" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto';" onclick="selecthome(44785);">
<font size="3" face="arial narrow,arial"><b>Brighton</b></font>
</td>
<td noWrap align="right" bgColor="d2d2d2" width=2% id="HTD244785">
<span onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selecthome(44785);"><font size=2 color=000080><b><span id="ratea_44785">1.90</span></b></font></span>
<input type="radio" value="H" name="M44785" id="HomeButton44785" onclick="selecthome(44785);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'"><input type="button" onclick="showX(44785);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; width: 21px;margin:0 5px 5px 0;" id="HomeCancel44785">
</td>
<td bgcolor=808080 align="center" nowrap width=10%>
<a onclick="window.open('//stats.asianbookie.com/oddschart.cfm?compid=44785',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddschart.cfm?compid=44785" style="color:#000000;width:80%;display:block;text-decoration: none;" title="Odds Movement Chart">
<b><font face="Arial" color=FFFFFF size="3">&nbsp;<span id="ah_44785">0 : 1/4</span>&nbsp;</b></font>
</a></td>
<td noWrap align="left" bgColor="d2d2d2" id="ATD144785" width=2%>
<input type="button" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; width: 21px;margin:0 0 5px 5px;" id="AwayCancel44785" onclick="showX(44785);"><input type="radio" value="A" name="M44785" id="AwayButton44785" onclick="selectaway(44785)" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44785);">
<font size=2 color=000080><b>
<span onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44785);"><span id="rateb_44785">
2.00
</span></span>
</b></font>
</td>
<td bgcolor=d2d2d2 align="center" nowrap width=30% id="ATD244785" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44785);">
<font size="3" face="Arial Narrow,arial"><b>Crystal Palace</b></font>
</td>
<td width=1% bordercolor=ffffff></td>
<td noWrap align="center" bgColor="D5FFEA" id="OTD144785">
<span onclick="selectover(44785);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<font size=2 color=darkgreen><b><span id="ouratea_44785">2.10</span></b></font><font size=2 face="verdana">&nbsp;<b>O</b></font></span>
<input type="radio" value="O" name="O44785" id="OverButton44785" onclick="selectover(44785);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'"><input type="button" onclick="showXou(44785);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; position: absolute; left: -1000; top: -1000;width: 21px;margin:0 5px 5px 0;" id="OverCancel44785">
</td>
<td noWrap align="middle" bgColor="999999" width=5%>
<a onclick="window.open('//stats.asianbookie.com/oddsouchart.cfm?compid=44785',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddsouchart.cfm?compid=44785" style="color:#000000;width:80%;display:block;text-decoration: none;" title="O/U Odds Movement Chart">
<font color="FFFFFF" face="Arial" size=3><b>&nbsp;<span id="ou_44785">2 1/4</span>&nbsp;</b></font> </td>
<td noWrap align="center" id="UTD144785" bgColor="D5FFEA">
<input type="button" onclick="showXou(44785);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; position: absolute; left: -1000; top: -1000;width: 21px;margin:0 0 5px 5px;" id="UnderCancel44785">
<input type="radio" value="U" name="O44785" id="UnderButton44785" onclick="selectunder(44785);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<span onclick="selectunder(44785);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<font size=2 face="verdana"><b>U</b>&nbsp;</font><font size=2 color=darkgreen><b><span id="ourateb_44785">1.80
</span></b></font>
</span>
</td>
</tr>
<tr>
<tr>
<td colspan="9">
<table width="100%" bgcolor="efefef" id="ahhelp" cellpadding=2 cellspacing=0>
<tr>
<td colspan="2"><font size="1" face="Verdana"><b>Payment Outcome
Summary</b></font></td>
</tr>
<tr vAlign="top">
<td nowrap><font size="1" face="Verdana">Bet on Brighton:</font></td>
<td><font size="1" face="Verdana">
You win if Brighton wins. You lose half your bet if Brighton DRAW.
</td>
</tr>
<tr vAlign="top">
<td nowrap><font size="1" face="Verdana">Bet on Crystal Palace:</font></td>
<td width=85%><font size="1" face="Verdana">
You win if Crystal Palace wins. You win half your bet if Crystal Palace draw.
</td>
</tr>
<tr vAlign="top">
<td nowrap bgcolor="cccccc"><font size="1" face="Verdana">Bet on Over:</font></td>
<td align=left width=85% bgcolor="cccccc"><font size="1" face="Verdana">
You win if total goals of the match is 3 or more. You lose half your bet if total goals of the match is 2.
</td>
</tr>
<tr vAlign="top">
<td nowrap bgcolor="cccccc"><font size="1" face="Verdana">Bet on Under:</font></td>
<td align=left bgcolor="cccccc"><font size="1" face="Verdana">
You win if total goals of the match is 1 or less. You win half your bet if total goals of the match is 2.
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="A0B0E0">
<tr>
<td colspan="1" align="left">&nbsp;
<a href="/matchstat.cfm?id=44785" onclick="window.open('/matchstat.cfm?id=44785','','width=870,height=500,top=40px,left=60px,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;"><img src="statsAH.gif" width="55" height="17" border="0" align="absmiddle"></a>
<a href="/matchoustat.cfm?id=44785" onclick="window.open('/matchoustat.cfm?id=44785','','width=870,height=500,top=40px,left=60px,menubar=no,status=no,location=no,toolbar=no,horizontalscrolling=no,resizable=yes');
return false;"><img src="statsOU.gif" width="55" height="17" border="0" align="absmiddle"></a>
<a onclick="window.open('//stats.asianbookie.com/oddschart.cfm?compid=44785',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddschart.cfm?compid=44785" style="color:000000">
<img src="charticon.gif" width=15 height=15 align=absmiddle border=0 title="Odds Movement Chart" oncontextmenu="return false;"></a>
<a onclick="window.open('//stats.asianbookie.com/oddsouchart.cfm?compid=44785',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddsouchart.cfm?compid=44785" style="color:000000">
<img src="chartouicon.gif" width=15 height=15 align=absmiddle border=0 title="O/U Odds Movement Chart" oncontextmenu="return false;"></a>
<a href="//stats.asianbookie.com/h2h.cfm?compid=44785" target="_blank"><img src="h2h.gif" height=13 width=26 border=0 align=absmiddle title="Head-To-Head Stats" oncontextmenu="return false;"></a>
<b><font color="333333" size="2">&nbsp;&nbsp;8:30pm
&nbsp;&nbsp;
Saturday, 29 Feb 2020
&nbsp;<font color=005000>(in 12 minutes time)</font></B></font>
</td>
<td colspan="1" align="right">
</td>
</tr>
<tr><td align=right valign="top" bgcolor=ffffff colspan=2><img src="shadow.gif" height="9" width="100%"><br><br></td></tr>
</table>
</td>
</tr>
<font color=white>{ts '2020-02-29 20:30:00'} {ts '2020-02-29 20:30:00'}</font>
<table class="group DIV1" cellpadding=0 cellspacing=0 width=100%>
<tr>
<td bgcolor="336699" valign="top" colspan="5" background="forumgradient.gif">
<table align=right cellspacing=0 cellpadding=0><tr><td>
<img src="bigbet.gif" height=16 width=16 title="singleclickstop=[on] header=[<img src='bigbetsmall.gif' width='12' height='12' align='absmiddle'> What is this?] body=[<b>BIG BET</b>: Chosen team will be bet with AB$100,000. Limited to a <u><b>Maximum of 3</b></u> BIG BETS per matchday]" border=1 align="absmiddle" style="cursor:help">
<input type="checkbox" name="confident" onclick="checkIf(this,44912)" id="AH44912AH" value="M44912M"></td></tr></table>
&nbsp;&nbsp;
<font color="ffffff">2.
<img src="elcicon.gif" width="26" height="16" align="absmiddle" border="0">
<font color="white" size="3"><B>English League Championship</B></font>
<font color="white" size="2">-
Hull City v Leeds United</font>
</td>
<td width=1% bordercolor="FFFFFF"></td>
<td vAlign="absmiddle" bgColor="008000" colSpan="3" width="12%" nowrap>
<table align=right cellspacing=0 cellpadding=0><tr><td>
<img src="bigbet.gif" height=16 width=16 title="singleclickstop=[on] header=[<img src='bigbetsmall.gif' width='12' height='12' align='absmiddle'> What is this?] body=[<b>BIG BET</b>: Chosen team will be bet with AB$100,000. Limited to a <u><b>Maximum of 3</b></u> BIG BETS per matchday]" border=1 align="absmiddle" style="cursor:help">
<input type="checkbox" name="confident" onclick="checkIf(this,44912)" id="OU44912OU" value="O44912O"></td></tr></table>
<font size=2 color="FFFFFF">&nbsp;<b>Over/Under</b></font></td>
</tr>
<tr>
<td bgcolor=d2d2d2 align="center" nowrap width=30% id="HTD144912" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto';" onclick="selecthome(44912);">
<font size="3" face="arial narrow,arial"><b>Hull City</b></font>
</td>
<td noWrap align="right" bgColor="d2d2d2" width=2% id="HTD244912">
<span onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selecthome(44912);"><font size=2 color=000080><b><span id="ratea_44912">1.975</span></b></font></span>
<input type="radio" value="H" name="M44912" id="HomeButton44912" onclick="selecthome(44912);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'"><input type="button" onclick="showX(44912);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; width: 21px;margin:0 5px 5px 0;" id="HomeCancel44912">
</td>
<td bgcolor=808080 align="center" nowrap width=10%>
<a onclick="window.open('//stats.asianbookie.com/oddschart.cfm?compid=44912',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddschart.cfm?compid=44912" style="color:#000000;width:80%;display:block;text-decoration: none;" title="Odds Movement Chart">
<b><font face="Arial" color=FFFFFF size="3">&nbsp;<span id="ah_44912">1 1/2 : 0</span>&nbsp;</b></font>
</a></td>
<td noWrap align="left" bgColor="d2d2d2" id="ATD144912" width=2%>
<input type="button" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; width: 21px;margin:0 0 5px 5px;" id="AwayCancel44912" onclick="showX(44912);"><input type="radio" value="A" name="M44912" id="AwayButton44912" onclick="selectaway(44912)" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44912);">
<font size=2 color=000080><b>
<span onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44912);"><span id="rateb_44912">
1.925
</span></span>
</b></font>
</td>
<td bgcolor=d2d2d2 align="center" nowrap width=30% id="ATD244912" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44912);">
<font size="3" face="Arial Narrow,arial"><b>Leeds United</b></font>
</td>
<td width=1% bordercolor=ffffff></td>
<td noWrap align="center" bgColor="D5FFEA" id="OTD144912">
<span onclick="selectover(44912);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<font size=2 color=darkgreen><b><span id="ouratea_44912">2.05</span></b></font><font size=2 face="verdana">&nbsp;<b>O</b></font></span>
<input type="radio" value="O" name="O44912" id="OverButton44912" onclick="selectover(44912);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'"><input type="button" onclick="showXou(44912);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; position: absolute; left: -1000; top: -1000;width: 21px;margin:0 5px 5px 0;" id="OverCancel44912">
</td>
<td noWrap align="middle" bgColor="999999" width=5%>
<a onclick="window.open('//stats.asianbookie.com/oddsouchart.cfm?compid=44912',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddsouchart.cfm?compid=44912" style="color:#000000;width:80%;display:block;text-decoration: none;" title="O/U Odds Movement Chart">
<font color="FFFFFF" face="Arial" size=3><b>&nbsp;<span id="ou_44912">3</span>&nbsp;</b></font> </td>
<td noWrap align="center" id="UTD144912" bgColor="D5FFEA">
<input type="button" onclick="showXou(44912);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; position: absolute; left: -1000; top: -1000;width: 21px;margin:0 0 5px 5px;" id="UnderCancel44912">
<input type="radio" value="U" name="O44912" id="UnderButton44912" onclick="selectunder(44912);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<span onclick="selectunder(44912);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<font size=2 face="verdana"><b>U</b>&nbsp;</font><font size=2 color=darkgreen><b><span id="ourateb_44912">1.825
</span></b></font>
</span>
</td>
</tr>
<tr>
<tr>
<td colspan="9">
<table width="100%" bgcolor="efefef" id="ahhelp" cellpadding=2 cellspacing=0>
<tr>
<td colspan="2"><font size="1" face="Verdana"><b>Payment Outcome
Summary</b></font></td>
</tr>
<tr vAlign="top">
<td nowrap><font size="1" face="Verdana">Bet on Hull City:</font></td>
<td><font size="1" face="Verdana">
You win if Hull City wins, draw or loses by 1 goal.
</td>
</tr>
<tr vAlign="top">
<td nowrap><font size="1" face="Verdana">Bet on Leeds United:</font></td>
<td width=85%><font size="1" face="Verdana">
You win if Leeds United wins by 2 goals or more.
</td>
</tr>
<tr vAlign="top">
<td nowrap bgcolor="cccccc"><font size="1" face="Verdana">Bet on Over:</font></td>
<td align=left width=85% bgcolor="cccccc"><font size="1" face="Verdana">
You win if total goals of the match is 4 or more. Your bet is refunded if total goals of the match is 3.
</td>
</tr>
<tr vAlign="top">
<td nowrap bgcolor="cccccc"><font size="1" face="Verdana">Bet on Under:</font></td>
<td align=left bgcolor="cccccc"><font size="1" face="Verdana">
You win if total goals of the match is 2 or less. Your bet is refunded if total goals of the match is 3.
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="A0B0E0">
<tr>
<td colspan="1" align="left">&nbsp;
<a href="/matchstat.cfm?id=44912" onclick="window.open('/matchstat.cfm?id=44912','','width=870,height=500,top=40px,left=60px,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;"><img src="statsAH.gif" width="55" height="17" border="0" align="absmiddle"></a>
<a href="/matchoustat.cfm?id=44912" onclick="window.open('/matchoustat.cfm?id=44912','','width=870,height=500,top=40px,left=60px,menubar=no,status=no,location=no,toolbar=no,horizontalscrolling=no,resizable=yes');
return false;"><img src="statsOU.gif" width="55" height="17" border="0" align="absmiddle"></a>
<a onclick="window.open('//stats.asianbookie.com/oddschart.cfm?compid=44912',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddschart.cfm?compid=44912" style="color:000000">
<img src="charticon.gif" width=15 height=15 align=absmiddle border=0 title="Odds Movement Chart" oncontextmenu="return false;"></a>
<a onclick="window.open('//stats.asianbookie.com/oddsouchart.cfm?compid=44912',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddsouchart.cfm?compid=44912" style="color:000000">
<img src="chartouicon.gif" width=15 height=15 align=absmiddle border=0 title="O/U Odds Movement Chart" oncontextmenu="return false;"></a>
<a href="//stats.asianbookie.com/h2h.cfm?compid=44912" target="_blank"><img src="h2h.gif" height=13 width=26 border=0 align=absmiddle title="Head-To-Head Stats" oncontextmenu="return false;"></a>
<b><font color="333333" size="2">&nbsp;&nbsp;8:30pm
&nbsp;&nbsp;
Saturday, 29 Feb 2020
&nbsp;<font color=005000>(in 12 minutes time)</font></B></font>
</td>
<td colspan="1" align="right">
</td>
</tr>
<tr><td align=right valign="top" bgcolor=ffffff colspan=2><img src="shadow.gif" height="9" width="100%"><br><br></td></tr>
</table>
</td>
</tr>
<font color=white>{ts '2020-02-29 22:00:00'} {ts '2020-02-29 20:30:00'}</font>
<table class="group ISA" cellpadding=0 cellspacing=0 width=100%>
<tr>
<td bgcolor="336699" valign="top" colspan="5" background="forumgradient.gif">
<table align=right cellspacing=0 cellpadding=0><tr><td>
<img src="bigbet.gif" height=16 width=16 title="singleclickstop=[on] header=[<img src='bigbetsmall.gif' width='12' height='12' align='absmiddle'> What is this?] body=[<b>BIG BET</b>: Chosen team will be bet with AB$100,000. Limited to a <u><b>Maximum of 3</b></u> BIG BETS per matchday]" border=1 align="absmiddle" style="cursor:help">
<input type="checkbox" name="confident" onclick="checkIf(this,44820)" id="AH44820AH" value="M44820M"></td></tr></table>
&nbsp;&nbsp;
<font color="ffffff">3.
<img src="isaicon.gif" width="26" height="16" align="absmiddle" border="0">
<font color="white" size="3"><B>Italian Serie A </B></font>
<font color="white" size="2">-
Lazio v Bologna</font>
</td>
<td width=1% bordercolor="FFFFFF"></td>
<td vAlign="absmiddle" bgColor="008000" colSpan="3" width="12%" nowrap>
<table align=right cellspacing=0 cellpadding=0><tr><td>
<img src="bigbet.gif" height=16 width=16 title="singleclickstop=[on] header=[<img src='bigbetsmall.gif' width='12' height='12' align='absmiddle'> What is this?] body=[<b>BIG BET</b>: Chosen team will be bet with AB$100,000. Limited to a <u><b>Maximum of 3</b></u> BIG BETS per matchday]" border=1 align="absmiddle" style="cursor:help">
<input type="checkbox" name="confident" onclick="checkIf(this,44820)" id="OU44820OU" value="O44820O"></td></tr></table>
<font size=2 color="FFFFFF">&nbsp;<b>Over/Under</b></font></td>
</tr>
<tr>
<td bgcolor=d2d2d2 align="center" nowrap width=30% id="HTD144820" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto';" onclick="selecthome(44820);">
<font size="3" face="arial narrow,arial"><b>Lazio</b></font>
</td>
<td noWrap align="right" bgColor="d2d2d2" width=2% id="HTD244820">
<span onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selecthome(44820);"><font size=2 color=000080><b><span id="ratea_44820">1.95</span></b></font></span>
<input type="radio" value="H" name="M44820" id="HomeButton44820" onclick="selecthome(44820);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'"><input type="button" onclick="showX(44820);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; width: 21px;margin:0 5px 5px 0;" id="HomeCancel44820">
</td>
<td bgcolor=808080 align="center" nowrap width=10%>
<a onclick="window.open('//stats.asianbookie.com/oddschart.cfm?compid=44820',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddschart.cfm?compid=44820" style="color:#000000;width:80%;display:block;text-decoration: none;" title="Odds Movement Chart">
<b><font face="Arial" color=FFFFFF size="3">&nbsp;<span id="ah_44820">0 : 1</span>&nbsp;</b></font>
</a></td>
<td noWrap align="left" bgColor="d2d2d2" id="ATD144820" width=2%>
<input type="button" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; width: 21px;margin:0 0 5px 5px;" id="AwayCancel44820" onclick="showX(44820);"><input type="radio" value="A" name="M44820" id="AwayButton44820" onclick="selectaway(44820)" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44820);">
<font size=2 color=000080><b>
<span onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44820);"><span id="rateb_44820">
1.95
</span></span>
</b></font>
</td>
<td bgcolor=d2d2d2 align="center" nowrap width=30% id="ATD244820" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44820);">
<font size="3" face="Arial Narrow,arial"><b>Bologna</b></font>
</td>
<td width=1% bordercolor=ffffff></td>
<td noWrap align="center" bgColor="D5FFEA" id="OTD144820">
<span onclick="selectover(44820);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<font size=2 color=darkgreen><b><span id="ouratea_44820">1.925</span></b></font><font size=2 face="verdana">&nbsp;<b>O</b></font></span>
<input type="radio" value="O" name="O44820" id="OverButton44820" onclick="selectover(44820);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'"><input type="button" onclick="showXou(44820);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; position: absolute; left: -1000; top: -1000;width: 21px;margin:0 5px 5px 0;" id="OverCancel44820">
</td>
<td noWrap align="middle" bgColor="999999" width=5%>
<a onclick="window.open('//stats.asianbookie.com/oddsouchart.cfm?compid=44820',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddsouchart.cfm?compid=44820" style="color:#000000;width:80%;display:block;text-decoration: none;" title="O/U Odds Movement Chart">
<font color="FFFFFF" face="Arial" size=3><b>&nbsp;<span id="ou_44820">3</span>&nbsp;</b></font> </td>
<td noWrap align="center" id="UTD144820" bgColor="D5FFEA">
<input type="button" onclick="showXou(44820);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; position: absolute; left: -1000; top: -1000;width: 21px;margin:0 0 5px 5px;" id="UnderCancel44820">
<input type="radio" value="U" name="O44820" id="UnderButton44820" onclick="selectunder(44820);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<span onclick="selectunder(44820);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<font size=2 face="verdana"><b>U</b>&nbsp;</font><font size=2 color=darkgreen><b><span id="ourateb_44820">1.975
</span></b></font>
</span>
</td>
</tr>
<tr>
<tr>
<td colspan="9">
<table width="100%" bgcolor="efefef" id="ahhelp" cellpadding=2 cellspacing=0>
<tr>
<td colspan="2"><font size="1" face="Verdana"><b>Payment Outcome
Summary</b></font></td>
</tr>
<tr vAlign="top">
<td nowrap><font size="1" face="Verdana">Bet on Lazio:</font></td>
<td><font size="1" face="Verdana">
You win if Lazio wins by 2 goals or more. Your bet is refunded if Lazio wins by 1 goal.
</td>
</tr>
<tr vAlign="top">
<td nowrap><font size="1" face="Verdana">Bet on Bologna:</font></td>
<td width=85%><font size="1" face="Verdana">
You win if Bologna wins or draw. Your bet is refunded if Bologna loses by 1 goal.
</td>
</tr>
<tr vAlign="top">
<td nowrap bgcolor="cccccc"><font size="1" face="Verdana">Bet on Over:</font></td>
<td align=left width=85% bgcolor="cccccc"><font size="1" face="Verdana">
You win if total goals of the match is 4 or more. Your bet is refunded if total goals of the match is 3.
</td>
</tr>
<tr vAlign="top">
<td nowrap bgcolor="cccccc"><font size="1" face="Verdana">Bet on Under:</font></td>
<td align=left bgcolor="cccccc"><font size="1" face="Verdana">
You win if total goals of the match is 2 or less. Your bet is refunded if total goals of the match is 3.
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="A0B0E0">
<tr>
<td colspan="1" align="left">&nbsp;
<a href="/matchstat.cfm?id=44820" onclick="window.open('/matchstat.cfm?id=44820','','width=870,height=500,top=40px,left=60px,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;"><img src="statsAH.gif" width="55" height="17" border="0" align="absmiddle"></a>
<a href="/matchoustat.cfm?id=44820" onclick="window.open('/matchoustat.cfm?id=44820','','width=870,height=500,top=40px,left=60px,menubar=no,status=no,location=no,toolbar=no,horizontalscrolling=no,resizable=yes');
return false;"><img src="statsOU.gif" width="55" height="17" border="0" align="absmiddle"></a>
<a onclick="window.open('//stats.asianbookie.com/oddschart.cfm?compid=44820',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddschart.cfm?compid=44820" style="color:000000">
<img src="charticon.gif" width=15 height=15 align=absmiddle border=0 title="Odds Movement Chart" oncontextmenu="return false;"></a>
<a onclick="window.open('//stats.asianbookie.com/oddsouchart.cfm?compid=44820',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddsouchart.cfm?compid=44820" style="color:000000">
<img src="chartouicon.gif" width=15 height=15 align=absmiddle border=0 title="O/U Odds Movement Chart" oncontextmenu="return false;"></a>
<a href="//stats.asianbookie.com/h2h.cfm?compid=44820" target="_blank"><img src="h2h.gif" height=13 width=26 border=0 align=absmiddle title="Head-To-Head Stats" oncontextmenu="return false;"></a>
<b><font color="333333" size="2">&nbsp;&nbsp;10:00pm
&nbsp;&nbsp;
Saturday, 29 Feb 2020
&nbsp;<font color=005000>(in 2 hours time)</font></B></font>
</td>
<td colspan="1" align="right">
</td>
</tr>
<tr><td align=right valign="top" bgcolor=ffffff colspan=2><img src="shadow.gif" height="9" width="100%"><br><br></td></tr>
</table>
</td>
</tr>
<font color=white>{ts '2020-02-29 22:00:00'} {ts '2020-02-29 22:00:00'}</font>
<table class="group ISB" cellpadding=0 cellspacing=0 width=100%>
<tr>
<td bgcolor="336699" valign="top" colspan="5" background="forumgradient.gif">
<table align=right cellspacing=0 cellpadding=0><tr><td>
<img src="bigbet.gif" height=16 width=16 title="singleclickstop=[on] header=[<img src='bigbetsmall.gif' width='12' height='12' align='absmiddle'> What is this?] body=[<b>BIG BET</b>: Chosen team will be bet with AB$100,000. Limited to a <u><b>Maximum of 3</b></u> BIG BETS per matchday]" border=1 align="absmiddle" style="cursor:help">
<input type="checkbox" name="confident" onclick="checkIf(this,44932)" id="AH44932AH" value="M44932M"></td></tr></table>
&nbsp;&nbsp;
<font color="ffffff">4.
<img src="isbicon.gif" width="26" height="16" align="absmiddle" border="0">
<font color="white" size="3"><B>Italan Serie B</B></font>
<font color="white" size="2">-
Benevento v Spezia</font>
</td>
<td width=1% bordercolor="FFFFFF"></td>
<td vAlign="absmiddle" bgColor="008000" colSpan="3" width="12%" nowrap>
<table align=right cellspacing=0 cellpadding=0><tr><td>
<img src="bigbet.gif" height=16 width=16 title="singleclickstop=[on] header=[<img src='bigbetsmall.gif' width='12' height='12' align='absmiddle'> What is this?] body=[<b>BIG BET</b>: Chosen team will be bet with AB$100,000. Limited to a <u><b>Maximum of 3</b></u> BIG BETS per matchday]" border=1 align="absmiddle" style="cursor:help">
<input type="checkbox" name="confident" onclick="checkIf(this,44932)" id="OU44932OU" value="O44932O"></td></tr></table>
<font size=2 color="FFFFFF">&nbsp;<b>Over/Under</b></font></td>
</tr>
<tr>
<td bgcolor=d2d2d2 align="center" nowrap width=30% id="HTD144932" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto';" onclick="selecthome(44932);">
<font size="3" face="arial narrow,arial"><b>Benevento</b></font>
</td>
<td noWrap align="right" bgColor="d2d2d2" width=2% id="HTD244932">
<span onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selecthome(44932);"><font size=2 color=000080><b><span id="ratea_44932">1.825</span></b></font></span>
<input type="radio" value="H" name="M44932" id="HomeButton44932" onclick="selecthome(44932);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'"><input type="button" onclick="showX(44932);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; width: 21px;margin:0 5px 5px 0;" id="HomeCancel44932">
</td>
<td bgcolor=808080 align="center" nowrap width=10%>
<a onclick="window.open('//stats.asianbookie.com/oddschart.cfm?compid=44932',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddschart.cfm?compid=44932" style="color:#000000;width:80%;display:block;text-decoration: none;" title="Odds Movement Chart">
<b><font face="Arial" color=FFFFFF size="3">&nbsp;<span id="ah_44932">0 : 1/2</span>&nbsp;</b></font>
</a></td>
<td noWrap align="left" bgColor="d2d2d2" id="ATD144932" width=2%>
<input type="button" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; width: 21px;margin:0 0 5px 5px;" id="AwayCancel44932" onclick="showX(44932);"><input type="radio" value="A" name="M44932" id="AwayButton44932" onclick="selectaway(44932)" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44932);">
<font size=2 color=000080><b>
<span onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44932);"><span id="rateb_44932">
2.05
</span></span>
</b></font>
</td>
<td bgcolor=d2d2d2 align="center" nowrap width=30% id="ATD244932" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'" onclick="selectaway(44932);">
<font size="3" face="Arial Narrow,arial"><b>Spezia</b></font>
</td>
<td width=1% bordercolor=ffffff></td>
<td noWrap align="center" bgColor="D5FFEA" id="OTD144932">
<span onclick="selectover(44932);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<font size=2 color=darkgreen><b><span id="ouratea_44932">1.85</span></b></font><font size=2 face="verdana">&nbsp;<b>O</b></font></span>
<input type="radio" value="O" name="O44932" id="OverButton44932" onclick="selectover(44932);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'"><input type="button" onclick="showXou(44932);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; position: absolute; left: -1000; top: -1000;width: 21px;margin:0 5px 5px 0;" id="OverCancel44932">
</td>
<td noWrap align="middle" bgColor="999999" width=5%>
<a onclick="window.open('//stats.asianbookie.com/oddsouchart.cfm?compid=44932',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddsouchart.cfm?compid=44932" style="color:#000000;width:80%;display:block;text-decoration: none;" title="O/U Odds Movement Chart">
<font color="FFFFFF" face="Arial" size=3><b>&nbsp;<span id="ou_44932">2 1/4</span>&nbsp;</b></font> </td>
<td noWrap align="center" id="UTD144932" bgColor="D5FFEA">
<input type="button" onclick="showXou(44932);" value="X" style="display:none;font-size: 7pt; font-family: verdana; color: 800000;
font-weight: bold; position: absolute; left: -1000; top: -1000;width: 21px;margin:0 0 5px 5px;" id="UnderCancel44932">
<input type="radio" value="U" name="O44932" id="UnderButton44932" onclick="selectunder(44932);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<span onclick="selectunder(44932);" onmouseover="this.style.cursor = 'pointer';" onmouseout="this.style.cursor = 'auto'">
<font size=2 face="verdana"><b>U</b>&nbsp;</font><font size=2 color=darkgreen><b><span id="ourateb_44932">2.025
</span></b></font>
</span>
</td>
</tr>
<tr>
<tr>
<td colspan="9">
<table width="100%" bgcolor="efefef" id="ahhelp" cellpadding=2 cellspacing=0>
<tr>
<td colspan="2"><font size="1" face="Verdana"><b>Payment Outcome
Summary</b></font></td>
</tr>
<tr vAlign="top">
<td nowrap><font size="1" face="Verdana">Bet on Benevento:</font></td>
<td><font size="1" face="Verdana">
You win if Benevento wins.
</td>
</tr>
<tr vAlign="top">
<td nowrap><font size="1" face="Verdana">Bet on Spezia:</font></td>
<td width=85%><font size="1" face="Verdana">
You win if Spezia wins or draw.
</td>
</tr>
<tr vAlign="top">
<td nowrap bgcolor="cccccc"><font size="1" face="Verdana">Bet on Over:</font></td>
<td align=left width=85% bgcolor="cccccc"><font size="1" face="Verdana">
You win if total goals of the match is 3 or more. You lose half your bet if total goals of the match is 2.
</td>
</tr>
<tr vAlign="top">
<td nowrap bgcolor="cccccc"><font size="1" face="Verdana">Bet on Under:</font></td>
<td align=left bgcolor="cccccc"><font size="1" face="Verdana">
You win if total goals of the match is 1 or less. You win half your bet if total goals of the match is 2.
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="A0B0E0">
<tr>
<td colspan="1" align="left">&nbsp;
<a href="/matchstat.cfm?id=44932" onclick="window.open('/matchstat.cfm?id=44932','','width=870,height=500,top=40px,left=60px,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;"><img src="statsAH.gif" width="55" height="17" border="0" align="absmiddle"></a>
<a href="/matchoustat.cfm?id=44932" onclick="window.open('/matchoustat.cfm?id=44932','','width=870,height=500,top=40px,left=60px,menubar=no,status=no,location=no,toolbar=no,horizontalscrolling=no,resizable=yes');
return false;"><img src="statsOU.gif" width="55" height="17" border="0" align="absmiddle"></a>
<a onclick="window.open('//stats.asianbookie.com/oddschart.cfm?compid=44932',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddschart.cfm?compid=44932" style="color:000000">
<img src="charticon.gif" width=15 height=15 align=absmiddle border=0 title="Odds Movement Chart" oncontextmenu="return false;"></a>
<a onclick="window.open('//stats.asianbookie.com/oddsouchart.cfm?compid=44932',
'','top=100,left=220,width=690,height=360,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=no');
return false;" href="//stats.asianbookie.com/oddsouchart.cfm?compid=44932" style="color:000000">
<img src="chartouicon.gif" width=15 height=15 align=absmiddle border=0 title="O/U Odds Movement Chart" oncontextmenu="return false;"></a>
<a href="//stats.asianbookie.com/h2h.cfm?compid=44932" target="_blank"><img src="h2h.gif" height=13 width=26 border=0 align=absmiddle title="Head-To-Head Stats" oncontextmenu="return false;"></a>
<b><font color="333333" size="2">&nbsp;&nbsp;10:00pm
&nbsp;&nbsp;
Saturday, 29 Feb 2020
&nbsp;<font color=005000>(in 2 hours time)</font></B></font>
</td>
<td colspan="1" align="right">
</td>
</tr>
<tr><td align=right valign="top" bgcolor=ffffff colspan=2><img src="shadow.gif" height="9" width="100%"><br><br></td></tr>
</table>
</td>
</tr>
<font color=white>{ts '2020-02-29 22:00:00'} {ts '2020-02-29 22:00:00'}</font>
`
