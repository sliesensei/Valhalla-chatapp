import React from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			textAlign: 'center',
			paddingTop: theme.spacing(4),
		},
	})
);

const html = `
<!DOCTYPE html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>SurveyMonkey</title>
	<style type="text/css">		#outlook a {padding:0;}
		a:link {color:#333333;}      /* unvisited link */
		a:visited {color:#333333;}  /* visited link */
		a:hover {color:#333333;}  /* mouse over link */
		a:active {color:#333333;}  /* selected link */
		a {text-decoration: none;}
		a img {border:none;}
		body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;} 
		.ExternalClass {width:100%;}
		#backgroundTable {margin:0; padding:0; width:100% !important; }
		img {outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;} 
		span.yshortcuts { color:#333333; background-color:none; border:none;}
		span.yshortcuts:hover,
		span.yshortcuts:active,
		span.yshortcuts:focus {color:#333333; background-color:none; border:none;}
		@media only screen and (max-width: 500px)
		{

	*[class=hide] { display: none !important; }
	*[class=table] { width: 100% !important; }
	*[class=tablePad] { width: 100% !important; padding-left:20px; padding-right:20px; text-align:center !important; }
	*[class=tableCenter] { width: 100% !important; text-align:center !important; }
	*[class=table90] { width: 90% !important; }
	*[class=table10] { width: 10% !important; }
	*[class=footer] { width: 90% !important; }
	*[class=signin] { padding-right:20px; }
	*[class=logo] { width: 64%; padding-left:10px; }
	*[class=tableHeight20] { width: 100% !important; height:40px !important; }
	*[class=tableWhite] { width: 100% !important; background-color:#ffffff !important; }
	*[class=tableWhiteBackground] { width: 100% !important; background-color:#ffffff; }
	*[class=tableVisibleFeature] {display:block !important;  margin:auto !important; width:100% !important; height:auto !important; max-height:inherit !important; overflow:visible !important;}
.table90Rebrand { width: 90% !important; }
.tableRebrand { width: 100% !important; }
		}
	</style>
</head>
<body>


<table class="table" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F4F5F5">
	<tr>
		<td class="tableWhiteBackground" style="border-collapse: collapse;" width="600" bgcolor="#F4F5F5" valign="top" align="center">
		<table class="table" width="600" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td style="border-collapse: collapse;" class="tableCenter" width="219" height="70" bgcolor="#F4F5F5" align="left" valign="middle"><a target="_blank" href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWSS&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o.&_di_=b2f0lj0clfrdaeh56cpant4upnle2o2rvsr5hb8jcrd067nslhm0"><img style="outline:none; text-decoration:none; color:#40a9a8; -ms-interpolation-mode: bicubic;" src="https://static.cdn.responsys.net/i2/responsysimages/survey/contentlibrary/2020_Q4/AdHoc/images/green-logo-head.png" width="50" border="0" alt="" /></a></td>

			</tr>
		</table>
		<table class="table" width="600" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td class="table" style="border-collapse: collapse;" width="600" height="15" bgcolor="#00BF6F"><img class="table" style="outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; display:block;" src="https://static.cdn.responsys.net/i2/responsysimages/survey/contentlibrary/2020_Q4/AdHoc/images/spacer.gif" width="600" height="15" alt=""/></td>
			</tr>
		</table>
		<table class="table90" width="600" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td class="table" colspan="3" style="border-collapse: collapse;" width="600" height="35" bgcolor="#FFFFFF"><img class="tableHeight20" style="outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; display:block;" src="https://static.cdn.responsys.net/i2/responsysimages/survey/contentlibrary/2020_Q4/AdHoc/images/spacer.gif" width="600" height="35" alt=""/></td>
			</tr>
			<tr>
				<td class="hide" style="border-collapse: collapse;" width="40" height="3" bgcolor="#FFFFFF"><img style="outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; display:block;" src="https://static.cdn.responsys.net/i2/responsysimages/survey/contentlibrary/2020_Q4/AdHoc/images/spacer.gif" width="40" height="3" alt=""/></td>
				<td class="table" style="border-collapse: collapse; line-height:24px;" width="520" height="3" align="left" valign="top" bgcolor="#FFFFFF">
				<font style="text-decoration:none; color:#333E48; font-size:16px; font-weight:400; font-family:helvetica, arial, sans-serif;">

                    <p>At SurveyMonkey, we're committed to transparency and keeping our customers informed of our terms and policies and updates made to them, so we wanted to let you know about some changes we're making to our <a target="_blank" href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWSD&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o.&_di_=mk3ckvjme2i77tabg5flda04orima1ki58ge8puckli1f7rela40" style="color:#007FAA;">Privacy Notice</a>, <a target="_blank" href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWTR&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o.&_di_=8cjnm1dvobncpmv9c5sl1skde9e162o4e2n4ih39417olo8neec0" style="color:#007FAA;">Terms of Use</a> and related policies. To help bring clarity to the changes, we've expanded our <a target="_blank" href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWTS&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o.&_di_=dg1nvassfh78p34s1u14mqdpje2b8dbqperdfa9kphtctgqin8qg" style="color:#007FAA;">Privacy Basics</a> page to further describe our privacy practices. These changes will go into effect for our existing users on <b>January 1, 2021</b>.</p>

                    <p>Below are highlights of some key changes. If you're interested in more details, we encourage you to visit the  <a target="_blank" href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWTT&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o.&_di_=s7fo0b0epsj6sik862d89n9bc3l15e61s7v97bqnb0pb3bumikf0" style="color:#007FAA;">updates page in our Legal Center</a> to read the full summary of updates we're making.</p>

<p><b>Basic (Free) Plan Response Overage Deletion:</b><br>
We have clarified that any responses over your Basic (Free) plan's response limit are not viewable and each response over the limit will be deleted 60 days after it is received, in accordance with our data retention policies, unless you upgrade to a paid plan to view and keep access to those responses before they are deleted. Go to the <a target="_blank" href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWTU&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o.&_di_=c3jchveemn3feknkecd4vki0vekj7pd7adountdlehsveg9704i0" style="color:#007FAA;">My Surveys</a> page to see which of your surveys have extra responses over your plan's response limit, in case you want to upgrade to a paid plan to view and keep them.</p>
                    
<p><b>Changes to Your Response Limits:</b><br>
Your Basic (Free) plan's response limit has changed to 40 responses per survey for both your new and existing surveys. Starting January 1, 2021, any responses in your new and existing surveys over that response limit will not be viewable and will be eligible for deletion unless you upgrade to a paid plan. We encourage you to go to the <a target="_blank" href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWTU&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o.&_di_=c3jchveemn3feknkecd4vki0vekj7pd7adountdlehsveg9704i0" style="color:#007FAA;">My Surveys</a> page before January 1, 2021 to see which of your surveys have more than 40 responses, in case you want to upgrade to a paid plan before they are eligible for deletion.</p>                    

<p><b>Data Rights:</b><br>
We have clarified our process for how we respond to requests about data privacy rights from your Respondents. We have also addressed how we interact with third party agents making personal data requests on behalf of users.</p>                    
<p><b>Cookies:</b><br>
We have reorganized our description of the cookies and similar technologies which we use to make it easier for you to identify them. We are not changing the cookies we use, just making our descriptions easier to understand. We are also planning to implement some new cookies management tools to help you more easily manage your preferences regarding cookies and similar technologies on our sites &mdash; coming soon!</p>  
                 
<br>
                    
<p>Thanks for using SurveyMonkey,<br>
The SurveyMonkey Team</p>



				</font>


				<img class="tableHeight20" src="https://static.cdn.responsys.net/i2/responsysimages/survey/contentlibrary/2020_Q4/AdHoc/images/spacer.gif" width="1" height="30" alt=""/></td>
				<td class="hide" style="border-collapse: collapse;" width="40" height="3" bgcolor="#FFFFFF"><img style="outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; display:block;" src="https://static.cdn.responsys.net/i2/responsysimages/survey/contentlibrary/2020_Q4/AdHoc/images/spacer.gif" width="40" height="3" alt=""/></td>
			</tr>
		</table>
		<table class="table" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F4F5F5">
			<tr>
				<td class="hide" style="border-collapse: collapse;" width="50%" bgcolor="#F4F5F5">&nbsp;</td>
				<td class="table" style="border-collapse: collapse;" width="600" bgcolor="#F4F5F5" valign="top" align="center">
				<table class="table90" width="530" border="0" cellpadding="0" cellspacing="0" bgcolor="#F4F5F5">
					<tr>
						<td class="table" style="border-collapse: collapse;" width="530" height="20" bgcolor="#F4F5F5"><img class="table" style="outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; display:block;" src="https://static.cdn.responsys.net/i2/responsysimages/survey/contentlibrary/2020_Q4/AdHoc/images/spacer.gif" width="530" height="20" alt=""/></td>
					</tr>
					<tr>
						<td class="table" style="border-collapse: collapse;" width="530" height="2" bgcolor="#F4F5F5" valign="top" align="left">
						<font style="text-decoration:none; color:#A7A7A7; font-size:12px; font-family:helvetica, arial, sans-serif;">
						<i>*You cannot unsubscribe from legal-related notices from SurveyMonkey.</i>  <br><br>
                            This e-mail was sent to <font style="text-decoration:none; color:#A7A7A7; font-size:12px; font-family:helvetica, arial, sans-serif;">pinsaultm@gmail.com</font>. You received this legal-related notice because you signed up for a SurveyMonkey account.
                            <br><br> 
                            If you wish to manage your other email preferences, you can unsubscribe from marketing-related communications <a target="_blank" href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWTW&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebWAUkTqI5HSNvyCauL9kW1K5fJm5sJQvopyqSThOuZHa6qdfB2rwl7ILDTPTQHUcc-8UeAv8JKco_0Cduf3-WmQoLgylhtdIq1icuLw3nCJyt9uM310q9RV-tFYQlLzAKQ_tFOTBC1XmKw18Xy5-IdQrCJ6bqwzI67M.&_di_=q4893kttgla4b5165o9mdg8aboom4ol07546l2k8afucs260nk7g" style="color:#A7A7A7;text-decoration:underline;">here</a>.                            
                              <br><br> 
<a href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWST&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o.&_di_=nk62ukj5c10cjtqe11mvat61eqld0rkmlk6355mvsa340dusk8e0" target="_blank" style="text-decoration:none; color:#A7A7A7; font-size:12px; font-family:helvetica, arial, sans-serif;">Privacy</a> | <a href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWSU&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o.&_di_=f7a4qh6313afdss0kfeqdtmongkjfvn8vogi97j466t4jspddg9g" target="_blank" style="text-decoration:none; color:#A7A7A7; font-size:12px; font-family:helvetica, arial, sans-serif;">Help</a> | <a href="https://go.surveymonkey.com/pub/cc?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXtpKX%3DTWWUWSW&_ei_=EtV3dwlhG5yTWxZBcmgTtjVKpCutMrGpgi7PzwobNAuRcrYzezekSuJjUQiJww_T_NQqs3zhngfkq6Dts8S-JxBOnrYm5hjMuwsP8Ga_StjA6JhFunR3BlgdlIqLRfNeEoYMi3cvXyecrbfV5Kw7toqIoMECOFgLy9mNi88rHmZxp1JFaO-IXK1pFqQ-cdBZAgswYWTizda05DGCKHPq-4GJd8DfJVSaw9-HWXfxshnJ9KBGvQNpu6T9IyTAJcRbb-VuaS-e8APj85a8zZ2T6derS7LD8XdnZGRqxckbFeq4IuaMVdYp7MVNcWmo1MKHLJjylFZwF8We2KQSRMKA5HdavOa8j2Ee5W1zVAaQ_xVUiNTP7UHU1xUBLi6Z1uH-rvWPGW-w_42z0WgmXsc-6J_wp0jfG_7RrF8C2xEmUlyl4G586rVpx9hgK01IJFlbWexSKVW1c0-Lu-EL8BheOnRBNVmV7dqOLcLtO35rNyFc1MxucHTKMo4EgrefSLv1gwtJYuLf2BHQpqQNFBtfAoDBp7yPQBvoCy71ZWCu5d-YxtTofoXyelGQRXAQ6cqqMlZqyFx7Q2-ej4XUMiybF57Zb6_6B5U5wEMj7Jpkl8LtDsI_sygctTYCs9Qpo92Qht_tW77SSibdAH48Zq5I4MnrYgRiaTyXX64GWbBed3bvz6m-uxA-ktLMB1W-spB8FHKUl2texdUvF5F-9SaPhX6XAYOS73kvYocG2w97eaZAYUikn20pQ-5KHhIpX26UJqZRRFlEAQxlsn2qO-i9tFTQ9PWzJgPVOCyvaxYsRpYG-_V3zbyuC70xYoV0Ef_VD05JblEKXaQ0mygHLOQRAa6WLQOgOjmFAJVdiPpftPnTbUMSdSWMhIJgGYqutN9VOgvBIxUU2lQBzVGsblr4TYo-nPxzpeWFdJcsxmJjh61Fh5pO8YVKX-ipqP0YDgpr4O6BHbCxMvU5eMmjAtNsAZT5qYXHOuVVEvYMKyey9NUmy6USK_bTzn-TBceN6XOFwczwVsvW_T6d07R_q3zxMqI.&_di_=pulri828hoq1bag73j9rh4obqou9hub1sfde8u5ne5qp9kp4ihng" target="_blank" style="text-decoration:none; color:#A7A7A7; font-size:12px; font-family:helvetica, arial, sans-serif;">View in Browser</a>
<br><br>
                    
&copy; 2020 SurveyMonkey Europe UC,&nbsp;2 Shelbourne Buildings,&nbsp;2nd Floor,&nbsp;Shelbourne Road,&nbsp;Ballsbridge,&nbsp;Dublin 4,&nbsp;Ireland.
 
<br><br></font>
						</td>
					</tr>
				</table>
				</td>
				<td class="hide" style="border-collapse: collapse;" width="50%" bgcolor="#F4F5F5">&nbsp;</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
		<!-- prevent gmail app from auto-resizing email -->


  <div class="gmailfix" style="white-space:nowrap; font:15px courier; line-height:0;">

    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div><br>
  <table cellpadding="0" cellspacing="0" style="border: 0px; padding: 0px; margin: 0px; position: absolute; display: none; float: left">
    <tbody>
      <tr>
        <td height="1" style="font-size: 1px; line-height: 1px; padding: 0px;">
          <br>
        </td>
      </tr>
    </tbody>
  </table><br>
<table cellpadding="0" cellspacing="0" style="border: 0px; padding: 0px; margin: 0px; position: absolute; display: none; float: left">
<tr>
<td height="1" style="font-size: 1px; line-height: 1px; padding: 0px;">
<br><img src="https://go.surveymonkey.com/pub/as?_ri_=X0Gzc2X%3DAQpglLjHJlTQGm3SyEzehFazgzczbfU9WUjwfLb5AGcBEqUL1XGmY01TkIqzfcd0zd1J96GkyfLtaCAj97VXHkMX%3Dw&_ei_=EolaGGF4SNMvxFF7KucKuWPnkH-XhSJdgcPzB5Z6VqebyBJQvb9Y6cUgDhP67xVs-KawhtfzPl9e74YgXM8Pg6oLNwv5E7A0-jNeOeuzAZub6brK-NXgS3o."></img>
</td>
</tr>
</table> </body>
</html>
`

const Home = () => {
	const classes = useStyles({});
	const [open, setOpen] = React.useState(false);
	const router = useRouter();
	const handleClose = () => setOpen(false);
	const handleClick = () => router.push('/chats');;

	return (
		<React.Fragment>
			<Head>
				<title>Home - Nextron (with-typescript-material-ui)</title>
			</Head>
			<div className={classes.root}>
				<button onClick={handleClick}>
					Chats
      </button>
			</div>
		</React.Fragment>
	);
};

export default Home;
