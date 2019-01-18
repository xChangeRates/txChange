const { google } = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();

const oauthId = process.env.OAUTH_ID;
const oauthSecret = process.env.OAUTH_SECRET;
const oauthUri = process.env.OAUTH_URI;

const oauth2Client = new google.auth.OAuth2(
  oauthId,
  oauthSecret,
  oauthUri
);

const people = google.people({
  version: 'v1',
  auth: oauth2Client
})

module.exports = {
  generateUrl(req, res, next) {
    const SCOPE = [
      "https://www.googleapis.com/auth/contacts.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile "
    ];
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPE
    })
    res.locals.url = url;
    next()
  },
  async googleOauth(req, res, next) {
    const { code } = req.query;
    if (!code) return res.status(400).send('invalid response');
    else {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
  
      const userInfo = await people.people.get({
        resourceName: "people/me",
        personFields: 'names,emailAddresses'
      })
      const email = userInfo.data.emailAddresses[0].value;
      console.log(tokens);
    }
    next();
  }
}