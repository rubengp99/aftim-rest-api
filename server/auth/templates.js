var forgotTemplate = ``;
var passReset = ``;


function getForgotTemplate(name,hash){
    forgotTemplate = `
    <html>

<head>
    <title>Forget Password Email</title>
</head>

<body>
    <div>
        <h3>Dear ${name}</h3>
        <p>You requested for a password reset, your reset code is:</p>
        <div>${hash}<div>
        <br>
    </div>
   
</body>

</html>
    `;
    return forgotTemplate;
}

module.exports = { getForgotTemplate }